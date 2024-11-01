import React, { FC } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import RowWapper from './RowWapper';
import HtmlText from './HtmlText';
import InputGroup from './InputGroup';
import Translation from '@/components/Translation';
import TranslateSelect from './TranslateSelect';
import TranslateRadio from './TranslateRadio';
import TransalteCheckbox from './TransalteCheckbox';

type InputRowProps<T extends FieldValues, C = any> = {
    config: C,
    form: UseFormReturn<T, any, undefined>;
}
const InputRow: FC<InputRowProps<any>> = <T extends FieldValues>({ config, form }: InputRowProps<T>) => {
    if (config.type === 'none' || config.type === 'hidden') {
        return null;
    } else {
        const type = config.type;
        switch (type) {
            case 'text':
            case 'number':
            case 'password':
            case 'email':
            case 'date':
                return (
                    <RowWapper config={config}>
                        <div className={`col-md-${config.width || 4}`}>
                            <InputGroup
                                config={config}
                                type={type}
                                form={form}
                                errorMessage={form.formState.errors[config.name]?.message}
                            />
                        </div>
                    </RowWapper>
                );
            case 'textarea':
                return (
                    <RowWapper config={config}>
                        <div className={`col-md-${config.width || 4}`}>
                            <textarea
                                rows={4}
                                className="form-control"
                                {...form.register(config.name)}
                            />
                        </div>
                    </RowWapper>
                );
            case 'select':
                return (
                    <RowWapper config={config}>
                        <div className={`col-md-${config.width || 4}`}>
                            <TranslateSelect
                                config={config}
                                form={form}
                                errorMessage={form.formState.errors[config.name]?.message}
                            />
                        </div>
                    </RowWapper>
                );
            case 'radio':
                return (
                    <RowWapper config={config}>
                        <div className={`col-md-${config.width || 4}`}>
                            <TranslateRadio
                                config={config}
                                form={form}
                                errorMessage={form.formState.errors[config.name]?.message}
                            />
                        </div>
                    </RowWapper>
                );
            case 'checkbox':
                return (
                    <RowWapper config={config}>
                        <div className={`col-md-${config.width || 4}`}>
                            <TransalteCheckbox
                                config={config}
                                form={form}
                                errorMessage={form.formState.errors[config.name]?.message}
                            />
                        </div>
                    </RowWapper>
                );
            case 'name':
                return (
                    <RowWapper config={config}>
                        <div className={`col-md-${config.width || 4}`}>
                            <InputGroup
                                config={config}
                                type={type}
                                groupBeforeText={(<Translation translationKey='FormTitle' render={(t) => <>{t('last_name')}</>} />)}
                                form={form}
                                name={`last_${config.name}`}
                                errorMessage={form.formState.errors[`last_${config.name}`]?.message}
                            />
                        </div>
                        <div className={`col-md-${config.width || 4}`}>
                            <InputGroup
                                config={config}
                                type={type}
                                groupBeforeText={(<Translation translationKey='FormTitle' render={(t) => <>{t('first_name')}</>} />)}
                                form={form}
                                name={`first_${config.name}`}
                                errorMessage={form.formState.errors[`first_${config.name}`]?.message}
                            />
                        </div>
                    </RowWapper>
                )
            case 'zipcode':
                return (
                    <RowWapper config={config}>
                        <div className={`col-md-${config.width || 4}`}>
                            <InputGroup
                                config={config}
                                type='text'
                                groupBeforeText='〒'
                                form={form}
                                errorMessage={form.formState.errors[config.name]?.message}
                            />
                        </div>
                    </RowWapper>
                );
            case 'html':
                return (
                    <HtmlText config={config} />
                )
            default:
                return null;
        }
    }
}

export default InputRow;