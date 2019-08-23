import { TransportType } from "./Transport";
import { AccommodationType } from "./Accommodation";
import { ActivityType } from "./Activity";

export type StepType =
  | TransportType
  | AccommodationType
  | ActivityType & {
      price: number | undefined;
      hasBeenPayed: boolean;
      hasBeenReserved: boolean;
      nbPers: number;
      commentary: string;
    };
