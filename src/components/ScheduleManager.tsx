"use client";
import React, { useState, useEffect } from "react";
import DaySelector from "./DaySelector";
import TimeSlotManager from "./TimeSlotManager";

interface ScheduleManagerProps {
  userId: string;
}

const ScheduleManager: React.FC<ScheduleManagerProps> = ({ userId }) => {
  console.log(userId);

  const [statusMessage, setStatusMessage] = useState<string>("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [schedule, setSchedule] = useState<
    Record<string, { startTime: string; endTime: string }[]>
  >({
    Monday: [{ startTime: "09:00", endTime: "17:00" }],
    Tuesday: [{ startTime: "09:00", endTime: "17:00" }],
    Wednesday: [{ startTime: "09:00", endTime: "17:00" }],
    Thursday: [{ startTime: "09:00", endTime: "17:00" }],
    Friday: [{ startTime: "09:00", endTime: "17:00" }],
    Saturday: [{ startTime: "09:00", endTime: "17:00" }],
    Sunday: [{ startTime: "09:00", endTime: "17:00" }],
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch(`/api/schedule?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setSchedule(data);
        }
      }
    };
    fetchSchedule();
  }, [userId]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSlotChange = (
    day: string,
    index: number,
    type: "start" | "end",
    value: string
  ) => {
    const updatedSlots = [...schedule[day]];
    updatedSlots[index][type === "start" ? "startTime" : "endTime"] = value;
    setSchedule({ ...schedule, [day]: updatedSlots });
  };

  const addSlot = (day: string) => {
    const updatedSlots = [
      ...schedule[day],
      { startTime: "09:00", endTime: "17:00" },
    ];
    setSchedule({ ...schedule, [day]: updatedSlots });
  };

  const removeSlot = (day: string, index: number) => {
    const updatedSlots = schedule[day].filter((_, i) => i !== index);
    setSchedule({ ...schedule, [day]: updatedSlots });
  };

  const days = [
    { id: "S1", label: "S" },
    { id: "M", label: "M" },
    { id: "T1", label: "T" },
    { id: "W", label: "W" },
    { id: "T2", label: "T" },
    { id: "F", label: "F" },
    { id: "S2", label: "S" },
  ];

  const dayMapping: Record<string, string> = {
    M: "Monday",
    T1: "Tuesday",
    T2: "Thursday",
    W: "Wednesday",
    F: "Friday",
    S1: "Saturday",
    S2: "Sunday",
  };

  const saveAvailability = async () => {
    const selectedSchedule = selectedDays.reduce((acc, day) => {
      const fullDay = dayMapping[day];
      if (fullDay) {
        acc[fullDay] = schedule[fullDay];
      }
      return acc;
    }, {} as Record<string, { startTime: string; endTime: string }[]>);

    const response = await fetch(`/api/schedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, schedule: selectedSchedule }),
    });

    if (response.ok) {
      setStatusMessage("Schedule saved successfully!");
    } else {
      setStatusMessage("Failed to save schedule. Please try again.");
    }
  };

  const filteredSchedule = selectedDays.map((day) => dayMapping[day]);

  return (
    <div className="flex flex-col">
      <div className="p-4 border rounded-lg">
        <DaySelector
          days={days}
          selectedDays={selectedDays}
          onToggle={toggleDay}
        />
        <div className="mt-4">
          {/* Map only the filtered days */}
          {filteredSchedule.map((day) => (
            <div key={day} className="mb-4 flex flex-row gap-14">
              <div className="flex-1">
                <h3 className="font-semibold">{day}</h3>
              </div>
              <div className="flex-2 mr-4">
                <TimeSlotManager
                  slots={schedule[day]}
                  onAdd={() => addSlot(day)}
                  onRemove={(index) => removeSlot(day, index)}
                  onSlotChange={(index, type, value) =>
                    handleSlotChange(day, index, type, value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-4">
          <button
            className="px-5 py-1 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300 disabled:bg-gray-500"
            onClick={saveAvailability}
          >
            Save
          </button>
          <button
            className="px-5 py-1 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition-colors duration-300"
            onClick={() => {
              setSelectedDays([]);
              setStatusMessage("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
      <div>
        {statusMessage && (
          <div
            className={`mt-4 p-4 text-center ${
              statusMessage.includes("successfully")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleManager;
