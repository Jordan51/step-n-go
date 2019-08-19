import React from "react";

import { TravelContext, generateID } from "../Travel/TravelContext";
import { areStringsValid } from "../../scripts/inputTests";

import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import DeleteIcon from "@material-ui/icons/Delete";

// TODO: Add controll so it is not possible to leave before you arrive!

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

  const [depDate, setDepDate] = React.useState<Date>(accommodation.depDate);
  const [arrDate, setArrDate] = React.useState<Date>(accommodation.arrDate);

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

  if (depDate < arrDate) {
    setDepDate(arrDate);
    updateDate("depDate", arrDate);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
        <form className={classes.form} noValidate autoComplete="off">
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
                SelectProps={{ MenuProps: { className: classes.menu } }}
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
              <KeyboardDatePicker
                id="travel-accommodation-arrival-date"
                className={classes.datePickers}
                margin="dense"
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                hiddenLabel
                disablePast
                autoOk
                helperText="Date d'arrivée"
                placeholder="jj/mm/aaaa"
                value={arrDate}
                onChange={date => {
                  setArrDate(date as Date);
                  updateDate("arrDate", date as Date);
                }}
                InputAdornmentProps={{ position: "end" }}
                InputProps={{
                  className: classes.dateAndTimePickerButtonInput
                }}
                KeyboardButtonProps={{
                  className: classes.dateAndTimePickerButton
                }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <KeyboardDatePicker
                id="travel-accommodation-departure-date"
                className={classes.datePickers}
                margin="dense"
                variant="inline"
                inputVariant="outlined"
                format="dd/MM/yyyy"
                InputAdornmentProps={{ position: "end" }}
                hiddenLabel
                disablePast
                autoOk
                helperText="Date de départ"
                placeholder="jj/mm/aaaa"
                value={depDate}
                onChange={date => {
                  setDepDate(date as Date);
                  updateDate("depDate", date as Date);
                }}
                InputProps={{
                  className: classes.dateAndTimePickerButtonInput
                }}
                KeyboardButtonProps={{
                  className: classes.dateAndTimePickerButton
                }}
              />
            </Grid>
          </Grid>
        </form>
      </Paper>
    </MuiPickersUtilsProvider>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "relative",
      margin: theme.spacing(2, 0),
      padding: theme.spacing(1, 2)
    },
    form: {
      display: "flex",
      flexWrap: "wrap"
    },
    typoStep: {
      margin: theme.spacing(0.5, 1, 1, 0.25)
    },
    menu: {
      width: 200
    },
    textField: {
      width: "100%"
    },
    dense: {
      margin: 0
    },
    formControl: {
      width: "100%"
    },
    datePickers: {
      marginTop: 0
      // width: 150
    },
    timePickers: {
      marginTop: 0
      // width: 120
    },
    dateAndTimePickerButtonInput: {
      // backgroundColor: "blue",
      paddingRight: theme.spacing(0.5)
    },
    dateAndTimePickerButton: {
      // backgroundColor: "red",
      padding: theme.spacing(0.5)
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
