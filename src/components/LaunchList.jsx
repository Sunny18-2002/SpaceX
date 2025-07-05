import React from "react";
import LaunchCard from "./LaunchCard";

function LaunchList({ launches, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {launches.map((launch) => (
        <div key={launch.id} className="mb-4 sm:mb-0">
          <LaunchCard launch={launch} onClick={() => onSelect(launch)} />
        </div>
      ))}
    </div>
  );
}

export default LaunchList; 