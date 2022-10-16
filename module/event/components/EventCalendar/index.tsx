import "./index.scss";
import {Badge, Calendar, Select, Button} from "antd";
import React, {useState} from "react";
import moment, {Moment} from "moment";
import {useSelector} from "react-redux";
import {IRootState} from "@app/redux/store";
import {IEvent} from "@app/types";
import {ModalCreateEvent} from "@app/module/event/components/ModalCreateEvent";
import {ModalDeleteEvent} from "@app/module/event/components/ModalDeleteEvent";

interface EventCalendarProps {
  dataEvent?: IEvent[];
  dataRefetch: () => void;
}

interface ListData {
  type?: "success" | "processing" | "error" | "default" | "warning";
  content?: string;
}

export function EventCalendar({
  dataEvent,
  dataRefetch,
}: EventCalendarProps): JSX.Element {
  const role = useSelector((state: IRootState) => state.user.role);
  const [isModalVisible, setIsModalVisible] = useState("");

  const showModalCreateEvent = (): void => {
    setIsModalVisible("modalCreateEvent");
  };

  const showModalDeleteEvent = (): void => {
    setIsModalVisible("modalDeleteEvent");
  };

  const toggleModal = (): void => {
    setIsModalVisible("");
  };

  const getListData = (value: Moment): ListData[] => {
    const listData: ListData[] = [];
    const month =
      value.month() + 1 < 10 ? "0" + (value.month() + 1) : value.month() + 1;
    const day = value.date() < 10 ? "0" + value.date() : value.date();
    const date = value.year() + "" + month + day;
    dataEvent?.forEach((item) => {
      if (
        moment(date).diff(moment(item.startDate, "YYYY-MM-DD"), "days") >= 0 &&
        moment(date).diff(moment(item.endDate, "YYYY-MM-DD"), "days") <= 0
      ) {
        listData.push(
          {type: "success", content: item.title},
          {type: "default", content: item.content}
        );
      }
    });
    return listData;
  };

  const dateCellRender = (value: Moment): JSX.Element => {
    const listData = getListData(value);
    return (
      <ul className="Event">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const headerRender = (
    value: Moment,
    onChange: (date: Moment) => void
  ): JSX.Element => {
    const start = 0;
    const end = 12;
    const monthOptions = [];
    const yearOptions = [];
    const year = value.year();
    const month = value.month();

    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {i + 1}
        </Select.Option>
      );
    }

    for (let i = year - 10; i < year + 10; i++) {
      yearOptions.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>
      );
    }

    return (
      <div className="container flex justify-between">
        <div className="p-2 mb-4">
          <Select
            className="mr-4 w-40"
            value={year}
            onChange={(newYear): void => {
              const now = value.clone().year(newYear);
              onChange(now);
            }}
          >
            {yearOptions}
          </Select>
          <Select
            className="w-40"
            value={month}
            onChange={(newMonth): void => {
              const now = value.clone().month(newMonth);
              onChange(now);
            }}
          >
            {monthOptions}
          </Select>
        </div>
        {role && (
          <div className="p-2 mb-4">
            <Button
              className="mr-4 w-40 btn-red"
              onClick={showModalDeleteEvent}
            >
              Xóa sự kiện
            </Button>
            <Button className="w-40 btn-blue" onClick={showModalCreateEvent}>
              Thêm sự kiện
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Calendar
        headerRender={({value, onChange}): JSX.Element =>
          headerRender(value, onChange)
        }
        dateCellRender={dateCellRender}
      />
      <ModalCreateEvent
        isModalVisible={isModalVisible === "modalCreateEvent"}
        toggleModal={toggleModal}
        dataRefetch={dataRefetch}
      />
      <ModalDeleteEvent
        isModalVisible={isModalVisible === "modalDeleteEvent"}
        toggleModal={toggleModal}
        dataRefetch={dataRefetch}
        dataEvent={dataEvent}
      />
    </div>
  );
}
