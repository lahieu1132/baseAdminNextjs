import {Input} from "antd";
import React, {ChangeEvent} from "react";

interface InputSearchProps {
  searchString?: string;
  onSearchString?: (
    value: string,
    event?:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => void;
  visible?: boolean;
  placeholder: string;
  onChangeSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function InputSearch({
  searchString,
  onSearchString,
  visible,
  placeholder,
  onChangeSearch,
}: InputSearchProps): JSX.Element {
  return (
    <div>
      {visible && onChangeSearch && (
        <Input.Search
          defaultValue={searchString}
          placeholder={placeholder}
          onSearch={onSearchString}
          onChange={onChangeSearch}
        />
      )}
    </div>
  );
}
