import { Modal } from "@/components";
import { ErrorMessage, RadioGroup } from "@/components/form";
import { config } from "@/constants";
import { formTimeToHHMM } from "@/libs";
import { ExamDateFormSchema, ExamDateRequest } from "@/schemas";
import { examManagesService } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

type Props = {
  show: boolean;
  onConfirm: (data: ExamDateRequest) => void;
  onCancel: () => void;
  defaultValues?: ExamDateRequest;
};

const ExamDateNotificationModal: FC<Props> = ({
  show,
  defaultValues,
  onConfirm,
  onCancel,
}) => {
  const form = useForm<ExamDateRequest>({
    mode: "onBlur",
    resolver: zodResolver(ExamDateFormSchema),
    defaultValues: {
      exam_date: "",
      exam_time: "",
      memo: "",
      title: "",
      zoom_url: "",
    },
  });
  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);
  const onSubmit = async () => {
    const isValid = await form.trigger();
    if (isValid) {
      onConfirm({
        ...form.getValues(),
        exam_time: formTimeToHHMM(form.getValues("exam_time")),
      });
    }
  };
  const title = useWatch({ control: form.control, name: "title" });
  const useGetZoomUrlByTitle = useQuery({
    queryKey: ["useGetZoomUrlByTitle", title],
    queryFn: () => examManagesService.getZoomUrlByTitle(title),
    retry: false,
    enabled: !!title,
  });

  useEffect(() => {
    if (title) {
      useGetZoomUrlByTitle.refetch();
    }
  }, [title, useGetZoomUrlByTitle]);

  return (
    <Modal
      title="考査日時決定・通知"
      content={
        <div className="text-wradfd">
          <form>
            <div className="mb-3 row">
              <label htmlFor="exam_date" className="col-sm-4 col-form-label">
                <strong>考査日</strong>
                <span className="badge bg-danger ms-2">必須</span>
              </label>
              <div className="col-sm-8">
                <input
                  id="exam_date"
                  type="date"
                  className="form-control"
                  {...form.register("exam_date")}
                />
                <ErrorMessage
                  errorMessage={form.formState.errors.exam_date?.message}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="exam_time" className="col-sm-4 col-form-label">
                <strong>開始時刻</strong>
                <span className="badge bg-danger ms-2">必須</span>
              </label>
              <div className="col-sm-8">
                <input
                  id="exam_time"
                  type="time"
                  className="form-control"
                  {...form.register("exam_time")}
                />
                <ErrorMessage
                  errorMessage={form.formState.errors.exam_time?.message}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="memo" className="col-sm-4 col-form-label">
                <strong>考査レーン</strong>
                <span className="badge bg-danger ms-2">必須</span>
              </label>
              <div className="col-sm-8">
                <RadioGroup
                  form={form}
                  name="title"
                  isHorizontal={true}
                  options={config.examination_lanes.map((title) => ({
                    value: title,
                    label: title,
                  }))}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="zoom-url" className="col-sm-4 col-form-label">
                <strong>Zoom url</strong>
              </label>
              <div className="col-sm-8">
                <div
                  className="alert alert-secondary text-wrap text-break"
                  role="alert"
                >
                  {useGetZoomUrlByTitle.data?.zoom_url
                    ? useGetZoomUrlByTitle.data?.zoom_url
                    : "考査レーンを選択して下さい"}
                </div>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="memo" className="col-sm-4 col-form-label">
                <strong>メモ </strong>
              </label>
              <div className="col-sm-8">
                <textarea
                  id="memo"
                  className="form-control"
                  rows={9}
                  {...form.register("memo")}
                />
              </div>
            </div>
          </form>
          <div className="p-2 mt-4 border-top">
            <small className="text-danger">
              ※「登録・通知」ボタンをクリックすると保護者の方へメール連絡が自動で送られます。
            </small>
          </div>
        </div>
      }
      cancelLabel="キャンセル"
      confirmLabel="登録・通知"
      show={show}
      onConfirm={onSubmit}
      onCancel={onCancel}
    />
  );
};

export default ExamDateNotificationModal;
