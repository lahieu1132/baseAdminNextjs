import {SelectSearch} from "@app/components/Filter/SelectSearch";
import {InputSearch} from "@app/components/Filter/InputSearch";
import {ChangeEvent} from "react";

interface FilterProps {
  listSearch: {
    isSearch?: boolean;
    placeholder?: string;
    visible: boolean;
    handleOnSearch?: (value: string) => void;
    handleOnChangeSearch?: (event: ChangeEvent<HTMLInputElement>) => void;
    isSelect?: boolean;
    handleOnChange?: (value: number) => void;
    data?: {
      title: string;
      value: number;
      default?: boolean;
    }[];
  }[];
  searchString?: string;
  startFilter?: (value: boolean) => void;
}

export function Filter({
  listSearch,
  searchString,
  startFilter,
}: FilterProps): JSX.Element {
  return (
    <div className="flex justify-start">
      {listSearch.map((item, index) => (
        <div key={index}>
          <SelectSearch
            index={index}
            visible={item.isSelect && item.visible}
            data={item.data}
            handleChange={item.handleOnChange}
          />
          <InputSearch
            visible={item.isSearch && item.visible}
            onSearchString={item.handleOnSearch}
            searchString={searchString}
            placeholder={item.placeholder ?? ""}
            onChangeSearch={item.handleOnChangeSearch}
          />
        </div>
      ))}
    </div>
  );
}
