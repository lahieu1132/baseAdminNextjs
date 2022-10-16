import "./index.scss";
import React from "react";
import ProjectSalaryTable from "@app/module/my-salary-detail/ProjectSalaryTable";
import {LeftOutlined} from "@ant-design/icons";
import {useRouter} from "next/router";
import {formatNumber} from "@app/utils/fomat/FormatNumber";
import OnsiteSalaryTable from "@app/module/OnsiteSalaryTable";
import OtherSalaryTable from "@app/module/my-salary-detail/OtherSalaryTable";
import OverTimeSalaryTable from "@app/module/OverTimeSalaryTable";
import ApiUser from "@app/api/ApiUser";
import DeductionSalaryTable from "@app/module/my-salary-detail/DeductionSalaryTable";

export function MySalaryDetail(): JSX.Element {
  const router = useRouter();
  const {month} = router.query;
  const {year} = router.query;
  const baseSalary = ApiUser.getInfoMe()?.baseSalary?.toLocaleString();
  const manageSalary = ApiUser.getInfoMe()?.manageSalary?.toLocaleString();

  return (
    <div>
      <div className="flex items-center mb-6">
        <button type="button" className="btn-back-page" onClick={router.back}>
          <LeftOutlined />
        </button>
        <span className="ml-2">
          Lương tháng {formatNumber(Number(month)) + "/" + year}
        </span>
      </div>
      <div className="flex items-center mb-6">
        <span>Lương cứng : {baseSalary}</span>
        <span className="ml-4">Lương quản lý : {manageSalary}</span>
      </div>
      {month && year && (
        <div className="flex justify-between">
          <ProjectSalaryTable month={Number(month)} year={Number(year)} />
          <OtherSalaryTable month={Number(month)} year={Number(year)} />
        </div>
      )}
      {month && year && (
        <div className="mt-4">
          <OnsiteSalaryTable
            idUser={ApiUser.getInfoMe()?.id || ""}
            month={Number(month)}
            year={Number(year)}
          />
        </div>
      )}
      {month && year && (
        <div className="mt-4">
          <OverTimeSalaryTable
            idUser={ApiUser.getInfoMe()?.id || ""}
            month={Number(month)}
            year={Number(year)}
          />
        </div>
      )}
      {month && year && (
        <div className="mt-4">
          <DeductionSalaryTable month={Number(month)} year={Number(year)} />
        </div>
      )}
    </div>
  );
}
