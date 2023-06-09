import React from "react";
import cx from "classnames";

type TemperatureSelectorType = {
  setUnit: (value: string) => void;
  unit: string;
};

export const TemperatureSelector = ({
  setUnit,
  unit,
}: TemperatureSelectorType) => {
  return (
    <div className="flex self-end">
      <button
        onClick={() => setUnit("imperial")}
        className={cx("w-10 h-10 rounded-full", {
          "bg-transparent text-black": unit !== "imperial",
          "bg-blue-500 text-white": unit === "imperial",
        })}
      >
        ºF
      </button>
      <button
        onClick={() => setUnit("metric")}
        className={cx("w-10 h-10 rounded-full", {
          "bg-transparent text-black": unit === "imperial",
          "bg-blue-500 text-white": unit !== "imperial",
        })}
      >
        ºC
      </button>
    </div>
  );
};
