import * as React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function Button({ className = '', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full cursor-pointer lettering ' +
    'px-6 py-3 font-minion-bold ' +
    'bg-royal-gold-500 text-black ' +
    'border-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ' +
    'transition-colors duration-150';

  return <button className={`${base} ${className}`} {...props} />;
}
