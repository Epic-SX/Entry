import { FC } from "react";
import { BaseProps } from ".";
import ErrorMessage from "../ErrorMessage";
import Translation from "@/components/Translation";
import TranslationErrorMessage from "./TranslationErrorMessage";

type SelectProps = BaseProps;

const Select: FC<SelectProps> = ({ form, config, errorMessage }) => {
  const defaultValue = config.default as any;
  if (config['option_translate_key']) {
    if (config['option_translate_key'] === 'dynamic') {
      return (
        <div>
          <select
            className="form-select" defaultValue={defaultValue ?? ''}
            {...form.register(config.name)}
          >
            {
              config['options']
              && Object.entries(config['options'])
                .map(([key, value]) => (
                  <option key={key} value={key}>
                    {value as any}
                  </option>
                ))
            }
          </select>
          <TranslationErrorMessage errorKey={errorMessage} />
        </div>
      )
    } else {
      return (
        <div>
          <select
            className="form-select" defaultValue={defaultValue ?? ''}
            {...form.register(config.name)}
          >
            {
              config['options']
              && Object.entries(config['options'])
                .map(([key, _]) => (
                  <option key={key} value={key}>
                    <Translation
                      translationKey={config['option_translate_key']}
                      render={(t) => t(key as any)}
                    />
                  </option>
                ))
            }
          </select>
          <TranslationErrorMessage errorKey={errorMessage} />
        </div>
      )

    }
  } else {
    return (
      <div>
        <select
          className="form-select" defaultValue={defaultValue ?? ''}
          {...form.register(config.name)}
        >
          {
            config['options']
            && Object.entries(config['options'])
              .map(([key, value]) => (
                <option key={key} value={key}>
                  {value as any}
                </option>
              ))
          }
        </select>
        <ErrorMessage errorMessage={errorMessage} />
      </div>
    );

  }
}

export default Select;