import React from "react";
import { TravellingCategoryType } from "./TravelCategoryForm";
import {
  DepartureAndDestinationType,
  defaultDepartureAndDestination
} from "./TravelDepartureAndDestinationForm";
import { TransportType, defaultTransport } from "./TravelTransportForm";

export type TravelType = {
  id: string;
  name: string;
  category: TravellingCategoryType;
  departure: DepartureAndDestinationType;
  destination: DepartureAndDestinationType;
  transport: TransportType[];
  activities: null;
};

/**
 * https://gist.github.com/gordonbrander/2230317
 */
const ID = function() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "travelID_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

export const defaultTravel: TravelType = {
  id: ID(),
  name: "",
  category: "",
  departure: defaultDepartureAndDestination,
  destination: defaultDepartureAndDestination,
  transport: [defaultTransport],
  activities: null
};

export const TravelContext = React.createContext({
  travel: defaultTravel,
  updateTravel: (travel: TravelType) => {}
});
