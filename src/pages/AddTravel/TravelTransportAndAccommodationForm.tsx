import React from "react";

import TravelTransportForm, {
  TransportType,
  defaultTransport
} from "./TravelTransportForm";
import { TravelContext } from "./TravelContext";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import AddIcon from "@material-ui/icons/Add";
import TravelAccommodationForm, {
  AccommodationType,
  defaultAccommodation
} from "./TravelAccommodationForm";

// TODO: Deleting step button
// TODO: Sorting the steps according to the transport's departure dates and accommodation's arrival dates
// TODO: (console error in Chrome) React does not recognize the `hiddenLabel`?

export type TransportsType = TransportType[];
export type AccommodationsType = AccommodationType[];

// type TransportsAndAccommodationsType = TransportsType & AccommodationsType;

type TAAType = {
  type: "transport" | "accommodation";
  data: TransportType | AccommodationType;
  date: Date;
};

const TravelTransportAndAccommodationForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);
  const [TAA, setTAA] = React.useState<TAAType[]>([
    { type: "transport", data: defaultTransport, date: new Date() }
  ]);

  // travel.transports.map(t =>
  //   TAA.push({ type: "transport", data: t, date: t.depDate as Date })
  // );
  // travel.accommodations.map(a =>
  //   TAA.push({ type: "accommodation", data: a, date: a.arrDate as Date })
  // );

  // TAA.sort((a, b) => {
  //   return a.date.getDate() - b.date.getDate();
  // });

  const addDefaultTransport = () => {
    const newTransports: TransportsType = travel.transports;
    newTransports.push(defaultTransport);

    const newTAA: TAAType[] = TAA;
    newTAA.push({
      type: "transport",
      data: defaultTransport,
      date: defaultTransport.depDate
    });

    setTAA(newTAA);
    updateTravel({ ...travel, transports: newTransports });
  };

  const addDefaultAccommodation = () => {
    const newAccommodation: AccommodationsType = travel.accommodations;
    newAccommodation.push(defaultAccommodation);

    const newTAA: TAAType[] = TAA;
    newTAA.push({
      type: "accommodation",
      data: defaultAccommodation,
      date: defaultAccommodation.arrDate
    });

    setTAA(newTAA);
    updateTravel({ ...travel, accommodations: newAccommodation });
  };

  function deleteTransport(id: string) {
    const newTransports = travel.transports;
    newTransports.filter(t => t.id !== id);

    console.log(
      "Old:",
      travel.transports.length,
      "/ New:",
      newTransports.length
    );

    updateTravel({ ...travel, transports: newTransports });
  }

  let transportCounter = 0;
  let accommodationCounter = 0;

  return (
    <Box className={classes.root}>
      <Box>
        {TAA.map((e, idx) => {
          switch (e.type) {
            case "transport":
              return (
                <TravelTransportForm
                  key={idx}
                  index={transportCounter++}
                  handleDelete={() => deleteTransport(e.data.id)}
                />
              );
            case "accommodation":
              return (
                <TravelAccommodationForm
                  key={idx}
                  index={accommodationCounter++}
                />
              );
            default:
              return;
          }
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
