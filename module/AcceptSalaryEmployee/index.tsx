import "./index.scss";
import {Select, Table} from "antd";
import type {ColumnsType} from "antd/es/table";
import React, {useState} from "react";
import {useQuery} from "react-query";
import {useRouter} from "next/router";
import baseURL from "@app/config/baseURL";
import Config from "@app/config";
import ApiSalary from "@app/api/ApiSalary";
import {IDataProjectList} from "@app/types";
import ApiUser from "@app/api/ApiUser";

export function AcceptSalaryEmployee(): JSX.Element {
  const router = useRouter();
  const date = new Date();
  const userId = ApiUser.getInfoMe()?.id;
  const [year, setYear] = useState<number>(date.getFullYear());
  const [idProject, setIdProject] = useState<string>();
  const [month, setMonth] = useState<number>(date.getMonth() + 1);

  const getListTotalSalary = (): Promise<any> => {
    return ApiSalary.getMyListTotalSalary(year);
  };

  const getListProject = (): Promise<IDataProjectList[]> => {
    return ApiSalary.getListProject();
  };

  const {data: listProject} = useQuery("listProject", getListProject) || [];

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

  const dataMonth = (): JSX.Element => {
    const month = [];
    for (
      let i = Config.NOW.YEAR === date.getFullYear() ? Config.NOW.Month : 1;
      i <= date.getMonth() + 1;
      i++
    ) {
      month.push(i);
    }
    return (
      <>
        {month.map((el, index) => (
          <Select.Option key={index} value={el}>
            {el}
          </Select.Option>
        ))}
      </>
    );
  };

  const onRow = (record: any): {onDoubleClick: () => void} => {
    return {
      onDoubleClick: (): void => {
        router.push({
          pathname: baseURL.SALARY.ACCEPT_SALARY_DETAIL,
          query: {
            month: month,
            year: year,
            idUser: idProject,
          },
        });
      },
    };
  };

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      align: "center",
      render: (_, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Tên nhân viên",
      dataIndex: "nameEmployee",
      key: "month",
      align: "center",
    },
    {
      title: "Số ngày Onsite",
      dataIndex: "totalDayOnsite",
      key: "totalDayOnsite",
      align: "center",
    },
    {
      title: "Số giờ OT",
      dataIndex: "totalHourOT",
      key: "totalHourOT",
      align: "center",
    },
  ];

  return (
    <div>
      <div className="flex items-end">
        <span className="text-[15px] font-medium mr-2">Dự án : </span>
        <Select style={{width: 120}} onChange={(e) => setIdProject(e)}>
          {listProject?.map((el, index) =>
            el?.projectManager?.id === userId ? (
              <Select.Option key={index} value={el?.id}>
                {el?.name}
              </Select.Option>
            ) : null
          )}
        </Select>
        <span className="text-[15px] font-medium mr-2 ml-4">Tháng : </span>
        <Select
          defaultValue={(date.getMonth() + 1).toString()}
          style={{width: 120}}
          onChange={(e) => setMonth(Number(e))}
        >
          {dataMonth()}
        </Select>
        <span className="text-[15px] font-medium mr-2 ml-4">Năm : </span>
        <Select
          defaultValue={date.getFullYear().toString()}
          style={{width: 120}}
          onChange={(e) => setYear(Number(e))}
        >
          {dataYear()}
        </Select>
      </div>
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
