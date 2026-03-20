import * as React from "react";

export interface PageTitleProps {
  children: React.ReactNode;
}

export function PageTitle({ children }: PageTitleProps) {
  return (
    <h1 className="lettering-reduced text-4xl lg:text-5xl text-center my-8 tracking-normal">
      {children}
    </h1>
  );
}
