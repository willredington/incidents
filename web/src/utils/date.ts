import { DateTime } from "luxon";

export function formatDateTime(isoDateString: string) {
  return DateTime.fromISO(isoDateString).toFormat("yyyy-MM-dd hh:mm:ss a");
}
