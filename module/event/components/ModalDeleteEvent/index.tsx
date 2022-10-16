import {ModalCustom} from "@app/components/ModalCustom";
import React from "react";
import moment from "moment";
import {IEvent} from "@app/types";
import {useMutation} from "react-query";
import ApiEvent from "@app/api/ApiEvent";
import {Table} from "antd";

interface ModalDeleteEventProps {
  isModalVisible: boolean;
  toggleModal: () => void;
  dataRefetch: () => void;
  dataEvent?: IEvent[];
}

export function ModalDeleteEvent({
  isModalVisible,
  toggleModal,
  dataRefetch,
  dataEvent,
}: ModalDeleteEventProps): JSX.Element {
  const deleteEventMutation = useMutation(ApiEvent.deleteEvent);
  const handleDeleteEvent = (id: number): void => {
    deleteEventMutation.mutate(id, {
      onSuccess: () => {
        toggleModal();
        dataRefetch();
      },
      // onError: () => {
      //   //todo
      // },
    });
  };

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-delete-event">
        <Table
          columns={[
            {
              title: "STT",
              dataIndex: "index",
              key: "index",
              align: "center",
              render: (_, record, index) => <div>{index + 1}</div>,
            },
            {
              title: "Ngày bắt đầu",
              dataIndex: "startDate",
              key: "startDate",
              align: "center",
              render: (date) => moment(new Date(date)).format("DD-MM-YYYY"),
            },
            {
              title: "Ngày kết thúc",
              dataIndex: "endDate",
              key: "endDate",
              align: "center",
              render: (date) => moment(new Date(date)).format("DD-MM-YYYY"),
            },
            {
              title: "Tiêu đề",
              dataIndex: "title",
              key: "title",
              align: "center",
            },
            {
              title: "Trạng thái",
              dataIndex: "state",
              key: "state",
              align: "center",
              render: (_, record) => (
                <button
                  className="btn-primary"
                  type="button"
                  onClick={(): void => {
                    if (record.id) {
                      handleDeleteEvent(record.id);
                    }
                  }}
                >
                  Delete
                </button>
              ),
            },
          ]}
          dataSource={dataEvent}
          bordered
        />
      </div>
    );
  };

  return (
    <ModalCustom
      isModalVisible={isModalVisible}
      handleCancel={toggleModal}
      title="Xóa sự kiện"
      content={renderContent()}
      footer={null}
    />
  );
}
