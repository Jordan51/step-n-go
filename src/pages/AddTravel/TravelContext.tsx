import React from "react";
import { TravellingCategoryType } from "./TravelCategoryForm";
import {
  DepartureAndDestinationType,
  defaultDepartureAndDestination
} from "./TravelDepartureAndDestinationForm";
import {
  TransportsType,
  AccommodationsType
} from "./TravelTransportAndAccommodationForm";
import { defaultTransport } from "./TravelTransportForm";
import { defaultAccommodation } from "./TravelAccommodationForm";

export type TravelType = {
  id: string;
  name: string;
  category: TravellingCategoryType;
  departure: DepartureAndDestinationType;
  destination: DepartureAndDestinationType;
  transports: TransportsType;
  accommodations: AccommodationsType;
  activities: null;
};

/**
 * https://gist.github.com/gordonbrander/2230317
 */
export function generateID(label: string) {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    label +
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

export const defaultTravel: TravelType = {
  id: generateID("travelID"),
  name: "",
  category: "",
  departure: defaultDepartureAndDestination,
  destination: defaultDepartureAndDestination,
  transports: [defaultTransport],
  accommodations: [defaultAccommodation],
  activities: null
};

export const TravelContext = React.createContext({
  travel: defaultTravel,
  updateTravel: (travel: TravelType) => {}
});
