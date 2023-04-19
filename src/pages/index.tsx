import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import type { WeatherType, ForecastType } from "@/types";
import { RecentSearch } from "@/components/molecules/RecentSearch";
import { Loader } from "@/components/atoms/Loader";
import { SearchForm } from "@/components/molecules/SearchForm";
import { MainData } from "@/components/molecules/MainData";
import { DaysList } from "@/components/molecules/DaysList";

const API_KEY = "b45534abcf14eaa6846ac21e90ffd95b";
const API_URL = "https://api.openweathermap.org/data/2.5";

const Home = () => {
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<string>("imperial");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [forecastData, setForecastData] = useState<ForecastType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData();
  };

  const handleRecentSearch = (recentSearch: string) => {
    if (city === recentSearch)
      return toast(`You already is checking ${city}'s weather`, {
        duration: 2000,
      });
    setCity(recentSearch);
    fetchData(recentSearch);
  };

  const fetchData = async (selectedCity?: string) => {
    setIsLoading(true);
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
          `https://api.openweathermap.org/data/2.5/onecall?&lat=${lat}&lon=${lon}&units=${unit}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&dt=${dt}`
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
      <div className="flex rounded-3xl min-h-[800px] min-w-[1200px] bg-gray-100 pr-4">
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
                <MainData city={city} unit={unit} weather={weather} />
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
            <DaysList
              forecastData={forecastData}
              unit={unit}
              setUnit={setUnit}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
