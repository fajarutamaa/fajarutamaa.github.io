'use client';

import { Highlight, themes } from 'prism-react-renderer';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const LANGUAGE_ALIASES: Record<string, string> = {
  shell: 'bash',
  sh: 'bash',
  zsh: 'bash',
  plaintext: 'plain',
  js: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  py: 'python',
  rb: 'ruby',
  html: 'markup',
  xml: 'markup',
  yml: 'yaml',
  md: 'markdown',
  json: 'json',
  css: 'css',
  scss: 'scss',
  sql: 'sql',
  java: 'java',
  go: 'go',
  rust: 'rust',
  c: 'c',
  'c++': 'cpp',
  'c#': 'csharp',
};

function normalizeLanguage(language: string): string {
  return LANGUAGE_ALIASES[language.toLowerCase()] || language.toLowerCase();
}

interface CodeBlockHighlightProps {
  code: string;
  language?: string;
}

export function CodeBlockHighlight({ code, language = 'text' }: CodeBlockHighlightProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failures
    }
  };

  const lang = language ? normalizeLanguage(language) : 'text';

  return (
    <div className="relative group my-6">
      <Highlight theme={themes.nightOwl} code={code.trim()} language={lang as never}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="p-4 rounded-lg overflow-x-auto text-sm leading-relaxed"
            style={{ ...style, background: 'transparent' }}
          >
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>

      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-background/40 hover:bg-background/70 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy code to clipboard"
      >
        {copied ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <Copy size={16} className="text-muted-foreground" />
        )}
      </button>
    </div>
  );
}
