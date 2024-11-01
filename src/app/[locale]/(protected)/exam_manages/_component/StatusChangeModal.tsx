"use client";
import { Modal } from "@/components";
import { ErrorMessage } from "@/components/form";
import { statusOptions } from "@/constants/options";
import { ExamStatusSchema } from "@/schemas";
import React, { FC, useEffect } from "react";
import { useForm } from "react-hook-form";

type Props = {
  show: boolean;
  defaultValues?: ExamStatusSchema;
  onConfirm: (data: ExamStatusSchema) => void;
  onCancel: () => void;
};

const StatusChangeModal: FC<Props> = ({
  show,
  defaultValues,
  onConfirm,
  onCancel,
}) => {
  const form = useForm<ExamStatusSchema>({
    mode: "onBlur",
    defaultValues: {
      status: statusOptions[0].value,
    },
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const statusField = form.watch("status");
  const isShowDate = statusField && statusField !== "3";

  useEffect(() => {
    if (statusField && statusField !== "3") {
      form.setValue("receipt_date", "");
      form.register("receipt_date", { required: "受領日を入力してください" });
    }
  }, [form, statusField]);
  const handleConfirm = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      onConfirm(form.getValues());
      form.reset({
        status: statusOptions[0].value,
      });
    }
  };

  return (
    <Modal
      title="ステータス変更"
      content={
        <div>
          <div className="row align-items-center mb-3">
            <div className="col-md-4">
              <span>ステータス</span>
            </div>
            <div className="col-md-8">
              <select className="form-select" {...form.register("status")}>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {isShowDate && (
            <div className="row align-items-center">
              <div className="col-md-4">
                <span>受領日</span>
                <span className="badge bg-danger ms-2">必須</span>
              </div>
              <div className="col-md-8">
                <input
                  type="date"
                  className="form-control"
                  {...form.register("receipt_date")}
                />
                <ErrorMessage
                  errorMessage={form.formState.errors.receipt_date?.message}
                />
              </div>
            </div>
          )}
        </div>
      }
      cancelLabel="キャンセル"
      confirmLabel="変更"
      show={show}
      onConfirm={handleConfirm}
      onCancel={onCancel}
    />
  );
};

export default StatusChangeModal;
