'use client';

import { useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'portfolio:saved-posts';
const SAVED_POSTS_CHANGED = 'portfolio:saved-posts-changed';

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange();
  };

  window.addEventListener('storage', onStorage);
  window.addEventListener(SAVED_POSTS_CHANGED, onChange);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(SAVED_POSTS_CHANGED, onChange);
  };
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? '[]';
  } catch {
    return '[]';
  }
}

function parseSavedPosts(value: string | null): Set<string> {
  try {
    const slugs: unknown = JSON.parse(value ?? '[]');
    return new Set(Array.isArray(slugs) ? slugs.filter((slug) => typeof slug === 'string') : []);
  } catch {
    return new Set();
  }
}

function toggleSavedPost(slug: string) {
  const slugs = parseSavedPosts(getSnapshot());
  if (!slugs.delete(slug)) slugs.add(slug);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...slugs]));
  window.dispatchEvent(new Event(SAVED_POSTS_CHANGED));
}

export function useSavedPosts() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const savedPosts = useMemo(() => parseSavedPosts(snapshot), [snapshot]);

  return { savedPosts, toggleSavedPost, ready: snapshot !== null };
}
