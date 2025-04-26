import clsx from "clsx";

export default function Container({ as, className, children }) {
  let Component = as ?? "div";

  return (
    <Component className={clsx("md:mx-auto max-w-7xl px-3 lg:px-8", className)}>
      {children}
    </Component>
  );
}
