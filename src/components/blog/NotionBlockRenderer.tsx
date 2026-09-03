import { NotionBlock } from '@/lib/notion/types';
import Image from 'next/image';
import { CopyCodeButton } from './CopyCodeButton';

type RichText = {
  plain_text?: string;
  content?: string;
  link?: { url?: string } | null;
  annotations?: {
    bold?: boolean;
    code?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
    underline?: boolean;
    color?: string;
  };
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

interface NotionBlockRendererProps {
  blocks: NotionBlock[];
}

export function NotionBlockRenderer({ blocks }: NotionBlockRendererProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {blocks.map((block) => {
        const { type, id } = block;
        const value = block[type] as { rich_text?: RichText[] } | undefined;
        const richText = value?.rich_text ?? [];
        const headingText = type.startsWith('heading_')
          ? richText.map((t) => t.plain_text ?? '').join('')
          : '';
        const headingId = headingText ? slugify(headingText) : '';

        switch (type) {
          case 'paragraph':
            return (
              <p key={id} className="text-muted-foreground leading-relaxed">
                <Text text={richText} />
              </p>
            );
          case 'heading_1':
            return (
              <h1 key={id} id={headingId} className="text-3xl font-bold mt-8 mb-4">
                <Text text={richText} />
              </h1>
            );
          case 'heading_2':
            return (
              <h2 key={id} id={headingId} className="text-2xl font-bold mt-8 mb-4">
                <Text text={richText} />
              </h2>
            );
          case 'heading_3':
            return (
              <h3 key={id} id={headingId} className="text-xl font-bold mt-6 mb-3">
                <Text text={richText} />
              </h3>
            );
          case 'bulleted_list_item':
            return (
              <ul key={id} className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                <li>
                  <Text text={richText} />
                </li>
              </ul>
            );
          case 'numbered_list_item':
            return (
              <ol
                key={id}
                className="list-decimal list-inside ml-4 space-y-2 text-muted-foreground"
              >
                <li>
                  <Text text={richText} />
                </li>
              </ol>
            );
          case 'image':
            const imageUrl =
              value && 'external' in value
                ? (value as { external?: { url?: string } }).external?.url
                : (value as { file?: { url?: string } }).file?.url;
            const captionValue = value as { caption?: RichText[] };
            const caption = captionValue.caption?.[0]?.plain_text ?? '';
            return (
              <figure key={id} className="my-8">
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={imageUrl ?? ''}
                    alt={caption || 'Blog post image'}
                    fill
                    sizes="(max-width: 768px) 100vw, 680px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                {caption && (
                  <figcaption className="text-center text-sm text-muted-foreground mt-2">
                    {caption}
                  </figcaption>
                )}
              </figure>
            );
          case 'code':
            const codeText = richText.map((t) => t.plain_text ?? '').join('');
            return (
              <div key={id} className="relative group my-6">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code className="text-sm font-mono">
                    <Text text={richText} />
                  </code>
                </pre>
                <CopyCodeButton code={codeText} />
              </div>
            );
          case 'quote':
            return (
              <blockquote
                key={id}
                className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6"
              >
                <Text text={richText} />
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function Text({ text }: { text: RichText[] | undefined }) {
  if (!text) {
    return null;
  }
  return text.map((value, i) => {
    const annotations = value.annotations ?? {};
    const { bold, code, color, italic, strikethrough, underline } = annotations;
    return (
      <span
        key={i}
        className={[
          bold ? 'font-bold' : '',
          code ? 'bg-muted px-1 py-0.5 rounded font-mono text-sm' : '',
          italic ? 'italic' : '',
          strikethrough ? 'line-through' : '',
          underline ? 'underline' : '',
        ].join(' ')}
        style={color && color !== 'default' ? { color } : {}}
      >
        {value.link?.url ? (
          <a href={value.link.url} className="text-primary hover:underline">
            {value.content}
          </a>
        ) : (
          value.content
        )}
      </span>
    );
  });
}

export default NotionBlockRenderer;
