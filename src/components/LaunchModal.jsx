import React, { useEffect } from "react";

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

function LaunchModal({ launch, onClose }) {
  // Close on ESC
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-900 rounded-xl shadow-2xl max-w-lg w-full mx-0 sm:mx-2 p-3 sm:p-6 relative min-h-[80vh] sm:min-h-0 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-400 hover:text-white text-3xl sm:text-2xl p-2 sm:p-0"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          {launch.links.patch.large ? (
            <img
              src={launch.links.patch.large}
              alt={launch.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded"
            />
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-700 rounded flex items-center justify-center text-3xl">
              🚀
            </div>
          )}
          <div>
            <h2 className="text-lg sm:text-2xl font-bold">{launch.name}</h2>
            <div className="text-xs sm:text-sm text-gray-400">{formatDate(launch.date_utc)}</div>
            <div className="mt-1">
              {launch.upcoming ? (
                <span className="px-2 py-1 bg-yellow-500 text-xs rounded-full">Upcoming</span>
              ) : launch.success ? (
                <span className="px-2 py-1 bg-green-600 text-xs rounded-full">Success</span>
              ) : (
                <span className="px-2 py-1 bg-red-600 text-xs rounded-full">Failed</span>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          {launch.details && (
            <p className="text-sm sm:text-base text-gray-300">{launch.details}</p>
          )}
        </div>
        {/* --- Additional Launch Details --- */}
        <div className="mb-4 space-y-2 text-sm text-gray-300">
          {launch.rocket && (
            <div><span className="font-semibold text-gray-200">Rocket ID:</span> {launch.rocket}</div>
          )}
          {launch.launchpad && (
            <div><span className="font-semibold text-gray-200">Launchpad ID:</span> {launch.launchpad}</div>
          )}
          {launch.static_fire_date_utc && (
            <div><span className="font-semibold text-gray-200">Static Fire Date:</span> {formatDate(launch.static_fire_date_utc)}</div>
          )}
          {launch.payloads && launch.payloads.length > 0 && (
            <div><span className="font-semibold text-gray-200">Payload IDs:</span> {launch.payloads.join(", ")}</div>
          )}
          {launch.capsules && launch.capsules.length > 0 && (
            <div><span className="font-semibold text-gray-200">Capsule IDs:</span> {launch.capsules.join(", ")}</div>
          )}
          {launch.crew && launch.crew.length > 0 && (
            <div><span className="font-semibold text-gray-200">Crew IDs:</span> {launch.crew.join(", ")}</div>
          )}
          {launch.ships && launch.ships.length > 0 && (
            <div><span className="font-semibold text-gray-200">Ships:</span> {launch.ships.join(", ")}</div>
          )}
          {launch.cores && launch.cores.length > 0 && (
            <div className="pt-2">
              <span className="font-semibold text-gray-200">First Core Info:</span>
              <ul className="ml-4 list-disc">
                {launch.cores[0].core && <li>Core ID: {launch.cores[0].core}</li>}
                {launch.cores[0].flight && <li>Flight: {launch.cores[0].flight}</li>}
                {launch.cores[0].landing_type && <li>Landing Type: {launch.cores[0].landing_type}</li>}
                {launch.cores[0].landing_success !== undefined && <li>Landing Success: {launch.cores[0].landing_success ? "Yes" : "No"}</li>}
                {launch.cores[0].landpad && <li>Landpad ID: {launch.cores[0].landpad}</li>}
              </ul>
            </div>
          )}
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {launch.links.webcast && (
            <a
              href={launch.links.webcast}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-blue-600 rounded text-xs hover:bg-blue-700"
            >
              Watch Webcast
            </a>
          )}
          {launch.links.wikipedia && (
            <a
              href={launch.links.wikipedia}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-700 rounded text-xs hover:bg-gray-800"
            >
              Wikipedia
            </a>
          )}
          {launch.links.article && (
            <a
              href={launch.links.article}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-gray-700 rounded text-xs hover:bg-gray-800"
            >
              Article
            </a>
          )}
        </div>
        {launch.links.flickr.original && launch.links.flickr.original.length > 0 && (
          <div className="mb-2">
            <div className="text-sm text-gray-400 mb-1">Photos:</div>
            <div className="flex gap-2 overflow-x-auto">
              {launch.links.flickr.original.slice(0, 4).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Launch photo ${i + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>
        )}
        <div className="mt-4 text-xs text-gray-500">
          Flight Number: {launch.flight_number}
        </div>
      </div>
    </div>
  );
}

export default LaunchModal; 