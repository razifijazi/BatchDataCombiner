import React from 'react';

interface Link {
  label: string;
  url: string;
}

interface LinkSeparatorProps {
  links: Link[];
  separator?: string;
}

const LinkSeparator: React.FC<LinkSeparatorProps> = ({ links, separator = '|' }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      {links.map((link, index) => (
        <React.Fragment key={link.url}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 hover:underline"
          >
            {link.label}
          </a>
          {index < links.length - 1 && <span className="text-gray-400">{separator}</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LinkSeparator;