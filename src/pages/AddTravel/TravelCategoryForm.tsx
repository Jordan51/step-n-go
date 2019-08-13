import React from "react";

import { TravelContext } from "./TravelContext";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

// TODO: Add more categories
// TODO: Add a filter system

export type TravellingCategoryType =
  | "Camping"
  | "Croisière"
  | "Déplacement professionnel"
  | "Festival"
  | "Voyage touristique"
  | "Séjour linguistique"
  | "";

const TravellingCategories = [
  "Camping",
  "Croisière",
  "Déplacement professionnel",
  "Festival",
  "Voyage touristique",
  "Séjour linguistique"
];

const TravelCategoryForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);

  const handleChange = (category: TravellingCategoryType) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    updateTravel({ ...travel, category: category });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h6">Type de voyage</Typography>
      <Divider />
      <Paper className={classes.paper}>
        {TravellingCategories.map((category, idx) => (
          <Button
            variant={travel.category === category ? "contained" : "outlined"}
            key={idx}
            onClick={handleChange(category as TravellingCategoryType)}
            color="primary"
            className={classes.button}
          >
            {category}
          </Button>
        ))}
      </Paper>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down("md")]: {
        width: "90%"
      },
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    },
    paper: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(2),
      marginTop: theme.spacing(1)
    },
    button: {
      margin: theme.spacing(1),
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    }
  })
);

export default TravelCategoryForm;
