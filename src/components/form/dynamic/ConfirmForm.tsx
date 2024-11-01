import { Translation } from '@/components';
import { Option } from '@/constants/options';
import { getLabelOption, isHidenNameAlp } from '@/libs';
import { useLocale } from 'next-intl';
import React, { FC, ReactNode } from 'react';
import { UseFormReturn } from 'react-hook-form';

type ConfirmFormProps = {
    configFormValues: any;
    form: UseFormReturn<any, any, undefined>;
    actions?: ReactNode;
}

const ConfirmForm: FC<ConfirmFormProps> = ({ configFormValues, form, actions }) => {
    const locale = useLocale();
    return (
        <div>
            <div>
                {
                    Array.isArray(configFormValues) && configFormValues.map((config: any, index: number) => {
                        if (isHidenNameAlp(config, locale)) {
                            return null
                        }
                        if (config.type === 'html' || config.type === 'hidden') {
                            return null;
                        }
                        const key = config.name;
                        let value = null;
                        if (key == 'name') {
                            const firstName = form.getValues(`first_${config.name}`);
                            const lastName = form.getValues(`last_${config.name}`);
                            value = `${firstName} ${lastName}`
                        }
                        switch (config.type) {
                            case 'name':{
                                const firstName = form.getValues(`first_${config.name}`);
                                const lastName = form.getValues(`last_${config.name}`);
                                value = `${lastName} ${firstName} `
                                break;
                            }
                            case 'select':
                            case 'radio':{
                                const options = config["options"] as Option[];
                                if (config.option_translate_key && config.option_translate_key !== 'dynamic') {
                                    value = (<Translation translationKey={config.option_translate_key} render={t => {
                                        if (!form.getValues(config.name)) {
                                            return ''
                                        }
                                        return <>{t(form.getValues(config.name))}</>
                                    }} />)
                                } else {
                                    if (options && Array.isArray(options)) {
                                        value = getLabelOption(form.getValues(config.name), options);
                                    }
                                }
                                break;
                            }
                            case 'checkbox':{
                                const keys = form.getValues(config.name);
                                if (keys && Array.isArray(keys)) {
                                    value = keys.map(key => config.options[key]);
                                }
                                break;
                            }
                            case 'password':
                                value = '********';
                                break;
                            default:
                                value = form.getValues(config.name);
                                break;
                        }
                        return (
                            <div className="row mb-2" key={index}>
                                <div className="col-md-3">
                                    <strong className="me-1">
                                        <Translation translationKey='FormTitle' render={t => <>{t(config.name)}</>} />
                                    </strong>
                                    {config.label && <span>:</span>}
                                </div>
                                <div className="col-md-9">
                                    {Array.isArray(value) ? value.join(', ') : value}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {actions}
        </div>
    )
}

export default ConfirmForm;