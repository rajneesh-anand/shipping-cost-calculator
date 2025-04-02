import styles from "./spinner.module.css";
import clsx from "clsx";

const Spinner = ({ className, showText, text = "Loading", simple }) => {
  return (
    <>
      {simple ? (
        <div className={clsx(className, styles.simple)} />
      ) : (
        <div
          className={cn(
            "w-full flex flex-col items-center justify-center",
            className
          )}
          style={{ height: "calc(100vh - 200px)" }}
        >
          <div className={styles.loading} />

          {showText && (
            <h3 className="text-lg font-semibold text-body italic">{text}</h3>
          )}
        </div>
      )}
    </>
  );
};

export default Spinner;
