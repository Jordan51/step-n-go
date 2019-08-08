import React from "react";

import { TravelContext } from "./TravelContext";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

const TravelRecap: React.FC = () => {
  const classes = useStyles();
  const { travel } = React.useContext(TravelContext);

  return (
    <Box m={3} className={classes.root}>
      {/* NAME */}
      <div style={{ display: "flex" }}>
        <p className={classes.leftSide}>Nom:</p>
        <p>{travel.name}</p>
      </div>

      {/* CATEGORY */}
      <div style={{ display: "flex" }}>
        <p className={classes.leftSide}>Type:</p>
        <p>{travel.category}</p>
      </div>

      {/* DEPARTURE */}
      <div style={{ display: "flex" }}>
        <p className={classes.leftSide}>Départ:</p>
        <p>
          {travel.departure.address}, {travel.departure.city},{" "}
          {travel.departure.country}
        </p>
      </div>

      {/* DESTINATION */}
      <div style={{ display: "flex" }}>
        <p className={classes.leftSide}>Destination:</p>
        <p>
          {travel.destination.address}, {travel.destination.city} ,
          {travel.destination.country}
        </p>
      </div>

      {/* TRANSPORT(S) */}
      <div style={{ display: "flex" }}>
        <p className={classes.leftSide}>Transport(s):</p>
        {/* {travel.transport.map((t, idx) => (
          <ul>
            <li>
              {t.mode} {t.depLocation} {t.depDate} {t.depHour}
            </li>
            <li>
              {t.ref} {t.arrLocation} {t.arrDate} {t.arrHour}
            </li>
          </ul>
        ))} */}
      </div>

      {/* ACTIVITIES */}
      <div style={{ display: "flex" }}>
        <p className={classes.leftSide}>Activité(s):</p>
        <p>{travel.activities}</p>
      </div>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      bottom: 0
    },
    leftSide: {
      marginRight: theme.spacing(2),
      width: 110,
      textAlign: "right",
      fontWeight: "bold"
    }
  })
);

export default TravelRecap;
