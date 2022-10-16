import React from "react";
import {Filter} from "@app/components/Filter";
import moment from "moment";

interface FilterLeaveWorkProps {
  setFilterState: React.Dispatch<React.SetStateAction<number[]>>;
  setFilterYear: React.Dispatch<React.SetStateAction<number>>;
  setFilterMonth: React.Dispatch<React.SetStateAction<number>>;
}

interface DataFilter {
  title: string;
  value: number;
  default?: boolean;
}

export function FilterLeaveWork({
  setFilterState,
  setFilterYear,
  setFilterMonth,
}: FilterLeaveWorkProps): JSX.Element {
  const dataFilterState: DataFilter[] = [
    {title: "Tất cả", value: 3, default: true},
    {title: "Đang chờ duyệt", value: 0},
    {title: "Đã chấp nhận", value: 1},
    {title: "Bị từ chối", value: 2},
  ];

  const dataFilterYear = (): DataFilter[] => {
    const years = [];
    const currentYear = moment().year();
    for (let i = 0; i <= 10; i++) {
      years[i] = {
        title: currentYear - i + "",
        value: currentYear - i,
      };
      years[0] = {...years[0], default: true};
    }
    return years;
  };

  const dataFilterMonth = (): DataFilter[] => {
    const currentMonth = moment().month() + 1;
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) =>
      item === currentMonth
        ? {title: item + "", value: item, default: true}
        : {title: item + "", value: item}
    );
  };

  return (
    <Filter
      listSearch={[
        {
          visible: true,
          isSelect: true,
          data: dataFilterState,
          handleOnChange: (value: number): void => {
            if (value === 3) {
              setFilterState([0, 1, 2]);
            } else {
              setFilterState([value]);
            }
          },
        },
        {
          visible: true,
          isSelect: true,
          data: dataFilterYear(),
          handleOnChange: (value: number): void => {
            setFilterYear(value);
          },
        },
        {
          visible: true,
          isSelect: true,
          data: dataFilterMonth(),
          handleOnChange: (value: number): void => {
            setFilterMonth(value);
          },
        },
      ]}
    />
  );
}
