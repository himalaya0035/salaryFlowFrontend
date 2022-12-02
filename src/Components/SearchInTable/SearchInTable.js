import React from "react";
import { Copy2DArray } from "../Utility/Utility";

function SearchInTable({ keyLocalStorage, setTableRows }) {
  let tempData = JSON.parse(localStorage.getItem(keyLocalStorage));
  const performLiveSearch = (searchText) => {
    if (searchText.length === 0) {
      setTableRows(tempData);
    } else {
      setTableRows(
        tempData.filter(
          (temp) =>
            temp[0].toLowerCase().includes(searchText.toLowerCase()) ||
            temp[1].toLowerCase().includes(searchText.toLowerCase()) ||
            temp[2].toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  };

  const handleSearch = (e) => {
    performLiveSearch(e.target.value);
  };

  return (
    <div className="hidden xl:block">
      <label htmlFor="table-search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          type="text"
          id="table-search"
          className="block p-2 pl-10 w-80 text-sm  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for Employees"
          onInput={handleSearch}
        />
      </div>
    </div>
  );
}

export default React.memo(SearchInTable);
