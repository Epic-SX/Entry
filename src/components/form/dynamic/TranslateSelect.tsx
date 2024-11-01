import { FC } from 'react';
import { BaseProps } from '.';
import ErrorMessage from '../ErrorMessage';
import Translation from '@/components/Translation';
import TranslationErrorMessage from './TranslationErrorMessage';
import { Option } from '@/constants/options';

type SelectProps = BaseProps;

const TranslateSelect: FC<SelectProps> = ({ form, config, errorMessage }) => {
  const defaultValue = config.default as any;
  const options = config['options'] as Option[];
  if (config['option_translate_key']) {
    if (config['option_translate_key'] === 'dynamic') {
      return (
        <div>
          <select
            className="form-select"
            defaultValue={defaultValue ?? ''}
            {...form.register(config.name)}
          >
            {options &&
              Array.isArray(options) &&
              options.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
          </select>
          <TranslationErrorMessage errorKey={errorMessage} />
        </div>
      );
    } else {
      return (
        <div>
          <select
            className="form-select"
            defaultValue={defaultValue ?? ''}
            {...form.register(config.name)}
          >
            {options &&
              Array.isArray(options) &&
              options.map(({ value }) => (
                <option key={value} value={value}>
                  <Translation
                    translationKey={config['option_translate_key']}
                    render={(t) => t(value as any)}
                  />
                </option>
              ))}
          </select>
          <TranslationErrorMessage errorKey={errorMessage} />
        </div>
      );
    }
  } else {
    return (
      <div>
        <select
          className="form-select"
          defaultValue={defaultValue ?? ''}
          {...form.register(config.name)}
        >
          {options &&
            Array.isArray(options) &&
            options.map(({ label, value }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
        </select>
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );
  }
};

export default TranslateSelect;
