import {ModalCustom} from "@app/components/ModalCustom";
import React, {useEffect, useState} from "react";
import {InputModal} from "@app/components/Modal/InputModal";
import {TextArea} from "@app/components/Modal/TextArea";
import {useMutation} from "react-query";
import ApiWorkType, {IWorkTypeBody} from "@app/api/ApiWorkType";
import {notification} from "antd";
import {IWorkType} from "@app/types";

interface ModalEditWorkTypeProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  dataRefetch: () => void;
  workTypeId?: number;
  dataWorkType?: IWorkType[];
}

export function ModalEditWorkType({
  isModalVisible,
  toggleModal,
  dataRefetch,
  workTypeId,
  dataWorkType,
}: ModalEditWorkTypeProps): JSX.Element {
  const [data, setData] = useState<IWorkTypeBody>({
    name: "",
    description: "",
  });

  useEffect(() => {
    const WorkTypeById = dataWorkType?.find((item) => item.id === workTypeId);
    setData({
      name: WorkTypeById?.name,
      description: WorkTypeById?.description,
    });
  }, [workTypeId]);

  const editWorkTypeMutation = useMutation(ApiWorkType.editWorkType);
  const handleEditPositon = (values: IWorkTypeBody): void => {
    editWorkTypeMutation.mutate(
      {
        id: workTypeId,
        name: values.name,
        description: values.description,
      },
      {
        onSuccess: () => {
          notification.success({
            duration: 1,
            message: "Sửa loại hình làm việc thành công!",
          });
          toggleModal();
          dataRefetch();
        },
        onError: () => {
          notification.error({
            duration: 1,
            message: "Sửa loại hình làm việc thất bại!",
          });
        },
      }
    );
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-edit-work-type">
        <InputModal
          className="mb-5"
          keyValue="name"
          label="Tên loại hình làm việc"
          placeholder="Tên loại hình làm việc"
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
      title="Thêm loại hình làm việc"
      content={renderContent()}
    />
  );
}
