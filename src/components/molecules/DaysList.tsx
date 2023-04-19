import React from "react";
import Image from "next/image";

import { convertTemp } from "@/utils";

import { TemperatureSelector } from "./TemperatureSelector";
import type { ForecastType } from "@/types";

type DaysListType = {
  forecastData: ForecastType;
  unit: string;
};

export const DaysList = ({ forecastData, unit }: DaysListType) => {
  return (
    <div className="flex flex-wrap pb-10">
      {forecastData?.daily?.map((item: any, i: number) => {
        if (i === 0) return;
        const itemDate = new Date(item.dt * 1000);
        const itemDateStr = itemDate.toLocaleDateString();

        const temps = forecastData.daily
          .filter((tempItem) => {
            const tempItemDate = new Date(tempItem.dt * 1000);
            return tempItemDate.toLocaleDateString() === itemDateStr;
          })
          .map((tempItem) => tempItem.temp);

        const high = temps[0].max;
        const low = temps[0].min;

        const rain = forecastData.daily
          .filter((rainItem) => {
            const rainItemDate = new Date(rainItem.dt * 1000);
            return rainItemDate.toLocaleDateString() === itemDateStr;
          })
          .reduce((acc, rainItem) => {
            return acc + (rainItem.rain || 0);
          }, 0);

        return (
          <div
            key={i}
            className="py-4 h-96 text-center rounded-lg m-2 bg-white overflow-hidden shadow-lg"
          >
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                {new Date(item.dt * 1000).toLocaleDateString()}
              </div>
              <Image
                src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
                className="mx-auto mb-2 w-20 h-20"
                width={40}
                height={40}
              />
              <p className="border-2 border-gray-300 font-semibold uppercase text-sm mt-2 text-gray-700 rounded-md px-2 py-2">
                {item.weather[0].description}
              </p>
              <p className="bg-red-500 mt-2 text-white rounded-md">
                Max: {Math.round(convertTemp(high, unit))}
                {unit === "imperial" ? "°F" : "°C"}
              </p>
              <p className="bg-sky-500 text-white rounded-md mt-2">
                Min: {Math.round(convertTemp(low, unit))}
                {unit === "imperial" ? "°F" : "°C"}
              </p>
              <div className="border-2 mt-2 bg-purple-700 text-white rounded-md">
                <p>Rainfall</p>
                <p>{rain} mm</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
