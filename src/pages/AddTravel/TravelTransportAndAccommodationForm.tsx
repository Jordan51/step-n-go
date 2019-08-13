import React from "react";

import { TravelContext, generateID } from "./TravelContext";
import TravelTransportForm, {
  TransportType,
  defaultTransport
} from "./TravelTransportForm";
import TravelAccommodationForm, {
  AccommodationType,
  defaultAccommodation
} from "./TravelAccommodationForm";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";

// TODO: (console error in Chrome) React does not recognize the `hiddenLabel`?

export type TransportsType = TransportType[];
export type AccommodationsType = AccommodationType[];

function sortEventsByDates(
  events: Array<TransportType | AccommodationType>
): Array<TransportType | AccommodationType> {
  const newValues = events.sort((a, b) => {
    const date1 = a.type === "transport" ? a.depDate : a.arrDate;
    const date2 = b.type === "transport" ? b.depDate : b.arrDate;
    // console.log("Date1:", date1 + "\n" + "Date2:", date2);
    return new Date(date1).getTime() - new Date(date2).getTime();
  });

  return newValues;
}

const TravelTransportAndAccommodationForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);
  const TAA: Array<TransportType | AccommodationType> = sortEventsByDates([
    ...travel.transports,
    ...travel.accommodations
  ]);

  function addDefaultTransport() {
    const newTransports: TransportsType = [
      ...travel.transports,
      { ...defaultTransport, id: generateID("transportID") }
    ];

    updateTravel({ ...travel, transports: newTransports });
  }

  function addDefaultAccommodation() {
    const newAccommodations: AccommodationsType = [
      ...travel.accommodations,
      { ...defaultAccommodation, id: generateID("acdID") }
    ];

    updateTravel({ ...travel, accommodations: newAccommodations });
  }

  function deleteTransport(id: string) {
    const newTransports = travel.transports.filter(t => t.id !== id);
    updateTravel({ ...travel, transports: newTransports });
  }

  function deleteAccommodation(id: string) {
    const newAccommodations = travel.accommodations.filter(a => a.id !== id);
    updateTravel({ ...travel, accommodations: newAccommodations });
  }

  return (
    <Box className={classes.root}>
      <Box>
        {TAA.map(e => {
          return e.type === "transport" ? (
            <TravelTransportForm
              key={e.id}
              id={e.id}
              handleDelete={() => deleteTransport(e.id)}
            />
          ) : (
            <TravelAccommodationForm
              key={e.id}
              id={e.id}
              handleDelete={() => deleteAccommodation(e.id)}
            />
          );
        })}
      </Box>

      <Box display="flex">
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          className={classes.fab}
          onClick={addDefaultTransport}
          // disabled={!canAddDefaultTransport()}
        >
          Ajouter un déplacement
          <AddIcon className={classes.extendedIcon} />
        </Fab>
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          className={classes.fab}
          onClick={addDefaultAccommodation}
          // disabled={!canAddDefaultAccommodation()}
        >
          Ajouter un hébergement
          <AddIcon className={classes.extendedIcon} />
        </Fab>
      </Box>
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

export default TravelTransportAndAccommodationForm;
