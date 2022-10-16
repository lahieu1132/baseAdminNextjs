import "../my-salary-detail/index.scss";
import React, {useEffect, useState} from "react";
import {ModalCustom} from "@app/components/ModalCustom";
import {Input, notification, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {IDataOnsite} from "@app/types";
import {getDayOnMonth} from "@app/utils/date/getDayOnMonth";
import {findDayOnWeek} from "@app/utils/date/findDayOnWeek";
import {CloseCircleOutlined} from "@ant-design/icons";
import {formatNumber} from "@app/utils/fomat/FormatNumber";
import ApiSalary from "@app/api/ApiSalary";

interface IModalCreateOnsite {
  dataOnsite: IDataOnsite[];
  refetchDataOnsite: () => void;
  month: number;
  year: number;
  isModalVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

export default function ModalCreateOnsite(
  props: IModalCreateOnsite
): JSX.Element {
  const [data, setData] = useState<IDataOnsite[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const dataDefault: IDataOnsite[] = [];
    for (let i = 1; i <= getDayOnMonth(props.month, props.year); i++) {
      let check = 0;
      props.dataOnsite?.map((el, index) => {
        if (
          el.date ===
          props.year + "-" + formatNumber(props.month) + "-" + formatNumber(i)
        ) {
          dataDefault.push({
            day: formatNumber(i) + "/" + formatNumber(props.month),
            dayOnWeek: findDayOnWeek(props.year, props.month, i),
            onsitePlace: el.onsitePlace,
            action: true,
            id: el.id,
          });
          check += 1;
        }
        return el;
      });
      if (check === 0) {
        dataDefault.push({
          day: formatNumber(i) + "/" + formatNumber(props.month),
          dayOnWeek: findDayOnWeek(props.year, props.month, i),
          onsitePlace: "",
          action: false,
          id: 0,
        });
      }
    }
    setData(dataDefault);
    setLoading(false);
  }, [props.dataOnsite]);

  const columns: ColumnsType<IDataOnsite> = [
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
      title: "Địa điểm Onsite",
      dataIndex: "onsitePlace",
      key: "onsitePlace",
      align: "center",
      render: (index, _record): JSX.Element => {
        return (
          <Input
            value={_record.onsitePlace}
            onChange={(e) => {
              handleChangeOnsite(e, _record.day);
            }}
          />
        );
      },
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
        el.onsitePlace = e.target.value;
      }
      return el;
    });
    setData(dataChange);
  };

  const deleteOnsite = (id: number): void => {
    ApiSalary.deleteOnsiteSalary(id).then((r) => {
      props.refetchDataOnsite();
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
