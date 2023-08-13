import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown"

interface CustomReactMarkdownProps {
  children: string;
  // postData?: PostData;
}

export const CustomReactMarkdown: React.FC<CustomReactMarkdownProps> = (
  {
    children,
  }) => {
  return (
    <ReactMarkdown
    // remarkPlugins={[]}
    // rehypePlugins={[]}
    // components={ }
    >
      {children}
    </ReactMarkdown>
  )
}