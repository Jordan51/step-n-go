import { TransportType } from "../pages/AddTravel/TravelTransportForm";
import { AccommodationType } from "../pages/AddTravel/TravelAccommodationForm";

function addLeadingZero(e: number | string): string {
  const nb = typeof e === "string" ? parseInt(e) : e;
  if (isNaN(nb)) return e.toString();
  return nb < 10 ? `0${nb}` : nb.toString();
}

export function timeToShortString(d: Date): string {
  const date = new Date(d);
  return `${addLeadingZero(date.getHours())}:${addLeadingZero(
    date.getMinutes()
  )}`;
}

export function dateToShortString(d: Date): string {
  const date = new Date(d);
  return `${addLeadingZero(date.getDate())}/${addLeadingZero(
    date.getMonth() + 1
  )}/${date.getFullYear()}`;
}

export function dateToFullString(d: Date): string {
  const date = new Date(d);
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  return `${date.toLocaleDateString("fr-FR", options)}`;
}

export function sortTAAEventsByDates(
  events: Array<TransportType | AccommodationType>
): Array<TransportType | AccommodationType> {
  const newValues = events.sort((a, b) => {
    const date1 = a.dateA;
    const date2 = b.dateB;

    const time1 = a.hourA;
    const time2 = b.hourB;

    const dateDiff = new Date(date1).getTime() - new Date(date2).getTime();
    const timeDiff = new Date(time1).getTime() - new Date(time2).getTime();

    // console.log("Date1:", date1 + "\n" + "Date2:", date2);
    return dateDiff === 0 ? timeDiff : dateDiff;
  });

  return newValues;
}
