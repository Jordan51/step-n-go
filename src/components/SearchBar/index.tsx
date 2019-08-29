import React from "react";

import ReactAutocomplete from "react-autocomplete";
import deburr from "lodash/deburr";

import { AirportT } from "./AirportSB";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Box, Paper, List, TextField } from "@material-ui/core";

type Props = {
  items: AirportT[];
  currentValue: string;
  handleSelect: (value: string) => void;
  label: string;
  placeholder: string;
  helperText: string;
  getItemId: (item: any) => string;
  itemToString: (item: any) => string;
  renderItem: (item: any) => JSX.Element;
  variant?: "standard" | "outlined" | "filled";
};

const SearchBar: React.FC<Props> = ({
  items,
  currentValue,
  handleSelect,
  label,
  placeholder,
  helperText,
  getItemId,
  itemToString,
  renderItem,
  variant = "standard"
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(currentValue);

  return (
    <ReactAutocomplete
      items={items}
      shouldItemRender={(item, value) =>
        deburr(itemToString(item))
          .toLowerCase()
          // .replace(/[^a-zA-Z ]/g, "")
          .indexOf(value.toLowerCase()) > -1
      }
      getItemValue={item => itemToString(item)}
      wrapperStyle={{
        marginTop: -8,
        display: "flex",
        flexDirection: "column"
      }}
      renderInput={props => {
        return (
          <>
            {variant === "outlined" ? (
              <TextField
                fullWidth
                label={label}
                placeholder={placeholder}
                helperText={helperText}
                variant={"outlined"}
                margin={"dense"}
                inputProps={props}
              />
            ) : (
              <TextField
                fullWidth
                label={label}
                placeholder={placeholder}
                margin={"normal"}
                inputProps={props}
              />
            )}
          </>
        );
      }}
      renderMenu={(items, value, style) => {
        return (
          <List className={classes.listRoot} dense>
            <div
              className={classes.listDiv}
              children={value.trim().length === 0 ? [] : items.slice(0, 5)}
            />
          </List>
        );
      }}
      renderItem={(item, highlighted) => (
        <Box
          key={getItemId(item)}
          style={{
            backgroundColor: highlighted ? "#eee" : "transparent"
          }}
        >
          {renderItem(item)}
        </Box>
      )}
      value={value}
      onChange={e => setValue(e.target.value)}
      onSelect={(value: string) => {
        setValue(value);
        handleSelect(value);
      }}
    />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listRoot: {
      position: "relative",
      width: "100%",
      padding: 0,
      backgroundColor: theme.palette.background.paper
    },
    listDiv: {
      position: "absolute",
      width: "100%",
      backgroundColor: theme.palette.background.paper,
      "z-index": 999
    }
  })
);

export default SearchBar;
