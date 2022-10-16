import "./index.scss";
import {Button, Image, Modal, Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useEffect, useState} from "react";
import ApiUser from "@app/api/ApiUser";
import {IUserLogin} from "@app/types";
import {useQuery} from "react-query";
import Icon from "@app/components/Icon/Icon";
import {ModalInfo} from "@app/module/home/ModalConfirm";

export function Home(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (): void => {
    setIsModalVisible(true);
  };

  const handleOk = (): void => {
    setIsModalVisible(false);
  };

  const handleCancel = (): void => {
    setIsModalVisible(false);
  };

  const getUserAccount = (): Promise<IUserLogin[]> => {
    return ApiUser.getUserAccount({pageSize: 30, pageNumber: 1});
  };

  const dataUserAccount = useQuery("listUserAccount", getUserAccount);

  useEffect(() => {
    dataUserAccount.refetch();
  }, []);

  const handleUserAction = (record: IUserLogin): void => {
    Modal.confirm({
      title: `Bạn có muốn khoá tài khoản ${record.email}?`,
      content: `Tài khoản ${record.email} sẽ bị khoá`,
      okType: "primary",
      cancelText: "Huỷ",
      okText: "Khoá",
      onOk: () => {
        // todo
      },
    });
  };

  const onRow = (record: IUserLogin): {onDoubleClick: () => void} => {
    return {
      onDoubleClick: (): void => {
        showModal();
      },
    };
  };

  const columns: ColumnsType<IUserLogin> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Ảnh",
      key: "avatar",
      align: "center",
      width: 80,
      render: (url) => (
        <div>
          <Image src={url} fallback="img/avatar/avatar.jpg" />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Họ & Tên",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Quản lý",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Chức vụ",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "address",
      align: "center",
      key: "address",
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button
          className="mr-1"
          onClick={(): void => {
            handleUserAction(record);
          }}
          icon={<Icon icon="BlockUser" size={20} />}
        />
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataUserAccount.data}
        bordered
        onRow={onRow}
      />
      <ModalInfo
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </>
  );
}
