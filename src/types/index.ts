export type WeatherType = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  message?: string;
};

export type ForecastType = {
  daily: {
    dt: 1681902000;
    sunrise: 1681880215;
    sunset: 1681930925;
    moonrise: 1681879860;
    moonset: 1681928640;
    moon_phase: 0.97;
    temp: {
      day: 54.09;
      min: 46.63;
      max: 57.42;
      night: 48.02;
      eve: 52.02;
      morn: 47.23;
    };
    feels_like: {
      day: 52.66;
      night: 43.12;
      eve: 49.55;
      morn: 42.39;
    };
    pressure: 1025;
    humidity: 74;
    dew_point: 45.86;
    wind_speed: 15.66;
    wind_deg: 76;
    wind_gust: 30.29;
    weather: [
      {
        id: 500;
        main: "Rain";
        description: "light rain";
        icon: "10d";
      }
    ];
    clouds: 83;
    pop: 0.2;
    rain: 0.12;
    uvi: 3.4;
  }[];
};
