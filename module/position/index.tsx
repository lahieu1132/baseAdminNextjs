import "./index.scss";
import React, {useEffect, useState} from "react";
import {Button, Modal, notification, Table} from "antd";
import {IPosition} from "@app/types";
import ApiPosition from "@app/api/ApiPosition";
import {useMutation, useQuery} from "react-query";
import Icon from "@app/components/Icon/Icon";
import {ModalCreatePosition} from "@app/module/position/components/ModalCreatePosition";
import {ModalEditPosition} from "@app/module/position/components/ModalEditPosition";

export function Position(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState("");
  const [positionId, setPositionId] = useState<number | undefined>();

  const showModalCreatePosition = (): void => {
    setIsModalVisible("modalCreatePosition");
  };

  const showModalEditPosition = (): void => {
    setIsModalVisible("modalEditPosition");
  };

  const toggleModal = (): void => {
    setIsModalVisible("");
  };

  const getPosition = (): Promise<IPosition[]> => {
    return ApiPosition.getPosition();
  };
  const dataPosition = useQuery("listPosition", getPosition);

  const dataRefetch = (): void => {
    dataPosition.refetch();
  };

  useEffect(() => {
    dataRefetch();
  }, []);

  const deletePositionMutation = useMutation(ApiPosition.deletePosition);
  const handleDeletePosition = (record: IPosition): void => {
    Modal.confirm({
      title: "Bạn có muốn xóa chức vụ?",
      content: "Chức vụ sẽ bị xóa vĩnh viễn!",
      okType: "primary",
      cancelText: "Huỷ",
      okText: "Xóa",
      onOk: () => {
        if (record.id) {
          deletePositionMutation.mutate(record.id, {
            onSuccess: () => {
              notification.success({
                duration: 1,
                message: "Xóa chức vụ thành công!",
              });
              dataRefetch();
            },
            onError: () => {
              notification.error({
                duration: 1,
                message: "Xóa chức vụ thất bại!",
              });
            },
          });
        }
      },
    });
  };

  return (
    <div className="container">
      <div className="mb-5 flex justify-end">
        <Button className="btn-primary w-48" onClick={showModalCreatePosition}>
          Thêm chức vụ
        </Button>
      </div>
      <Table
        columns={[
          {
            title: "STT",
            dataIndex: "index",
            key: "index",
            align: "center",
            render: (_, __, index) => <div>{index + 1}</div>,
          },
          {
            title: "Chức vụ",
            dataIndex: "name",
            key: "name",
            align: "center",
          },
          {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            align: "center",
          },
          {
            title: "Hành động",
            align: "center",
            render: (_, record) => (
              <>
                <Button
                  className="mr-2"
                  icon={<Icon icon="Edit" size={20} color="#0092ff" />}
                  onClick={(): void => {
                    setPositionId(record.id);
                    showModalEditPosition();
                  }}
                />
                <Button
                  icon={<Icon icon="Delete" size={20} color="#cb2131" />}
                  onClick={(): void => handleDeletePosition(record)}
                />
              </>
            ),
          },
        ]}
        dataSource={dataPosition.data}
        bordered
      />
      <ModalCreatePosition
        isModalVisible={isModalVisible === "modalCreatePosition"}
        toggleModal={toggleModal}
        dataRefetch={dataRefetch}
      />
      <ModalEditPosition
        isModalVisible={isModalVisible === "modalEditPosition"}
        toggleModal={toggleModal}
        dataRefetch={dataRefetch}
        positionId={positionId}
        dataPosition={dataPosition.data}
      />
    </div>
  );
}
