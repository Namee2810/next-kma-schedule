export const startTime = ["07:00", "09:35", "13:00", "15:05", "18:00"],
  endTime = ["09:30", "12:00", "15:00", "17:30", "20:30"];

export default function getTimeFromLesson([start, end]) {
  start = Math.floor(start / 3);
  let result = startTime[start];
  if (end) result += ` ⇀ ${endTime[end / 3 - 1]}`;
  return result;
}