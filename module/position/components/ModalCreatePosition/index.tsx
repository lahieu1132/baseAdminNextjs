import {ModalCustom} from "@app/components/ModalCustom";
import React, {useState} from "react";
import {InputModal} from "@app/components/Modal/InputModal";
import {TextArea} from "@app/components/Modal/TextArea";
import {useMutation} from "react-query";
import ApiPosition, {IPositionBody} from "@app/api/ApiPosition";
import {notification} from "antd";

interface ModalCreatePositionProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  dataRefetch: () => void;
}

export function ModalCreatePosition({
  isModalVisible,
  toggleModal,
  dataRefetch,
}: ModalCreatePositionProps): JSX.Element {
  const [data, setData] = useState<IPositionBody>({
    name: "",
    description: "",
  });

  const createPositionMutation = useMutation(ApiPosition.createPosition);
  const handleCreatePositon = (values: IPositionBody): void => {
    createPositionMutation.mutate(
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
            message: "Thêm chức vụ thành công!",
          });
          toggleModal();
          dataRefetch();
        },
        onError: () => {
          notification.error({
            duration: 1,
            message: "Thêm chức vụ thất bại!",
          });
        },
      }
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-create-Position">
        <InputModal
          className="mb-5"
          keyValue="name"
          label="Tên chức vụ"
          placeholder="Tên chức vụ"
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
      title="Thêm chức vụ"
      content={renderContent()}
    />
  );
}
