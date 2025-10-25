import React from 'react';

interface NotionBlockProps {
  block: any;
}

export default function NotionBlock({ block }: NotionBlockProps) {
  const { type, id } = block;
  const value = block[type];

  const renderRichText = (richTextArray: any[]) => {
    if (!richTextArray || richTextArray.length === 0) return null;

    return richTextArray.map((richText: any, index: number) => {
      let text = richText.plain_text;
      const annotations = richText.annotations;

      let className = '';
      let element = text;

      if (annotations.bold) className += ' font-bold';
      if (annotations.italic) className += ' italic';
      if (annotations.strikethrough) className += ' line-through';
      if (annotations.underline) className += ' underline';
      if (annotations.code) {
        return <code key={index} className="notion-code">{text}</code>;
      }

      if (richText.href) {
        return (
          <a
            key={index}
            href={richText.href}
            className={`text-blue-600 dark:text-blue-400 hover:underline ${className}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        );
      }

      return (
        <span key={index} className={className}>
          {text}
        </span>
      );
    });
  };

  switch (type) {
    case 'paragraph':
      return (
        <p className="notion-paragraph text-gray-800 dark:text-gray-200">
          {renderRichText(value.rich_text)}
        </p>
      );

    case 'heading_1':
      return (
        <h1 className="notion-h1 text-gray-900 dark:text-gray-100">
          {renderRichText(value.rich_text)}
        </h1>
      );

    case 'heading_2':
      return (
        <h2 className="notion-h2 text-gray-900 dark:text-gray-100">
          {renderRichText(value.rich_text)}
        </h2>
      );

    case 'heading_3':
      return (
        <h3 className="notion-h3 text-gray-900 dark:text-gray-100">
          {renderRichText(value.rich_text)}
        </h3>
      );

    case 'bulleted_list_item':
      return (
        <ul className="notion-list list-disc">
          <li className="text-gray-800 dark:text-gray-200">
            {renderRichText(value.rich_text)}
          </li>
        </ul>
      );

    case 'numbered_list_item':
      return (
        <ol className="notion-list list-decimal">
          <li className="text-gray-800 dark:text-gray-200">
            {renderRichText(value.rich_text)}
          </li>
        </ol>
      );

    case 'to_do':
      return (
        <div className="flex items-start space-x-2 mb-2">
          <input
            type="checkbox"
            checked={value.checked}
            readOnly
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className={`text-gray-800 dark:text-gray-200 ${value.checked ? 'line-through opacity-60' : ''}`}>
            {renderRichText(value.rich_text)}
          </span>
        </div>
      );

    case 'toggle':
      return (
        <details className="notion-toggle mb-2">
          <summary className="cursor-pointer font-medium text-gray-800 dark:text-gray-200">
            {renderRichText(value.rich_text)}
          </summary>
          <div className="ml-4 mt-2">
            {/* Child blocks would go here */}
          </div>
        </details>
      );

    case 'code':
      return (
        <div className="notion-code-block">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase">
              {value.language}
            </span>
          </div>
          <pre className="overflow-x-auto">
            <code className="text-gray-800 dark:text-gray-200">
              {value.rich_text.map((t: any) => t.plain_text).join('')}
            </code>
          </pre>
        </div>
      );

    case 'quote':
      return (
        <blockquote className="notion-quote">
          {renderRichText(value.rich_text)}
        </blockquote>
      );

    case 'callout':
      return (
        <div className="notion-callout">
          <div className="flex items-start space-x-3">
            {value.icon?.emoji && (
              <span className="text-2xl">{value.icon.emoji}</span>
            )}
            <div className="flex-1 text-gray-800 dark:text-gray-200">
              {renderRichText(value.rich_text)}
            </div>
          </div>
        </div>
      );

    case 'divider':
      return <hr className="notion-divider" />;

    case 'image':
      const imageUrl = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption.map((t: any) => t.plain_text).join('') : '';

      return (
        <figure className="my-6">
          <img
            src={imageUrl}
            alt={caption}
            className="w-full rounded-lg shadow-md"
          />
          {caption && (
            <figcaption className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              {caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return (
        <div className="text-gray-500 dark:text-gray-400 text-sm italic mb-2">
          Unsupported block type: {type}
        </div>
      );
  }
}
