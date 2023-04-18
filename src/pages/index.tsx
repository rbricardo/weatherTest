import { WeatherType } from "@/types";
import { useState, useEffect } from "react";

const Home = () => {
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<string>("imperial");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  console.log(weather, "weather");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData();
  };

  const handleRecentSearch = (recentSearch: string) => {
    setCity(recentSearch);
    fetchData(recentSearch);
  };

  const fetchData = async (selectedCity?: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          selectedCity || city
        }&units=imperial&appid=748cc29e99f0a79421000ea6ef047204`
      );
      const data = await res.json();
      setWeather(data);
      if (data.main) {
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
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const recentSearchesJSON = localStorage.getItem("recentSearches");
    if (recentSearchesJSON) {
      setRecentSearches(JSON.parse(recentSearchesJSON));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const toggleUnit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnit(e.target.value);
  };

  const convertTemp = (temp: number, unit: string) => {
    if (unit === "metric") {
      return ((temp - 32) * 5) / 9;
    }
    return temp;
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">
          Previsão do tempo para {weather?.name}
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 font-bold mb-2"
            >
              City
            </label>
            <input
              id="city"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Search
          </button>
        </form>
        {weather?.main && (
          <div>
            <div className="flex justify-between mt-8">
              <div>
                <p className="text-lg font-bold">
                  {Math.round(convertTemp(weather.main.temp, unit))}
                  {unit === "imperial" ? "°F" : "°C"}
                </p>
                <p>{weather.weather[0].description}</p>
              </div>
              <div>
                <p className="text-lg font-bold">
                  {Math.round(weather.wind.speed)} km/h
                </p>
                <p>Wind Speed</p>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="celsius" className="mr-2">
                Celsius
              </label>
              <input
                id="celsius"
                type="radio"
                name="unit"
                value="metric"
                checked={unit === "metric"}
                onChange={toggleUnit}
              />
              <label htmlFor="fahrenheit" className="ml-4 mr-2">
                Fahrenheit
              </label>
              <input
                id="fahrenheit"
                type="radio"
                name="unit"
                value="imperial"
                checked={unit === "imperial"}
                onChange={toggleUnit}
              />
            </div>
          </div>
        )}
        {!weather?.main && (
          <div className="flex justify-between mt-8">
            <div>
              <p className="text-red-400 font-bold uppercase">
                {weather?.message}
              </p>
            </div>
          </div>
        )}
      </div>
      {recentSearches.length > 0 && (
        <div className="bg-white rounded-md shadow-md p-4 mt-8">
          <h3 className="text-lg font-medium mb-2">Recent Searches</h3>
          <ul className="list-disc pl-4">
            {recentSearches.map((recentSearch, index) => (
              <li
                key={index}
                className="mb-1 cursor-pointer"
                onClick={() => handleRecentSearch(recentSearch)}
              >
                {recentSearch}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
