import React from "react";

import { TravelContext, generateID } from "../Travel/TravelContext";
import { areStringsValid } from "../../scripts/inputTests";
import {
  CustomDatePicker,
  CustomTimePicker
} from "../../components/DateTimePicker";

import clsx from "clsx";

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

type AccommodationNames = "Camping" | "Hotel" | "";

const accommodationTypes: AccommodationNames[] = ["Camping", "Hotel"];

export type AccommodationType = {
  type: "accommodation";
  id: string;
  accommodation: AccommodationNames | "";
  location: string;
  arrDate: Date;
  arrHour: Date;
  depDate: Date;
  depHour: Date;
  price: number | "";
  nbPers: number;
  commentary: string;
};

export const defaultAccommodation: AccommodationType = {
  type: "accommodation",
  id: generateID("acdID"),
  accommodation: "",
  location: "",
  arrDate: new Date(),
  arrHour: new Date(),
  depDate: new Date(),
  depHour: new Date(),
  price: "",
  nbPers: 1,
  commentary: ""
};

export function isTravelAccommodationFormValid(
  accommodation: AccommodationType
): boolean {
  return (
    !!accommodation &&
    areStringsValid([accommodation.accommodation, accommodation.location])
  );
}

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

  if (
    new Date(accommodation.depDate).getTime() <
    new Date(accommodation.arrDate).getTime()
  ) {
    updateDate("depDate", accommodation.arrDate);
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
              id="travel-accommodation"
              select
              value={accommodation.accommodation}
              onChange={handleChange("accommodation")}
              margin="dense"
              variant="outlined"
              className={clsx(classes.textField, classes.dense)}
              label="Hébergement"
              helperText="Type d'hébergement"
              inputProps={{ "aria-label": "dense hidden label" }}
            >
              {accommodationTypes.map((accommodation, idx) => (
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
              value={accommodation.arrDate}
              onChange={date => {
                updateDate("arrDate", date as Date);
              }}
              inputVariant="outlined"
              helperText="Date d'arrivée"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <CustomDatePicker
              id="travel-accommodation-departure-date"
              value={accommodation.depDate}
              onChange={date => {
                updateDate("depDate", date as Date);
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
