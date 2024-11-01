import React from 'react';
import { clsx } from 'clsx';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={clsx('form-check-input', className)}
        type="radio"
        ref={ref}
        {...props}
      />
    );
  },
);

Radio.displayName = 'Input';

export default Radio;
