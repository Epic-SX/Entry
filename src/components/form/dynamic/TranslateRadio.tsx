import { FC } from 'react';
import { BaseProps } from '.';
import Translation from '@/components/Translation';
import TranslationErrorMessage from './TranslationErrorMessage';
import { Option } from '@/constants/options';

type RadioProps = BaseProps;

const TranslateRadio: FC<RadioProps> = ({ form, config, errorMessage }) => {
  const defaultValue = config.default as any;
  const options = config['options'] as Option[];
  return (
    <div>
      <div className="form-check">
        {options &&
          Array.isArray(options) &&
          options.map(({ value }) => (
            <div className="form-check me-2" key={value}>
              <input
                className="form-check-input"
                type="radio"
                value={value}
                defaultChecked={value === defaultValue}
                {...form.register(config.name)}
              />
              <label className="form-check-label">
                <Translation
                  translationKey={config['option_translate_key']}
                  render={(t) => t(value)}
                />
              </label>
            </div>
          ))}
      </div>
      <TranslationErrorMessage errorKey={errorMessage} />
    </div>
  );
};

export default TranslateRadio;
