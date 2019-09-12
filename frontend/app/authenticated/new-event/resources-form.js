import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MultiInput from "app/components/multi-input";

export default function ResourcesForm({ values, handleOnChange }) {
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Skills</Typography>
          <Typography variant="caption" color="textSecondary">
            What skills and knowledge should be shared during activity?
          </Typography>
          <MultiInput
            name="skills"
            value={values.skills.value}
            helperText={values.skills.error}
            error={!!values.skills.error}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Materials</Typography>
          <Typography variant="caption" color="textSecondary">
            Please describe the required materials for the activity
          </Typography>
          <MultiInput
            name="materials"
            value={values.materials.value}
            helperText={values.materials.error}
            error={!!values.materials.error}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6">Location</Typography>
          <Typography variant="caption" color="textSecondary">
            Please describe the desirable location for the activity
          </Typography>
          <TextField
            name="location"
            fullWidth
            margin="normal"
            value={values.location.value}
            helperText={values.location.error}
            error={!!values.location.error}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Services</Typography>
          <Typography variant="caption" color="textSecondary">
            Please list the additional services needed for the activity, e.g.
            cleaning after event, transfers etc.
          </Typography>
          <MultiInput
            name="services"
            value={values.services.value}
            helperText={values.services.error}
            error={!!values.services.error}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={11}>
          <Typography variant="h6">Other</Typography>
          <Typography variant="caption" color="textSecondary">
            Maybe the activity needs something more? List it then here
          </Typography>
          <TextField
            name="other"
            fullWidth
            margin="normal"
            value={values.other.value}
            helperText={values.other.error}
            error={!!values.other.error}
            onChange={handleOnChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
