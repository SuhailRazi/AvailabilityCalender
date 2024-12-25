import React from "react";

interface TimeRangePickerProps {
  startTime: string;
  endTime: string;
  onChange: (type: "start" | "end", value: string) => void;
}

const 

TimeRangePicker: React.FC<TimeRangePickerProps> = ({
  startTime,
  endTime,
  onChange,
}) => {
  return (
    <div className="flex space-x-2 items-center bg-[#f0f2f4] p-1 rounded-sm">
      <input
        type="time"
        value={startTime}
        onChange={(e) => onChange("start", e.target.value)}
        className="border-none bg-[#f0f2f4] mr-2"
      />
      <span>to</span>
      <input
        type="time"
        value={endTime}
        onChange={(e) => onChange("end", e.target.value)}
        className="border-none bg-[#f0f2f4]"
      />
    </div>
  );
};

export default TimeRangePicker;
