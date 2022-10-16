import "./index.scss";
import {Col, Row, Select} from "antd";
import classNames from "classnames";

interface InputModalProps {
  className?: string;
  label: string;
  setValue: (value: any) => void;
  value: number;
  require?: boolean;
  keyValue: string;
  data?: {
    value: number;
    label: string;
  }[];
}

export function SelectInput({
  className,
  label,
  setValue,
  value,
  require,
  data,
  keyValue,
}: InputModalProps): JSX.Element {
  const onChange = (value: number): void => {
    setValue((prev: any) => ({
      ...prev,
      [keyValue]: value,
    }));
  };

  return (
    <Row className={classNames("input-select-container", className)}>
      <Col md={6} className="label-item">
        {label}
        <span className="require">{require ? "*" : ""}</span>
      </Col>
      <Col md={18}>
        <Select value={value} onChange={onChange}>
          {data?.map(({value, label}, index) => (
            <Select.Option key={index} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  );
}
