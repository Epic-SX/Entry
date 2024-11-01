'use client';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react'
import LocalSwithcherSelect from './LocalSwithcherSelect';
import { LOCALES } from '@/constants';

const LocaleSwithcher = () => {
    const locale = useLocale();
    const t = useTranslations('LocaleSwitcher');
    return (
        <LocalSwithcherSelect defaultValue={locale}>
            {LOCALES.map((cur) => (
                <option key={cur} value={cur}>
                    {t('locale', { locale: cur })}
                </option>
            ))}
        </LocalSwithcherSelect>
    )
}

export default LocaleSwithcher;