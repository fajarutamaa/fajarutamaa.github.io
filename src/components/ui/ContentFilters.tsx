'use client';

import { useRef } from 'react';
import { Search, X } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

interface ContentSearchProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function ContentSearch({ label, value, onChange }: ContentSearchProps) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <Search
        size={16}
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        ref={input}
        type="search"
        aria-label={label}
        placeholder={`${label}…`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`control-surface min-h-11 w-full rounded-xl pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground [&::-webkit-search-cancel-button]:hidden ${focusRing}`}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            onChange('');
            input.current?.focus();
          }}
          className={`absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground ${focusRing}`}
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

interface FilterChipsProps {
  label: string;
  options: string[];
  selected: string | null;
  onChange: (value: string | null) => void;
}

export function FilterChips({ label, options, selected, onChange }: FilterChipsProps) {
  if (!options.length) return null;

  return (
    <fieldset>
      <legend className="mb-1.5 text-xs font-medium text-muted-foreground">{label}</legend>
      <div className="flex flex-wrap gap-1.5">
        {[null, ...options].map((option) => (
          <button
            key={option === null ? 'all' : `option:${option}`}
            type="button"
            aria-pressed={selected === option}
            onClick={() => onChange(option === selected ? null : option)}
            className={`min-h-8 rounded-full px-3 text-xs transition-colors ${focusRing} ${
              selected === option
                ? 'bg-accent text-accent-foreground'
                : 'control-surface text-muted-foreground hover:bg-muted hover:text-foreground'
            }`}
          >
            {option ?? 'All'}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

interface FilterSummaryProps {
  label: string;
  count: number;
  total: number;
  onReset?: () => void;
}

export function FilterSummary({ label, count, total, onReset }: FilterSummaryProps) {
  return (
    <div className="flex min-h-8 flex-wrap items-center justify-between gap-x-3">
      <p role="status" className="text-sm text-muted-foreground">
        {count} of {total} {label}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className={`min-h-8 rounded text-sm font-medium text-primary underline-offset-4 hover:underline ${focusRing}`}
        >
          Reset filters
        </button>
      )}
    </div>
  );
}
