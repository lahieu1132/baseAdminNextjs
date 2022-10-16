import "./index.scss";
import React from "react";
import {Card, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {IDataProject} from "@app/types";
import ApiSalary from "@app/api/ApiSalary";
import {useQuery} from "react-query";

export default function ProjectSalaryTable({
  month,
  year,
}: {
  month: number;
  year: number;
}): JSX.Element {
  const getProjectSalary = (): Promise<IDataProject[]> => {
    return ApiSalary.getMyProjectSalary(year, month);
  };

  const {data: dataProject} = useQuery("projectSalary", getProjectSalary) || [];
  const columns: ColumnsType<IDataProject> = [
    {
      title: "Dự án",
      dataIndex: "projectName",
      key: "projectName",
      align: "center",
    },
    {
      title: "Lương thưởng dự án",
      dataIndex: "salary",
      key: "salary",
      align: "center",
    },
  ];

  const data: IDataProject[] =
    dataProject?.map((el) => {
      return {salary: el?.salary, reason: el?.projectName};
    }) || [];
  return (
    <Card className="w-full">
      <div className="mb-4 font-bold">Lương dự án :</div>
      <Table columns={columns} dataSource={data} bordered pagination={false} />
    </Card>
  );
}
