import "../my-salary-detail/index.scss";
import React, {useState} from "react";
import {Card, Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import {getDayOnMonth} from "@app/utils/date/getDayOnMonth";
import {findDayOnWeek} from "@app/utils/date/findDayOnWeek";
import ModalCreateOnsite from "./ModalCreateOnsite";
import {CheckCircleFilled, EditFilled} from "@ant-design/icons";
import ApiSalary from "@app/api/ApiSalary";
import {useQuery} from "react-query";
import {formatNumber} from "@app/utils/fomat/FormatNumber";
import {IDataOnsite} from "@app/types";

export default function OnsiteSalaryTable({
  idUser,
  month,
  year,
  isManager,
}: {
  idUser: number | string;
  isManager?: boolean;
  month: number;
  year: number;
}): JSX.Element {
  const [disableCheck, setDisableCheck] = useState(true);

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

  const getListOnsiteSalary = (): Promise<IDataOnsite[]> => {
    return ApiSalary.getMyListOnsiteSalary(year, month);
  };

  const {data: dataOnsite, refetch} =
    useQuery("listOnsiteSalaryUser", getListOnsiteSalary) || [];

  const handleUpdate = (): void => {
    //
  };

  const columns: ColumnsType<IDataOnsite[]> = [
    {
      title: (
        <>
          <EditFilled
            onClick={showModal}
            className="text-[20px] text-[#0092ff] mr-3"
          />
          {isManager && (
            <CheckCircleFilled
              className={
                disableCheck
                  ? "text-[20px] text-[#ADE597FF]"
                  : "text-[20px] text-[green]"
              }
              onClick={handleUpdate}
              disabled={disableCheck}
            />
          )}
        </>
      ),
      dataIndex: "col1",
      key: "col1",
      align: "center",
      width: "150px",
      fixed: "left",
    },
  ];

  const data: any = [
    {col1: "Ngày"},
    {col1: "Thứ"},
    {col1: "Tên dự án"},
    {col1: "Duyệt"},
  ];

  for (let i = 1; i <= getDayOnMonth(month, year); i++) {
    let check = 0;
    dataOnsite?.map((el) => {
      if (el.state === 0) {
        setDisableCheck(false);
      }
      if (
        el.date ===
        year + "-" + formatNumber(month) + "-" + formatNumber(i)
      ) {
        check++;
        columns.push({
          title: "",
          key: i,
          align: "center",
          width: "130px",
          render: (index, _item) => {
            if (index.col1 === "Ngày") {
              return <span>{i}</span>;
            }
            if (index.col1 === "Thứ") {
              return <span>{findDayOnWeek(year, month, i)}</span>;
            }
            if (index.col1 === "Tên dự án") {
              return <span>{el.onsitePlace}</span>;
            }
            return (
              <span
                className={
                  el.state === 0
                    ? "text-[#c4c2c2]"
                    : el.state === 1
                    ? "text-[#0092ff]"
                    : "text-[#cb2131]"
                }
              >
                {el.state === 0
                  ? "Chưa duyệt"
                  : el.state === 1
                  ? "Đã duyệt"
                  : "Đã huỷ"}
              </span>
            );
          },
        });
      }
      return el;
    });
    if (check === 0) {
      columns.push({
        title: "",
        key: i,
        align: "center",
        width: "130px",
        render: (index, _item) => {
          if (index.col1 === "Ngày") {
            return <span>{i}</span>;
          }
          if (index.col1 === "Thứ") {
            return <span>{findDayOnWeek(year, month, i)}</span>;
          }
          if (index.col1 === "Tên dự án") {
            return <span> </span>;
          }
          return <span> </span>;
        },
      });
    }
  }
  return (
    <Card className="max-w-full">
      <ModalCreateOnsite
        dataOnsite={dataOnsite || []}
        month={month}
        refetchDataOnsite={refetch}
        year={year}
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <div className="mb-4 font-bold">Lương Onsite :</div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        pagination={false}
        scroll={{x: "calc( 100vw - 292px)"}}
      />
    </Card>
  );
}
