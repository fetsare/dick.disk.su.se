import * as React from "react";

export type FormFieldProps = {
  id: string;
  name?: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  as?: "input" | "textarea";
  rows?: number;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function FormField({
  id,
  name,
  label,
  type = "text",
  as = "input",
  rows = 4,
  className,
  ...rest
}: FormFieldProps) {
  const sharedClasses =
  "rounded-lg bg-white px-3 py-2 text-sm text-black outline-none";

  const fieldName = name ?? id;

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
  className="lettering text-md text-royal-gold-400"
      >
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={fieldName}
          rows={rows}
          className={`${sharedClasses} ${className ?? ""}`}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          name={fieldName}
          type={type}
          className={`min-h-10 ${sharedClasses} ${className ?? ""}`}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </div>
  );
}
