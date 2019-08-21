import React from "react";

// FIXME: -- IMPORTANT: TravelID (1/3) --
// The TravelContext should only be used for development purposes
// It MUST be replaced later on by a real travel from the DB by its id (passed on with the url)
// ====================================================================================================<<< [START]
import { TravelContext, defaultTravel, TravelType } from "./TravelContext";
import { useStateWithLocalStorage } from "../AddTravel";
// ===================================================================================================>>> [END]

import {
  dateToShortString,
  dateToFullString,
  sortTAAEventsByDates,
  timeToShortString
} from "../../scripts/dateFormatter";

import {
  TransportType,
  TransportNames
} from "../AddTravel/TravelTransportForm";
import {
  AccommodationType,
  AccommodationNames
} from "../AddTravel/TravelAccommodationForm";

import {
  Theme,
  makeStyles,
  createStyles,
  Box,
  Typography,
  Stepper,
  Step,
  StepContent,
  Paper,
  Container,
  StepButton,
  StepLabel,
  StepConnector
} from "@material-ui/core";
import { styled, withStyles } from "@material-ui/styles";

import FlightIcon from "@material-ui/icons/Flight";
import TaxiIcon from "@material-ui/icons/LocalTaxi";
import CarIcon from "@material-ui/icons/DirectionsCar";
import BoatIcon from "@material-ui/icons/DirectionsBoat";
import BusIcon from "@material-ui/icons/DirectionsBus";
import TrainIcon from "@material-ui/icons/Train";

import HotelIcon from "@material-ui/icons/Hotel";
import { TentIcon } from "../../icons/";

import ErrorIcon from "@material-ui/icons/Error";

export const PATH_TRAVEL = "/travel";

function getStepContent(step: number): string {
  switch (step) {
    case 0:
      return `Step 0`;
    case 1:
      return `Step 1`;
    case 2:
      return `Step 3`;
    default:
      return "Unknown step";
  }
}

// function getStepIcon(step: TransportType | AccommodationType): JSX.Element {
const StepIcon: React.FC<{
  step: TransportType | AccommodationType;
}> = ({ step }) => {
  const mode: TransportNames | AccommodationNames = step.mode;
  let icon = <ErrorIcon />;
  switch (mode) {
    // TRANSPORT
    case "Avion":
      icon = <FlightIcon style={{ transform: "rotate(45deg)" }} />;
      break;
    case "Bateau":
      icon = <BoatIcon />;
      break;
    case "Bus":
      icon = <BusIcon />;
      break;
    case "Taxi":
      icon = <TaxiIcon />;
      break;
    case "Voiture":
      icon = <CarIcon />;
      break;
    case "Train":
      icon = <TrainIcon />;
      break;
    // ACCOMMODATION
    case "Hotel":
      icon = <HotelIcon />;
      break;
    case "Camping":
      icon = <TentIcon />;
      break;
    // DEFAULT
    default:
      icon = <ErrorIcon />;
  }

  const classes = useStyles();
  return <div className={`${classes.stepIcon}`}>{icon}</div>;
  // <FlightIcon style={{ transform: "rotate(45deg)" }} />
  // <TentIcon />
};

// const MyStepConnector = makeStyles((theme: Theme) => ({
//   alternativeLabel: {
//     top: 10,
//     left: "calc(-50% + 16px)",
//     right: "calc(50% + 16px)"
//   },
//   active: {
//     "& $line": {
//       borderColor: "#784af4"
//     }
//   },
//   completed: {
//     "& $line": {
//       borderColor: "#784af4"
//     }
//   },
//   line: {
//     marginLeft: "6.5px",
//     borderColor: theme.palette.primary.main,
//     borderRadius: "1px",
//     borderLeftWidth: "2px"
//   }
// }))(StepConnector);

const Travel: React.FC<{ match: { params: { id: string } } }> = ({ match }) => {
  const classes = useStyles();

  // FIXME: -- IMPORTANT: TravelID (2/3) --
  // ============================================================================================<<< [START]
  const [travel, setTravel] = React.useState<TravelType>(
    JSON.parse(localStorage.getItem("travel") as string)
  );

  // ===========================================================================================>>> [END]
  // const travel = getTravelById(match.params.id);

  // TODO: Add activities! (TAB 1: Transports + Accommodations, TAB 2: Activities)
  const [activeStep, setActiveStep] = React.useState(0);
  const TAA: Array<TransportType | AccommodationType> = sortTAAEventsByDates([
    ...travel.transports,
    ...travel.accommodations
  ]);
  const steps = TAA;

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  function isStepComplete(step: number) {
    return false;
  }

  return (
    // FIXME: -- IMPORTANT: TravelID (3/3) --
    <Container>
      <Box marginTop={2}>
        <Typography variant={"h3"}>{travel.name}</Typography>
        <Box marginTop={2}>
          <Typography>
            {travel.destination.city} ({travel.destination.country})
          </Typography>
          <Typography>
            {dateToFullString(travel.depDate)} -{" "}
            {dateToFullString(travel.retDate)}
          </Typography>
        </Box>
      </Box>
      <Box marginTop={2}>
        {steps.length === 0 ? (
          <Typography>Vous n'avez aucune étape de prévue</Typography>
        ) : (
          <Box className={classes.root}>
            <Typography>Etapes de prévues : {steps.length}</Typography>
            {/* ============================================================================== */}
            <Stepper
              nonLinear
              activeStep={activeStep}
              orientation="vertical"
              connector={<StepConnector className={classes.stepConnector} />}
            >
              {steps.map((step, index) => (
                <Box>
                  <Typography>{dateToFullString(step.dateA)}</Typography>
                  <Step key={step.id}>
                    <StepLabel
                      onClick={handleStep(index)}
                      completed={isStepComplete(index)}
                      // StepIconComponent={() => getStepIcon(step)}
                      StepIconComponent={() => <StepIcon step={step} />}
                      className={classes.stepLabel}
                    >
                      {step.type === "transport" ? (
                        <Typography>{timeToShortString(step.hourA)}</Typography>
                      ) : (
                        <Typography>{timeToShortString(step.hourB)}</Typography>
                      )}
                    </StepLabel>
                    <StepContent>{/* Step content HERE */}</StepContent>
                  </Step>
                </Box>
              ))}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
              </Paper>
            )}
            {/* ============================================================================== */}
          </Box>
        )}
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // width: "90%"
    },
    stepLabel: {
      width: "min-content",
      display: "flex",
      flexDirection: "row-reverse",
      color: "white"
    },
    stepIcon: {
      marginLeft: theme.spacing(2),
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.primary.main
    },
    stepConnector: {
      marginLeft: "75px"
    },
    actionsContainer: {
      marginBottom: theme.spacing(2)
    },
    resetContainer: {
      padding: theme.spacing(3)
    }
  })
);

export default Travel;
