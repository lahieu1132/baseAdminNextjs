import "../my-salary-detail/index.scss";
import React, {useEffect, useState} from "react";
import {ModalCustom} from "@app/components/ModalCustom";
import {Input, notification, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {IDataOverTime} from "@app/types";
import {getDayOnMonth} from "@app/utils/date/getDayOnMonth";
import {findDayOnWeek} from "@app/utils/date/findDayOnWeek";
import {CloseCircleOutlined} from "@ant-design/icons";
import {formatNumber} from "@app/utils/fomat/FormatNumber";
import ApiSalary from "@app/api/ApiSalary";

interface IModalCreateOnsite {
  dataOverTime: IDataOverTime[];
  refetchDataOT: () => void;
  month: number;
  year: number;
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export default function ModalCreateOverTime(
  props: IModalCreateOnsite
): JSX.Element {
  const [data, setData] = useState<IDataOverTime[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const dataDefault: IDataOverTime[] = [];
    for (let i = 1; i <= getDayOnMonth(props.month, props.year); i++) {
      let check = 0;
      props.dataOverTime?.map((el, index) => {
        if (
          el.date ===
          props.year + "-" + formatNumber(props.month) + "-" + formatNumber(i)
        ) {
          dataDefault.push({
            day: formatNumber(i) + "/" + formatNumber(props.month),
            dayOnWeek: findDayOnWeek(props.year, props.month, i),
            hour: el.hour,
            action: true,
            id: el.id,
            projectName: el?.project?.name || "",
          });
          check += 1;
        }
        return el;
      });
      if (check === 0) {
        dataDefault.push({
          day: formatNumber(i) + "/" + formatNumber(props.month),
          dayOnWeek: findDayOnWeek(props.year, props.month, i),
          hour: "",
          action: false,
          id: 0,
          projectName: "",
        });
      }
    }
    setData(dataDefault);
    setLoading(false);
  }, [props.dataOverTime]);

  const columns: ColumnsType<IDataOverTime> = [
    {
      title: "Ngày",
      dataIndex: "day",
      key: "day",
      align: "center",
    },
    {
      title: "Thứ",
      dataIndex: "dayOnWeek",
      key: "dayOnWeek",
      align: "center",
    },
    {
      title: "số giờ OT",
      dataIndex: "hour",
      key: "hour",
      width: "90px",
      align: "center",
      render: (index, _record): JSX.Element => {
        return (
          <Input
            min={0}
            type="number"
            value={_record.hour}
            onChange={(e) => {
              handleChangeOnsite(e, _record.day);
            }}
          />
        );
      },
    },
    {
      title: "Dự án",
      dataIndex: "projectName",
      key: "ProjectName",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "center",
      width: "20px",
      render: (index, _record): JSX.Element => {
        return _record.action ? (
          <CloseCircleOutlined
            onClick={() => deleteOnsite(_record.id)}
            className="text-[red] text-[20px]"
          />
        ) : (
          <div className="min-w-[20px]" />
        );
      },
    },
  ];

  const renderContent = (): JSX.Element => {
    return (
      <div className="modal-info">
        <Table loading={loading} columns={columns} dataSource={data} bordered />
      </div>
    );
  };

  const handleChangeOnsite = (
    e: React.ChangeEvent<HTMLInputElement>,
    day: string | number | undefined
  ) => {
    const dataChange = data?.map((el, index) => {
      if (el.day === day) {
        el.hour = e.target.value;
      }
      return el;
    });
    setData(dataChange);
  };

  const deleteOnsite = (id: number): void => {
    ApiSalary.deleteOTSalary(id).then((r) => {
      props.refetchDataOT();
      notification.success({message: "delete success"});
    });
  };

  const handleOk = (): void => {
    props.handleOk();
  };

  return (
    <ModalCustom
      isModalVisible={props.isModalVisible}
      handleOk={handleOk}
      handleCancel={props.handleCancel}
      title="Nhập lương Onsite"
      content={renderContent()}
    />
  );
}
