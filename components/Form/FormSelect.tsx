import React, { memo } from "react";

type Props = {
  name: string;
  labelName?: string | undefined;
  value: string | number | undefined;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean | undefined;
  options: Array<any>;
};

const FormSelect = (props: Props) => {
  return (
    <div className="flex flex-col max-w-lg justify-stretch mb-4 text-sm">
      {props.labelName && (
        <label
          className="font-semibold flex justify-between"
          htmlFor={props.name}
        >
          {props.labelName}
          {props.required && (
            <span className="text-xs text-pink-700 font-normal">Required</span>
          )}
        </label>
      )}
      <select
        name={props.name}
        value={props.value}
        onChange={props.handleOnChange}
        className="cursor-pointer p-3 my-3 rounded outline-none border border-gray-200 bg-white focus:border-pink-600 text-sm"
      >
        {props.options.map(([key, value]) => {
          return (
            <option key={value} value={value}>
              {key}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default memo(FormSelect);
