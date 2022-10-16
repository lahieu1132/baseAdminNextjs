import "./index.scss";
import React, {useEffect, useState} from "react";
import {Button, Modal, notification, Table} from "antd";
import {IWorkType} from "@app/types";
import ApiWorkType, {IWorkTypeWithMeta} from "@app/api/ApiWorkType";
import {useMutation, useQuery} from "react-query";
import Icon from "@app/components/Icon/Icon";
import {ModalCreateWorkType} from "@app/module/work-type/components/ModalCreateWorkType";
import {ModalEditWorkType} from "@app/module/work-type/components/ModalEditWorkType";

export function WorkType(): JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState("");
  const [WorkTypeId, setWorkTypeId] = useState<number | undefined>();
  const [pageSize, setPageSize] = useState<number>(50);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const showModalCreateWorkType = (): void => {
    setIsModalVisible("modalCreateWorkType");
  };

  const showModalEditWorkType = (): void => {
    setIsModalVisible("modalEditWorkType");
  };

  const toggleModal = (): void => {
    setIsModalVisible("");
  };

  const getWorkType = (): Promise<IWorkTypeWithMeta> => {
    return ApiWorkType.getWorkType({
      pageSize: pageSize,
      pageNumber: pageNumber,
    });
  };
  const dataWorkType = useQuery("listWorkType", getWorkType);

  const dataRefetch = (): void => {
    dataWorkType.refetch();
  };

  useEffect(() => {
    dataRefetch();
  }, [pageSize, pageNumber]);

  const deleteWorkTypeMutation = useMutation(ApiWorkType.deleteWorkType);
  const handleDeleteWorkType = (record: IWorkType): void => {
    Modal.confirm({
      title: "Bạn có muốn xóa chức vụ?",
      content: "Chức vụ sẽ bị xóa vĩnh viễn!",
      okType: "primary",
      cancelText: "Huỷ",
      okText: "Xóa",
      onOk: () => {
        if (record.id) {
          deleteWorkTypeMutation.mutate(record.id, {
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
        <Button className="btn-primary w-48" onClick={showModalCreateWorkType}>
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
            width: 100,
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
            width: 200,
            render: (_, record) => (
              <>
                <Button
                  className="mr-2"
                  icon={<Icon icon="Edit" size={20} color="#0092ff" />}
                  onClick={(): void => {
                    setWorkTypeId(record.id);
                    showModalEditWorkType();
                  }}
                />
                <Button
                  icon={<Icon icon="Delete" size={20} color="#cb2131" />}
                  onClick={(): void => handleDeleteWorkType(record)}
                />
              </>
            ),
          },
        ]}
        dataSource={dataWorkType.data?.data}
        bordered
        pagination={{
          total: dataWorkType.data?.meta.totalItems,
          defaultPageSize: 50,
          showSizeChanger: true,
          pageSizeOptions: ["50", "100", "150", "200"],
          onChange: (page, numberPerPage): void => {
            setPageNumber(page);
            setPageSize(numberPerPage);
          },
        }}
      />
      <ModalCreateWorkType
        isModalVisible={isModalVisible === "modalCreateWorkType"}
        toggleModal={toggleModal}
        dataRefetch={dataRefetch}
      />
      <ModalEditWorkType
        isModalVisible={isModalVisible === "modalEditWorkType"}
        toggleModal={toggleModal}
        dataRefetch={dataRefetch}
        workTypeId={WorkTypeId}
        dataWorkType={dataWorkType.data?.data}
      />
    </div>
  );
}
