import React from "react";

// FIXME: -- IMPORTANT: TravelID (1/3) --
// The TravelContext should only be used for development purposes
// It MUST be replaced later on by a real travel from the DB by its id (passed on with the url)
// ====================================================================================================<<< [START]
import { TravelContext, defaultTravel, TravelType } from "./TravelContext";
import { useStateWithLocalStorage } from "../AddTravel";
// ===================================================================================================>>> [END]

import {
  dateToShortString,
  dateToFullString,
  sortTAAEventsByDates
} from "../../scripts/dateFormatter";

import { TransportType } from "../AddTravel/TravelTransportForm";
import { AccommodationType } from "../AddTravel/TravelAccommodationForm";

import {
  Theme,
  makeStyles,
  createStyles,
  Box,
  Typography
} from "@material-ui/core";

export const PATH_TRAVEL = "/travel";

const Travel: React.FC<{ match: { params: { id: string } } }> = ({ match }) => {
  const classes = useStyles();

  // FIXME: -- IMPORTANT: TravelID (2/3) --
  // ============================================================================================<<< [START]
  const [travel, setTravel] = React.useState<TravelType>(
    JSON.parse(localStorage.getItem("travel") as string)
  );

  // ===========================================================================================>>> [END]
  // const travel = getTravelById(match.params.id);

  const TAA: Array<TransportType | AccommodationType> = sortTAAEventsByDates([
    ...travel.transports,
    ...travel.accommodations
  ]);

  const steps = TAA.length;

  return (
    // FIXME: -- IMPORTANT: TravelID (3/3) --
    <Box>
      <Typography variant={"h3"}>{travel.name}</Typography>
      <Box marginTop={2}>
        <Typography>
          Destination : {travel.destination.city} ({travel.destination.country})
        </Typography>
        <Typography>Du {dateToShortString(travel.depDate)}</Typography>
        <Typography>Au {dateToShortString(travel.retDate)}</Typography>
      </Box>
      <Box marginTop={2}>
        {steps > 0 ? (
          <Typography>Etapes de prévues : {steps}</Typography>
        ) : (
          <Typography>Vous n'avez aucune étape de prévue</Typography>
        )}
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default Travel;
