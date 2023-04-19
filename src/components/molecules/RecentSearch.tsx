import React from "react";

export const RecentSearch = ({ recentSearches, handleRecentSearch }) => {
  return (
    <div className="bg-white rounded-md border-2 p-4 mt-8">
      <h3 className="text-lg font-medium mb-2">Recent Searches</h3>
      <div className="flex gap-4">
        {recentSearches.map((recentSearch, index) => (
          <button
            key={index}
            className="mb-1 cursor-pointer bg-blue-400 text-white hover:bg-blue-700 rounded-md px-2"
            onClick={() => handleRecentSearch(recentSearch)}
          >
            {recentSearch}
          </button>
        ))}
      </div>
    </div>
  );
};
