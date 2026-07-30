import type { InputHTMLAttributes, ReactNode } from 'react';

export function IconField({
  label,
  icon,
  action,
  ...inputProps
}: {
  label: string;
  icon: ReactNode;
  action?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="field field-icon">
      <div className="field-label-row">
        <label>{label}</label>
        {action}
      </div>
      <div className="field-icon-wrap">
        <span className="field-icon-mark">{icon}</span>
        <input {...inputProps} />
      </div>
    </div>
  );
}
