import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

interface State {
  country: string;
  city: string;
}

const TravelDepartureForm: React.FC = () => {
  const classes = useStyles();
  const [travelDeparture, setTravelDeparture] = React.useState<State>({
    country: "",
    city: ""
  });

  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTravelDeparture({ ...travelDeparture, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="travel-departure-country"
        label="Pays"
        className={classes.textField}
        value={travelDeparture.country}
        onChange={handleChange("country")}
        margin="normal"
      />
      <TextField
        id="travel-departure-city"
        label="Ville"
        className={classes.textField}
        value={travelDeparture.city}
        onChange={handleChange("city")}
        margin="normal"
      />
    </form>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    }
  })
);

export default TravelDepartureForm;
