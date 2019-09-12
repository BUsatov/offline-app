import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";

const CATEGORIES = [
  { key: "cooking", label: "cooking" },
  { key: "handcrafting", label: "handcrafting" },
  { key: "sport", label: "fitness & sports" },
  { key: "wellness", label: "wellness & beauty" },
  { key: "gardening", label: "gardening" },
  { key: "fixing", label: "fixing" },
  { key: "arts", label: "arts" },
  { key: "parenting", label: "parenting" }
];

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

export default function EventInfoForm({ values, handleOnChange }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Event info
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            id="name"
            label="Name"
            fullWidth
            value={values.name.value}
            helperText={values.name.error}
            error={!!values.name.error}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="city"
            id="city"
            label="City"
            fullWidth
            value={values.city.value}
            helperText={values.city.error}
            error={!!values.city.error}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows="3"
            value={values.description.value}
            helperText={values.description.error}
            error={!!values.description.error}
            onChange={handleOnChange}
          />
        </Grid>
        <FormControl
          component="fieldset"
          className={classes.formControl}
          helperText={values.category.error}
          error={!!values.category.error}
        >
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup
            aria-label="category"
            name="category"
            className={classes.group}
            value={values.category.value}
            onChange={handleOnChange}
          >
            <Grid container spacing={3}>
              {CATEGORIES.map(category => (
                <Grid key={category.key} item xs={12} sm={6}>
                  <FormControlLabel
                    value={category.key}
                    control={<Radio />}
                    label={category.label}
                  />
                </Grid>
              ))}
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
}
