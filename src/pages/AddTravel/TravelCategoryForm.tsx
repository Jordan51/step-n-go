import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { TravelContext } from "./TravelContext";

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

export default TravelCategoryForm;
