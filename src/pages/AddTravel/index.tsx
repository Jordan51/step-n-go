import React from "react";

// Components
import TravelNameForm, { isTravelNameFormValid } from "./TravelNameForm";
import TravelCategoryForm, {
  isTravelCategoryFormValid
} from "./TravelCategoryForm";
import TravelDepartureAndDestinationForm, {
  isTravelDepartureAndDestinationFormValid
} from "./TravelDepartureAndDestinationForm";
import TravelTransportAndHousingForm from "./TravelTransportAndAccommodationForm";
import {
  TravelContext,
  defaultTravel,
  TravelType
} from "../Travel/TravelContext";
import {
  TransportType,
  isTravelTransportFormValid
} from "../../types/Transport";
import {
  AccommodationType,
  isTravelAccommodationFormValid
} from "../../types/Accommodation";
import { PATH_TRAVEL } from "../Travel";

import { DisplayResolution } from "../../components/DisplayResolution";
import { Link } from "react-router-dom";

// Material-ui
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepButton,
  Button,
  Typography,
  Box,
  Container,
  Hidden
} from "@material-ui/core/";

export const PATH_ADD_TRAVEL = "/addTravel";

const steps = [
  "Nom / dates du voyage",
  "Type de voyage",
  "Départ / Destination",
  "Transport / Hébergement"
];

function totalSteps(): number {
  return steps.length;
}

function getStepContent(step: number): JSX.Element {
  switch (step) {
    case 0:
      return <TravelNameForm />;
    case 1:
      return <TravelCategoryForm />;
    case 2:
      return <TravelDepartureAndDestinationForm />;
    case 3:
      return <TravelTransportAndHousingForm />;
    default:
      return <p>Unknown step</p>;
  }
}

export const useStateWithLocalStorage = (
  localStorageKey: string,
  defaultValue: {} | []
) => {
  const [value, setValue] = React.useState<any>(
    !!localStorage.getItem(localStorageKey)
      ? JSON.parse(localStorage.getItem(localStorageKey) as string)
      : defaultValue
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [localStorageKey, value]);

  return [value, setValue];
};

const AddTravel = () => {
  const classes = useStyles();
  const [travel, setTravel] = useStateWithLocalStorage("travel", defaultTravel);
  const [activeStep, setActiveStep] = useStateWithLocalStorage(
    "currentStep",
    0
  );
  const [completed, setCompleted] = useStateWithLocalStorage("stepsCompleted", [
    false,
    false,
    false,
    false
  ]);

  // FIXME: Find solution to remove this line (localstorage won't update the stepsCompleted stored value)
  localStorage.setItem("stepsCompleted", JSON.stringify(completed));

  const updateTravel = React.useMemo(
    () => (newTravel: TravelType) => {
      setTravel(newTravel);
    },
    [setTravel]
  );

  const travelProviderValue = React.useMemo(() => ({ travel, updateTravel }), [
    travel,
    updateTravel
  ]);

  function completedSteps() {
    return completed.filter((isStepCompleted: boolean) => isStepCompleted)
      .length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }

  function handleNext() {
    const newActiveStep = !allStepsCompleted()
      ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        // steps.findIndex((step, i) => !(i in completed))
        isLastStep()
        ? completed.indexOf(false)
        : completed.findIndex((e: boolean, index: number) => {
            return index > activeStep && e === false;
          })
      : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  function handleBack() {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step);
    const newCompleted = completed;
    completed[activeStep] = isStepValid();
    setCompleted(newCompleted);
  };

  function handleComplete() {
    const newCompleted = completed;
    completed[activeStep] = isStepValid();
    setCompleted(newCompleted);
    handleNext();
  }

  function isStepValid(): boolean {
    switch (activeStep) {
      case 0:
        return isTravelNameFormValid(
          travel.name,
          travel.depDate,
          travel.retDate
        );
      case 1:
        return isTravelCategoryFormValid(
          travel.type,
          travel.nbPers,
          travel.category
        );
      case 2:
        return isTravelDepartureAndDestinationFormValid(
          travel.departure,
          travel.destination
        );
      case 3:
        return (
          (travel.transports.length > 0 || travel.accommodations.length > 0) &&
          (travel.transports.length === 0 ||
            travel.transports.filter((t: TransportType) => {
              return isTravelTransportFormValid(t);
            }).length > 0) &&
          (travel.accommodations.length === 0 ||
            travel.accommodations.filter((a: AccommodationType) => {
              return isTravelAccommodationFormValid(a);
            }).length > 0)
        );
      default:
        return false;
    }
  }

  return (
    <TravelContext.Provider value={travelProviderValue}>
      <div className={classes.root}>
        <div style={{ backgroundColor: "#fff" }}>
          <Container>
            <Stepper
              nonLinear
              activeStep={activeStep}
              className={classes.stepper}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton
                    onClick={handleStep(index)}
                    completed={completed[index]}
                  >
                    <Hidden xsDown>{label}</Hidden>
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Container>
        </div>
        <>
          <Typography style={{ textAlign: "center" }}>{travel.id}</Typography>
          <Container className={classes.stepContainer}>
            {getStepContent(activeStep)}
          </Container>
          <Box className={classes.actionsButtonsContainer}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
            >
              Précédent
            </Button>
            {(completedSteps() === totalSteps() - 1 &&
              !completed[activeStep]) ||
            allStepsCompleted() ? (
              <Button
                disabled={!isStepValid()}
                variant="contained"
                color="primary"
                className={classes.button}
                component={Link}
                to={`${PATH_TRAVEL}/${travel.id}`}
              >
                Terminer
              </Button>
            ) : (
              <Button
                disabled={!isStepValid()}
                variant="contained"
                color="primary"
                onClick={handleComplete}
                className={classes.button}
              >
                Continuer
              </Button>
            )}
          </Box>
        </>
      </div>
      <DisplayResolution />
    </TravelContext.Provider>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    stepper: {
      marginBottom: theme.spacing(4),
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(2)
      }
    },
    button: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(1)
    },
    completed: {
      display: "inline-block"
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    stepContainer: {
      [theme.breakpoints.up("sm")]: {
        minHeight: "300px"
      },
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: theme.spacing(4)
    },
    actionsButtonsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: theme.spacing(-2),
      marginBottom: theme.spacing(4)
    }
  })
);

export default AddTravel;
