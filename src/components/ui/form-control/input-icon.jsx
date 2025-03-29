import clsx from "clsx";
import React from "react";

const InputIcon = React.forwardRef(
  (
    {
      className = "block",
      label,
      name,
      error,
      placeholder,
      type = "text",
      inputClassName,
      labelClassName,
      textSpanClassName,
      iconClass,
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

        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <span
            className={clsx(
              "flex items-center whitespace-nowrap border border-e-0 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6]",
              textSpanClassName
            )}
            id="basic-addon3"
          >
            <i className={iconClass}></i>
          </span>

          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            className={clsx(
              "relative m-0 block flex-auto  border border-solid border-orange-500 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none",
              inputClassName
            )}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck="false"
            aria-invalid={error ? "true" : "false"}
            aria-describedby="basic-addon3"
            {...rest}
          />
        </div>
        {error && <p className=" text-[13px] text-rose-600">{error}</p>}
      </div>
    );
  }
);

export default InputIcon;
