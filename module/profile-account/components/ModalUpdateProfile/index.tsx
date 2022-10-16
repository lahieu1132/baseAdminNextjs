import {ModalCustom} from "@app/components/ModalCustom";
import React, {useState} from "react";
import {Modal, notification} from "antd";
import {IUserLogin} from "@app/types";
import ApiUser, {IProfileBody} from "@app/api/ApiUser";
import {InputModal} from "@app/components/Modal/InputModal";
import {useMutation} from "react-query";

interface ModalUpdateProfile {
  setToggleModal: (value: boolean) => void;
  dataRefetch: () => void;
  dataProfile: IUserLogin;
}

export function ModalUpdateProfile({
  setToggleModal,
  dataRefetch,
  dataProfile,
}: ModalUpdateProfile): JSX.Element {
  const [data, setData] = useState<IProfileBody>({
    fullName: dataProfile?.fullName,
    email: dataProfile?.email,
    dateOfBirth: dataProfile?.dateOfBirth,
    personId: dataProfile?.personId,
    address: dataProfile?.address,
    phoneNumber: dataProfile?.phoneNumber,
    phoneNumberRelative: dataProfile?.phoneNumberRelative,
    gender: dataProfile?.gender,
  });

  const handleConfirmCreate = (): void => {
    Modal.confirm({
      title: "Xác nhận sửa thông tin nhân viên?",
      okType: "primary",
      okText: "Xác nhận",
      cancelText: "Huỷ",
      onOk: () => {
        handleUpdateProfile(data);
        setToggleModal(false);
      },
    });
  };

  const handleCancel = () => {
    setToggleModal(false);
  };

  const updateProfile = useMutation(ApiUser.updateMe, {
    onSuccess: (data) => {
      notification.success({
        duration: 1,
        message: `Sửa thành công`,
      });
      dataRefetch();
    },
    onError: () => {
      notification.error({
        duration: 1,
        message: `Sửa thất bại`,
      });
    },
  });
  const handleUpdateProfile = (values: IProfileBody): void => {
    updateProfile.mutate(values);
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-create-leave-work">
        <div className="mb-5">
          <div className="d-flex m-2">
            <InputModal
              label="Họ và tên"
              keyValue="fullName"
              className="input w-100x"
              value={data?.fullName || ""}
              onChange={setData}
              placeholder="Họ và tên"
            />
          </div>
          <div className="m-2 d-flex">
            <InputModal
              label="Số điện thoại"
              placeholder="Số điện thoại"
              keyValue="phoneNumber"
              className="input w-100x"
              value={data?.phoneNumber || ""}
              onChange={setData}
            />
          </div>
          <div className="m-2 d-flex">
            <InputModal
              label="Địa chỉ"
              placeholder="Địa chỉ"
              keyValue="address"
              className="input w-100x"
              value={data?.address || ""}
              onChange={setData}
            />
          </div>
          <div className="m-2 d-flex">
            <InputModal
              label="Ngày sinh"
              placeholder="Ngày sinh"
              keyValue="dateOfBirth"
              className="input w-100x"
              value={data?.dateOfBirth || ""}
              onChange={setData}
            />
          </div>
          <div className="m-2 d-flex">
            <InputModal
              label="Số CMND/CCCD"
              placeholder="Số CMND/CCCD"
              keyValue="personId"
              className="input w-100x"
              value={data?.personId?.toString() || ""}
              onChange={setData}
            />
          </div>
          <div className="m-2 d-flex">
            <InputModal
              label="Số điện thoại người thân"
              placeholder="Số điện thoại người thân"
              keyValue="phoneNumberRelative"
              className="input w-100x"
              value={data?.phoneNumberRelative || ""}
              onChange={setData}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <ModalCustom
      isModalVisible
      handleOk={handleConfirmCreate}
      handleCancel={handleCancel}
      title="Sửa thông tin nhân viên"
      content={renderContent()}
    />
  );
}
