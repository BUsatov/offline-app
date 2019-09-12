import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({
  inputForm: {
    width: "100%"
  },
  list: {
    width: "100%"
  },
  inputGrid: {
    flex: 1
  },
  addButtonGrid: {
    paddingRight: 5
  }
}));

export default function MultiInput({
  onChange,
  value = [],
  placeholder,
  name,
  helperText,
  error
}) {
  const [inputValue, setValue] = useState("");
  const classes = useStyles();
  const handleChange = val => onChange({ target: { value: val, name } });
  return (
    <Grid container>
      <form
        onSubmit={e => {
          e.preventDefault();
          e.stopPropagation();
          if (inputValue) {
            setValue("");
            handleChange([...value, inputValue]);
          }
        }}
        className={classes.inputForm}
      >
        <Grid container>
          <Grid item className={classes.inputGrid}>
            <TextField
              id="standard-bare"
              margin="normal"
              fullWidth
              value={inputValue}
              placeholder={placeholder}
              onChange={e => setValue(e.target.value)}
              helperText={helperText}
              error={error}
            />
          </Grid>
          <Grid item className={classes.addButtonGrid}>
            <IconButton
              aria-controls="account-menu"
              aria-haspopup="true"
              type="submit"
            >
              <AddIcon />
            </IconButton>
          </Grid>
        </Grid>
      </form>
      <List dense className={classes.list}>
        {value.map((item, index) => (
          <ListItem disableGutters key={item}>
            <ListItemText primary={item} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => {
                  handleChange(value.filter((_, i) => index !== i));
                }}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
