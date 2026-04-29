import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  as?: "p" | "div" | "span";
}

export function Text({ children, className = "", as: Tag = "p", ...props }: TextProps) {
  return (
    <Tag className={`text-body ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
