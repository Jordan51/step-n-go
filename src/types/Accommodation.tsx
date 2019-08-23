import { generateID } from "../pages/Travel/TravelContext";
import { areStringsValid } from "../scripts/inputTests";

export type AccommodationNames = "Camping" | "Hotel" | "";

export const accommodationModes: AccommodationNames[] = ["Camping", "Hotel"];

export type AccommodationType = {
  type: "accommodation";
  id: string;
  mode: AccommodationNames | "";
  location: string;
  dateA: Date;
  hourA: Date;
  dateB: Date;
  hourB: Date;
};

export const defaultAccommodation: AccommodationType = {
  type: "accommodation",
  id: generateID("acdID"),
  mode: "",
  location: "",
  dateA: new Date(),
  hourA: new Date(),
  dateB: new Date(),
  hourB: new Date()
};

export function isTravelAccommodationFormValid(
  accommodation: AccommodationType
): boolean {
  return (
    !!accommodation &&
    areStringsValid([accommodation.mode, accommodation.location])
  );
}
