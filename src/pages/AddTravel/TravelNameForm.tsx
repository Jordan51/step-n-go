import React from "react";

import { TravelContext } from "../Travel/TravelContext";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";

const TravelNameForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);
  // const [travelName, setTravelName] = React.useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTravelName: string = !!event.target.value
      ? event.target.value
      : "";
    updateTravel({ ...travel, name: newTravelName });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h6">Nouveau voyage</Typography>
      <Divider />
      <Paper className={classes.paper}>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            id="travel-name"
            label="Nom"
            className={classes.textField}
            value={travel.name}
            onChange={handleChange}
            margin="normal"
          />
        </form>
      </Paper>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    },
    paper: {
      padding: theme.spacing(1, 2, 2),
      marginTop: theme.spacing(1)
    },
    form: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "350px",
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    }
  })
);

export default TravelNameForm;
