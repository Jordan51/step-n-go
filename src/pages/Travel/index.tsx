import React from "react";

// FIXME: -- IMPORTANT: TravelID (1/3) --
// The TravelContext should only be used for development purposes
// It MUST be replaced later on by a real travel from the DB by its id (passed on with the url)
// ====================================================================================================<<< [START]
import { TravelContext, defaultTravel, TravelType } from "./TravelContext";
import { useStateWithLocalStorage } from "../AddTravel";
// ===================================================================================================>>> [END]

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

  const steps = 0;

  return (
    // FIXME: -- IMPORTANT: TravelID (3/3) --
    <Box>
      <Typography variant={"h3"}>{travel.name}</Typography>
      <Typography>Du {travel.name}</Typography>
      <Typography>Etapes de prévues : {steps} </Typography>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default Travel;
