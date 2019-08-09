import React from "react";

import DateFnsUtils from "@date-io/date-fns";
import clsx from "clsx";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import AlarmIcon from "@material-ui/icons/Alarm";

// TODO: Deleting step button
// TODO: Sorting the steps according to the departure dates
// TODO: (console error in Chrome) React does not recognize the `hiddenLabel`?

type TransportModes =
  | "Avion"
  | "Bus"
  | "Métro"
  | "Taxi"
  | "Train"
  | "Voiture"
  | "";
const transportModes: TransportModes[] = [
  "Avion",
  "Bus",
  "Métro",
  "Taxi",
  "Train",
  "Voiture"
];

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

export type TransportType = {
  depLocation: string;
  depDate: Date | null;
  depHour: Date | null;
  arrLocation: string;
  arrCity: string;
  arrDate: Date | null;
  arrHour: Date | null;
  mode: TransportModes | "";
  ref: string;
  price: number | "";
  nbPers: number;
  commentary: string;
};

type State = Array<TransportType>;

export const defaultTransport: TransportType = {
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

const initialState: State = [defaultTransport];

const Transport: React.FC<{ data: TransportType; step: number }> = ({
  data,
  step
}) => {
  const classes = useStyles();
  const [transport, setTransport] = React.useState<TransportType>(data);

  const handleChange = (name: keyof TransportType) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTransport({ ...transport, [name]: event.target.value });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box m={2} className={classes.stepContainer}>
        <Typography className={classes.typoStep}>Etape {step}</Typography>
        <IconButton
          aria-label="delete"
          className={classes.delButton}
          size="small"
          onClick={() => {
            // setTransports(transports.filter(t => t.index === idx))
            return;
          }}
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
                value={transport.depDate}
                onChange={date => setTransport({ ...transport, depDate: date })}
                InputProps={{ className: classes.dateAndTimePickerButtonInput }}
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
                value={transport.depHour}
                onChange={date => setTransport({ ...transport, depHour: date })}
                InputProps={{ className: classes.dateAndTimePickerButtonInput }}
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
                value={transport.arrDate}
                onChange={date => setTransport({ ...transport, arrDate: date })}
                InputAdornmentProps={{ position: "end" }}
                InputProps={{ className: classes.dateAndTimePickerButtonInput }}
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
                value={transport.arrHour}
                onChange={date => setTransport({ ...transport, arrHour: date })}
                InputAdornmentProps={{ position: "end" }}
                InputProps={{ className: classes.dateAndTimePickerButtonInput }}
                KeyboardButtonProps={{
                  className: classes.dateAndTimePickerButton
                }}
                keyboardIcon={<AlarmIcon />}
              />
            </Grid>
          </Grid>
        </form>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

const TravelTransportForm: React.FC = () => {
  const classes = useStyles();
  const [transports, setTransports] = React.useState<State>(initialState);

  let counter = 1;

  return (
    <Box className={classes.root}>
      <Box>
        {transports.map((transport, idx) => (
          <Paper key={idx} className={classes.paper}>
            <Transport data={transport} step={counter++} />
          </Paper>
        ))}
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        variant="extended"
        className={classes.fab}
        onClick={() => setTransports([...transports, defaultTransport])}
      >
        Ajouter une étape
        <AddIcon className={classes.extendedIcon} />
      </Fab>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      alignItems: "center"
    },
    stepContainer: {
      position: "relative"
    },
    paper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: theme.spacing(2)
    },
    form: {
      display: "flex",
      flexWrap: "wrap"
    },
    typoStep: {
      marginBottom: theme.spacing(2)
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
      top: theme.spacing(-0.5),
      right: 0
    },
    extendedIcon: {
      marginLeft: theme.spacing(1)
    }
  })
);

export default TravelTransportForm;
