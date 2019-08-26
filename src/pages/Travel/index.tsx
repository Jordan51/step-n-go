import React from "react";

// FIXME: -- IMPORTANT: TravelID (1/3) --
// The TravelContext should only be used for development purposes
// It MUST be replaced later on by a real travel from the DB by its id (passed on with the url)
// ====================================================================================================<<< [START]
import { TravelType } from "./TravelContext";
// ===================================================================================================>>> [END]

import {
  dateToFullString,
  sortTAAEventsByDates,
  timeToShortString
} from "../../scripts/dateFormatter";

import { TransportType } from "../../types/travel/transport/Transport";
import { AccommodationType } from "../../types/travel/Accommodation";

import {
  Theme,
  makeStyles,
  createStyles,
  Box,
  Typography,
  Stepper,
  Step,
  Paper,
  Container,
  Divider
} from "@material-ui/core";
// import { styled, withStyles } from "@material-ui/styles";

import FlightIcon from "@material-ui/icons/Flight";
import TaxiIcon from "@material-ui/icons/LocalTaxi";
import CarIcon from "@material-ui/icons/DirectionsCar";
import BoatIcon from "@material-ui/icons/DirectionsBoat";
import BusIcon from "@material-ui/icons/DirectionsBus";
import TrainIcon from "@material-ui/icons/Train";
import HotelIcon from "@material-ui/icons/Hotel";
import EuroIcon from "@material-ui/icons/EuroSymbol";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import WalletIcon from "@material-ui/icons/AccountBalanceWallet";
import { TentIcon } from "../../icons/";

import Flight from "./Flight";

export const PATH_TRAVEL = "/travel";

const icons: { [mode: string]: React.ReactElement } = {
  // TRANSPORT
  Avion: <FlightIcon style={{ transform: "rotate(45deg)" }} />,
  Bateau: <BoatIcon />,
  Bus: <BusIcon />,
  Taxi: <TaxiIcon />,
  Voiture: <CarIcon />,
  Train: <TrainIcon />,
  // ACCOMMODATION
  Hotel: <HotelIcon />,
  Camping: <TentIcon />
};

function getStepIcon(step: TransportType | AccommodationType): JSX.Element {
  // return <div className={classes.stepIcon}>{icons[step.mode]}</div>;
  return <>{icons[step.mode]}</>;
}

function getStepContent(step: TransportType | AccommodationType) {
  // : JSX.Element
  switch (step.mode) {
    // TRANSPORT
    case "Avion":
      return <Flight flight={step} />;
    case "Bateau":
      return;
    case "Bus":
      return;
    case "Taxi":
      return;
    case "Voiture":
      return;
    case "Train":
      return;
    // ACCOMMODATION
    case "Hotel":
      return;
    case "Camping":
      return;
    // DEFAULT
    default:
      return;
  }
}

function getStepStatus(step: TransportType | AccommodationType): JSX.Element {
  const iconStyle = {
    marginTop: -2,
    marginLeft: 6
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <Typography>{step.nbPers}</Typography>
        {step.nbPers === 1 ? (
          <PersonIcon style={iconStyle} />
        ) : (
          <GroupIcon style={iconStyle} />
        )}
      </div>
      <div style={{ display: "flex" }}>
        <Typography>{!!step.price ? step.price : "--"}</Typography>
        <EuroIcon style={iconStyle} />
      </div>
      <div style={{ display: "flex" }}>
        <Typography>{step.hasBeenPayed ? "Payé" : "Impayé"}</Typography>
        <WalletIcon style={iconStyle} />
      </div>
    </>
  );
}

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

  const handleStep = (stepNumber: number) => () => {
    setActiveStep(stepNumber);
  };

  function isStepComplete(stepNumber: number) {
    return false;
  }

  return (
    // FIXME: -- IMPORTANT: TravelID (3/3) --
    <Container style={{ marginBottom: "70px" }}>
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
          <>
            <Typography>Etapes de prévues : {steps.length}</Typography>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              orientation="vertical"
              style={{ paddingBottom: 0 }}
              connector={null}
            >
              {steps.map((step, index) => {
                const prevStep = index > 0 ? steps[index - 1] : null;
                const showDate =
                  !prevStep ||
                  new Date(prevStep.dateA).setHours(0, 0, 0, 0) !==
                    new Date(step.dateA).setHours(0, 0, 0, 0);

                return (
                  <Step key={step.id} className={classes.stepContainer}>
                    {showDate && (
                      <Box marginBottom={1} className={classes.stepDate}>
                        <Typography>{dateToFullString(step.dateA)}</Typography>
                      </Box>
                    )}
                    <Step className={classes.step}>
                      {/* <StepLabel
                        StepIconComponent={() => getStepIcon(step)}
                        className={classes.stepLabel}
                      > */}
                      {index < steps.length - 1 && (
                        <div className={classes.stepConnector} />
                      )}
                      <Box>
                        <Box className={classes.stepLabel}>
                          <div className={classes.stepIcon}>
                            {getStepIcon(step)}
                          </div>
                          <Typography className={classes.stepHour}>
                            {step.type === "transport"
                              ? `
                              ${timeToShortString(step.hourA)}`
                              : ""}
                          </Typography>
                        </Box>
                      </Box>
                      {/* </StepLabel> */}
                      <Box className={classes.stepContent}>
                        {getStepContent(step)}
                      </Box>
                      <Box className={classes.stepStatus}>
                        {getStepStatus(step)}
                      </Box>
                    </Step>
                    <Divider />
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length && (
              <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
              </Paper>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepContainer: {
      width: "100%"
    },
    step: {
      margin: theme.spacing(2, 1, 2, 2),
      display: "flex"
    },
    stepDate: {
      padding: theme.spacing(1, 1.5),
      backgroundColor: "lightgrey",
      borderRadius: "3px",
      zIndex: 100
    },
    stepLabel: {
      width: "min-content",
      marginRight: theme.spacing(2),
      position: "relative",
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center"
    },
    stepHour: {
      margin: 0,
      width: "60px",
      fontSize: "1.2em"
    },
    stepIcon: {
      width: "48px",
      height: "48px",
      zIndex: 100,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.palette.primary.main,
      color: "white",
      border: "4px solid white"
    },
    stepConnector: {
      top: "40px",
      left: "85.5px",
      width: "5px",
      height: "calc(100% + 40px)",
      zIndex: 0,
      position: "absolute",
      backgroundColor: theme.palette.primary.main
    },
    stepContent: {
      // marginTop: theme.spacing(1)
    },
    stepStatus: {
      right: 0,
      display: "flex",
      // padding: theme.spacing(1, 1, 1, 1.5),
      position: "absolute",
      alignItems: "flex-end",
      flexDirection: "column"
      // opacity: 0.75
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
