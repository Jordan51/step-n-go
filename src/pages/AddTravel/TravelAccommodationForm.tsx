import React from "react";
import clsx from "clsx";

import {
  AccommodationType,
  accommodationModes
} from "../../types/Accommodation";

import { TravelContext } from "../Travel/TravelContext";
import { CustomDatePicker } from "../../components/DateTimePicker";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Grid,
  TextField,
  IconButton,
  Paper,
  MenuItem,
  Typography
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

const TravelAccommodationForm: React.FC<{
  id: string;
  handleDelete: () => void;
}> = ({ id, handleDelete }) => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);

  const accommodations = travel.accommodations;
  const index = accommodations.findIndex(a => a.id === id);
  const accommodation = accommodations[index];

  const handleChange = (name: keyof AccommodationType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newAccommodation: AccommodationType = {
      ...accommodation,
      [name]: event.target.value
    };

    accommodations[index] = newAccommodation;
    updateTravel({ ...travel, accommodations: accommodations });
  };

  const updateDate = (name: keyof AccommodationType, date: Date) => {
    const newAccommodation: AccommodationType = {
      ...accommodation,
      [name]: date as Date
    };
    accommodations[index] = newAccommodation;
    updateTravel({ ...travel, accommodations: accommodations });
  };

  const d0 = new Date();
  const d1 = new Date(accommodation.dateA);
  const d2 = new Date(travel.depDate);
  d0.setHours(0, 0, 0, 0);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  if (accommodations.length === 1 && d1.getTime() === d0.getTime()) {
    updateDate("dateA", travel.depDate);
  }
  if (
    new Date(accommodation.dateB).getTime() <=
    new Date(accommodation.dateA).getTime()
  ) {
    const newdateB = new Date(accommodation.dateA);
    newdateB.setDate(newdateB.getDate() + 1);
    updateDate("dateB", newdateB);
  }

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.typoStep}>
        Hébergement ({accommodation.id})
      </Typography>
      <IconButton
        aria-label="delete"
        className={classes.delButton}
        size="small"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
      <form noValidate autoComplete="off">
        {/* First line */}
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}>
            <TextField
              id="travel-accommodation-mode"
              select
              value={accommodation.mode}
              onChange={handleChange("mode")}
              margin="dense"
              variant="outlined"
              className={clsx(classes.textField, classes.dense)}
              label="Hébergement"
              helperText="Type d'hébergement"
              inputProps={{ "aria-label": "dense hidden label" }}
            >
              {accommodationModes.map((accommodation, idx) => (
                <MenuItem key={idx} value={accommodation}>
                  {accommodation}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="travel-accommodation-location"
              value={accommodation.location}
              onChange={handleChange("location")}
              margin="dense"
              variant="outlined"
              className={clsx(classes.textField, classes.dense)}
              placeholder={`Ex: abc`}
              helperText="Lieu"
              inputProps={{ "aria-label": "dense hidden label" }}
            />
          </Grid>

          {/* Second Line */}

          <Grid item xs={6} sm={2}>
            <CustomDatePicker
              id="travel-accommodation-arrival-date"
              value={accommodation.dateA}
              onChange={date => {
                updateDate("dateA", date as Date);
              }}
              inputVariant="outlined"
              helperText="Date d'arrivée"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <CustomDatePicker
              id="travel-accommodation-departure-date"
              value={accommodation.dateB}
              onChange={date => {
                updateDate("dateB", date as Date);
              }}
              inputVariant="outlined"
              helperText="Date de départ"
            />
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "relative",
      margin: theme.spacing(2, 0),
      padding: theme.spacing(1, 2)
    },
    typoStep: {
      margin: theme.spacing(0.5, 1, 1, 0.25)
    },
    textField: {
      width: "100%"
    },
    dense: {
      margin: 0
    },
    fab: {
      margin: theme.spacing(1)
    },
    delButton: {
      // marginRight: theme.spacing(1),
      height: "min-content",
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1)
    },
    extendedIcon: {
      marginLeft: theme.spacing(1)
    }
  })
);

export default TravelAccommodationForm;
