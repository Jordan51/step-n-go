import React from "react";

import SearchBar from ".";

// import WorldIcon from "@material-ui/icons/Language";

import { Typography } from "@material-ui/core";

const countries = require("../../data/countries.json");

export type CountryT = {
  name: string;
  phoneCode: string;
  capital: string;
  abbr: string;
};

function countryToString(country: CountryT): string {
  return `${country.name}`;
}

function renderAirprot(country: CountryT): JSX.Element {
  return (
    <>
      <Typography style={{ padding: 8 }}>{`${country.name}`}</Typography>
    </>
  );
}

function getItemId(country: CountryT): string {
  return country.abbr;
}

type Props = {
  value: string;
  handleSelect: (value: string) => void;
  label?: string;
  helperText?: string;
  variant?: "standard" | "outlined" | "filled";
};

const CountrySB: React.FC<Props> = ({
  value,
  handleSelect,
  label = "Pays",
  helperText = "",
  variant = "standard"
}) => {
  return (
    <SearchBar
      items={countries}
      currentValue={value}
      handleSelect={(v: string) => handleSelect(v)}
      label={label}
      placeholder="Chercher un pays"
      helperText={helperText}
      getItemId={getItemId}
      itemToString={countryToString}
      renderItem={renderAirprot}
      variant={variant}
    />
  );
};

export default CountrySB;
