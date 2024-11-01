'use client';

import { LoadingButton } from '@/components';
import scheduleService from '@/services/schedules.service';
import { useAlertStore } from '@/stores';
import {
  TMessageSuccess,
  TSendBulkMail,
  TSendMail,
  TUpdateCancelDate,
  TUpdateStatus
} from '@/types';
import { UseMutationResult, useMutation, useQuery } from '@tanstack/react-query';
import {
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import moment from 'moment';
import React, { FC, useEffect, useState } from 'react';
import { RemoveToursGuardianModal, SendMailModal, SendRemindMailModal, SendThanksMailModal, SendVacancyMailModal, TourGuardianTable } from '../../_components';
import { tourGuardianTableColumns } from '../../_components/TourGuardianTable';
import { isNumberValid } from '@/libs';
import { AxiosError } from 'axios';

type Props = {
  params: {
    tour_id: number
  }
}
const ListTourMember: FC<Props> = ({ params }) => {
  const { showAlert } = useAlertStore();
  const [toursGuardianId, setToursGuardianId] = useState<number | null>(null);
  const [showModalSendMail, setShowModalSendMail] = useState(false);
  const [sendMailTarget, setSendMailTarget] = useState<TSendMail & { guardian_name: string }>({
    tours_guardian_id: 0,
    guardian_email: '',
    guardian_name: '',
  });
  const [rowSelection, setRowSelection] = useState({});
  const [showSendVacancyMailModal, setShowSendVacancyMailModal] = useState(false);
  const [showSendRemindMailModal, setShowSendRemindMailModal] = useState(false);
  const [showSendThanksMailModal, setShowSendThanksMailModal] = useState(false);
  const [showRemoveToursGuardianModal, setShowRemoveToursGuardianModal] = useState(false);
  /**
   * ListTourMember
   */
  const { data: listScheduleMember, isFetching, refetch, isSuccess } = useQuery({
    queryKey: ['schedules', 'members', params.tour_id],
    queryFn: () => scheduleService.getListTourMemberById(params.tour_id),
    enabled: !!params.tour_id,
  });

  console.log("---------------",listScheduleMember)
  /**
   * Update Status
   */
  const { mutate: updateStatus, isPending: isStatusUpdating } = useMutation({
    mutationKey: ['schedules', 'update_status'],
    mutationFn: (data: TUpdateStatus) => scheduleService.updateStatus(data),
    onSuccess: (data: TUpdateStatus) => {
      refetch();
      if (isSuccess) {
        if (data.status === '9') {
          showAlert({
            title: 'キャンセル申出日の入力をお願いします',
            type: 'warning',
          })
        } else {
          showAlert({
            title: '更新完了',
            type: 'success',
          })
        }
      }
    },
    onError() {
      showAlert({
        title: '更新失敗',
        type: 'fail',
      })
    },
  })
  /**
   * Update Cancel Date
   */
  const { mutate: updateCancelDate, isPending: isCancelDateUpdating } = useMutation({
    mutationKey: ['schedules', 'update_status'],
    mutationFn: (data: TUpdateCancelDate) => scheduleService.updateCancelDate(data),
    onSuccess: () => {
      refetch();
      if (isSuccess) {
        showAlert({
          title: '更新完了',
          type: 'success',
        })
      }
    },
    onError() {
      showAlert({
        title: '更新失敗',
        type: 'fail',
      })
    },
  })
  /**
   * Send Mail
   */
  const { mutate: sendMail, isPending: isSending } = useMutation({
    mutationKey: ['schedules', 'send_mail'],
    mutationFn: (data: TSendMail) => scheduleService.sendMail(data),
    onSuccess: (response: TMessageSuccess) => {
      refetch();
      if (isSuccess) {
        showAlert({
          title: response.success_message,
          type: 'success',
        })
      }
    },
    onError() {
      showAlert({
        title: '送信失敗',
        type: 'fail',
      })
    },
    onSettled: () => {
      table.resetRowSelection();
    }
  })
  /**
   * Send Bulk Mail
   */
  const { mutate: sendBulkMail, isPending: isSendingBulk } = useMutation({
    mutationKey: ['schedules', 'send_bulk_mail'],
    mutationFn: (data: TSendBulkMail) => scheduleService.sendBulkMail(data),
    onSuccess: () => {
      refetch();
      if (isSuccess) {
        showAlert({
          title: '送信完了',
          type: 'success',
        })
      }
    },
    onError() {
      showAlert({
        title: '送信失敗',
        type: 'fail',
      })
    },
    onSettled: () => {
      table.resetRowSelection();
    }
  })

  // Delete Tour Guardian

  const useDeleteTourGuardian =  useMutation({
    mutationKey: ['schedules', 'delete_tour_guardian', toursGuardianId],
    mutationFn: (toursGuardianId: number) => scheduleService.deleteToursGuardian(toursGuardianId),
    onSuccess: () => {
      refetch();
      if (isSuccess) {
        showAlert({
          title: '削除完了',
          type: 'success',
        })
      }
    },
    onError() {
      showAlert({
        title: '削除失敗',
        type: 'fail',
      })
    },
  })

  useEffect(() => {
    if (isStatusUpdating || isCancelDateUpdating) {
      showAlert({
        title: '更新中',
        type: 'info',
      })
    }
    if (isSending || isSendingBulk) {
      showAlert({
        title: '送信中',
        type: 'info',
      })
    }
  }, [isCancelDateUpdating, isSending, isSendingBulk, isStatusUpdating, showAlert])
  /**
   * Table
   */
  const table = useReactTable({
    data: listScheduleMember?.guest_array || [],
    columns: tourGuardianTableColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection
    }
  });
  const [cancelDate, setCancelDate] = useState('');

  const handleChangeCancelDate = (e: any, tours_guardian_id: number) => {
    setCancelDate(moment(new Date(e.target.value)).format("YYYY-MM-DD"));
    setToursGuardianId(tours_guardian_id);
  };
  const handleRefresh = () => {
    refetch();
  };
  const handleUpdateStatus = (tours_guardian_id: number, status: string) => {
    const data: TUpdateStatus = {
      status,
      tours_guardian_id,
    }
    updateStatus(data);
  }
  const handleUpdateCancelDate = (tours_guardian_id: number) => {
    const data: TUpdateCancelDate = {
      cancel_date: cancelDate,
      tours_guardian_id,
    }
    updateCancelDate(data);
    setCancelDate('');
    setToursGuardianId(null);
  }
  const handleSendBulkMail = () => {
    const listToursGuardianId = table
      .getSelectedRowModel()
      .flatRows
      .map((row) => row.original.tours_guardian_id);
    const data: TSendBulkMail = {
      tours_guardian_ids: listToursGuardianId
    }
    sendBulkMail(data);
  }
  const handleSendMail = (mail: string) => {
    if (mail) {
      const data: TSendMail = {
        guardian_email: mail,
        tours_guardian_id: sendMailTarget.tours_guardian_id,
      }
      sendMail(data);
    }
    setShowModalSendMail(false);
  }
  const handleShowModalSendMail = (tours_guardian_id: number, email: string, name: string) => {
    setSendMailTarget({ tours_guardian_id, guardian_email: email, guardian_name: name });
    setShowModalSendMail(true);
    setToursGuardianId(tours_guardian_id);
  }

  const useSendVacancyMail = useMutation({
    mutationKey: ['send_tacancy_mail'],
    mutationFn: (data: { tour_id: number }) => scheduleService.sendVacancyMail(data),
    onSuccess: (res: TMessageSuccess) => {
      showAlert({
        title: res.success_message,
        type: 'success',
      })
    },
    onError: (error: any) => {
      handleSendMailError(error);
    },
  })

  const useSendRemindMail = useMutation({
    mutationKey: ['send_temind_mail'],
    mutationFn: (data: { tour_id: number }) => scheduleService.sendRemindMail(data),
    onSuccess: (res: TMessageSuccess) => {
      showAlert({
        title: res.success_message,
        type: 'success',
      })
    },
    onError: (error) => {
      handleSendMailError(error);
    },
  })

  const useSendThanksMail = useMutation({
    mutationKey: ['send_thanks_mail'],
    mutationFn: (data: { tour_id: number }) => scheduleService.sendThanksMail(data),
    onSuccess: (res: TMessageSuccess) => {
      showAlert({
        title: res.success_message,
        type: 'success',
      })
    },
    onError: (error: any) => {
      handleSendMailError(error);
    },

  })

  const handleSendMailError = (error: any) => {
    if (error instanceof AxiosError) {
      const { data, status } = error.response || {};
      const alertType = status === 429 ? 'warning' : 'fail';
      if (data && data.error_message) {
        showAlert({
          title: data.error_message,
          type: alertType,
        })
      } else {
        showAlert({
          title: '送信失敗',
          type: 'fail',
        })
      }
    } else {
      showAlert({
        title: '送信失敗',
        type: 'fail',
      })
    }
  }
  const createSendMailHandler = (
    useSendMail: UseMutationResult<
      TMessageSuccess,
      Error, {
        tour_id: number;
      }, unknown>) => () => {
        if (isNumberValid(+params.tour_id)) {
          useSendMail.mutate({ tour_id: Number(params.tour_id) });
        }
      }

  const handleSendVacancyMail = () => {
    setShowSendVacancyMailModal(false);
    createSendMailHandler(useSendVacancyMail)();
  }

  const handleSendRemindMail = () => {
    setShowSendRemindMailModal(false);
    createSendMailHandler(useSendRemindMail)();
  }

  const handleSendThanksMail = () => {
    setShowSendThanksMailModal(false);
    createSendMailHandler(useSendThanksMail)();
  }
  const handleShowModalDelete = (tours_guardian_id: number) => {
    setToursGuardianId(tours_guardian_id);
    setShowRemoveToursGuardianModal(true);
  }

  const handleDeleteToursGuardian = () => {
    if (isNumberValid(toursGuardianId)) {
      useDeleteTourGuardian.mutate(toursGuardianId as number);
    }
    setShowRemoveToursGuardianModal(false);
  }
  
  return (
    <div className="container-fluid pt-4">
      <SendMailModal
        show={showModalSendMail}
        sendMailTarget={{ ...sendMailTarget }}
        onCancel={() => setShowModalSendMail(false)}
        onConfirm={(mail) => handleSendMail(mail)}
      />
      <SendVacancyMailModal
        show={showSendVacancyMailModal}
        onCancel={() => setShowSendVacancyMailModal(false)}
        onConfirm={handleSendVacancyMail}
      />

      <SendRemindMailModal
        show={showSendRemindMailModal}
        onCancel={() => setShowSendRemindMailModal(false)}
        onConfirm={handleSendRemindMail}
      />

      <SendThanksMailModal
        show={showSendThanksMailModal}
        onCancel={() => setShowSendThanksMailModal(false)}
        onConfirm={handleSendThanksMail}
      />
      <RemoveToursGuardianModal
        show={showRemoveToursGuardianModal}
        onCancel={() => setShowRemoveToursGuardianModal(false)}
        onConfirm={handleDeleteToursGuardian}
      />
      <h2>見学会参加者一覧</h2>
      <hr />
      <div className="d-flex justify-content-between">
        <div>
          {isSendingBulk ? <LoadingButton label='送信中...' className="me-3" /> : (
            <button
              className="btn btn-primary pt-1 pb-1 me-3"
              onClick={handleSendBulkMail}
              disabled={Object.values(rowSelection).every(item => item === false)}
              aria-hidden="true"
            >
              <small className="fa fa-envelope me-3"></small>
              <span>考査案内メール一括送信</span>
            </button>
          )}
          <SendMailAction
            title='空席連絡'
            isSending={useSendVacancyMail.isPending}
            setShowModal={setShowSendVacancyMailModal}
          />
          <SendMailAction
            title='リマインドメール'
            isSending={useSendRemindMail.isPending}
            setShowModal={setShowSendRemindMailModal}
          />
          <SendMailAction
            title='お礼メール'
            isSending={useSendThanksMail.isPending}
            setShowModal={setShowSendThanksMailModal}
          />
        </div>
        
        {
          isFetching ? <LoadingButton label='リフレッシュ中...' /> : (
            <button className="btn btn-primary" onClick={handleRefresh}>
              <i className="fas fa-redo"></i>
            </button>
          )
        }

      </div>
      <div className='pt-2 pl-3'>
        <p>お申込人数: {listScheduleMember?.application_count || 0}</p>
      </div>
      <div className="p-3 shadow-sm mt-3 border">
        {listScheduleMember && (
          <TourGuardianTable
            table={table}
            cancelDate={cancelDate}
            toursGuardianId={toursGuardianId}
            isMailSending={isSending}
            isStatusUpdating={isStatusUpdating}
            onChangeCancelDate={handleChangeCancelDate}
            onUpdateStatus={handleUpdateStatus}
            onUpdateCancelDate={handleUpdateCancelDate}
            onShowModalSendMail={handleShowModalSendMail}
            onShowModalDelete={handleShowModalDelete}
          />
        )}
      </div>
    </div>
  );
}

type SendMailActionProps = {
  isSending: boolean;
  setShowModal: (value: React.SetStateAction<boolean>) => void;
  title: string;
}
const SendMailAction: FC<SendMailActionProps> = ({ isSending, setShowModal, title }) => {
  return (
    isSending
      ? (<LoadingButton label="送信中" className="me-3" />)
      : (
        <button type="button" className="btn btn-success  pt-1 pb-1 text-nowrap me-3"
          onClick={() => setShowModal(true)}
        >
          <small className="fa fa-envelope me-2"></small>
          <span>{title}</span>
        </button>
      )
  );
}
export default ListTourMember;