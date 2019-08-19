import React from "react";

import { TravelContext, generateID } from "../Travel/TravelContext";

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
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import AlarmIcon from "@material-ui/icons/Alarm";
import DeleteIcon from "@material-ui/icons/Delete";
import { areStringsValid } from "../../scripts/inputTests";

// TODO: Add controll so it is not possible to arrive before you leave!

type TransportTypes =
  | "Avion"
  | "Bateau"
  | "Bus"
  | "Métro"
  | "Taxi"
  | "Train"
  | "Voiture"
  | "";

const transportModes: TransportTypes[] = [
  "Avion",
  "Bateau",
  "Bus",
  "Métro",
  "Taxi",
  "Train",
  "Voiture"
];

export type TransportType = {
  type: "transport";
  id: string;
  depLocation: string;
  depDate: Date;
  depHour: Date;
  arrLocation: string;
  arrCity: string;
  arrDate: Date;
  arrHour: Date;
  mode: TransportTypes | "";
  ref: string;
  price: number | "";
  nbPers: number;
  commentary: string;
};

export const defaultTransport: TransportType = {
  type: "transport",
  id: generateID("transportID"),
  depLocation: "",
  depDate: new Date(),
  depHour: new Date(),
  arrLocation: "",
  arrCity: "",
  arrDate: new Date(),
  arrHour: new Date(),
  mode: "",
  ref: "",
  price: "",
  nbPers: 1,
  commentary: ""
};

const locationExamples = [
  "Aéroport Paris Charles De Gaulle (Paris)",
  "Aéroport de Londres-Heathrow (Londres)",
  "Aéroport international John F. Kennedy (New York)",
  "Aéroport International de Hong Kong (Hong Kong)",
  "Aéroport de Porto-Francisco Sá-Carneiro (Porto)"
  // "Gare du Nord (Paris)",
  // "Gare Saint-Pancras (Londres)",
  // "Gare Lyon Perrache (Lyon)",
  // "Gare Shinjuku Station (Tokyo)",
  // "Gare Grand Central Terminal (New York)"
];

const randomLocationExample =
  locationExamples[Math.floor(Math.random() * locationExamples.length)];

export function isTravelTransportFormValid(transport: TransportType): boolean {
  return (
    !!transport &&
    areStringsValid([
      transport.mode,
      transport.depLocation,
      transport.arrLocation
    ])
  );
}

const TravelTransportForm: React.FC<{
  id: string;
  handleDelete: () => void;
}> = ({ id, handleDelete }) => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);

  const transports = travel.transports;
  const index = transports.findIndex(t => t.id === id);
  const transport = transports[index];

  const [depDate, setDepDate] = React.useState<Date>(transport.depDate);
  const [depHour, setDepHour] = React.useState<Date>(transport.depHour);
  const [arrDate, setArrDate] = React.useState<Date>(transport.arrDate);
  const [arrHour, setArrHour] = React.useState<Date>(transport.arrHour);

  const handleChange = (name: keyof TransportType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newTransport: TransportType = {
      ...transport,
      [name]: event.target.value
    };

    transports[index] = newTransport;
    updateTravel({ ...travel, transports: transports });
  };

  const updateDate = (name: keyof TransportType, date: Date) => {
    const newTransport: TransportType = {
      ...transport,
      [name]: date as Date
    };
    transports[index] = newTransport;
    updateTravel({ ...travel, transports: transports });
  };

  if (arrDate < depDate) {
    setArrDate(depDate);
    updateDate("arrDate", depDate);
  }
  if (arrHour < depHour) {
    setArrHour(depHour);
    updateDate("arrHour", depHour);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Paper className={classes.paper}>
        <Typography className={classes.typoStep}>
          Transport ({transport.id})
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
                id="travel-mean-of-transport"
                select
                value={transport.mode}
                onChange={handleChange("mode")}
                margin="dense"
                variant="outlined"
                className={clsx(classes.textField, classes.dense)}
                label="Transport"
                helperText="Moyen de transport"
                inputProps={{ "aria-label": "dense hidden label" }}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu
                  }
                }}
              >
                {transportModes.map((transport, idx) => (
                  <MenuItem key={idx} value={transport}>
                    {transport}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="travel-departure-location"
                value={transport.depLocation}
                onChange={handleChange("depLocation")}
                margin="dense"
                variant="outlined"
                className={clsx(classes.textField, classes.dense)}
                placeholder={`Ex: ${randomLocationExample}`}
                helperText="Lieu de départ"
                inputProps={{ "aria-label": "dense hidden label" }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <KeyboardDatePicker
                id="travel-departure-date"
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
            <Grid item xs={6} sm={2}>
              <KeyboardTimePicker
                id="mui-pickers-time"
                className={classes.timePickers}
                margin="dense"
                variant="inline"
                inputVariant="outlined"
                InputAdornmentProps={{ position: "end" }}
                ampm={false}
                helperText="Heure de départ"
                placeholder="hh:mm"
                value={depHour}
                onChange={date => {
                  setDepHour(date as Date);
                  updateDate("depHour", date as Date);
                }}
                InputProps={{
                  className: classes.dateAndTimePickerButtonInput
                }}
                KeyboardButtonProps={{
                  className: classes.dateAndTimePickerButton
                }}
                keyboardIcon={<AlarmIcon />}
              />
            </Grid>

            {/* Second Line */}
            <Grid item xs={12} sm={2}>
              <TextField
                id="travel-ref"
                value={transport.ref}
                onChange={handleChange("ref")}
                margin="dense"
                variant="outlined"
                className={clsx(classes.textField, classes.dense)}
                placeholder="Ex: AFR104"
                helperText="Référence"
                inputProps={{ "aria-label": "dense hidden label" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="travel-arrival-location"
                value={transport.arrLocation}
                onChange={handleChange("arrLocation")}
                margin="dense"
                variant="outlined"
                className={clsx(classes.textField, classes.dense)}
                placeholder={`Ex: ${randomLocationExample}`}
                helperText="Lieu d'arriver"
                inputProps={{ "aria-label": "dense hidden label" }}
              />
            </Grid>
            <Grid item xs={6} sm={2}>
              <KeyboardDatePicker
                id="travel-arrival-date"
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
              <KeyboardTimePicker
                id="travel-arrival-hour"
                className={classes.timePickers}
                margin="dense"
                variant="inline"
                inputVariant="outlined"
                ampm={false}
                helperText="Heure d'arrivée"
                placeholder="hh:mm"
                value={arrHour}
                onChange={date => {
                  setArrHour(date as Date);
                  updateDate("arrDate", date as Date);
                }}
                InputAdornmentProps={{ position: "end" }}
                InputProps={{
                  className: classes.dateAndTimePickerButtonInput
                }}
                KeyboardButtonProps={{
                  className: classes.dateAndTimePickerButton
                }}
                keyboardIcon={<AlarmIcon />}
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

export default TravelTransportForm;
