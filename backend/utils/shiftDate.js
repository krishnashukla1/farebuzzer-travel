import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export const getShiftDate = () => {
  const now = dayjs().tz("Asia/Kolkata");

  // Shift starts at 3 PM IST
  if (now.hour() < 15) {
    return now.subtract(1, "day").format("YYYY-MM-DD");
  }
  return now.format("YYYY-MM-DD");
};
