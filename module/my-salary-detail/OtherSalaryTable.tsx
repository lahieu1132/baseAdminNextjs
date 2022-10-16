import "./index.scss";
import React from "react";
import {Card, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {IDataBonus} from "@app/types";
import ApiSalary from "@app/api/ApiSalary";
import {useQuery} from "react-query";

export default function OtherSalaryTable({
  month,
  year,
}: {
  month: number;
  year: number;
}): JSX.Element {
  const getBonusSalary = (): Promise<IDataBonus[]> => {
    return ApiSalary.getMyBonusSalary(year, month);
  };

  const {data: datBonus} = useQuery("bonusSalary", getBonusSalary) || [];
  const columns: ColumnsType<IDataBonus> = [
    {
      title: "Số tiền",
      dataIndex: "salary",
      key: "salary",
      align: "center",
      render: (_, record, index) => (
        <div>{record?.salary?.toLocaleString()}</div>
      ),
    },
    {
      title: "lý do",
      dataIndex: "reason",
      key: "reason",
      align: "center",
    },
  ];

  const data: IDataBonus[] =
    datBonus?.map((el) => {
      return {salary: el?.salary, reason: el?.reason};
    }) || [];

  return (
    <Card className="w-full">
      <div className="mb-4 font-bold">Lương Khác :</div>
      <Table
        columns={columns}
        dataSource={data || []}
        bordered
        pagination={false}
      />
    </Card>
  );
}
