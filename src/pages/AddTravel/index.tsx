import React from "react";

// Components
import TravelNameForm from "./TravelNameForm";
import TravelCategoryForm from "./TravelCategoryForm";
import TravelDepartureAndDestinationForm from "./TravelDepartureAndDestinationForm";
import TravelTransportForm from "./TravelTransportForm";
import TravelActivitiesForm from "./TravelActivitiesForm";
import TravelRecap from "./TravelRecap";
import { TravelContext, defaultTravel, TravelType } from "./TravelContext";

// Material-ui
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { DisplayResolution } from "../../components/DisplayResolution";

const steps = [
  "Nom du voyage",
  "Type de voyage",
  "Départ/Destination",
  "Transport",
  "Activités"
];

function totalSteps() {
  return steps.length;
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <TravelNameForm />;
    case 1:
      return <TravelCategoryForm />;
    case 2:
      return <TravelDepartureAndDestinationForm />;
    case 3:
      return <TravelTransportForm />;
    case 4:
      return <TravelActivitiesForm />;
    default:
      return "Unknown step";
  }
}

const AddTravel: React.FC = () => {
  const classes = useStyles();
  const [travel, setTravel] = React.useState(defaultTravel);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );

  const updateTravel = (newTravel: TravelType) => {
    setTravel(newTravel);
  };

  const transportProviderValue = React.useMemo(
    () => ({ travel, updateTravel }),
    [travel, updateTravel]
  );

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    // console.log(completedSteps(), totalSteps());
    return completedSteps() === totalSteps();
  }

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  function handleComplete() {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  }

  function handleReset() {
    setActiveStep(0);
    setCompleted({});
  }

  return (
    <TravelContext.Provider value={transportProviderValue}>
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                completed={completed[index]}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <>
          {allStepsCompleted() ? (
            <>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset}>Reset</Button>
            </>
          ) : (
            <>
              <Box m={2} className={classes.stepContainer}>
                {getStepContent(activeStep)}
              </Box>
              <Box className={classes.actionsButtonsContainer}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Précédent
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === totalSteps() - 1 ? "Terminer" : "Continuer"}
                </Button>
                {/* {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleComplete}
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Terminer"
                        : "Continuer"}
                    </Button>
                  </>
                ))} */}
              </Box>

              <TravelRecap />
            </>
          )}
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
      minHeight: "200px",
      maxWidth: 1200,
      marginRight: "auto",
      marginLeft: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    actionsButtonsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }
  })
);

export default AddTravel;
