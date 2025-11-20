import React from 'react';
import { NotionBlock } from '@/lib/notion/types';
import Image from 'next/image';

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
                const value = block[type];

                switch (type) {
                    case 'paragraph':
                        return (
                            <p key={id} className="text-muted-foreground leading-relaxed">
                                <Text text={value.rich_text} />
                            </p>
                        );
                    case 'heading_1':
                        return (
                            <h1 key={id} className="text-3xl font-bold mt-8 mb-4">
                                <Text text={value.rich_text} />
                            </h1>
                        );
                    case 'heading_2':
                        return (
                            <h2 key={id} className="text-2xl font-bold mt-8 mb-4">
                                <Text text={value.rich_text} />
                            </h2>
                        );
                    case 'heading_3':
                        return (
                            <h3 key={id} className="text-xl font-bold mt-6 mb-3">
                                <Text text={value.rich_text} />
                            </h3>
                        );
                    case 'bulleted_list_item':
                        return (
                            <ul key={id} className="list-disc list-inside ml-4 space-y-2 text-muted-foreground">
                                <li>
                                    <Text text={value.rich_text} />
                                </li>
                            </ul>
                        );
                    case 'numbered_list_item':
                        return (
                            <ol key={id} className="list-decimal list-inside ml-4 space-y-2 text-muted-foreground">
                                <li>
                                    <Text text={value.rich_text} />
                                </li>
                            </ol>
                        );
                    case 'image':
                        const imageUrl = value.type === 'external' ? value.external.url : value.file.url;
                        const caption = value.caption ? value.caption[0]?.plain_text : '';
                        return (
                            <figure key={id} className="my-8">
                                <div className="relative aspect-video rounded-xl overflow-hidden">
                                    <Image
                                        src={imageUrl}
                                        alt={caption || 'Blog post image'}
                                        fill
                                        className="object-cover"
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
                        return (
                            <pre key={id} className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                                <code className="text-sm font-mono">
                                    <Text text={value.rich_text} />
                                </code>
                            </pre>
                        );
                    case 'quote':
                        return (
                            <blockquote key={id} className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">
                                <Text text={value.rich_text} />
                            </blockquote>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
}

// Helper component to render rich text
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Text({ text }: { text: any[] }) {
    if (!text) {
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return text.map((value: any, i: number) => {
        const {
            annotations: { bold, code, color, italic, strikethrough, underline },
            text,
        } = value;
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
                style={color !== 'default' ? { color } : {}}
            >
                {text.link ? (
                    <a href={text.link.url} className="text-primary hover:underline">
                        {text.content}
                    </a>
                ) : (
                    text.content
                )}
            </span>
        );
    });
}
