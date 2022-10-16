import {ModalCustom} from "@app/components/ModalCustom";
import React, {useState} from "react";
import {InputModal} from "@app/components/Modal/InputModal";
import {TextArea} from "@app/components/Modal/TextArea";
import {useMutation} from "react-query";
import ApiWorkType, {IWorkTypeBody} from "@app/api/ApiWorkType";
import {notification} from "antd";

interface ModalCreateWorkTypeProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  dataRefetch: () => void;
}

export function ModalCreateWorkType({
  isModalVisible,
  toggleModal,
  dataRefetch,
}: ModalCreateWorkTypeProps): JSX.Element {
  const [data, setData] = useState<IWorkTypeBody>({
    name: "",
    description: "",
  });

  const createWorkTypeMutation = useMutation(ApiWorkType.createWorkType);
  const handleCreatePositon = (values: IWorkTypeBody): void => {
    createWorkTypeMutation.mutate(
      {
        name: values.name,
        description: values.description,
      },
      {
        onSuccess: () => {
          setData({
            name: "",
            description: "",
          });
          notification.success({
            duration: 1,
            message: "Thêm loại hình làm việc thành công!",
          });
          toggleModal();
          dataRefetch();
        },
        onError: () => {
          notification.error({
            duration: 1,
            message: "Thêm loại hình làm việc thất bại!",
          });
        },
      }
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-create-work-type">
        <InputModal
          className="mb-5"
          keyValue="name"
          label="Tên loại hình làm việc"
          placeholder="Tên loại hình làm việc"
          value={data.name ?? ""}
          onChange={setData}
          required
        />
        <TextArea
          keyValue="description"
          label="Mô tả"
          placeholder="Mô tả"
          value={data.description ?? ""}
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
        handleCreatePositon(data);
      }}
      handleCancel={toggleModal}
      title="Thêm loại hình làm việc"
      content={renderContent()}
    />
  );
}
