import React from "react";
import TimeRangePicker from "./TimeRangePicker";
import { FiPlusCircle } from "react-icons/fi";
import { HiOutlineMinusCircle } from "react-icons/hi";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface TimeSlotManagerProps {
  slots: TimeSlot[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onSlotChange: (index: number, type: "start" | "end", value: string) => void;
}

const TimeSlotManager: React.FC<TimeSlotManagerProps> = ({
  slots,
  onAdd,
  onRemove,
  onSlotChange,
}) => {
  return (
    <div>
      {slots.map((slot, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <div className="flex-1">
            <TimeRangePicker
              startTime={slot.startTime}
              endTime={slot.endTime}
              onChange={(type, value) => onSlotChange(index, type, value)}
            />
          </div>
          <button onClick={onAdd} className="text-green-500 mr-2">
            <FiPlusCircle className="text-[#000000]" />
          </button>

          {slots.length > 1 && (
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 ml-2"
            >
              <HiOutlineMinusCircle className="text-[#000000]" />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimeSlotManager;
