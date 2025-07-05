import React from "react";

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center h-64">
      <div className="text-5xl mb-4">🛰️</div>
      <div className="text-gray-400">{message}</div>
    </div>
  );
}

export default EmptyState; 