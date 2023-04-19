import React from "react";

type SearchFormType = {
  handleSubmit: any,
  city: string,
  setCity: (value: string) => void
}

export const SearchForm = ({ handleSubmit, city, setCity }: SearchFormType) => {
  return (
    <form className="flex gap-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          placeholder="Find for a place"
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-[38px] rounded focus:outline-none focus:shadow-outline px-2"
      >
        Search
      </button>
    </form>
  );
};
