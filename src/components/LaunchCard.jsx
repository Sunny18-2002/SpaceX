import React from "react";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function LaunchCard({ launch, onClick }) {
  return (
    <div
      className="bg-gray-900 rounded-xl shadow-lg p-4 sm:p-5 cursor-pointer hover:scale-[1.02] hover:shadow-xl transition flex flex-col"
      onClick={onClick}
      tabIndex={0}
      aria-label={`View details for ${launch.name}`}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-3">
        {launch.links.patch.small ? (
          <img
            src={launch.links.patch.small}
            alt={launch.name}
            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded"
          />
        ) : (
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-700 rounded flex items-center justify-center text-2xl">
            🚀
          </div>
        )}
        <div>
          <h2 className="text-base sm:text-lg font-semibold">{launch.name}</h2>
          <div className="text-xs text-gray-400">{formatDate(launch.date_utc)}</div>
        </div>
      </div>
      <div className="flex-1">
        {launch.details && (
          <p className="text-sm sm:text-base text-gray-300 line-clamp-3">{launch.details}</p>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2">
        {launch.upcoming ? (
          <span className="px-2 py-1 bg-yellow-500 text-xs rounded-full">Upcoming</span>
        ) : launch.success ? (
          <span className="px-2 py-1 bg-green-600 text-xs rounded-full">Success</span>
        ) : (
          <span className="px-2 py-1 bg-red-600 text-xs rounded-full">Failed</span>
        )}
        <span className="ml-auto text-xs text-gray-400">Flight #{launch.flight_number}</span>
      </div>
    </div>
  );
}

export default LaunchCard; 