import { useTranslations } from 'next-intl';
import React, { FC } from 'react';

type Props = {
    translationKey: string; 
    render: (t: (id: string, options?: any) => string) => React.ReactNode;
}

const Translation: FC<Props> = ({ translationKey, render }) => {
    const t = useTranslations(translationKey);
    return <>{render(t)}</>;
}

export default Translation;