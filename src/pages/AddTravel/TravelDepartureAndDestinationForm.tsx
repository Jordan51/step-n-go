import React from "react";

import TravelDepartureForm from "./TravelDepartureForm";
import TravelDestinationForm from "./TravelDestinationForm";
import { areStringsValid } from "../../scripts/inputTests";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import ArrowRight from "@material-ui/icons/ArrowRightAlt";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

export type DepartureAndDestinationType = {
  country: string;
  city: string;
  address: string;
};

export const defaultDepartureAndDestination = {
  country: "",
  city: "",
  address: ""
};

export function isTravelDepartureAndDestinationFormValid(
  departure: DepartureAndDestinationType,
  destination: DepartureAndDestinationType
): boolean {
  return (
    !!departure &&
    !!destination &&
    areStringsValid([
      ...Object.values(departure),
      ...Object.values(destination)
    ])
  );
}

const TravelDepartureAndDestinationForm: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} sm={10} md={5}>
        <TravelDepartureForm />
      </Grid>
      <Hidden smDown>
        <ArrowRight style={{ marginTop: 48 }} />
      </Hidden>
      <Grid item xs={12} sm={10} md={5}>
        <TravelDestinationForm />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // maxWidth: 1200
    }
  })
);

export default TravelDepartureAndDestinationForm;
