import React from "react";

import { TravelContext } from "./TravelContext";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

function dateToString(d: Date): string {
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}

function timeToString(d: Date): string {
  return `${d.getHours()}:${d.getMinutes()}`;
}

const TravelRecap: React.FC = () => {
  const classes = useStyles();
  const [drawer, setDrawer] = React.useState<boolean>(false);
  const { travel } = React.useContext(TravelContext);

  return (
    <>
      <Button className={classes.button} onClick={() => setDrawer(!drawer)}>
        Open Info box
      </Button>
      <Drawer open={drawer} onClose={() => setDrawer(!drawer)}>
        <div
          className={classes.list}
          onClick={() => setDrawer(!drawer)}
          onKeyDown={() => setDrawer(!drawer)}
        >
          <List>
            {/* NAME */}
            <ListItem className={classes.listItem}>
              <p>{travel.name}</p>
            </ListItem>

            {/* CATEGORY */}
            <ListItem className={classes.listItem}>
              <p>{travel.category}</p>
            </ListItem>

            {/* DEPARTURE */}
            <ListItem className={classes.listItem}>
              <p>
                {travel.departure.address}, {travel.departure.city},{" "}
                {travel.departure.country}
              </p>
            </ListItem>

            {/* DESTINATION */}
            <ListItem className={classes.listItem}>
              <p>
                {travel.destination.address}, {travel.destination.city} ,
                {travel.destination.country}
              </p>
            </ListItem>

            {/* TRANSPORT(S) */}
            <ListItem className={classes.listItem}>
              <ul style={{ paddingLeft: 16 }}>
                {travel.transports.map((t, idx) => (
                  <li key={idx}>
                    {t.mode} ({t.ref}) <br /> Départ de {t.depLocation} <br />
                    le {dateToString(t.depDate)} à {timeToString(t.depHour)}{" "}
                    <br />
                    Arrivée à {t.arrLocation} <br />
                    le {dateToString(t.arrDate)} à {timeToString(t.arrHour)}
                  </li>
                ))}
              </ul>
            </ListItem>

            {/* ACCOMMODATION(S) */}
            <ListItem className={classes.listItem}>
              <ul style={{ paddingLeft: 16 }}>
                {travel.accommodations.map((a, idx) => (
                  <li key={idx}>
                    {a.accommodation}, {a.location} <br /> Arrivé le{" "}
                    {dateToString(a.arrDate)} <br />
                    Départ le {dateToString(a.depDate)}
                  </li>
                ))}
              </ul>
            </ListItem>

            {/* ACTIVITIES */}
            <ListItem className={classes.listItem}>
              <p>{travel.activities}</p>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      position: "fixed",
      right: 0,
      bottom: 40,
      margin: 16
    },
    list: {
      width: 350
    },
    listItem: {
      margin: theme.spacing(0, 0, 0, 2),
      padding: 0
    },
    leftSide: {
      marginRight: theme.spacing(2),
      marginBottom: 0,
      textAlign: "right",
      fontWeight: "bold"
    }
  })
);

export default TravelRecap;
