import {ModalCustom} from "@app/components/ModalCustom";
import React, {useState} from "react";
import {DateInput} from "@app/components/Modal/DateInput";
import {NumberInput} from "@app/components/Modal/NumberInput";
import {TextArea} from "@app/components/Modal/TextArea";
import ApiLeaveWork, {ILeaveWorkBody} from "@app/api/ApiLeaveWork";
import {useMutation, useQuery} from "react-query";
import {Modal} from "antd";
import moment from "moment";
import {ILeaveWork} from "@app/types";

interface ModalCreateLeaveWorkProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  dataRefetch: () => void;
}

export function ModalCreateLeaveWork({
  isModalVisible,
  toggleModal,
  dataRefetch,
}: ModalCreateLeaveWorkProps): JSX.Element {
  const [data, setData] = useState<ILeaveWorkBody>({
    startDate: moment().format("DD-MM-YYYY"),
    quantity: 0.5,
    reason: "",
  });

  const getDaysAllowedLeave = (): Promise<ILeaveWork> => {
    return ApiLeaveWork.getDaysAllowedLeave();
  };
  const daysAllowedLeave = useQuery("daysAllowedLeave", getDaysAllowedLeave);

  const createLeaveWorkMutation = useMutation(ApiLeaveWork.createLeaveWork);
  const handleCreateLeaveWork = (values: ILeaveWorkBody): void => {
    createLeaveWorkMutation.mutate(
      {
        startDate: values.startDate,
        quantity: values.quantity,
        reason: values.reason,
      }
      // {
      //   onSuccess: () => {
      //     //todo
      //   },
      //   onError: () => {
      //     //todo
      //   },
      // }
    );
  };

  const handleConfirmCreate = (): void => {
    Modal.confirm({
      title: "Xác nhận gửi đơn xin nghỉ?",
      okType: "primary",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () => {
        if (data.startDate) {
          handleCreateLeaveWork({
            ...data,
            startDate: moment(data.startDate).toISOString(),
          });
        }
        toggleModal();
        dataRefetch();
      },
    });
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-create-leave-work">
        <div className="flex mb-5">
          <DateInput
            keyValue="startDate"
            label="Ngày bắt đầu nghỉ"
            value={data.startDate ?? moment().format("DD-MM-YYYY")}
            required
            onChange={setData}
          />
          <NumberInput
            className="ml-8"
            keyValue="quantity"
            label="Số ngày nghỉ"
            value={data.quantity ?? 0.5}
            max={daysAllowedLeave.data?.quantity}
            required
            onChange={setData}
          />
        </div>
        <TextArea
          keyValue="reason"
          value={data.reason ?? ""}
          onChange={setData}
        />
      </div>
    );
  };

  return (
    <ModalCustom
      isModalVisible={isModalVisible}
      handleOk={handleConfirmCreate}
      handleCancel={toggleModal}
      title="Tạo đơn xin nghỉ phép"
      content={renderContent()}
    />
  );
}
