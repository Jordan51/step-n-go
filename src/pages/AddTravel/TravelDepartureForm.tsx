import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { DepartureAndDestinationType } from "./TravelDepartureAndDestinationForm";
import { TravelContext } from "../Travel/TravelContext";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

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
    <Box className={classes.root}>
      <Typography variant="h6">Départ</Typography>
      <Divider />
      <Paper className={classes.paper}>
        <form className={classes.form} noValidate autoComplete="off">
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
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
      </Paper>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    paper: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(1)
    },
    form: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      width: "100%",
      margin: 0
    }
  })
);

export default TravelDepartureForm;
