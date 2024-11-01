import { Translation } from '@/components';
import { ErrorLayout } from '@/components/layout';
import Link from 'next/link';
import React from 'react';

const ErrorNotFound = () => {
    return (
        <ErrorLayout>
            <div className="text-center p-4">
                <h5 className='text-secondary'>
                    <Translation
                        translationKey='ErrorMessage'
                        render={t => <>{t('not_found')}</>}
                    />
                </h5>
                <div className="mt-4">
                    <Link href="/" className="btn btn-primary pt-0 pb-0">
                        <Translation
                            translationKey='ButtonTitle'
                            render={t => <>{t('home_return_btn')}</>}
                        />
                    </Link>
                </div>
            </div>
        </ErrorLayout>
    )
}

export default ErrorNotFound;
