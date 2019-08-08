import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { TravelContext } from "./TravelContext";

const TravelNameForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);
  // const [travelName, setTravelName] = React.useState<string>("");

  const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTravelName: string = !!event.target.value
      ? event.target.value
      : "";
    updateTravel({ ...travel, name: newTravelName });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="travel-name"
        label="Nom du voyage"
        className={classes.textField}
        value={travel.name}
        onChange={handleChange()}
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
      width: "350px"
    }
  })
);

export default TravelNameForm;
