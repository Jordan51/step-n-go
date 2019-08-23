import { generateID } from "../pages/Travel/TravelContext";
import { areStringsValid } from "../scripts/inputTests";
import { StepType, defaultStep } from "./Step";

export type TransportNames =
  | "Avion"
  | "Bateau"
  | "Bus"
  | "Métro"
  | "Taxi"
  | "Train"
  | "Voiture"
  | "";

export const transportModes: TransportNames[] = [
  "Avion",
  "Bateau",
  "Bus",
  "Métro",
  "Taxi",
  "Train",
  "Voiture"
];

export type TransportType = {
  type: "transport";
  id: string;
  mode: TransportNames | "";
  depLocation: string;
  dateA: Date; // Departure date
  hourA: Date; // Departure hour
  arrLocation: string;
  arrCity: string;
  dateB: Date; // Arrival date
  hourB: Date; // Arrival hour
  ref: string;
} & StepType;

export const defaultTransport: TransportType = {
  type: "transport",
  id: generateID("transportID"),
  depLocation: "",
  dateA: new Date(),
  hourA: new Date(),
  arrLocation: "",
  arrCity: "",
  dateB: new Date(),
  hourB: new Date(),
  mode: "",
  ref: "",
  ...defaultStep
};

const locationExamples = [
  "Aéroport Paris Charles De Gaulle (Paris)",
  "Aéroport de Londres-Heathrow (Londres)",
  "Aéroport international John F. Kennedy (New York)",
  "Aéroport International de Hong Kong (Hong Kong)",
  "Aéroport de Porto-Francisco Sá-Carneiro (Porto)"
  // "Gare du Nord (Paris)",
  // "Gare Saint-Pancras (Londres)",
  // "Gare Lyon Perrache (Lyon)",
  // "Gare Shinjuku Station (Tokyo)",
  // "Gare Grand Central Terminal (New York)"
];

export const randomLocationExample =
  locationExamples[Math.floor(Math.random() * locationExamples.length)];

export function isTravelTransportFormValid(transport: TransportType): boolean {
  return (
    !!transport &&
    areStringsValid([
      transport.mode,
      transport.depLocation,
      transport.arrLocation
    ])
  );
}
