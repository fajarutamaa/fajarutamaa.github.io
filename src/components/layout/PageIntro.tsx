import type { ReactNode } from 'react';

interface PageIntroProps {
  label: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function PageIntro({ label, title, description, children }: PageIntroProps) {
  return (
    <header className="space-y-3 border-b pb-7 sm:pb-9">
      <p className="eyebrow accent-kicker">{label}</p>
      <h1 className="page-title">{title}</h1>
      <p className="max-w-[56ch] text-pretty leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children}
    </header>
  );
}
