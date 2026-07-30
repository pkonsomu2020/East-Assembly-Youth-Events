import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'flame' | 'outline';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: 'sm';
  block?: boolean;
}

export function Button({ variant = 'primary', size, block, className = '', ...rest }: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, size === 'sm' ? 'btn-sm' : '', block ? 'btn-block' : '', className]
    .filter(Boolean)
    .join(' ');
  return <button className={classes} {...rest} />;
}
