import "./index.scss";
import {Input} from "antd";
import React from "react";
import classNames from "classnames";
import {ISetStateModal} from "@app/types";

interface TextAreaProps {
  className?: string;
  label?: string;
  onChange: React.Dispatch<React.SetStateAction<ISetStateModal>>;
  value: string;
  required?: boolean;
  keyValue: string;
  placeholder?: string;
  rows?: number;
}

export function TextArea({
  className,
  label,
  onChange,
  value,
  required,
  keyValue,
  placeholder,
  rows = 10,
}: TextAreaProps): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onChange((prev: ISetStateModal) => ({
      ...prev,
      [keyValue]: e.target.value,
    }));
  };

  return (
    <div className={classNames("textarea-container", className)}>
      <h4 className={classNames("label-item mb-2", {required: required})}>
        {label}
      </h4>
      <Input.TextArea
        value={value}
        rows={rows}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}
