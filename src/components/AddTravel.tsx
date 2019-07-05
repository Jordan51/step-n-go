import React from "react";

import TravelNameForm from "./TravelNameForm";
import TravelDestinationForm from "./TravelDestinationForm";
import TravelTypeForm from "./TravelTypeForm";
import TravelStepsForm from "./TravelStepsForm";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TravelDepartureForm from "./TravelDepartureForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%"
    },
    button: {
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
      minHeight: "300px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

function getSteps() {
  return ["Nom du voyage", "Départ", "Destination", "Type de voyage", "Etapes"];
}

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <TravelNameForm />;
    case 1:
      return <TravelDepartureForm />;
    case 2:
      return <TravelDestinationForm />;
    case 3:
      return <TravelTypeForm />;
    case 4:
      return <TravelStepsForm />;
    default:
      return "Unknown step";
  }
}

const AddTravel: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>(
    {}
  );
  const steps = getSteps();

  function totalSteps() {
    return steps.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
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
            <Box className={classes.stepContainer}>
              {getStepContent(activeStep)}
            </Box>
            <Box>
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
                Continuer
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" className={classes.completed}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <></>
                  //   <Button
                  //     variant="contained"
                  //     color="primary"
                  //     onClick={handleComplete}
                  //   >
                  //     {completedSteps() === totalSteps() - 1
                  //       ? "Finish"
                  //       : "Complete Step"}
                  //   </Button>
                ))}
            </Box>
          </>
        )}
      </>
    </div>
  );
};

export default AddTravel;
