import { JoinTo } from '@/components';
import { TGuardian, TChild, ExamDetail } from '@/types';
import React, { FC } from 'react';

type RowInfoProps = {
    label: string | React.ReactNode;
    content: string | React.ReactNode;
}

const RowInfo: FC<RowInfoProps> = ({ label, content }) => {
    return (
        <div className="row mb-3">
            <div className="col-md-3">
                {label}
            </div>
            <div className="col-md-9">
                {content}
            </div>
        </div>
    );
}

type Props = {
    isNoData: boolean;
    guardian: TGuardian | undefined;
    child: TChild | undefined;
    examEntry: ExamDetail | undefined;
}

const ApplicantInformation: FC<Props> = ({ examEntry, guardian, child, isNoData }) => {
    return (
        <div className="card">
            <div className="card-header">
                <span>申込み者情報</span>
            </div>
            <div className="card-body">
                {(isNoData)
                    ? (<div className="text-center">申込み者情報はありません。</div>)
                    : (
                        <div>
                            <RowInfo
                                label={(<strong>保護者名</strong>)}
                                content={(
                                    <JoinTo
                                        values={[
                                            guardian?.last_name,
                                            guardian?.first_name,
                                            `(${guardian?.last_name_kana}`,
                                            `${guardian?.first_name_kana})`,
                                        ] as string[]}
                                    />
                                )}
                            />
                            <RowInfo
                                label={(<strong>お子さんのお名前</strong>)}
                                content={(
                                    <JoinTo
                                        values={[
                                            child?.last_name,
                                            child?.first_name,
                                            `(${child?.last_name_kana}`,
                                            `${child?.first_name_kana})`,
                                        ] as string[]}
                                    />
                                )}
                            />
                            <RowInfo
                                label={(<strong>お子さんのお名前(ローマ字)</strong>)}
                                content={(
                                    <JoinTo
                                        values={[
                                            child?.last_name_alp,
                                            child?.first_name_alp,
                                        ] as string[]}
                                    />
                                )}
                            />
                            <RowInfo
                                label={(<strong>お子さんの性別</strong>)}
                                content={child?.sex}
                            />
                            <RowInfo
                                label={(<strong>お子さんの誕生日</strong>)}
                                content={child?.birthday}
                            />
                            <RowInfo
                                label={(<strong>住所</strong>)}
                                content={guardian?.address}
                            />
                            <RowInfo
                                label={(<strong>電話番号</strong>)}
                                content={guardian?.tel}
                            />
                            <RowInfo
                                label={(<strong>メールアドレス</strong>)}
                                content={guardian?.email}
                            />
                            <RowInfo
                                label={(<strong>在園・卒園状況</strong>)}
                                content={examEntry?.being_in}
                            />
                            <RowInfo
                                label={(<strong>入園希望学年</strong>)}
                                content={examEntry?.entry_class}
                            />
                            <RowInfo
                                label={(<strong>入園希望年度</strong>)}
                                content={examEntry?.entry_year}
                            />
                            <RowInfo
                                label={(<strong>入園希望月</strong>)}
                                content={examEntry?.entry_month}
                            />
                            <hr />
                            <RowInfo
                                label={(<strong>処理履歴</strong>)}
                                content={(<>
                                    <div>
                                        <span className="me-3">申込み日:</span>
                                        <span>{examEntry?.entry_date}</span>
                                    </div>
                                    <div>
                                        <span className="me-3">課題提出日:</span>
                                        <span>{examEntry?.send_task_date}</span>
                                    </div>
                                    <div>
                                        <span className="me-3">考査（予定）日:</span>
                                        <span>{examEntry?.exam_date}</span>
                                    </div>
                                </>)}
                            />
                            <RowInfo
                                label={(<strong>ステータス</strong>)}
                                content={examEntry?.status}
                            />
                            <RowInfo
                                label={(<strong>合否</strong>)}
                                content={examEntry?.result_division}
                            />
                            <hr />
                            <div className="row mb-3">
                                <div className="col-md-12">
                                    <div>
                                        <strong>課題提出URL</strong>
                                    </div>
                                    <div>
                                        <small className="text-secondary">{examEntry?.assignment_submission_url}</small>
                                    </div>
                                    <div className="mt-4">
                                        <small className="text-danger text-nowrap">
                                            ※保護者の方からお問い合わせがあった場合にご利用ください。<br />
                                            ※セキュリティ上それ以外の方には伝えないでください。<br />
                                            ※すでに課題提出済みの場合は本URLは無効です。<br />
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

            </div>
        </div>
    )
}

export default ApplicantInformation;