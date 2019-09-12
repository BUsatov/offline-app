import React, { useState, useContext } from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EventInfoForm from "./event-info-form";
import ResourcesForm from "./resources-form";
import Review from "./review";
import { Context as ConfigContext } from "app/authenticated/config-context";
import useForm from "app/hooks/useForm";

const useStyles = makeStyles(theme => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = ["Event info", "Resources", "Review your details"];

const infoStateSchema = {
  name: { value: "", error: "" },
  city: { value: "", error: "" },
  description: { value: "", error: "" },
  category: { value: "cooking", error: "" }
};

const infoValidationStateSchema = {
  name: { required: true },
  city: { required: true },
  description: { required: true },
  category: { required: true }
};
const resourcesStateSchema = {
  skills: { value: [], error: "" },
  materials: { value: [], error: "" },
  location: { value: "", error: "" },
  services: { value: [], error: "" },
  other: { value: "", error: "" }
};
const resourcesValidationStateSchema = {
  skills: {},
  materials: {},
  location: {},
  services: {},
  other: {}
};

function useEventSave() {
  const [isSaving, setSaving] = useState(false);
  const { resourceTypes } = useContext(ConfigContext);

  const save = async values => {
    setSaving(true);
    try {
      await Axios.post("/api/v1/events/", {
        description: values.description.value,
        city: values.city.value,
        name: values.name.value,
        category: {
          name: values.category.value
        },
        resources: resourceTypes.reduce(
          (acc, it) =>
            values[it.name] && values[it.name].value.length
              ? [
                  ...acc,
                  ...(Array.isArray(values[it.name].value)
                    ? values[it.name].value.map(val => ({
                        resource_type_id: it.id,
                        value: val
                      }))
                    : [
                        {
                          resource_type_id: it.id,
                          value: values[it.name].value
                        }
                      ])
                ]
              : acc,
          []
        )
      });
      setSaving(false);
    } catch (e) {
      setSaving(false);
    }
  };
  return [isSaving, save];
}

function getDisabled(step, info, resources) {
  switch (step) {
    case 0:
      return info;

    case 1:
      return resources;

    default:
      return false;
  }
}

export default function NewEvent({ history }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [isSaving, save] = useEventSave();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const infoStep = useForm(
    infoStateSchema,
    infoValidationStateSchema,
    handleNext
  );

  const handleSave = async values => {
    await save({ ...infoStep.state, ...values });
    history.push("/");
  };

  const resourcesStep = useForm(
    resourcesStateSchema,
    resourcesValidationStateSchema,
    handleSave
  );

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Create New Event
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === 0 && (
              <EventInfoForm
                values={infoStep.state}
                handleOnChange={infoStep.handleOnChange}
              />
            )}
            {activeStep === 1 && (
              <ResourcesForm
                values={resourcesStep.state}
                handleOnChange={resourcesStep.handleOnChange}
              />
            )}
            {activeStep === 2 && (
              <Review values={{ ...infoStep.state, ...resourcesStep.state }} />
            )}
            <div className={classes.buttons}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} className={classes.button}>
                  Back
                </Button>
              )}
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                disabled={
                  getDisabled(
                    activeStep,
                    infoStep.disable,
                    resourcesStep.disable
                  ) || isSaving
                }
                onClick={
                  activeStep !== 2 ? handleNext : resourcesStep.handleOnSubmit
                }
              >
                {activeStep === steps.length - 1 ? "Create Event" : "Next"}
              </Button>
            </div>
          </div>
        </Paper>
      </main>
    </React.Fragment>
  );
}
