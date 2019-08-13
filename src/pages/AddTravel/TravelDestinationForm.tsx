import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { DepartureAndDestinationType } from "./TravelDepartureAndDestinationForm";
import { TravelContext } from "./TravelContext";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const TravelDestinationForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);

  const handleChange = (name: keyof DepartureAndDestinationType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDestination: DepartureAndDestinationType = {
      ...travel.destination,
      [name]: event.target.value
    };

    updateTravel({ ...travel, destination: newDestination });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h6">Destination</Typography>
      <Divider />
      <Paper className={classes.paper}>
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
                id="travel-destination-country"
                label="Pays"
                className={classes.textField}
                value={travel.destination.country}
                onChange={handleChange("country")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="travel-destination-city"
                label="Ville"
                className={classes.textField}
                value={travel.destination.city}
                onChange={handleChange("city")}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="travel-destination-address"
                label="Adresse"
                className={classes.textField}
                value={travel.destination.address}
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
      padding: theme.spacing(1, 2, 2),
      marginTop: theme.spacing(1)
    },
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      width: "100%",
      margin: 0
    }
  })
);

export default TravelDestinationForm;
