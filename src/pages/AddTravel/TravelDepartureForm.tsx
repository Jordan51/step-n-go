import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { DepartureAndDestinationType } from "./TravelDepartureAndDestinationForm";
import { TravelContext } from "./TravelContext";

const TravelDepartureForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);

  const handleChange = (name: keyof DepartureAndDestinationType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDeparture: DepartureAndDestinationType = {
      ...travel.departure,
      [name]: event.target.value
    };

    updateTravel({ ...travel, departure: newDeparture });
  };

  return (
    <Box m={2}>
      <Typography variant="h5">Départ</Typography>
      <form className={classes.container} noValidate autoComplete="off">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              id="travel-departure-country"
              label="Pays"
              className={classes.textField}
              value={travel.departure.country}
              onChange={handleChange("country")}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="travel-departure-city"
              label="Ville"
              className={classes.textField}
              value={travel.departure.city}
              onChange={handleChange("city")}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="travel-departure-address"
              label="Adresse"
              className={classes.textField}
              value={travel.departure.address}
              onChange={handleChange("address")}
              margin="normal"
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      width: "100%"
    }
  })
);

export default TravelDepartureForm;
