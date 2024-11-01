import { Translation } from '@/components'
import React, { FC } from 'react'

type CompletedStepProps = {
    onBack: () => void
}
const CompletedStep: FC<CompletedStepProps> = ({ onBack }) => {
    return (
        <div className="text-center p-4">
            <div className="alert alert-success" role="alert">
                <strong>
                    <Translation
                        translationKey='Pages.tours'
                        render={t => <>{t('regist_completed_message')}</>}
                    />
                </strong>
            </div>
            <div>
                <button className="btn btn-success" onClick={onBack}>
                    <Translation
                        translationKey='ButtonTitle'
                        render={t => <>{t('return_to_site_btn')}</>}
                    />
                </button>
            </div>
        </div>
    )
}

export default CompletedStep