import React from "react";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children?: React.ReactNode;
}

export function Heading({ level, className = "", children, ...props }: HeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  return (
    <Tag className={`heading heading--${level} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
