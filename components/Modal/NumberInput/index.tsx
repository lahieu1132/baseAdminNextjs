import "./index.scss";
import {InputNumber} from "antd";
import React from "react";
import classNames from "classnames";
import {ISetStateModal} from "@app/types";

interface NumberInputProps {
  className?: string;
  label: string;
  onChange: React.Dispatch<React.SetStateAction<ISetStateModal>>;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  keyValue: string;
}

export function NumberInput({
  className,
  label,
  onChange,
  value,
  min = 0.5,
  max = 15,
  step = 0.5,
  required,
  keyValue,
}: NumberInputProps): JSX.Element {
  const handleChange = (value: number): void => {
    onChange((prev: ISetStateModal) => ({
      ...prev,
      [keyValue]: value,
    }));
  };

  return (
    <div className={classNames("number-input-container", className)}>
      <h4 className={classNames("label-item mb-2", {required: required})}>
        {label}
      </h4>
      <InputNumber
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
      />
    </div>
  );
}
