import { useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { EyeIcon, EyeOffIcon, LockIcon } from './formIcons';

export function PasswordField({
  label,
  action,
  ...inputProps
}: {
  label: string;
  action?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="field field-icon">
      <div className="field-label-row">
        <label>{label}</label>
        {action}
      </div>
      <div className="field-icon-wrap">
        <span className="field-icon-mark">{LockIcon}</span>
        <input type={visible ? 'text' : 'password'} {...inputProps} />
        <button
          type="button"
          className="field-icon-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          {visible ? EyeOffIcon : EyeIcon}
        </button>
      </div>
    </div>
  );
}
