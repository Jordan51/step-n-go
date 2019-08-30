import React from "react";

import SearchBar from ".";

import FlightIcon from "@material-ui/icons/Flight";
import {
  Box,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ListItem,
  Divider
} from "@material-ui/core";

const airports = require("../../data/airports.json");

export type AirportT = {
  name: string;
  city: string;
  country: string;
  iata: string;
};

function airportToString(airport: AirportT): string {
  return `${airport.iata} - ${airport.name}, ${airport.city} (${airport.country})`;
}

function renderAirprot(airport: AirportT): JSX.Element {
  return (
    <>
      <ListItemAvatar>
        <Avatar>
          <FlightIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${airport.iata} - ${airport.name}`}
        secondary={`${airport.city}, ${airport.country}`}
      />
    </>
  );
}

function getItemId(airport: AirportT): string {
  return airport.iata;
}

type Props = {
  value: string;
  handleSelect: (value: string) => void;
  label?: string;
  helperText?: string;
  variant?: "standard" | "outlined" | "filled";
};

const AirportSB: React.FC<Props> = ({
  value,
  handleSelect,
  label = "",
  helperText = "",
  variant = "standard"
}) => {
  return (
    <SearchBar
      items={airports}
      currentValue={value}
      handleSelect={(v: string) => handleSelect(v)}
      label={label}
      placeholder="Chercher un aéroport"
      helperText={helperText}
      getItemId={getItemId}
      itemToString={airportToString}
      renderItem={renderAirprot}
      variant={variant}
    />
  );
};

export default AirportSB;
