import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const TravelNameForm: React.FC = () => {
  const classes = useStyles();
  const [travelName, setTravelName] = React.useState<string>("");

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTravelName(event.target.value);
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="travel-name"
        label="Nom du voyage"
        className={classes.textField}
        value={travelName}
        onChange={handleChange("name")}
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

export default TravelNameForm;
