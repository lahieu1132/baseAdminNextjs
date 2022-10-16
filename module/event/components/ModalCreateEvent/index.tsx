import {ModalCustom} from "@app/components/ModalCustom";
import React, {useState} from "react";
import {DateInput} from "@app/components/Modal/DateInput";
import {InputModal} from "@app/components/Modal/InputModal";
import {TextArea} from "@app/components/Modal/TextArea";
import moment from "moment";
import {useMutation} from "react-query";
import ApiEvent, {IEventBody} from "@app/api/ApiEvent";

interface ModalCreateEventProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  dataRefetch: () => void;
}

export function ModalCreateEvent({
  isModalVisible,
  toggleModal,
  dataRefetch,
}: ModalCreateEventProps): JSX.Element {
  const [data, setData] = useState<IEventBody>({
    startDate: "",
    endDate: "",
    title: "",
    content: "",
  });

  const createEventMutation = useMutation(ApiEvent.createEvent);
  const handleCreateLeaveWork = (values: IEventBody): void => {
    createEventMutation.mutate(
      {
        startDate: values.startDate,
        endDate: values.endDate,
        title: values.title,
        content: values.content,
      },
      {
        onSuccess: () => {
          setData({
            startDate: "",
            endDate: "",
            title: "",
            content: "",
          });
          toggleModal();
          dataRefetch();
        },
        // onError: () => {
        //   //todo
        // },
      }
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-create-event">
        <div className="flex mb-5">
          <DateInput
            className="mr-10 w-52"
            keyValue="startDate"
            label="Ngày bắt đầu sự kiện"
            value={data.startDate ?? ""}
            required
            onChange={setData}
          />
          <DateInput
            className="w-52"
            keyValue="endDate"
            label="Ngày kết thúc sự kiện"
            value={data.endDate ?? ""}
            required
            isErrored={
              moment(data.startDate).valueOf() > moment(data.endDate).valueOf()
            }
            onChange={setData}
          />
        </div>
        <InputModal
          className="mb-5"
          keyValue="title"
          label="Tiêu đề"
          placeholder="Tiêu đề"
          onChange={setData}
          value={data.title ?? ""}
          required
        />
        <TextArea
          keyValue="content"
          label="Nội dung"
          placeholder="Nội dung"
          value={data.content ?? ""}
          onChange={setData}
          required
        />
      </div>
    );
  };

  return (
    <ModalCustom
      isModalVisible={isModalVisible}
      handleOk={(): void => {
        handleCreateLeaveWork(data);
      }}
      handleCancel={toggleModal}
      title="Thêm sự kiện"
      content={renderContent()}
    />
  );
}
