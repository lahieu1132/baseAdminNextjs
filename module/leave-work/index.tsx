import "./index.scss";
import {Button, Image, Modal, Table} from "antd";
import React, {useEffect, useMemo, useState} from "react";
import type {ColumnsType} from "antd/es/table";
import Icon from "@app/components/Icon/Icon";
import moment from "moment";
import ApiLeaveWork from "@app/api/ApiLeaveWork";
import {ILeaveWork} from "@app/types";
import {useMutation, useQuery} from "react-query";
import {IRootState} from "@app/redux/store";
import {useSelector} from "react-redux";
import {ModalCreateLeaveWork} from "@app/module/leave-work/components/ModalCreateLeaveWork";
import {ModalRefuseLeaveWork} from "@app/module/leave-work/components/ModalRefuseLeaveWork";
import {FilterLeaveWork} from "@app/module/leave-work/components/FilterLeaveWork";

export function LeaveWork(): JSX.Element {
  const role = useSelector((state: IRootState) => state.user.role);
  const userId = useSelector((state: IRootState) => state.user.user?.id);
  const [refuseWorkLeaveId, setRefuseWorkLeaveId] = useState<
    number | undefined
  >();
  const [isModalVisible, setIsModalVisible] = useState("");
  const [filterState, setFilterState] = useState<number[]>([0, 1, 2]);
  const [filterYear, setFilterYear] = useState<number>(moment().year());
  const [filterMonth, setFilterMonth] = useState<number>(moment().month() + 1);

  const getDate = useMemo(() => {
    return filterMonth < 10
      ? [
          `${filterYear}-0${filterMonth}-01`,
          `${filterYear}-0${filterMonth}-${moment(
            `${filterYear}-0${filterMonth}-01`
          ).daysInMonth()}`,
        ]
      : [
          `${filterYear}-${filterMonth}-01`,
          `${filterYear}-${filterMonth}-${moment(
            `${filterYear}-${filterMonth}-01`
          ).daysInMonth()}`,
        ];
  }, [filterYear, filterMonth]);

  const showModalCreateLeaveWork = (): void => {
    setIsModalVisible("modalCreateLeaveWork");
  };

  const showModalRefuseLeaveWork = (): void => {
    setIsModalVisible("refuseLeaveWork");
  };

  const toggleModal = (): void => {
    setIsModalVisible("");
  };

  const getLeaveWork = (): Promise<ILeaveWork[]> => {
    return ApiLeaveWork.getLeaveWork({
      pageSize: 30,
      pageNumber: 1,
      filter: {
        state_IN: filterState,
        createdAt_RANGE: getDate,
      },
    });
  };
  const dataLeaveWork = useQuery("listLeaveWork", getLeaveWork);

  const dataRefetch = (): void => {
    dataLeaveWork.refetch();
  };

  useEffect(() => {
    dataRefetch();
  }, [filterState, filterYear, filterMonth]);

  const dataAdmin = dataLeaveWork.data;
  const dataUser = dataAdmin?.filter((item) => item.user?.id === userId);

  const deleteLeaveWorkMutation = useMutation(ApiLeaveWork.deleteLeaveWork);
  const handleDeleteLeaveWork = (record: ILeaveWork): void => {
    Modal.confirm({
      title: "Bạn có muốn xóa đơn xin nghỉ phép?",
      content: "Đơn xin nghỉ phép sẽ bị xóa vĩnh viễn!",
      okType: "primary",
      cancelText: "Huỷ",
      okText: "Xóa",
      onOk: () => {
        if (record.id) {
          deleteLeaveWorkMutation.mutate(record.id, {
            onSuccess: () => {
              dataLeaveWork.refetch();
            },
            // onError: () => {
            //   //todo
            // },
          });
        }
      },
    });
  };

  const approvalLeaveWorkMutation = useMutation(ApiLeaveWork.approvalLeaveWork);
  const handleApprovalLeaveWork = (record: ILeaveWork): void => {
    Modal.confirm({
      title: "Bạn muốn chấp nhận đơn xin nghỉ phép?",
      okType: "primary",
      cancelText: "Hủy",
      okText: "Xác nhận",
      onOk: () => {
        if (record.id) {
          approvalLeaveWorkMutation.mutate(record.id, {
            onSuccess: () => {
              dataLeaveWork.refetch();
            },
            // onError: () => {
            //   //todo
            // },
          });
        }
      },
    });
  };

  const columnsAdmin: ColumnsType<ILeaveWork> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      render: (_, record) => <div>{record.user?.fullName}</div>,
    },
    {
      title: "Ảnh",
      dataIndex: "avatar",
      key: "avatar",
      align: "center",
      width: 80,
      render: (url) => (
        <div>
          <Image src={url ?? "/img/avatar/avatar.jpg"} />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
      render: (_, record) => <div>{record.user?.email}</div>,
    },
    {
      title: "Ngày bắt đầu nghỉ",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
      render: (date) => <>{moment(new Date(date)).format("DD-MM-YYYY")}</>,
    },
    {
      title: "Số ngày nghỉ",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (state) =>
        state === 0
          ? "Đang chờ duyệt"
          : state === 1
          ? "Đã chấp nhận"
          : "Bị từ chối",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record): JSX.Element =>
        record.state === 0 ? (
          <div>
            <Button
              className="mr-1"
              onClick={(): void => {
                handleApprovalLeaveWork(record);
              }}
              icon={<Icon icon="Accept" size={20} />}
            />
            <Button
              className="mr-1"
              onClick={(): void => {
                showModalRefuseLeaveWork();
                setRefuseWorkLeaveId(record.id);
              }}
              icon={<Icon icon="CloseRed" size={20} />}
            />
          </div>
        ) : (
          <div />
        ),
    },
  ];

  const columnsUser: ColumnsType<ILeaveWork> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Ngày bắt đầu nghỉ",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
      render: (date) => <>{moment(new Date(date)).format("DD-MM-YYYY")}</>,
    },
    {
      title: "Số ngày nghỉ",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Lý do",
      dataIndex: "reason",
      key: "reason",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (state) =>
        state === 0
          ? "Đang chờ duyệt"
          : state === 1
          ? "Đã chấp nhận"
          : "Bị từ chối",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record): JSX.Element =>
        record.state === 0 ? (
          <div>
            <Button
              className="mr-1"
              onClick={(): void => {
                handleDeleteLeaveWork(record);
              }}
              icon={<Icon icon="CloseRed" size={20} />}
            />
          </div>
        ) : (
          <div />
        ),
    },
  ];

  return (
    <div className="container">
      <div className="flex justify-between mb-5">
        <FilterLeaveWork
          setFilterState={setFilterState}
          setFilterYear={setFilterYear}
          setFilterMonth={setFilterMonth}
        />
        {!role ? (
          <Button
            className="btn-primary"
            type="primary"
            onClick={(): void => {
              showModalCreateLeaveWork();
            }}
          >
            Tạo đơn xin nghỉ phép
          </Button>
        ) : null}
      </div>
      {role ? (
        <Table columns={columnsAdmin} bordered dataSource={dataAdmin} />
      ) : (
        <Table columns={columnsUser} bordered dataSource={dataUser} />
      )}
      <ModalCreateLeaveWork
        isModalVisible={isModalVisible === "modalCreateLeaveWork"}
        toggleModal={toggleModal}
        dataRefetch={dataRefetch}
      />
      <ModalRefuseLeaveWork
        isModalVisible={isModalVisible === "refuseLeaveWork"}
        toggleModal={toggleModal}
        refuseWorkLeaveId={refuseWorkLeaveId}
        dataRefetch={dataRefetch}
      />
    </div>
  );
}
