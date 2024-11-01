import { FC } from 'react';
import { UseFormReturn } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

interface Option {
  value: string;
  label: string;
}
interface RadioGroupProps {
  name: string;
  isHorizontal?: boolean;
  options: Option[];
  form: UseFormReturn<any, any, undefined>;
  className?: string;
}

const CheckboxGroup: FC<RadioGroupProps> = ({
  name,
  isHorizontal,
  options,
  form,
  className,
}) => {
  return (
    <div className={className}>
      {options.map((option) => (
        <div
          className={`form-check ${isHorizontal ? 'form-check-inline pt-2' : ''}`}
          key={option.value}
        >
          <input
            id={`${name}-${option.value}`}
            className="form-check-input"
            type="checkbox"
            value={option.value}
            {...form.register(name)}
          />
          <label
            className="form-check-label"
            htmlFor={`${name}-${option.value}`}
          >
            {option.label}
          </label>
        </div>
      ))}
      <ErrorMessage
        errorMessage={form.formState.errors[name]?.message as any}
      />
    </div>
  );
};

export default CheckboxGroup;
