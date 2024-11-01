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
}

const RadioGroup: FC<RadioGroupProps> = ({
  name,
  isHorizontal,
  options,
  form,
}) => {
  return (
    <div>
      {options.map((option) => (
        <div key={option.value} className={`form-check ${isHorizontal ? 'form-check-inline pt-2' : ''}`}>
          <input
            className="form-check-input"
            type="radio"
            id={`${name}-${option.value}`}
            value={option.value}
            {...form.register(name)}
          />
          <label
            className="form-check-label text-nowrap"
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

export default RadioGroup;
