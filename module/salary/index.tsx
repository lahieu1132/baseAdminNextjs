import "./index.scss";
import {Select, Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useState} from "react";
import {IDataSalary} from "@app/types";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import baseURL from "@app/config/baseURL";
import Config from "@app/config";
import ApiSalary from "@app/api/ApiSalary";
import {formatNumber} from "@app/utils/fomat/FormatNumber";

export function Salary(): JSX.Element {
  const router = useRouter();
  const date = new Date();
  const [year, setYear] = useState<number>(date.getFullYear());

  const getListTotalSalary = (): Promise<any> => {
    return ApiSalary.getMyListTotalSalary(year);
  };

  const {data} = useQuery("listTotalSalaryUser", getListTotalSalary) || [];

  const dataYear = (): JSX.Element => {
    const year = [];
    for (let i = Config.NOW.YEAR; i <= date.getFullYear(); i++) {
      year.push(i);
    }
    return (
      <>
        {year.map((el, index) => (
          <Select.Option key={index} value={el}>
            {el}
          </Select.Option>
        ))}
      </>
    );
  };

  const onRow = (record: IDataSalary): {onDoubleClick: () => void} => {
    const month = new Date(record.date || "");
    return {
      onDoubleClick: (): void => {
        router.push({
          pathname: baseURL.SALARY.SALARY_DETAIL,
          query: {
            month: month.getMonth() + 1,
            year: year,
          },
        });
      },
    };
  };

  const columns: ColumnsType<IDataSalary> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Tháng",
      dataIndex: "createdAt",
      key: "month",
      align: "center",
      render: (_, record, index) => {
        const date = new Date(record.date || "");
        console.log(date);
        return <div>{formatNumber(date.getMonth() + 1)}</div>;
      },
    },
    {
      title: "Thưởng dự án",
      dataIndex: "projectSalary",
      key: "fullName",
      align: "center",
      render: (_, record, index) => (
        <div>{record.projectSalary.toLocaleString()}</div>
      ),
    },
    {
      title: "Lương làm thêm",
      dataIndex: "overtimeSalary",
      key: "overtimeSalary",
      align: "center",
      render: (_, record, index) => (
        <div>{record.overtimeSalary.toLocaleString()}</div>
      ),
    },
    {
      title: "Lương Onsite",
      dataIndex: "onsiteSalary",
      key: "onsiteSalary",
      align: "center",
      render: (_, record, index) => (
        <div>{record.onsiteSalary.toLocaleString()}</div>
      ),
    },
    {
      title: "Lương cứng",
      dataIndex: "baseSalary",
      key: "baseSalary",
      align: "center",
      render: (_, record, index) => (
        <div>{record.baseSalary.toLocaleString()}</div>
      ),
    },
    {
      title: "Lương khấu trừ",
      dataIndex: "deductionSalary",
      key: "deductionSalary",
      align: "center",
      render: (_, record, index) => (
        <div>{record.deductionSalary.toLocaleString()}</div>
      ),
    },
    {
      title: "Tổng lương",
      dataIndex: "totalSalary",
      key: "totalSalary",
      align: "center",
      render: (_, record, index) => (
        <div>{record.totalSalary.toLocaleString()} VND</div>
      ),
    },
  ];

  return (
    <div>
      <Select
        defaultValue={date.getFullYear().toString()}
        style={{width: 120}}
        onChange={(e) => setYear(Number(e))}
      >
        {dataYear()}
      </Select>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        className="hover-pointer mt-4"
        onRow={onRow}
      />
    </div>
  );
}
