import React from "react";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  MaterialUiPickersDate,
  KeyboardTimePicker
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import AlarmIcon from "@material-ui/icons/Alarm";

type Props = {
  id: string;
  variant?: "inline" | "dialog" | "static" | undefined;
  inputVariant?: "outlined" | "standard" | "filled" | undefined;
  value: Date;
  onChange: (date: MaterialUiPickersDate) => void;
  helperText: string;
};

const localeMap = {
  // en: enLocale,
  fr: frLocale
  // ru: ruLocale
};

export const CustomDatePicker: React.FC<Props> = ({
  id,
  variant = "inline",
  inputVariant = "standard",
  value,
  onChange,
  helperText
}) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["fr"]}>
      <KeyboardDatePicker
        // General
        id={id}
        helperText={helperText}
        value={value}
        onChange={onChange}
        variant={variant}
        inputVariant={inputVariant}
        margin="dense"
        // Classes
        className={classes.dateAndTimePickers}
        InputProps={{ className: classes.dateAndTimePickerButtonInput }}
        KeyboardButtonProps={
          inputVariant === "outlined"
            ? { className: classes.dateAndTimePickerButtonOutlined }
            : { className: classes.dateAndTimePickerButton }
        }
        // Date
        hiddenLabel
        disablePast
        allowKeyboardControl
        format="dd/MM/yyyy"
        placeholder="jj/mm/aaaa"
      />
    </MuiPickersUtilsProvider>
  );
};

export const CustomTimePicker: React.FC<Props> = ({
  id,
  variant = "inline",
  inputVariant = "standard",
  value,
  onChange,
  helperText
}) => {
  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={localeMap["fr"]}>
      <KeyboardTimePicker
        // General
        id={id}
        helperText={helperText}
        value={value}
        onChange={onChange}
        variant={variant}
        inputVariant={inputVariant}
        margin="dense"
        // Classes
        className={classes.dateAndTimePickers}
        InputProps={{ className: classes.dateAndTimePickerButtonInput }}
        KeyboardButtonProps={
          inputVariant === "outlined"
            ? { className: classes.dateAndTimePickerButtonOutlined }
            : { className: classes.dateAndTimePickerButton }
        }
        // Time
        placeholder="hh:mm"
        ampm={false}
        keyboardIcon={<AlarmIcon />}
      />
    </MuiPickersUtilsProvider>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dateAndTimePickers: {
      marginTop: 0,
      width: "100%"
    },
    dateAndTimePickerButtonInput: {
      // backgroundColor: "blue",
      paddingRight: theme.spacing(0.5)
    },
    dateAndTimePickerButton: {
      // backgroundColor: "red",
      padding: theme.spacing(0.5),
      margin: theme.spacing(0, -1, 1, 0)
    },
    dateAndTimePickerButtonOutlined: {
      padding: theme.spacing(0.5)
    }
  })
);
