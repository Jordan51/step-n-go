import React from "react";

import ReactAutocomplete from "react-autocomplete";
import deburr from "lodash/deburr";

import { AirportT } from "./AirportSB";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  Box,
  Paper,
  List,
  TextField,
  ListItem,
  Divider
} from "@material-ui/core";

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

// FIXME: TextField doesn't change the color when focused (onFocus() + onBlur() are overwritten)

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
  // const [open, setOpen] = React.useState(false);

  // let myTextFieldRef = React.useRef(null);

  return (
    <ReactAutocomplete
      items={items}
      shouldItemRender={(item, value) =>
        deburr(itemToString(item).toLowerCase())
          // .replace(/[^a-zA-Z ]/g, "")
          .indexOf(deburr(value.toLowerCase())) > -1
      }
      getItemValue={item => itemToString(item)}
      wrapperStyle={{
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
                variant="outlined"
                margin="dense"
                className={classes.textfield}
                inputProps={props}
                // inputProps={{
                //   "aria-autocomplete": props["aria-autocomplete"],
                //   "aria-expanded": props["aria-expanded"],
                //   onClick: props.onClick,
                //   onChange: props.onChange,
                //   onKeyDown: props.onKeyDown,
                //   onFocus: props.onFocus,
                //   onBlur: props.onBlur,
                //   ref: props.ref,
                //   value: props.value
                // }}
                // inputRef={el => (myTextFieldRef = el)}
              />
            ) : (
              <TextField
                fullWidth
                label={label}
                placeholder={placeholder}
                margin="normal"
                className={classes.textfield}
                inputProps={props}
              />
            )}
          </>
        );
      }}
      renderMenu={(items, value) => {
        return (
          <Box className={classes.listRoot}>
            <List
              className={classes.listDiv}
              style={variant === "standard" ? { top: 0 } : { top: -18 }}
              dense
              children={value.trim().length === 0 ? [] : items.slice(0, 5)}
            />
          </Box>
        );
      }}
      renderItem={(item, highlighted) => (
        <div key={getItemId(item)}>
          <ListItem
            style={{
              padding: "0 12px",
              backgroundColor: highlighted ? "#eee" : "transparent"
            }}
          >
            {renderItem(item)}
          </ListItem>
          <Divider component="li" />
        </div>
      )}
      value={value}
      onChange={e => {
        const value = e.target.value;
        setValue(value);
        if (!value) handleSelect(value);
      }}
      onSelect={(value: string) => {
        setValue(value);
        handleSelect(value);
      }}
      // onMenuVisibilityChange={(isOpen: boolean) => {
      //   if (isOpen && myTextFieldRef)
      //     setTimeout(() => {
      //       console.log(myTextFieldRef);
      //       // @ts-ignore
      //       myTextFieldRef.focus();
      //     }, 100);
      // }}
      // open={open}
    />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listRoot: {
      width: "100%",
      position: "relative"
    },
    listDiv: {
      "z-index": 999,
      width: "100%",
      padding: 0,
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.spacing(0.5),
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px"
    },
    textfield: {
      margin: 0
    }
  })
);

export default SearchBar;
