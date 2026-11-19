'use client';

import { useState } from 'react';
import { SearchX } from 'lucide-react';
import { ContentSearch, FilterChips, FilterSummary } from '@/components/ui/ContentFilters';
import { FIELD_WEIGHTS, searchCatalog, tokenize, type SearchEntry } from '@/lib/playground/search';

const catalog: SearchEntry[] = [
  {
    title: 'Accessible UI patterns',
    category: 'Design',
    tags: ['Accessibility', 'CSS'],
    description: 'A guide to building keyboard-friendly interfaces in React.',
  },
  {
    title: 'API documentation starter',
    category: 'Tools',
    tags: ['TypeScript', 'OpenAPI'],
    description: 'A lightweight template for publishing API reference docs.',
  },
  {
    title: 'React form patterns',
    category: 'Frontend',
    tags: ['React', 'Accessibility'],
    description: 'Patterns for validation, helpful errors, and form submission.',
  },
  {
    title: 'Design token library',
    category: 'Design',
    tags: ['CSS', 'Design systems'],
    description: 'A set of reusable values for color, spacing, and typography.',
  },
  {
    title: 'Component testing starter',
    category: 'Tools',
    tags: ['React', 'TypeScript'],
    description: 'A minimal toolkit for testing component behavior.',
  },
  {
    title: 'TypeScript API client',
    category: 'Frontend',
    tags: ['TypeScript', 'API'],
    description: 'Type-safe requests, structured errors, and retry handling.',
  },
];

const categories = [...new Set(catalog.map(({ category }) => category))].sort();
const examples = ['react', 'api docs', 'typescript'];

export function SearchPlayground() {
  const [query, setQuery] = useState('react');
  const [category, setCategory] = useState<string | null>(null);
  const [order, setOrder] = useState<'relevance' | 'catalog'>('relevance');
  const terms = tokenize(query);
  const results = searchCatalog(catalog, terms, category, order);

  function reset() {
    setQuery('');
    setCategory(null);
    setOrder('relevance');
  }

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.65fr)] md:items-start">
      <section
        aria-labelledby="search-controls"
        className="space-y-5 rounded-2xl border bg-card p-4 sm:p-5"
      >
        <div>
          <h2 id="search-controls" className="text-lg font-semibold tracking-tight">
            Search controls
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a keyword or pick a sample query.
          </p>
        </div>
        <div className="space-y-2">
          <ContentSearch label="Search the sample catalog" value={query} onChange={setQuery} />
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Sample queries">
            {examples.map((example) => (
              <button
                key={example}
                type="button"
                onClick={() => {
                  setQuery(example);
                  setCategory(null);
                }}
                className="min-h-9 rounded-lg border bg-background px-2.5 font-mono text-xs text-primary transition-colors hover:bg-accent"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
        <FilterChips
          label="Category"
          options={categories}
          selected={category}
          onChange={setCategory}
        />
        <label className="block space-y-1.5 text-sm font-medium">
          <span>Result order</span>
          <select
            value={order}
            onChange={(event) =>
              setOrder(event.target.value === 'catalog' ? 'catalog' : 'relevance')
            }
            className="control-surface block min-h-11 w-full rounded-lg px-3 text-sm"
          >
            <option value="relevance">Relevance (highest score first)</option>
            <option value="catalog">Original catalog order</option>
          </select>
        </label>
        <div className="space-y-3 rounded-xl border border-primary/15 bg-accent p-3.5 text-accent-foreground">
          <h3 className="text-sm font-semibold">How scoring works</h3>
          <p className="text-sm leading-relaxed">
            Every distinct search term must match. A term earns points only for its strongest match.
          </p>
          <ul className="flex flex-wrap gap-1.5" aria-label="Field weights">
            {Object.entries(FIELD_WEIGHTS).map(([field, points]) => (
              <li key={field} className="rounded-md bg-background px-2 py-1 font-mono text-xs">
                {field} +{points}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="search-results" className="min-w-0 space-y-3">
        <div>
          <h2 id="search-results" className="section-title">
            Matches
          </h2>
          <FilterSummary
            label="sample entries"
            count={results.length}
            total={catalog.length}
            onReset={category || query || order !== 'relevance' ? reset : undefined}
          />
        </div>
        {results.length ? (
          <ol className="space-y-2.5">
            {results.map(({ entry, matches, score }, index) => (
              <li key={entry.title} className="rounded-xl border bg-card px-4 py-3.5">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
                  <p className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, '0')} / {entry.category}
                  </p>
                  {terms.length > 0 && (
                    <span className="rounded-md bg-accent px-2 py-1 font-mono text-xs font-medium text-accent-foreground">
                      {score} {score === 1 ? 'point' : 'points'}
                    </span>
                  )}
                </div>
                <h3 className="mt-1 text-base font-semibold tracking-tight">{entry.title}</h3>
                <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
                {matches.length > 0 && (
                  <ul aria-label="Score breakdown" className="mt-2.5 flex flex-wrap gap-1.5">
                    {matches.map(({ term, field, points }) => (
                      <li
                        key={term}
                        className="max-w-full break-words rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                      >
                        <span className="font-medium text-foreground">{term}</span> · {field} +
                        {points}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <div className="space-y-2 rounded-2xl border border-dashed px-4 py-10 text-center">
            <SearchX size={23} aria-hidden="true" className="mx-auto text-muted-foreground" />
            <p className="font-medium">No entries match</p>
            <p className="text-sm text-muted-foreground">
              Try fewer keywords or a different category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
