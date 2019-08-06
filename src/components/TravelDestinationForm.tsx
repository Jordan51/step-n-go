import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

interface State {
  country: string;
  city: string;
  address: string;
}

const TravelDestinationForm: React.FC = () => {
  const classes = useStyles();
  const [travelDestination, setTravelDestination] = React.useState<State>({
    country: "",
    city: "",
    address: ""
  });

  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTravelDestination({ ...travelDestination, [name]: event.target.value });
  };

  return (
    <Box m={2}>
      <Typography variant="h5">Destination</Typography>
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
              value={travelDestination.country}
              onChange={handleChange("country")}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="travel-destination-city"
              label="Ville"
              className={classes.textField}
              value={travelDestination.city}
              onChange={handleChange("city")}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="travel-destination-address"
              label="Adresse"
              className={classes.textField}
              value={travelDestination.address}
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
      // marginLeft: theme.spacing(1),
      // marginRight: theme.spacing(1)
    }
  })
);

export default TravelDestinationForm;
