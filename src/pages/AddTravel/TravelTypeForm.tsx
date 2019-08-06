import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

type TravelTypes =
  | "Camping"
  | "Croisière"
  | "Déplacement professionnel"
  | "Festival"
  | "Voyage touristique"
  | "Séjour linguistique";

const TravelTypesValues: TravelTypes[] = [
  "Camping",
  "Croisière",
  "Déplacement professionnel",
  "Festival",
  "Voyage touristique",
  "Séjour linguistique"
];

interface State {
  travelType: TravelTypes | "";
}

type Action = { type: "travelType"; value: TravelTypes };

const initialState: State = {
  travelType: ""
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "travelType":
      return { ...state, travelType: action.value };
    default:
      return state;
  }
}

const TravelTypeForm: React.FC = () => {
  const classes = useStyles();
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Box className={classes.root}>
      {TravelTypesValues.map((type, idx) => (
        <Button
          variant={state.travelType === type ? "contained" : "outlined"}
          key={idx}
          onClick={() => dispatch({ type: "travelType", value: type })}
          color="primary"
          className={classes.button}
        >
          {type}
        </Button>
      ))}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    },
    button: {
      margin: theme.spacing(1)
    }
  })
);

export default TravelTypeForm;
