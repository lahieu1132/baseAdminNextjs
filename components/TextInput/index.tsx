import "./index.scss";
import {Input, Row} from "antd";
import {ChangeEvent, useCallback} from "react";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";

interface TextInputProps {
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  handleChange: (e: string | ChangeEvent<any>) => void;
  handleBlur: (e: string | ChangeEvent<any>) => void;
  name: string;
}

export function TextInput({
  label,
  handleChange,
  placeholder,
  value,
  handleBlur,
  name,
  type = "text",
}: TextInputProps): JSX.Element {
  const renderPasswordIcon = useCallback(
    (visible: boolean): React.ReactNode =>
      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />,
    []
  );
  return (
    <Row className="input-container">
      <div className="label-container">
        <div className="input-label">{label}</div>
        <div className="require-label">*</div>
      </div>
      {type === "text" && (
        <Input
          type="text"
          name={name}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      )}
      {type === "password" && (
        <Input.Password
          type="password"
          name={name}
          className="input"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          iconRender={renderPasswordIcon}
        />
      )}
    </Row>
  );
}
