import { useState } from "react";
import Calendar from "react-calendar";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarComponent: React.FC = () => {
  const [value, setValue] = useState<Value>(new Date());

  return (
    <div className="border border-purple-200 rounded-md px-6 py-4">
      <Calendar onChange={setValue} value={value} />
    </div>
  );
};

export default CalendarComponent;
