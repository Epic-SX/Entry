import React from 'react';
import { clsx } from 'clsx';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const CheckBox = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={clsx('form-check-input', className)}
        type="checkbox"
        ref={ref}
        {...props}
      />
    );
  },
);

CheckBox.displayName = 'Input';

export default CheckBox;
