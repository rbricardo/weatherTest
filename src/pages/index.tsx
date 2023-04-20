import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import type { WeatherType, ForecastType } from "@/types";
import { RecentSearch } from "@/components/molecules/RecentSearch";
import { Loader } from "@/components/atoms/Loader";
import { SearchForm } from "@/components/molecules/SearchForm";
import { MainData } from "@/components/molecules/MainData";
import { DaysList } from "@/components/molecules/DaysList";
import { TemperatureSelector } from "@/components/molecules/TemperatureSelector";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Home = () => {
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [city, setCity] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  const [unit, setUnit] = useState<string>("imperial");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [forecastData, setForecastData] = useState<ForecastType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setCityName(city);
    fetchData();
  };

  const handleRecentSearch = (recentSearch: string) => {
    if (city === recentSearch)
      return toast(`You already is checking ${city}'s weather`, {
        duration: 2000,
      });
    setCity(recentSearch);
    setCityName(recentSearch);
    fetchData(recentSearch);
  };

  const fetchData = async (selectedCity?: string) => {
    setIsLoading(true);
    setWeather(null);
    setForecastData(null);
    setUnit("imperial");
    try {
      const res = await axios.get(
        `${API_URL}/weather?q=${
          selectedCity || city
        }&units=${unit}&appid=${API_KEY}`
      );
      const { data } = res;
      setWeather(data);
      if (data.main) {
        const lat = data?.coord?.lat;
        const lon = data?.coord?.lon;
        const now = Math.floor(Date.now() / 1000);
        const dt = now - 604800;

        const { data: forecastResponse } = await axios.get(
          `${API_URL}/onecall?&lat=${lat}&lon=${lon}&units=${unit}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&dt=${dt}`
        );
        setForecastData(forecastResponse);
        setRecentSearches((prevSearches) => {
          if (prevSearches.length === 5) {
            return [
              ...prevSearches.slice(1),
              selectedCity ? selectedCity : city,
            ];
          } else {
            return [...prevSearches, selectedCity ? selectedCity : city];
          }
        });
      } else {
        setWeather(null);
      }
    } catch (error: any) {
      toast.error(error.response.data.message, {
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const recentSearchesJSON = localStorage.getItem("recentSearches");
    if (recentSearchesJSON) {
      setRecentSearches(JSON.parse(recentSearchesJSON));
    }
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500 w-screen">
      <div className="flex rounded-3xl min-h-[800px] w-[1600px] bg-gray-100 pr-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-1/3 h-full">
          <SearchForm
            handleSubmit={handleSubmit}
            city={city}
            setCity={setCity}
          />
          {weather?.main && (
            <div>
              {isLoading ? (
                <Loader isLoading={isLoading} />
              ) : (
                <MainData city={cityName} unit={unit} weather={weather} />
              )}
              {recentSearches.length > 0 && !isLoading && (
                <RecentSearch
                  recentSearches={recentSearches}
                  handleRecentSearch={handleRecentSearch}
                />
              )}
            </div>
          )}
        </div>
        {isLoading && <Loader isLoading={isLoading} />}
        {!!forecastData?.daily?.length && !isLoading && (
          <div className="flex flex-col mt-4">
            <TemperatureSelector setUnit={setUnit} unit={unit} />
            <DaysList forecastData={forecastData} unit={unit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
