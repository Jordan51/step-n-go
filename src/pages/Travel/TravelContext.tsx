import React from "react";
import {
  TravelCategoryType,
  TravelTypeType
} from "../AddTravel/TravelTypeForm";
import {
  DepartureAndDestinationType,
  defaultDepartureAndDestination
} from "../AddTravel/TravelDepartureAndDestinationForm";
import {
  TransportsType,
  AccommodationsType
} from "../AddTravel/TravelTransportAndAccommodationForm";
import { defaultTransport } from "../../types/travel/transport/Transport";

export type TravelType = {
  id: string;
  name: string;
  type: TravelTypeType | null;
  nbPers: number;
  category: TravelCategoryType | null;
  departure: DepartureAndDestinationType;
  destination: DepartureAndDestinationType;
  depDate: Date;
  retDate: Date;
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
  type: null,
  category: null,
  nbPers: -1,
  departure: defaultDepartureAndDestination,
  destination: defaultDepartureAndDestination,
  depDate: new Date(),
  retDate: new Date(),
  transports: [defaultTransport],
  accommodations: [],
  activities: null
};

export const TravelContext = React.createContext({
  travel: defaultTravel,
  updateTravel: (travel: TravelType) => {}
});
