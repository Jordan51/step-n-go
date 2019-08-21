import React from "react";

import { TravelContext, generateID } from "../Travel/TravelContext";
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
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { areStringsValid, isStringValid } from "../../scripts/inputTests";
import { sortTAAEventsByDates } from "../../scripts/dateFormatter";
import { datePickerDefaultProps } from "@material-ui/pickers/constants/prop-types";

// TODO: (console error in Chrome) React does not recognize the `hiddenLabel`?
// TODO: Show error when a TAA period is between another one
/** Example:
 * You modify a transport arrival date from 10/09/2019 to 12/09/2019
 * But there is an accommodation after that still has that 10/09/2019 arrival date
 *
 *        Transport 08/09/2019 -> 12/09/2019
 *    Accommodation 10/09/2019 -> (whatever)
 *
 * This accommodation period is now stuck in between the previous transport date which shouldn't be possible/allowed
 */

export type TransportsType = TransportType[];
export type AccommodationsType = AccommodationType[];

const TravelTransportAndAccommodationForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);
  const TAA: Array<TransportType | AccommodationType> = sortTAAEventsByDates([
    ...travel.transports,
    ...travel.accommodations
  ]);

  const lastTransport = travel.transports[travel.transports.length - 1];
  const lastAccommodation =
    travel.accommodations[travel.accommodations.length - 1];

  const lastE = TAA.length > 0 ? TAA[TAA.length - 1] : null;
  const lastDate = !!lastE ? lastE.dateB : new Date();
  const lastHour = !!lastE
    ? lastE.hourB
    : new Date(new Date().setHours(12, 0, 0, 0));
  const lastLocation = !!lastE
    ? lastE.type === "transport"
      ? lastE.arrLocation
      : lastE.location
    : "";

  function addDefaultTransport() {
    const newTransports: TransportsType = [
      ...travel.transports,
      {
        ...defaultTransport,
        id: generateID("transportID"),
        depLocation: lastLocation,
        dateA: lastDate,
        hourA: lastHour,
        dateB: lastDate,
        hourB: lastHour
      }
    ];

    updateTravel({ ...travel, transports: newTransports });
  }

  function addDefaultAccommodation() {
    const newAccommodations: AccommodationsType = [
      ...travel.accommodations,
      {
        ...defaultAccommodation,
        id: generateID("acdID"),
        dateA: lastDate,
        hourA: lastHour,
        dateB: lastDate,
        hourB: lastHour
      }
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
      <Typography variant="h6">Transport et hébergement</Typography>
      <Divider />
      {travel.transports.length === 0 && travel.accommodations.length === 0 ? (
        <Box marginTop={3} marginBottom={3}>
          <Typography>
            Merci de renseigner au minimum un déplacement ou un hébergement.
          </Typography>
        </Box>
      ) : (
        <Box marginTop={"-8px"} minHeight={16}>
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
      )}

      <Box display="flex" flexWrap="wrap" justifyContent="center">
        <Fab
          color="primary"
          aria-label="add"
          variant="extended"
          className={classes.fab}
          onClick={addDefaultTransport}
          disabled={
            lastTransport &&
            (lastTransport.mode === "" ||
              !areStringsValid([
                lastTransport.depLocation,
                lastTransport.arrLocation
              ]))
          }
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
          disabled={
            !!lastAccommodation &&
            (lastAccommodation.mode === "" ||
              !isStringValid(lastAccommodation.location))
          }
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
      width: "100%"
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
