import React from "react";

import { TravelContext } from "../Travel/TravelContext";
import { isStringValid } from "../../scripts/inputTests";
import { CustomDatePicker } from "../../components/DateTimePicker";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TextField, Paper, Typography, Box, Divider } from "@material-ui/core";

export function isTravelNameFormValid(
  name: string,
  depDate: Date,
  retDate: Date
): boolean {
  return (
    !!name &&
    isStringValid(name) &&
    new Date(depDate).getTime() < new Date(retDate).getTime()
  );
}

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

  if (new Date(travel.retDate).getTime() < new Date(travel.depDate).getTime()) {
    updateTravel({ ...travel, retDate: travel.depDate });
  }

  return (
    <Box className={classes.root}>
      <Typography variant="h6">Nouveau voyage</Typography>
      <Divider />
      <Paper className={classes.paper1}>
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
      <Box className={classes.datePickersContainer}>
        <Paper className={classes.paper2}>
          <CustomDatePicker
            id="travel-departure-date"
            helperText="Date de départ"
            value={travel.depDate}
            onChange={date => {
              if (
                [...travel.transports, ...travel.accommodations].length === 1
              ) {
                if (travel.transports.length === 1) {
                  const newTransports = travel.transports;
                  newTransports[0].depDate = date as Date;
                  newTransports[0].arrDate = date as Date;
                  updateTravel({ ...travel, transports: newTransports });
                }
                if (travel.accommodations.length === 1) {
                  const newAccommodations = travel.accommodations;
                  newAccommodations[0].arrDate = date as Date;
                  newAccommodations[0].depDate = date as Date;
                  updateTravel({
                    ...travel,
                    accommodations: newAccommodations
                  });
                }
              }
              updateTravel({ ...travel, depDate: date as Date });
            }}
          />
        </Paper>
        <Paper className={classes.paper2}>
          <CustomDatePicker
            id="travel-return-date"
            helperText="Date de retour"
            value={travel.retDate}
            onChange={date => {
              updateTravel({ ...travel, retDate: date as Date });
            }}
          />
        </Paper>
      </Box>
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
    paper1: {
      padding: theme.spacing(2, 3, 3),
      marginTop: theme.spacing(1)
    },
    paper2: {
      padding: theme.spacing(3, 3, 2),
      marginTop: theme.spacing(1),
      "&:nth-of-type(1)": {
        marginRight: theme.spacing(1),
        [theme.breakpoints.down("xs")]: {
          marginRight: 0
        }
      }
    },
    form: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      margin: theme.spacing(1, 0, 0),
      width: "100%"
      // [theme.breakpoints.down("xs")]: {
      //   width: "100%"
      // }
    },
    datePickersContainer: {
      display: "flex",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column"
      }
    }
  })
);

export default TravelNameForm;
