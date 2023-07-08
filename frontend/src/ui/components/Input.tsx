import cx from 'classnames';
import type { InputHTMLAttributes } from 'react';

interface Input extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  autoComplete: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  placeholder: string;
}

export const Input = ({
  id,
  name,
  type,
  autoComplete,
  required,
  className,
  disabled,
  placeholder,
  ...props
}: Input) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      className={cx(
        'block w-full p-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6',
        className
      )}
      {...props}
    />
  );
};
