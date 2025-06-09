
import { format, isAfter, isBefore, isToday, addDays } from "date-fns";

interface DateStatusInfo {
  date: string;
  statusClass: string;
  statusLabel: string;
}

export const formatDateWithStatus = (dateString: string): DateStatusInfo => {
  const date = new Date(dateString);
  const today = new Date();
  const formattedDate = format(date, "MMM d, yyyy");
  const isPast = isBefore(date, today) && !isToday(date);
  const isSoon = isAfter(date, today) && isBefore(date, addDays(today, 3));

  let statusClass = "";
  let statusLabel = "";

  if (isPast) {
    statusClass = "text-gray-500";
    statusLabel = "Past";
  } else if (isToday(date)) {
    statusClass = "text-blue-600 font-medium";
    statusLabel = "Today";
  } else if (isSoon) {
    statusClass = "text-indigo-600 font-medium";
    statusLabel = "Soon";
  }

  return {
    date: formattedDate,
    statusClass,
    statusLabel
  };
};
