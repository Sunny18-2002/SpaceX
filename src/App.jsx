import React, { useEffect, useState } from "react";
import axios from "axios";
import LaunchList from "./components/LaunchList";
import FilterBar from "./components/FilterBar";
import LaunchModal from "./components/LaunchModal";
import Loader from "./components/Loader";
import EmptyState from "./components/EmptyState";

const API_BASE = "https://api.spacexdata.com/v5/launches";

function App() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | past | upcoming
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchLaunches = async (type) => {
    setLoading(true);
    setError(null);
    let url = API_BASE;
    if (type === "past") url += "/past";
    else if (type === "upcoming") url += "/upcoming";
    try {
      const res = await axios.get(url);
      setLaunches(res.data.reverse()); // latest first
    } catch (err) {
      setError("Failed to fetch launches.");
      setLaunches([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLaunches(filter);
  }, [filter]);

  // Date filtering
  const filteredLaunches = launches.filter(launch => {
    const launchDate = new Date(launch.date_utc);
    const afterStart = !startDate || launchDate >= new Date(startDate);
    const beforeEnd = !endDate || launchDate <= new Date(endDate);
    return afterStart && beforeEnd;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <header className="py-6 px-4 md:px-12 flex flex-col md:flex-row items-center justify-between border-b border-gray-800">
        <h1 className="text-3xl font-bold tracking-tight mb-2 md:mb-0">
          <span className="text-blue-400">SpaceX</span> Launch Dashboard
        </h1>
        <FilterBar filter={filter} setFilter={setFilter} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
      </header>
      <main className="flex-1 px-4 md:px-12 py-8">
        {loading ? (
          <Loader />
        ) : error ? (
          <EmptyState message={error} />
        ) : filteredLaunches.length === 0 ? (
          <EmptyState message="No launches found." />
        ) : (
          <LaunchList launches={filteredLaunches} onSelect={setSelectedLaunch} />
        )}
      </main>
      {selectedLaunch && (
        <LaunchModal
          launch={selectedLaunch}
          onClose={() => setSelectedLaunch(null)}
        />
      )}
      <footer className="text-center py-4 text-gray-500 text-sm border-t border-gray-800">
        Data from <a href="https://github.com/r-spacex/SpaceX-API" className="underline text-blue-400" target="_blank" rel="noopener noreferrer">SpaceX Unofficial API</a>
      </footer>
    </div>
  );
}

export default App; 