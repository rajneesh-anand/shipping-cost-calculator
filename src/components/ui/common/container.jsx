import clsx from "clsx";

export default function Container({ as, className, children }) {
  let Component = as ?? "div";

  return (
    <Component className={clsx("md:mx-auto max-w-7xl px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </Component>
  );
}
