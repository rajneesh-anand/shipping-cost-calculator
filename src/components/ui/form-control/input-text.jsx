import clsx from "clsx";
import React from "react";

const InputText = React.forwardRef(
  (
    {
      className = "block",
      label,
      name,
      error,
      placeholder,
      type = "text",
      textSpanClassName,
      inputClassName,
      labelClassName,
      iconClass,
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

        <div className="flex ">
          <span
            className={clsx(
              "flex grow items-center whitespace-nowrap border border-e-0 px-3 py-[0.25rem] text-center text-base leading-[1.6]",
              textSpanClassName
            )}
            id="basic-addon3"
          >
            {text}
          </span>

          <input
            id={name}
            name={name}
            type={type}
            ref={ref}
            className={clsx(
              "m-0 max-w-[140px] md:max-w-none md:grow bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base leading-[1.6] outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none",
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

export default InputText;
