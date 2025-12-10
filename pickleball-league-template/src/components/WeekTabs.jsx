export default function WeekTabs({ weeks, activeWeek, onChange }) {
  return (
    <div className="flex gap-2 mb-4">
      {weeks.map((week, idx) => (
        <button
          key={week.week_number}
          className={`px-3 py-1 border rounded ${
            activeWeek === idx ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => onChange(idx)}
        >
          Week {week.week_number}
        </button>
      ))}
    </div>
  );
}
