"use client";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { calendarEvents } from "@/lib/data";

const localizer = momentLocalizer(moment);

// ✅ sample data (use this to test first)


const BigCalendar = () => {
  const [view, setView] = useState(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: string) => {
    setView(selectedView);
  };

  return (
    <div style={{ height: "90vh", padding: "20px" }}>
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        defaultDate={new Date(2025, 9, 31)} // ✅ Show October 31 week
        views={[Views.WORK_WEEK, Views.DAY]}
        view={view}
        onView={handleOnChangeView}
        min={new Date(2025,1,0,8,0,0)}
        max={new Date(2025,1,0,17,0,0)}
        style={{
          height: "98%",
          backgroundColor: "white",
          borderRadius: "8px",
          border: "1px solid #ddd",
        }}
      />
    </div>
  );
};

export default BigCalendar;
