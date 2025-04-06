
import React from "react";
import { Table, LayoutGrid } from "lucide-react";

const ToggleView = ({ view, setView }) => {
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => setView("table")}
        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm border ${view === "table"
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
      >
        <Table size={16} /> Table
      </button>
      <button
        onClick={() => setView("grid")}
        className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm border ${view === "grid"
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
      >
        <LayoutGrid size={16} /> Grid
      </button>
    </div>
  );
};

export default ToggleView;
