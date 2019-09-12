import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import { FormContext } from "app/components/form";

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: "700"
  },
  title: {
    marginTop: theme.spacing(2)
  }
}));

export default function Review({ values }) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Event summary
      </Typography>
      <Grid container spacing={2}>
        {[
          "name",
          "city",
          "description",
          "skills",
          "materials",
          "location",
          "services",
          "other"
        ].map(type =>
          values[type] && values[type].value.length ? (
            <React.Fragment>
              <Grid item xs={4} sm={2}>
                <Typography variant="inherit">{type}:</Typography>
              </Grid>
              <Grid item xs={8} sm={10}>
                <Typography variant="inherit">
                  {Array.isArray(values[type].value)
                    ? values[type].value.join(", ")
                    : values[type].value}
                </Typography>
              </Grid>
            </React.Fragment>
          ) : (
            undefined
          )
        )}
      </Grid>
    </React.Fragment>
  );
}
