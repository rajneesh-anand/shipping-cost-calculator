import React from "react";
import clsx from "clsx";
import ReactSelect from "react-select";
import { selectStyles } from "./select.styles";

const Select = React.forwardRef(
  (
    {
      className = "inline-block",
      label,
      name,
      error,
      labelClassName,
      textSpanClassName,
      text,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className={clsx(
              "inline-block font-normal text-sm leading-none mb-2",
              labelClassName
            )}
          >
            {label}
          </label>
        )}

        <div className="flex">
          <span
            className={clsx(
              "flex items-center whitespace-nowrap border border-e-0 px-3 py-[0.25rem] text-center text-base leading-[1.6]",
              textSpanClassName
            )}
            id="basic-addon3"
          >
            {text}
          </span>

          <ReactSelect
            ref={ref}
            styles={selectStyles}
            id={name}
            {...rest}
            className="grow"
          />
        </div>
        {error && <p className=" text-[13px] text-rose-600">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
export default Select;
