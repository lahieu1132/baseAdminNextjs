import "./index.scss";
import {Input} from "antd";
import React from "react";
import classNames from "classnames";

interface InputModalProps {
  className?: string;
  label: string;
  placeholder?: string;
  onChange: (value: any) => void;
  value: string;
  required?: boolean;
  keyValue: string;
}

export function InputModal({
  className,
  label,
  placeholder,
  onChange,
  value,
  required,
  keyValue,
}: InputModalProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange((prev: any) => ({
      ...prev,
      [keyValue]: e.target.value,
    }));
  };

  return (
    <div className={classNames("input-modal-container", className)}>
      <h4 className={classNames("label-item mb-2", {required: required})}>
        {label}
      </h4>
      <Input placeholder={placeholder} onChange={handleChange} value={value} />
    </div>
  );
}
