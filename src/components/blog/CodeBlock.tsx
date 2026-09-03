'use client';

import dynamic from 'next/dynamic';

const PrismHighlight = dynamic(() =>
  import('./CodeBlockHighlight').then((m) => m.CodeBlockHighlight)
);

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  return <PrismHighlight code={code} language={language} />;
}
