import * as React from 'react';

type BaseProps = {
  id: string;
  name?: string;
  label: string;
  className?: string;
};

type InputProps = BaseProps & {
  as?: 'input';
  type?: React.HTMLInputTypeAttribute;
} & React.InputHTMLAttributes<HTMLInputElement>;

type TextareaProps = BaseProps & {
  as: 'textarea';
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type FormFieldProps = InputProps | TextareaProps;

export function FormField(props: FormFieldProps) {
  const { id, name, label, className, as = 'input', ...rest } = props as FormFieldProps;

  const sharedClasses = 'rounded-lg bg-white px-3 py-2 text-sm text-black outline-none';

  const fieldName = name ?? id;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="lettering text-md text-royal-gold-400">
        {label}
      </label>

      {as === 'textarea' ? (
        <textarea
          id={id}
          name={fieldName}
          className={`${sharedClasses} ${className ?? ''}`}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          name={fieldName}
          className={`min-h-10 ${sharedClasses} ${className ?? ''}`}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}
