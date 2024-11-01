import { BaseProps } from '.';
import { FC } from 'react';
import TranslationErrorMessage from './TranslationErrorMessage';
import { Option } from '@/constants/options';

type CheckboxProps = BaseProps<any, any>;

const TransalteCheckbox: FC<CheckboxProps> = ({
  form,
  config,
  errorMessage,
}) => {
  const defaultValue = config.default as any;
  const options = config['options'] as Option[];
  return (
    <div>
      <div className="form-check">
        {options &&
          Array.isArray(options) &&
          options.map(({ label, value }) => (
            <div className="form-check me-2" key={value}>
              <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={value === defaultValue}
                value={value}
                {...form.register(config.name)}
              />
              <label className="form-check-label">{label}</label>
            </div>
          ))}
      </div>
      <TranslationErrorMessage errorKey={errorMessage} />
    </div>
  );
};

export default TransalteCheckbox;
