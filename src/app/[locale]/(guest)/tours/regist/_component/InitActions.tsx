import { DownLineList, Translation } from '@/components';
import React, { FC } from 'react';

type InitActionsProps = {
    onOpenForm: () => void;
    onOpenModal: () => void;
}

const InitActions: FC<InitActionsProps> = ({ onOpenForm, onOpenModal }) => {
    return (
        <div className="card">
            <div className="card-body text-center">
                <Translation
                    translationKey='Pages.tours'
                    render={t => (
                        <DownLineList
                            line={t('tour_description')}
                            render={s => <p className="text-sm text-secondary">{s}</p>}
                        />
                    )} />
                <div>
                    <button className="btn btn-primary me-4" onClick={onOpenForm}>
                        <small>
                            <Translation
                                translationKey='ButtonTitle'
                                render={t => (<>{t('for_first_time_applicants_btn')}</>)}
                            />
                        </small>
                    </button>
                    <button className="btn btn-success" onClick={onOpenModal}>
                        <small>
                            <Translation
                                translationKey='ButtonTitle'
                                render={t => t('those_who_have_already_applied_btn')}
                            />
                        </small>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InitActions;