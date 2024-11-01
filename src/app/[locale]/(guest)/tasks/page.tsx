'use client';

import { StepBar } from '@/components/form/dynamic';
import { MAX_ENTRY_STEP, TRANSLATION_KEY, entrySteps } from '@/constants';
import React, { FC, useEffect, useRef, useState } from 'react';
import default_img from '@/public/img/no_image.png';
import { UploadImageModal } from './_components';
import { UseFormReturn, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Photo1Request, Photo1Schema, Photo2Request, Photo2Schema } from '@/schemas';
import { UseMutationResult, useMutation, useQuery } from '@tanstack/react-query';
import { tasksService } from '@/services';
import { Translation, WindowReloadConfirm } from '@/components';
import { useAlertStore } from '@/stores';
import { TUploadImage } from '@/types';
import Link from 'next/link';
import { crateExamSchema } from './config';
import UploadImageForm from './_components/UploadImageForm';
import PhotoUploadSection from './_components/PhotoUploadSection';
import ExamEntry from './_components/ExamEntry';
import ActionButton from './_components/ActionButton';
import { public_routes } from '@/routes';
import { AxiosError } from 'axios';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { Noto_Serif_JP } from "next/font/google";
import clsx from 'clsx';

const notoSerifJP = Noto_Serif_JP({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
  })

type Props = {
    searchParams: {
        token: string;
        complete: string;
    };
}

const Tasks: FC<Props> = ({ searchParams }) => {
    const [currentStep, setCurrentStep] = useState(3);
    const [photo1Url, setPhoto1Url] = useState<string>('');
    const [photo2Url, setPhoto2Url] = useState('');
    const [showPhoto1Modal, setShowPhoto1Modal] = useState(false);
    const [showPhoto2Modal, setShowPhoto2Modal] = useState(false);
    const { showAlert } = useAlertStore();
    const [showConfirm, setShowConfirm] = useState(false);
    const [photo1ErrorMessage, setPhoto1ErrorMessage] = useState('');
    const [photo2ErrorMessage, setPhoto2ErrorMessage] = useState('');
    const router = useRouter();
    const mount = useRef(false);
    const tFormValidation = useTranslations('FormValidation');
    const locale = useLocale();

    useEffect(() => {
        if (!mount.current) {
            mount.current = true;
        }
    }, []);

    const getTaskByToken = useQuery({
        queryKey: ['tasks', 'getTaskByToken'],
        queryFn: () => tasksService.getTaskByToken(searchParams),
        enabled: !!searchParams.token,
        retry: 0,
    });
    useEffect(() => {
        if (!searchParams.token) {
            router.push(public_routes.error_invalid_page);
        }
        if (getTaskByToken.isError) {
            const error = getTaskByToken.error;
            let message = '';
            if (error instanceof AxiosError) {
                message = error.response?.data.error_message;
            }
            if (message) {
                showAlert({ type: 'fail', title: message });
            }
            if (getTaskByToken.error instanceof AxiosError) {
                if (getTaskByToken.error.response?.status === 404) {
                    router.push(public_routes.error_invalid_page);
                }
            }
        }
    }, [getTaskByToken.error, getTaskByToken.isError, router, searchParams.token, showAlert]);

    useEffect(() => {
        if (getTaskByToken) {
            let completed = false;
            if (getTaskByToken.data) {
                completed = (getTaskByToken.data as any).completed;
            }
            if (completed) {
                router.push(`${public_routes.tasks_complete}?token=${searchParams.token}`);
            } else {
                if (getTaskByToken.data?.exam_entry?.photo1) {
                    setPhoto1Url(getTaskByToken?.data?.exam_entry?.photo1);
                    setPhoto1ErrorMessage('');
                }
                if (getTaskByToken.data?.exam_entry.photo2) {
                    setPhoto2Url(getTaskByToken?.data?.exam_entry?.photo2);
                    setPhoto2ErrorMessage('');
                }
            }
        }
    }, [getTaskByToken, router, searchParams.token]);

    const uploadPhoto1 = useMutation({
        mutationKey: ['tasks', 'uploadPhoto1'],
        mutationFn: (data: FormData) => tasksService.uploadPhoto1(data),
        onSuccess: (data) => {
            getTaskByToken.refetch();
            setPhoto1Url(`${data.image_url}`);
            showAlert({
                type: 'success',
                title: '写真のアップロードが完了しました。',
                rootTranslationKey: TRANSLATION_KEY.API_STATUS,
                translationKey: TRANSLATION_KEY.API_UPLOAD_IMAGE_SUCCESS,
            });
        },
        onError: () => {
            showAlert({
                type: 'fail',
                title: '写真のアップロードに失敗しました。',
                rootTranslationKey: TRANSLATION_KEY.API_STATUS,
                translationKey: TRANSLATION_KEY.API_UPLOAD_IMAGE_ERROR,
            });
        }
    });

    const uploadPhoto2 = useMutation({
        mutationKey: ['tasks', 'uploadPhoto2'],
        mutationFn: (data: FormData) => tasksService.uploadPhoto2(data),
        onSuccess: (data) => {
            getTaskByToken.refetch();
            setPhoto2Url(`${data.image_url}`);
            showAlert({
                type: 'success',
                title: '写真のアップロードが完了しました。',
                rootTranslationKey: TRANSLATION_KEY.API_STATUS,
                translationKey: TRANSLATION_KEY.API_UPLOAD_IMAGE_SUCCESS,
            });
        },
        onError: () => {
            showAlert({
                type: 'fail',
                title: '写真のアップロードに失敗しました。',
                rootTranslationKey: TRANSLATION_KEY.API_STATUS,
                translationKey: TRANSLATION_KEY.API_UPLOAD_IMAGE_ERROR,
            });
        }
    });

    const saveTmp = useMutation({
        mutationKey: ['tasks', 'saveTmp'],
        mutationFn: (data: any) => tasksService.saveTemp(data),
        onSuccess: () => {
            showAlert({
                type: 'success',
                title: '一時保存が完了しました。',
                rootTranslationKey: TRANSLATION_KEY.API_STATUS,
                translationKey: TRANSLATION_KEY.API_SAVE_TMP_SUCCESS,
            });
        },
        onError: () => {
            showAlert({
                type: 'fail',
                title: '一時保存に失敗しました。',
                rootTranslationKey: TRANSLATION_KEY.API_STATUS,
                translationKey: TRANSLATION_KEY.API_SAVE_TMP_ERROR,
            });
        }
    });

    const saveTask = useMutation({
        mutationKey: ['tasks', 'saveTask'],
        mutationFn: (data: any) => tasksService.saveTask(data),
        onSuccess: () => {
            router.push(`/tasks/complete?token=${searchParams.token}`);
        },
    });

    const photo1Form = useForm<Photo1Request>({
        mode: 'all',
        resolver: zodResolver(Photo1Schema)
    });
    const photo2Form = useForm<Photo2Request>({
        mode: 'all',
        resolver: zodResolver(Photo2Schema),
    });

    const examForm = useForm({
        mode: 'onBlur',
        resolver: zodResolver(crateExamSchema(getTaskByToken.data?.exam_entry?.task_answer.map((_, index) => index) || []))
    });

    const { data: { tmp_answers } = {} } = getTaskByToken;

    useEffect(() => {
        if (tmp_answers) {
            const oldValue = Object.entries(tmp_answers)
                .reduce((result, [key, value]) => ({ ...result, [`task_${parseInt(key)}`]: value }), {});
            examForm.reset(oldValue);
        }
    }, [examForm, tmp_answers]);

    const incrementStep = () => {
        if (currentStep < MAX_ENTRY_STEP) {
            setCurrentStep(currentStep + 1);
        }
    }
    const createUploadHandler = (
        key: string,
        form: UseFormReturn<any>,
        uploadMutation: UseMutationResult<TUploadImage, Error, FormData, unknown>,
        setShowModal: (value: React.SetStateAction<boolean>) => void) => async () => {
            const isValid = await form.trigger();
            if (isValid) {
                const data = new FormData();
                const fileList = form.getValues(key) as any;
                data.append('upload_file', fileList[0] as File);
                data.append('id', String(getTaskByToken.data?.exam_entry.id));
                uploadMutation.mutate(data);
                setShowModal(false);
            }
        }

    const handlePhoto1Upload = createUploadHandler('photo1', photo1Form, uploadPhoto1, setShowPhoto1Modal);

    const handlePhoto2Upload = createUploadHandler('photo2', photo2Form, uploadPhoto2, setShowPhoto2Modal);

    const handleSaveTemp = async (e: any) => {
        e.preventDefault();
        const isValid = await examForm.trigger();
        if (isValid) {
            const data = {
                ...examForm.getValues(),
                id: getTaskByToken.data?.exam_entry.id
            }
            saveTmp.mutate(data);
        }
    }
    const handleConfirm = async (e: any) => {
        e.preventDefault();
        const validate = await examForm.trigger();
        let valid = true;
        if (!getTaskByToken.data?.exam_entry.photo1) {
            setPhoto1ErrorMessage(tFormValidation('photo_required'));
            valid = false;
        } else {
            setPhoto1ErrorMessage('');
        }
        if (!getTaskByToken.data?.exam_entry.photo2) {
            setPhoto2ErrorMessage(tFormValidation('photo_required'));
            valid = false;
        } else {
            setPhoto2ErrorMessage('');
        }
        if (validate && valid) {
            setShowConfirm(true);
        }
    }

    useEffect(() => {
        if (searchParams.complete === 'true') {
            setCurrentStep(4);
        }
    }, [searchParams.complete]);

    const handleSaveTask = (e: any) => {
        e.preventDefault();
        const data = {
            ...examForm.getValues(),
            id: getTaskByToken.data?.exam_entry.id,
            locale:locale
        }
        saveTask.mutate(data);
    }

    const handleBackToEntry = (e: any) => {
        e.preventDefault();
        setShowConfirm(false);
    }

    if (!mount.current) {
        return null;
    }

    const isLoading  = getTaskByToken.isLoading 
            || saveTmp.isPending 
            || saveTask.isPending 
            || uploadPhoto1.isPending 
            || uploadPhoto2.isPending;

    return (
        <div className={clsx("container",notoSerifJP.className)}>
            <WindowReloadConfirm />
            <h2 className="text-secondary">
                <Translation
                    translationKey='Pages.entries'
                    render={t => <>{t('title')}</>}
                />
            </h2>
            <StepBar
                width={3}
                current={currentStep}
                steps={entrySteps}
                render={step => <Translation translationKey={'Pages.entries.steps'} render={t => <>{t(step)}</>} />}
            />
            <UploadImageModal
                show={showPhoto1Modal}
                onCancel={() => setShowPhoto1Modal(false)}
                onConfirm={handlePhoto1Upload}
                content={<UploadImageForm form={photo1Form} photoName='photo1' />}
            />
            <UploadImageModal
                show={showPhoto2Modal}
                onCancel={() => setShowPhoto2Modal(false)}
                onConfirm={handlePhoto2Upload}
                content={<UploadImageForm form={photo2Form} photoName='photo2' />}
            />
            {currentStep === 4 && (
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mb-2 p-3">
                            <div className="alert alert-success text-center" role="alert">
                                <p>課題提出が完了しました。</p>
                                <p>考査日は未定です。追って連絡させていただきます。</p>
                                <p>お会いできるのを楽しみにしております。</p>
                            </div>
                            <div className="text-center">
                                <Link href="/" className="btn btn-success">サイトに戻る</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {currentStep === 3 && (
                <div>
                    <form>
                        <ConfirmMessage confirm={showConfirm} />
                        <div className="card">
                            <HeaderMessage confirm={showConfirm} />
                            <div className="card-body text-center">
                                <div className="row">
                                    <PhotoUploadSection
                                        title={(<Translation
                                            translationKey='Pages.tasks.upload_image_section'
                                            render={t => <>{t('upload_image_title1')}</>}
                                        />)}
                                        photoUrl={photo1Url}
                                        defaultImg={default_img}
                                        isConfirm={showConfirm}
                                        errorMessage={photo1ErrorMessage}
                                        uploadMutation={uploadPhoto1}
                                        setShowModal={setShowPhoto1Modal}
                                    />
                                    <PhotoUploadSection
                                        title={(<Translation
                                            translationKey='Pages.tasks.upload_image_section'
                                            render={t => <>{t('upload_image_title2')}</>}
                                        />)}
                                        photoUrl={photo2Url}
                                        defaultImg={default_img}
                                        isConfirm={showConfirm}
                                        errorMessage={photo2ErrorMessage}
                                        uploadMutation={uploadPhoto2}
                                        setShowModal={setShowPhoto2Modal}
                                    />
                                </div>
                            </div>
                        </div>
                        {
                            getTaskByToken.isSuccess
                            && getTaskByToken?.data.exam_entry?.task_answer.map((exam, index) => (
                                <ExamEntry
                                    key={index}
                                    index={index}
                                    exam={exam}
                                    form={examForm}
                                    isConfirm={showConfirm}
                                />
                            ))
                        }
                        <div className="text-center">
                            {showConfirm
                                ? (
                                    <ActionButton
                                        backLabel={(<Translation translationKey='ButtonTitle' render={t => <>{t('returns_to_the_input_screen_btn')}</>} />)}
                                        confirmLabel={(<Translation translationKey='ButtonTitle' render={t => <>{t('assignment_submission_completed_btn')}</>} />)}
                                        onBack={handleBackToEntry}
                                        onConfirm={handleSaveTask}
                                        disabled={isLoading}
                                    />
                                )
                                : (
                                    <ActionButton
                                        backLabel={(<Translation translationKey='ButtonTitle' render={t => <>{t('save_temporarily_btn')}</>} />)}
                                        confirmLabel={(<Translation translationKey='ButtonTitle' render={t => <>{t('go_to_confirmation_screen_btn')}</>} />)}
                                        onBack={handleSaveTemp}
                                        onConfirm={handleConfirm}
                                        disabled={isLoading}
                                    />
                                )}

                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

type HeaderMessageProps = {
    confirm: boolean;
}
const HeaderMessage: FC<HeaderMessageProps> = ({ confirm }) => {
    return (
        <div className="card-header">
            {confirm
                ? (
                    <div>
                        <strong>
                            <Translation translationKey="Pages.tasks" render={t => <>{t('submitted_photos_title')}</>} />
                        </strong>
                    </div>
                )
                : (
                    <div>
                        <div>
                            <span>
                                <Translation
                                    translationKey='Pages.tasks.upload_image_section'
                                    render={t => <>{t('upload_image_section_note')}</>}
                                />
                            </span>
                            <span className="badge text-bg-danger">
                                <small>
                                    <Translation
                                        translationKey='FormValidation'
                                        render={t => <>{t('required_title')}</>}
                                    />
                                </small>
                            </span>
                        </div>
                        <div className="ms-2">
                            <div className="text-dark">
                                <small>
                                    <Translation
                                        translationKey='Pages.tasks.upload_image_section'
                                        render={t => <>{t('upload_image_title1')}</>}
                                    />
                                </small>
                            </div>
                            <div className="text-dark">
                                <small>
                                    <Translation
                                        translationKey='Pages.tasks.upload_image_section'
                                        render={t => <>{t('upload_image_title2')}</>}
                                    />
                                </small>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
}

type ConfirmMessageProps = {
    confirm: boolean;
}
const ConfirmMessage: FC<ConfirmMessageProps> = ({ confirm }) => {
    if (confirm) {
        return (
            <div className="card mb-2 p-3">
                <div>
                    <Translation translationKey="Pages.tasks" render={t => <>{t('input_confirm_title')}</>} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="mb-2">
                <strong>
                    <Translation translationKey="Pages.tasks" render={t => <>{t('upload_image_note')}</>} />
                </strong>
            </div>
        );
    }
}



export default Tasks;