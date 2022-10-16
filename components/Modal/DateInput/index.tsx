import "./index.scss";
import {Input} from "antd";
import React from "react";
import classNames from "classnames";
import {ISetStateModal} from "@app/types";

interface DateInputProps {
  className?: string;
  label: string;
  onChange: React.Dispatch<React.SetStateAction<ISetStateModal>>;
  value: string;
  required?: boolean;
  keyValue: string;
  isErrored?: boolean;
}

export function DateInput({
  className,
  label,
  onChange,
  value,
  required,
  keyValue,
  isErrored,
}: DateInputProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange((prev: ISetStateModal) => ({
      ...prev,
      [keyValue]: e.target.value,
    }));
  };

  return (
    <div className={classNames("date-input-container", className)}>
      <h4 className={classNames("label-item mb-2", {required: required})}>
        {label}
      </h4>
      <Input
        type="date"
        value={value}
        onChange={handleChange}
        status={isErrored ? "error" : ""}
      />
    </div>
  );
}
