"use client";

import { NavigationLink } from "@/components";
import { examManagesService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { FC, useState } from "react";
import {
  ApplicantInformation,
  AssignmentAnswerContent,
  DeleteModal,
  ExamDateNotificationModal,
  PassFailNotificationModal,
  StatusChangeModal,
  UpdateNoProspectStatusModal,
} from "../../_component";
import {
  isDisplayDelete,
  isDisplayEditExamDateAndResult,
  isDisplayEditId,
  isDisplayEditStatus,
} from "@/libs";
import {
  ExamDetail as ExamDetailType,
  TMessageSuccess,
} from "@/types";
import { ExamDateRequest, ExamStatusSchema } from "@/schemas";
import { useAlertStore } from "@/stores";
import { AxiosError } from "axios";
import { message } from "@/constants";

type Props = {
  params: {
    id: number;
  };
};

const createExamDateDefaultValues = (examEntry: ExamDetailType | undefined) => {
  if (!examEntry) {
    return undefined;
  }
  if (!examEntry.exam_date) {
    return {
      exam_date: "",
      exam_time: "",
      title: "",
    } as ExamDateRequest;
  }
  const dateArray = examEntry.exam_date.split(" ");
  let date = "";
  let time = "";
  if (dateArray.length > 0) {
    date = dateArray[0];
  }
  if (dateArray.length > 1) {
    time = dateArray[1];
  }
  const result: ExamDateRequest = {
    exam_date: date,
    exam_time: time,
    title: "",
  };
  return result;
};

const createStatusChangeDefaultValues = (
  examEntry: ExamDetailType | undefined
) => {
  if (!examEntry) {
    return undefined;
  }

  const valueString = String(examEntry.status_value);
  if (valueString == null || valueString === "" || valueString === undefined) {
    return undefined;
  }
  switch (valueString) {
    case "3":
      return {
        status: valueString,
        receipt_date: "",
      };
    case "4":
      return {
        status: valueString,
        receipt_date: examEntry.application_date,
      };
    case "99":
      return {
        status: valueString,
        receipt_date: examEntry.cancel_date,
      };
    default:
      return {
        status: "",
        receipt_date: "",
      };
  }
};

const ExamDetail: FC<Props> = ({ params: { id } }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangeStatusModal, setShowChangeStatusModal] = useState(false);
  const [showPassFailNotificationModal, setShowPassFailNotificationModal] =
    useState(false);
  const [showExamDateNotificationModal, setShowExamDateNotificationModal] =
    useState(false);
  const [showUpdateNoProspectStatusModal, setShowUpdateNoProspectStatusModal] =
    useState(false);
  const { showAlert } = useAlertStore();

  const useGetExamById = useQuery({
    queryKey: ["useGetExamById", id],
    queryFn: () => examManagesService.getExamById(id),
    enabled: !!id && !isNaN(id),
  });

  const isLoading = useGetExamById?.isLoading;
  const isFetching = useGetExamById?.isFetching;
  const examEntry = useGetExamById?.data?.exam_entry;
  const guardian = useGetExamById?.data?.guardian;
  const child = useGetExamById?.data?.child;
  const answers = useGetExamById?.data?.answers;

  const useUpdateExamDate = useMutation({
    mutationKey: ["useUpdateExamDate", id],
    mutationFn: (data: ExamDateRequest) =>
      examManagesService.updateExamDate({ id, ...data }),
    onSuccess: (res) => handleUpdateExamSuccess(res),
    onError: (err) => handleUpdateExamFail(err),
  });

  const useUpdateExamResult = useMutation({
    mutationKey: ["useUpdateExamResult", id],
    mutationFn: (data: number) => examManagesService.updateExamResult(id, data),
    onSuccess: (res) => handleUpdateExamSuccess(res),
    onError: (err) => handleUpdateExamFail(err),
  });

  const useUpdateExamStatus = useMutation({
    mutationKey: ["useUpdateExamStatus", id],
    mutationFn: (data: ExamStatusSchema) =>
      examManagesService.updateStatus(id, data),
    onSuccess: (res) => handleUpdateExamSuccess(res),
    onError: (err) => handleUpdateExamFail(err),
  });

  const useExamDelete = useMutation({
    mutationKey: ["useExamDelete", id],
    mutationFn: () => examManagesService.delete(id),
    onSuccess: (res) => handleUpdateExamSuccess(res),
    onError: (err) => handleUpdateExamFail(err),
  });

  const useUpdateNoProspectStatus = useMutation({
    mutationKey: ["useUpdateNoProspectStatus", id],
    mutationFn: () => examManagesService.updateNoProspectStatus(id),
    onSuccess: (res) => handleUpdateExamSuccess(res),
    onError: (err) => handleUpdateExamFail(err),
  });

  const handleUpdateExamSuccess = (res: TMessageSuccess) => {
    showAlert({
      type: "success",
      title: res.success_message || "更新に成功しました。",
    });
    useGetExamById.refetch();
  };

  const handleUpdateExamFail = (error: Error) => {
    const defaultErrorMessage = message.default_error;
    if (error instanceof AxiosError) {
      const message = error.response?.data.error_message;
      showAlert({
        type: "fail",
        title: message || defaultErrorMessage,
      });
    } else {
      showAlert({
        type: "fail",
        title: defaultErrorMessage,
      });
    }
  };

  const createModalHandler =
    (setShowModal: (value: React.SetStateAction<boolean>) => void) =>
    (e: any) => {
      e.preventDefault();
      setShowModal(true);
    };
  const handleShowDeleteModal = createModalHandler(setShowDeleteModal);
  const handleDelete = () => {
    if (!id) {
      return;
    }
    useExamDelete.mutate();
    setShowDeleteModal(false);
  };

  const handleShowChangeStatusModal = createModalHandler(
    setShowChangeStatusModal
  );

  const handleSatusChange = (params: ExamStatusSchema) => {
    if (!id) {
      return;
    }
    useUpdateExamStatus.mutate(params);
    setShowChangeStatusModal(false);
  };

  const handleShowPassFailNotificationModal = createModalHandler(
    setShowPassFailNotificationModal
  );

  const handlePassFailNotification = (value: string) => {
    if (!id) {
      return;
    }
    useUpdateExamResult.mutate(Number(value));
    setShowPassFailNotificationModal(false);
  };

  const handleShowExamDateNotificationModal = createModalHandler(
    setShowExamDateNotificationModal
  );
  const handleExamDateNotification = (data: ExamDateRequest) => {
    setShowExamDateNotificationModal(false);
    if (!id) {
      return;
    }
    useUpdateExamDate.mutate(data);
  };

  const handleShowUpdateNoProspectStatusModal = createModalHandler(
    setShowUpdateNoProspectStatusModal
  );
  const handleUpdateNoProspectStatus = () => {
    if (!id) {
      return;
    }
    useUpdateNoProspectStatus.mutate();
    setShowUpdateNoProspectStatusModal(false);
  };
  return (
    <div className="container p-4">
      <DeleteModal
        show={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
      <StatusChangeModal
        show={showChangeStatusModal}
        onConfirm={handleSatusChange}
        defaultValues={createStatusChangeDefaultValues(examEntry)}
        onCancel={() => setShowChangeStatusModal(false)}
      />
      <PassFailNotificationModal
        show={showPassFailNotificationModal}
        defaultValues={String(examEntry?.result_division_value)}
        onConfirm={handlePassFailNotification}
        onCancel={() => setShowPassFailNotificationModal(false)}
      />
      <ExamDateNotificationModal
        show={showExamDateNotificationModal}
        onConfirm={handleExamDateNotification}
        defaultValues={createExamDateDefaultValues(examEntry)}
        onCancel={() => setShowExamDateNotificationModal(false)}
      />
      <UpdateNoProspectStatusModal
        show={showUpdateNoProspectStatusModal}
        onConfirm={handleUpdateNoProspectStatus}
        onCancel={() => setShowUpdateNoProspectStatusModal(false)}
      />
      <h2 className="text-secondary">申込み情報詳細</h2>
      <div className="d-flex justify-content-end mb-3">
        {isDisplayEditExamDateAndResult(examEntry?.status_value) && (
          <>
            <button
              className="btn btn-primary ms-3"
              onClick={handleShowExamDateNotificationModal}
            >
              考査日連絡
            </button>
            <button
              className="btn btn-primary ms-3"
              onClick={handleShowPassFailNotificationModal}
            >
              合否連絡
            </button>
          </>
        )}
        {isDisplayEditStatus(examEntry?.status_value) && (
          <button
            className="btn btn-primary ms-3"
            onClick={handleShowChangeStatusModal}
          >
            ステータス変更
          </button>
        )}
        {isDisplayDelete(examEntry?.status_value) && (
          <button
            className="btn btn-danger ms-3"
            onClick={handleShowDeleteModal}
          >
            削除
          </button>
        )}
        {isDisplayEditId(examEntry?.status_value) && (
          <button
            className="btn btn-primary ms-3"
            onClick={handleShowUpdateNoProspectStatusModal}
          >
            入園見込みなしに変更
          </button>
        )}
      </div>
      <ApplicantInformation
        child={child}
        guardian={guardian}
        examEntry={examEntry}
        isNoData={
          !isLoading && !isFetching && !useGetExamById?.data?.exam_entry
        }
      />
      {examEntry?.shouldShowAssignmentInfo && (
        <AssignmentAnswerContent examEntry={examEntry} answers={answers} />
      )}
      <div className="text-center">
        <NavigationLink className="btn btn-success" href="/exam_manages">
          戻る
        </NavigationLink>
      </div>
    </div>
  );
};

export default ExamDetail;
