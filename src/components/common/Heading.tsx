import type { ReactNode } from 'react';
import { SquiggleUnderline } from './SquiggleUnderline';

export function Heading({ underline, children }: { underline?: boolean; children: ReactNode }) {
  if (!underline) return <h2>{children}</h2>;
  return (
    <h2 className="heading-underlined">
      <span>{children}</span>
      <SquiggleUnderline />
    </h2>
  );
}
