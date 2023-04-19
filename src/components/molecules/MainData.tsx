import React from "react";
import Image from "next/image";

import { convertTemp } from "@/utils";
import { WeatherType } from "@/types";

type MainDataType = {
  city: string;
  unit: string;
  weather: WeatherType;
};

export const MainData = ({ city, unit, weather }: MainDataType) => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <h1 className="text-4xl uppercase">{city}</h1>
      <div>
        <p className="text-lg font-bold">
          {Math.round(convertTemp(weather.main.temp, unit))}
          {unit === "imperial" ? "°F" : "°C"}
        </p>
      </div>
      <div>
        <p className="text-lg font-bold">
          {Math.round(weather.wind.speed)} km/h
        </p>
        <p>Wind Speed</p>
      </div>
      <div className="flex items-center">
        <Image
          src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description}
          width={40}
          height={40}
        />
        <p>{weather.weather[0].description}</p>
      </div>
    </div>
  );
};
