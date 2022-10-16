import {ModalCustom} from "@app/components/ModalCustom";
import React, {useEffect, useState} from "react";
import {InputModal} from "@app/components/Modal/InputModal";
import {TextArea} from "@app/components/Modal/TextArea";
import {useMutation} from "react-query";
import ApiPosition, {IPositionBody} from "@app/api/ApiPosition";
import {notification} from "antd";
import {IPosition} from "@app/types";

interface ModalEditPositionProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  dataRefetch: () => void;
  positionId?: number;
  dataPosition?: IPosition[];
}

export function ModalEditPosition({
  isModalVisible,
  toggleModal,
  dataRefetch,
  positionId,
  dataPosition,
}: ModalEditPositionProps): JSX.Element {
  const [data, setData] = useState<IPositionBody>({
    name: "",
    description: "",
  });

  useEffect(() => {
    const positionById = dataPosition?.find((item) => item.id === positionId);
    setData({
      name: positionById?.name,
      description: positionById?.description,
    });
  }, [positionId]);

  const editPositionMutation = useMutation(ApiPosition.editPosition);
  const handleEditPositon = (values: IPositionBody): void => {
    editPositionMutation.mutate(
      {
        id: positionId,
        name: values.name,
        description: values.description,
      },
      {
        onSuccess: () => {
          notification.success({
            duration: 1,
            message: "Sửa chức vụ thành công!",
          });
          toggleModal();
          dataRefetch();
        },
        onError: () => {
          notification.error({
            duration: 1,
            message: "Sửa chức vụ thất bại!",
          });
        },
      }
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-edit-Position">
        <InputModal
          className="mb-5"
          keyValue="name"
          label="Tên chức vụ"
          placeholder="Tên chức vụ"
          value={data?.name ?? ""}
          onChange={setData}
          required
        />
        <TextArea
          keyValue="description"
          label="Mô tả"
          placeholder="Mô tả"
          value={data?.description ?? ""}
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
        handleEditPositon(data);
      }}
      handleCancel={toggleModal}
      title="Thêm chức vụ"
      content={renderContent()}
    />
  );
}
