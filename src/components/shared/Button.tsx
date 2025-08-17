import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({ children, ariaLabel, ...props }) => (
  <button
    {...props}
    aria-label={ariaLabel}
    className={
      'rounded-md px-4 py-2 font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
      (props.className || '')
    }
  >
    {children}
  </button>
);

export default Button;
