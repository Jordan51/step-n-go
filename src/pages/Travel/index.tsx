import React from "react";

import { TravelContext } from "./TravelContext";

import { Theme, makeStyles, createStyles } from "@material-ui/core";

export const PATH_TRAVEL = "/travel";

const Travel: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);

  return <p>holla</p>;
};

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default Travel;
