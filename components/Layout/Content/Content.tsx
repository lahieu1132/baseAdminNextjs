import React from "react";

interface ContentProps {
  children: React.ReactNode;
}

export default function Content({children}: ContentProps): JSX.Element {
  return <div className="content">{children}</div>;
}
