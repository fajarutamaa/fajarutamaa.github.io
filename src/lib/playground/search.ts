export const FIELD_WEIGHTS = {
  Title: 5,
  Tag: 3,
  Description: 1,
} as const;

export interface SearchEntry {
  title: string;
  category: string;
  tags: readonly string[];
  description: string;
}

type SearchField = keyof typeof FIELD_WEIGHTS;

interface TermMatch {
  term: string;
  field: SearchField;
  points: number;
}

export function tokenize(query: string): string[] {
  return [...new Set(query.trim().toLowerCase().split(/\s+/).filter(Boolean))];
}

function matchTerm(entry: SearchEntry, term: string): TermMatch | null {
  const field = entry.title.toLowerCase().includes(term)
    ? 'Title'
    : entry.tags.some((tag) => tag.toLowerCase().includes(term))
      ? 'Tag'
      : entry.description.toLowerCase().includes(term)
        ? 'Description'
        : null;

  return field ? { term, field, points: FIELD_WEIGHTS[field] } : null;
}

export function searchCatalog(
  entries: readonly SearchEntry[],
  terms: readonly string[],
  category: string | null,
  order: 'relevance' | 'catalog'
) {
  const results = entries.flatMap((entry) => {
    if (category && entry.category !== category) return [];

    const matches: TermMatch[] = [];
    for (const term of terms) {
      const match = matchTerm(entry, term);
      if (!match) return [];
      matches.push(match);
    }

    return [{ entry, matches, score: matches.reduce((sum, match) => sum + match.points, 0) }];
  });

  // Stable sorting keeps the catalog order for ties.
  return order === 'relevance' ? results.sort((a, b) => b.score - a.score) : results;
}
