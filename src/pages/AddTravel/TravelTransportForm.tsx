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

  const d0 = new Date();
  const d1 = new Date(transport.depDate);
  const d2 = new Date(travel.depDate);
  d0.setHours(0, 0, 0, 0);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  if (transports.length === 1 && d1.getTime() === d0.getTime()) {
    updateDate("depDate", travel.depDate);
  }
  if (
    new Date(transport.arrDate).getTime() <
    new Date(transport.depDate).getTime()
  ) {
    updateDate("arrDate", transport.depDate);
  }
  if (
    new Date(transport.arrHour).getTime() <
    new Date(transport.depHour).getTime()
  ) {
    updateDate("arrHour", transport.depHour);
  }

  return (
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
      <form noValidate autoComplete="off">
        {/* First line */}
        <Grid container spacing={1}>
          <Grid item xs={12} sm={2}>
            <TextField
              id="travel-transport-mean-of-transport"
              select
              value={transport.mode}
              onChange={handleChange("mode")}
              margin="dense"
              variant="outlined"
              className={clsx(classes.textField, classes.dense)}
              label="Transport"
              helperText="Moyen de transport"
              inputProps={{ "aria-label": "dense hidden label" }}
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
              id="travel-transport-departure-location"
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
            <CustomDatePicker
              id="travel-transport-departure-date"
              value={transport.depDate}
              onChange={date => {
                updateDate("depDate", date as Date);
              }}
              inputVariant="outlined"
              helperText="Date de départ"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <CustomTimePicker
              id="travel-transport-departure-hour"
              value={transport.depHour}
              onChange={date => {
                updateDate("depHour", date as Date);
              }}
              inputVariant="outlined"
              helperText="Heure de départ"
            />
          </Grid>

          {/* Second Line */}
          <Grid item xs={12} sm={2}>
            <TextField
              id="travel-transport-ref"
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
              id="travel-transport-arrival-location"
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
            <CustomDatePicker
              id="travel-transport-arrival-date"
              value={transport.arrDate}
              onChange={date => {
                updateDate("arrDate", date as Date);
              }}
              inputVariant="outlined"
              helperText="Date d'arrivée"
            />
          </Grid>
          <Grid item xs={6} sm={2}>
            <CustomTimePicker
              id="travel-transport-arrival-hour"
              value={transport.arrHour}
              onChange={date => {
                updateDate("arrHour", date as Date);
              }}
              inputVariant="outlined"
              helperText="Heure d'arrivée"
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

export default TravelTransportForm;
