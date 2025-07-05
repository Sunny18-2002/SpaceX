import React from "react";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Past", value: "past" },
  { label: "Upcoming", value: "upcoming" },
];

function FilterBar({ filter, setFilter, startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
      <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:overflow-visible">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`px-4 py-2 rounded-full font-medium transition min-w-[90px] sm:min-w-0 whitespace-nowrap ${
              filter === f.value
                ? "bg-blue-500 text-white"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="bg-gray-800 text-white rounded px-2 py-1 text-sm"
        />
        <span className="text-gray-400">to</span>
        <input
          type="date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="bg-gray-800 text-white rounded px-2 py-1 text-sm"
        />
        {(startDate || endDate) && (
          <button
            onClick={() => { setStartDate(""); setEndDate(""); }}
            className="ml-1 text-xs underline text-blue-400"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar; 