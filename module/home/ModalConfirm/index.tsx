import "./index.scss";
import {ModalCustom} from "@app/components/ModalCustom";
import {Image} from "antd";
import React, {useState} from "react";
import {InputModal} from "@app/components/Modal/InputModal";
import {SelectInput} from "@app/components/Modal/SelectInput";

interface ModalInfoProps {
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export function ModalInfo(props: ModalInfoProps): JSX.Element {
  const {isModalVisible, handleOk, handleCancel} = props;

  const [adString, setAdString] = useState({fullName: "", position: 1});

  const initData = [
    {
      label: "Nhân viên part time",
      value: 1,
    },
    {
      label: "Nhân viên mới",
      value: 2,
    },
  ];

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-info">
        <div className="avatar-container">
          <Image
            src="img/logo.png"
            height="15vh"
            width="15vh"
            preview={false}
          />
        </div>
        <InputModal
          label="Họ và tên"
          value={adString.fullName}
          onChange={setAdString}
          keyValue="fullName"
          placeholder="Nguyễn Văn A"
          className="pt-12"
        />
        <SelectInput
          className="pt-12"
          label="Chức vụ"
          keyValue="position"
          setValue={setAdString}
          value={adString.position}
          data={initData}
        />
      </div>
    );
  };

  return (
    <ModalCustom
      isModalVisible={isModalVisible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      title="Thông tin nhân viên"
      content={renderContent()}
    />
  );
}
