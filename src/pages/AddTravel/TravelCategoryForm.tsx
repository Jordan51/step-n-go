import React from "react";

import { TravelContext } from "../Travel/TravelContext";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Divider
} from "@material-ui/core";
import clsx from "clsx";

// TODO: Add more categories
// TODO: Add a filter system

export type TravelTypeType = "Personnel" | "Scolaire" | "Professionnel" | "";
export const TravelTypes = ["Personnel", "Scolaire", "Professionnel"];

export type TravelCategoryType =
  | "Camping"
  | "Croisière"
  | "Déplacement professionnel"
  | "Festival"
  | "Voyage touristique"
  | "Séjour linguistique"
  | "";

export const TravelCategories = [
  "Camping",
  "Croisière",
  "Déplacement professionnel",
  "Festival",
  "Voyage touristique",
  "Séjour linguistique"
];

export function isTravelCategoryFormValid(
  type: TravelTypeType,
  nbPers: number,
  category: TravelCategoryType
): boolean {
  return (
    !!type &&
    !!nbPers &&
    !!category &&
    TravelTypes.includes(type) &&
    !isNaN(nbPers) &&
    nbPers >= 1 &&
    TravelCategories.includes(category)
  );
}

const TravelCategoryForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);

  const handleChange = (category: TravelCategoryType) => (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    updateTravel({ ...travel, category: category });
  };

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          marginBottom={4}
          marginRight={{ sm: 1, md: 4 }}
        >
          <Typography variant="h6">Type de voyage</Typography>
          <Divider />
          <Paper className={classes.paper1}>
            <Button
              variant={travel.type === "Personnel" ? "contained" : "outlined"}
              onClick={() =>
                updateTravel({
                  ...travel,
                  type: "Personnel"
                })
              }
              color="primary"
              className={classes.button}
            >
              Personnel
            </Button>
            <Button
              variant={
                travel.type === "Professionnel" ? "contained" : "outlined"
              }
              onClick={() =>
                updateTravel({
                  ...travel,
                  type: "Professionnel"
                })
              }
              color="primary"
              className={classes.button}
            >
              Professionnel
            </Button>
          </Paper>
        </Box>

        <Box display="flex" flexDirection="column" marginBottom={4}>
          <Typography variant="h6">Nombre de personnes</Typography>
          <Divider />
          <Box display="flex">
            <Paper className={clsx(classes.paper1, classes.paperAlone)}>
              <Button
                variant={travel.nbPers === 1 ? "contained" : "outlined"}
                onClick={() =>
                  updateTravel({
                    ...travel,
                    nbPers: 1
                  })
                }
                color="primary"
                className={classes.button}
              >
                Seul
              </Button>
              <Button
                variant={travel.nbPers > 1 ? "contained" : "outlined"}
                onClick={() =>
                  updateTravel({
                    ...travel,
                    nbPers: 2
                  })
                }
                color="primary"
                className={classes.button}
              >
                En groupe
              </Button>
            </Paper>
            <Paper className={clsx(classes.paper1, classes.paperNbPers)}>
              <TextField
                id="travel-nb-person"
                value={travel.nbPers === -1 ? "" : travel.nbPers}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  let nb: number = parseInt(event.target.value);
                  nb = isNaN(nb) || nb < 1 ? -1 : nb;
                  nb = nb <= 100 ? nb : 100;

                  updateTravel({
                    ...travel,
                    nbPers: nb
                  });
                }}
                margin="dense"
                variant="outlined"
                className={classes.personnesTextField}
                type="number"
                InputLabelProps={{
                  shrink: true
                }}
              />
              <Typography className={classes.personnesTypo}>
                {travel.nbPers === 1 ? "Personne" : "Personnes"}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h6">Catégorie</Typography>
        <Divider />
        <Paper className={classes.paper2}>
          {TravelCategories.map((category, idx) => (
            <Button
              variant={travel.category === category ? "contained" : "outlined"}
              key={idx}
              onClick={handleChange(category as TravelCategoryType)}
              color="primary"
              className={classes.button}
            >
              {category}
            </Button>
          ))}
        </Paper>
      </Box>
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
    paper1: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing(1),
      marginTop: theme.spacing(1),
      "&:not(:nth-last-of-type(1))": {
        marginRight: theme.spacing(1)
      }
    },
    paper2: {
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
    },
    paperAlone: {
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    },
    paperNbPers: {
      [theme.breakpoints.down("xs")]: {
        width: "100%"
      }
    },
    personnesTextField: {
      width: "75px",
      margin: theme.spacing(0, 1)
    },
    // textField: {
    //   width: "100%",
    //   margin: theme.spacing(0, 1)
    // },
    personnesTypo: {
      marginRight: theme.spacing(1)
    }
  })
);

export default TravelCategoryForm;
