'use client';
import { Translation } from '@/components';
import { JP_LOCALE } from '@/constants';
import { isNumberValid } from '@/libs';
import { tourService } from '@/services';
import { TMessageSuccess, TMessageWarning } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React, { FC, useEffect } from 'react';

type Props = {
  params: {
    id: number;
    token: string;
    locale: string;
  }
}

const TourReentry: FC<Props> = ({ params: { id, token, locale } }) => {

  const router = useRouter();

  const useGetReentry = useQuery({
    queryKey: ['tours', 'reentry', id, token],
    queryFn: () => tourService.reentry(id, token, (locale || JP_LOCALE)),
    enabled: !!id && !!token && isNumberValid(+id),
    retry: false,
  });


  useEffect(() => {
    if (useGetReentry.isError && useGetReentry.error instanceof AxiosError) {
      const error = useGetReentry.error;
      const status = error.response?.status;
      if (status === 400 || status === 404) {
        router.replace('/error/invalid-page');
      }
    }
  }, [router, useGetReentry.error, useGetReentry.isError]);

  const useSetReentry = useMutation({
    mutationKey: ['tours', 'reentry', id, token],
    mutationFn: (data: { id: number }) => tourService.setReentry(data),
    onSuccess(message: (TMessageSuccess & TMessageWarning)) {
      if (message.success_message) {
        router.push(`/tours/reentry/${id}/completed?type=success&key_transaltion=tours_reentry_success`);
      } else if (message.warning_message) {
        router.push(`/tours/reentry/${id}/completed?type=warning&key_transaltion=tours_reentry_full`);
      }
    }
  })

  const handleSetReentry = () => {
    if (id && isNumberValid(+id)) {
      const data = { id: +id };
      useSetReentry.mutate(data);
    }
  }

  return (
    <div className="container">
      <div className="pt-4">
        <h2 className="text-secondary mb-4">
          <Translation
            translationKey='PageTitle'
            render={t => (<>{t('tours_regist')}</>)}
          />
        </h2>
        <div className="card">
          <div className="card-body">
            <Translation
              translationKey='Pages.tours.reentry'
              render={t => (<>{t('note')}</>)}
            /><br />
            <div className="text-danger"><Translation
              translationKey='Pages.tours.reentry'
              render={t => (<>{t('note_warning')}</>)}
            /></div>
          </div>
        </div>
        {
          (!!useGetReentry.data && !!useGetReentry.data.data) ? (
            <>
              <div className="card">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <strong>
                        <Translation
                          translationKey='FormTitle'
                          render={t => (<>{t('tour_id')}</>)}
                        />
                      </strong>
                    </div>
                    <div className="col-md-9">
                      <span>
                        {useGetReentry.data.data.tour_date}
                      </span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <strong>
                        <Translation
                          translationKey='FormTitle'
                          render={t => (<>{t('guardian_name')}</>)}
                        />
                      </strong>
                    </div>
                    <div className="col-md-9">
                      <span>
                        {useGetReentry.data.data.guardian_name}
                      </span>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <strong>
                        <Translation
                          translationKey='FormTitle'
                          render={t => (<>{t('child_name')}</>)}
                        />
                      </strong>
                    </div>
                    <div className="col-md-9">
                      <span>
                        {useGetReentry.data.data.child_name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4">
                <button
                  className="btn btn-success"
                  onClick={handleSetReentry}
                >
                  <Translation
                    translationKey='ButtonTitle'
                    render={t => (<>{t('regist_completed_btn')}</>)}
                  />
                </button>
              </div>
            </>
          )
            :
            (useGetReentry.isFetching || useGetReentry.isLoading) ?
              (null)
              : ((useGetReentry.isFetching || useGetReentry.isLoading))
        }
      </div>
    </div>
  )
}

export default TourReentry;