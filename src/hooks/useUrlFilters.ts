'use client';

import { useSyncExternalStore } from 'react';

const FILTERS_CHANGED = 'portfolio:filters-changed';

function subscribe(onChange: () => void) {
  window.addEventListener(FILTERS_CHANGED, onChange);
  window.addEventListener('popstate', onChange);
  return () => {
    window.removeEventListener(FILTERS_CHANGED, onChange);
    window.removeEventListener('popstate', onChange);
  };
}

export function useUrlFilters() {
  // Keep the search input in sync immediately, without a server navigation on every keystroke.
  const search = useSyncExternalStore(
    subscribe,
    () => window.location.search,
    () => ''
  );

  function updateFilters(updates: Record<string, string | null>) {
    const url = new URL(window.location.href);
    for (const [key, value] of Object.entries(updates)) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    if (url.href !== window.location.href) {
      window.history.replaceState(null, '', url);
      window.dispatchEvent(new Event(FILTERS_CHANGED));
    }
  }

  return { filters: new URLSearchParams(search), updateFilters };
}
