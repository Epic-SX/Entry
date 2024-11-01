import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  labelFormater?: (option: Option) => ReactNode;
}

interface Option {
  value: string;
  label: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options,labelFormater, ...props }, ref) => {
    return (
      <select className={clsx('form-select', className)} ref={ref} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {labelFormater ? labelFormater(option) : option.label}
          </option>
        ))}
      </select>
    );
  },
);

Select.displayName = 'Select';

export default Select;
