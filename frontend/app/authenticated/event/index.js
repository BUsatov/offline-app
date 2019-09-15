import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import { Context as ConfigContext } from "app/authenticated/config-context";
import AuthContext from "app/auth/auth-context";
import { NotificationsContext } from "app/global-snackbar";

function useEventData(id) {
  const [isLoading, setLoading] = useState(false);
  const [isAssigning, setAssigning] = useState(false);
  const [data, setData] = useState(null);
  const showNotification = useContext(NotificationsContext);
  const loadEvent = async () => {
    setLoading(true);
    try {
      const resp = await Axios.get(`/api/v1/events/${id}`);
      setLoading(false);
      setData(resp.data);
    } catch (e) {
      showNotification(e.response.data.detail || "Error loading events");
      setLoading(false);
    }
  };
  const assign = async resourceId => {
    setAssigning(true);
    try {
      await Axios.patch(`/api/v1/resources/${resourceId}/assign`);
      const resp = await Axios.get(`/api/v1/events/${id}`);
      setAssigning(false);
      setData(resp.data);
    } catch (e) {
      showNotification(e.response.data.detail || "Can't assign this resource");
      setAssigning(false);
    }
  };
  useEffect(() => {
    loadEvent();
  }, [id]);
  return { isLoading, isAssigning, event: data, loadEvent, assign };
}

const useStyles = makeStyles(theme => ({
  citySelect: {
    minWidth: 240
  },
  progress: {
    margin: theme.spacing(12)
  },
  progressWrapper: {
    textAlign: "center"
  },
  infoContainer: {
    padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`
  }
}));

function getDate(date) {
  const d = new Date(date);
  return d.toLocaleDateString();
}

export default function Event({ match }) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const { isLoading, event, assign } = useEventData(match.params.id);
  const canAssign = Boolean(
    event &&
      !event.resources.find(
        res => res.assignee && res.assignee.id === currentUser.id
      )
  );
  //   const { currentUser } = useContext(AuthContext);
  return (
    <Grid container justify="center">
      {isLoading && (
        <Grid item xs={12} className={classes.progressWrapper}>
          <CircularProgress className={classes.progress} />
        </Grid>
      )}
      {!isLoading && event && (
        <Grid item xs={12} md={6}>
          <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
              <Typography variant="h3" align="center">
                {event.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid justify="center" container>
                <Typography variant="h6">{event.description}</Typography>
              </Grid>
            </Grid>
            <Grid container className={classes.infoContainer}>
              <Grid justify="center" item xs="3">
                <Typography variant="inherit">Creator:</Typography>
              </Grid>
              <Grid justify="center" item xs="9">
                {event.owner.full_name}
              </Grid>
              <Grid justify="center" item xs="3">
                <Typography variant="inherit">Created at:</Typography>
              </Grid>
              <Grid justify="center" item xs="9">
                {getDate(event.created_at)}
              </Grid>
            </Grid>
            <ResourcesForm
              resources={event.resources}
              assign={assign}
              canAssign={canAssign}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

function ResourcesForm({ resources, assign, canAssign }) {
  const { resourceTypes } = useContext(ConfigContext);
  return (
    <Grid item xs={12}>
      <List dense>
        {resources.map(resource => (
          <ListItem key={resource.id}>
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              secondary={
                resource.assignee ? resource.assignee.full_name : undefined
              }
              primary={resource.value}
            />
            {!resource.assignee && (
              <ListItemSecondaryAction>
                <IconButton
                  color="primary"
                  edge="end"
                  aria-label="delete"
                  onClick={() => assign(resource.id)}
                  disabled={!canAssign}
                >
                  <AddSharpIcon />
                </IconButton>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
      </List>
    </Grid>
  );
}
