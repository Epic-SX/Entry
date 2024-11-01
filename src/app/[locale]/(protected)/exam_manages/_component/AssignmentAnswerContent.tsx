import React, { FC } from 'react';
import Image from "next/image";
import default_img from '@/public/img/no_image.png';
import { ExamDetail, TTaskAnswer } from '@/types';

type Props = {
    examEntry: ExamDetail;
    answers: TTaskAnswer[] | undefined;
}

const AssignmentAnswerContent: FC<Props> = ({ examEntry, answers }) => {
    return (
        <div className="card">
            <div className="card-header">
                課題解答内容
            </div>
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-md-2">
                        <strong>写真</strong>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-6 text-center">
                                <div className="mb-2">
                                    <strong>お子さんの顔写真</strong>
                                </div>
                                <Image
                                    src={examEntry.photo1 || default_img}
                                    alt="placeholder"
                                    className="img-thumbnail"
                                    width={200} height={200}
                                    priority
                                />
                            </div>
                            <div className="col-md-6 text-center">
                                <div className="mb-2">
                                    <strong>保護者と一緒の写真</strong>
                                </div>
                                <Image
                                    src={examEntry.photo2 || default_img}
                                    alt="placeholder"
                                    className="img-thumbnail"
                                    width={200} height={200}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {answers && answers.length > 0 && (
                    answers.map((ans, index) => (
                        <React.Fragment key={index}>
                            <hr />
                            <div className="mb-3" >
                                <div>
                                    <strong>{`設問${index + 1}`}</strong>
                                </div>
                                <div className="mb-2">
                                    <small dangerouslySetInnerHTML={{ __html: ans.question }} />
                                </div>
                                <div className="alert alert-secondary">
                                    {ans.answer}
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>
    )
}

export default AssignmentAnswerContent;