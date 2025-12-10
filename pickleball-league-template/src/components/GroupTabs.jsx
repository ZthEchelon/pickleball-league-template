import React from "react";

export default function GroupTabs({ groups, activeGroup, onChange }) {
  return (
    <div className="flex space-x-2 border-b pb-2">
      {groups.map((group, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`px-4 py-2 rounded-md ${
            activeGroup === index
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Group {index + 1}
        </button>
      ))}
    </div>
  );
}
