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
      title: "B???n c?? mu???n x??a ????n xin ngh??? ph??p?",
      content: "????n xin ngh??? ph??p s??? b??? x??a v??nh vi???n!",
      okType: "primary",
      cancelText: "Hu???",
      okText: "X??a",
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
      title: "B???n mu???n ch???p nh???n ????n xin ngh??? ph??p?",
      okType: "primary",
      cancelText: "H???y",
      okText: "X??c nh???n",
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
      title: "H??? t??n",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
      render: (_, record) => <div>{record.user?.fullName}</div>,
    },
    {
      title: "???nh",
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
      title: "Ng??y b???t ?????u ngh???",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
      render: (date) => <>{moment(new Date(date)).format("DD-MM-YYYY")}</>,
    },
    {
      title: "S??? ng??y ngh???",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "L?? do",
      dataIndex: "reason",
      key: "reason",
      align: "center",
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (state) =>
        state === 0
          ? "??ang ch??? duy???t"
          : state === 1
          ? "???? ch???p nh???n"
          : "B??? t??? ch???i",
    },
    {
      title: "H??nh ?????ng",
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
      title: "Ng??y b???t ?????u ngh???",
      dataIndex: "startDate",
      key: "startDate",
      align: "center",
      render: (date) => <>{moment(new Date(date)).format("DD-MM-YYYY")}</>,
    },
    {
      title: "S??? ng??y ngh???",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "L?? do",
      dataIndex: "reason",
      key: "reason",
      align: "center",
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "state",
      key: "state",
      align: "center",
      render: (state) =>
        state === 0
          ? "??ang ch??? duy???t"
          : state === 1
          ? "???? ch???p nh???n"
          : "B??? t??? ch???i",
    },
    {
      title: "H??nh ?????ng",
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
            T???o ????n xin ngh??? ph??p
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
