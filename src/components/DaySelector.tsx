interface Day {
  id: string;
  label: string;
}

interface DaySelectorProps {
  days: Day[];
  selectedDays: string[];
  onToggle: (day: string) => void;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  days,
  selectedDays,
  onToggle,
}) => {
  return (
    <div className="flex  items-center justify-evenly gap-5">
      {days.map((day) => (
        <button
          key={day.id}
          onClick={() => onToggle(day.id)}
          className={`py-2 px-3  rounded-full ${
            selectedDays.includes(day.id)
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-500"
          }`}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
};

export default DaySelector;
