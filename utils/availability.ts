interface WorkingHour {
  day: string;
  isActive: boolean;
  startTime: string;
  endTime: string;
}

export function isDateAvailable(
  date: string,
  workingHours: WorkingHour[]
): boolean {
  const selectedDate = new Date(date);
  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });

  const schedule = workingHours.find((wh) => wh.day === dayName);
  return schedule?.isActive ?? false;
}

export function getAvailableTimeRange(
  date: string,
  workingHours: WorkingHour[]
): { startTime: string; endTime: string } | null {
  const selectedDate = new Date(date);
  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });

  const schedule = workingHours.find((wh) => wh.day === dayName);

  if (!schedule?.isActive) return null;

  return {
    startTime: schedule.startTime,
    endTime: schedule.endTime,
  };
}

export function isTimeInRange(
  time: string,
  startTime: string,
  endTime: string
): boolean {
  const timeToMinutes = (t: string) => {
    const [time, period] = t.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
  };

  const timeMin = timeToMinutes(time);
  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);

  return timeMin >= startMin && timeMin <= endMin;
}

export function getDisabledDates(workingHours: WorkingHour[]): string[] {
  const inactiveDays = workingHours
    .filter((wh) => !wh.isActive)
    .map((wh) => wh.day);

  return inactiveDays;
}
