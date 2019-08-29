import React from "react";

import { TravelContext, TravelType } from "../Travel/TravelContext";

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
// TODO: Filter the categories (eg: do not show FESTIVAL if it's a professional travel)
/** Use an object like
 * {
 *    Personnel: {
 *        "Camping",
 *        "Croisière"
 *         ...
 *    },
 *    Scolaire: {
 *        "Séjour linguistique",
 *         ...
 *    },
 *    Professionnel: {
 *        "Déplacement professionnel"
 *         ...
 *    }
 * }
 */

export type TravelTypeType = "Personnel" | "Scolaire" | "Professionnel";
export const TravelTypes = ["Personnel", "Scolaire", "Professionnel"];

export type TravelCategoryType =
  | "Camping"
  | "Croisière"
  | "Déplacement professionnel"
  | "Festival"
  | "Voyage touristique"
  | "Séjour linguistique";

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

const TravelTypeForm: React.FC = () => {
  const classes = useStyles();
  const { travel, updateTravel } = React.useContext(TravelContext);

  const handleChange = (name: keyof TravelType, value: string | number) => (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    updateTravel({ ...travel, [name]: value });
  };

  // console.log("Render - Type");

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
            {TravelTypes.map((type, idx) => (
              <Button
                key={idx}
                variant={type === travel.type ? "contained" : "outlined"}
                onClick={handleChange("type", type)}
                color="primary"
                className={classes.button}
              >
                {type}
              </Button>
            ))}
          </Paper>
        </Box>

        <Box display="flex" flexDirection="column" marginBottom={4}>
          <Typography variant="h6">Nombre de personnes</Typography>
          <Divider />
          <Box display="flex">
            <Paper className={clsx(classes.paper1, classes.paperAlone)}>
              <Button
                variant={travel.nbPers === 1 ? "contained" : "outlined"}
                onClick={handleChange("nbPers", 1)}
                color="primary"
                className={classes.button}
              >
                Seul
              </Button>
              <Button
                variant={travel.nbPers > 1 ? "contained" : "outlined"}
                onClick={handleChange("nbPers", 2)}
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
                Personne(s)
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
              // onClick={handleCategoryChange(category as TravelCategoryType)}
              onClick={handleChange("category", category)}
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

export default TravelTypeForm;
