import "./index.scss";
import React from "react";
import {Card, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {IDataDeductionDay} from "@app/types";
import ApiSalary from "@app/api/ApiSalary";
import {useQuery} from "react-query";
import ApiUser from "@app/api/ApiUser";

export default function DeductionSalaryTable({
  month,
  year,
}: {
  month: number;
  year: number;
}): JSX.Element {
  const baseSalary = Number(ApiUser.getInfoMe()?.baseSalary) || 0;

  const getDeductionSalary = (): Promise<IDataDeductionDay[]> => {
    return ApiSalary.getMyDeductionDaySalary(year, month);
  };

  const {data: dataDeduction} =
    useQuery("deductionSalary", getDeductionSalary) || [];

  const getDeductionHourSalary = (): Promise<IDataDeductionDay[]> => {
    return ApiSalary.getMyDeductionHourSalary(year, month);
  };

  const {data: dataDeductionHour} =
    useQuery("deductionHourSalary", getDeductionHourSalary) || [];

  const columns: ColumnsType<IDataDeductionDay> = [
    {
      title: "Ngày nghỉ",
      dataIndex: "dayOffWork",
      key: "dayOffWork",
      align: "center",
      render: (_, record, index) => (
        <div>{(record?.dayOffWork || "") + " (" + record.date + ")"}</div>
      ),
    },
    {
      title: "số tiền trừ",
      dataIndex: "deductionSalaryDay",
      key: "deductionSalaryDay",
      align: "center",
      render: (_, record, index) => (
        <div>{record?.deductionSalaryDay?.toLocaleString()} VND</div>
      ),
    },
  ];

  const columns2: ColumnsType<IDataDeductionDay> = [
    {
      title: "giờ đi muộn",
      dataIndex: "hourLateWork",
      key: "hourLateWork",
      align: "center",
    },
    {
      title: "số tiền trừ",
      dataIndex: "deductionSalaryHour",
      key: "deductionSalaryHour",
      align: "center",
      render: (_, record, index) => (
        <div>{record?.deductionSalaryHour?.toLocaleString()} VND</div>
      ),
    },
  ];

  const data: IDataDeductionDay[] =
    dataDeduction?.map((el) => {
      return {
        date: el?.date,
        dayOffWork: el?.dayOffWork,
        deductionSalaryDay: (Number(el?.dayOffWork || 0) * baseSalary) / 24,
      };
    }) || [];
  const data2: IDataDeductionDay[] =
    dataDeductionHour?.map((el) => {
      return {
        date: el?.date,
        hourLateWork: el?.hourLateWork,
        deductionSalaryHour:
          (Number(el?.hourLateWork || 0) * baseSalary) / 24 / 8,
      };
    }) || [];

  return (
    <Card className="w-full">
      <div className="mb-4 font-bold">Lương khấu trừ :</div>
      <div className="flex">
        <Table
          className="w-full"
          columns={columns}
          dataSource={data || []}
          bordered
          pagination={false}
        />
        <Table
          className="w-full ml-4"
          columns={columns2}
          dataSource={data2 || []}
          bordered
          pagination={false}
        />
      </div>
    </Card>
  );
}
