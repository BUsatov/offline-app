import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import EventItem from "./event-item";
import Axios from "axios";
import queryString from "query-string";
import AuthContext from "app/auth/auth-context";

function useEventsData(category, city) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const loadEvents = async () => {
    setLoading(true);
    try {
      const resp = await Axios.get("/api/v1/events/", {
        params: { category_id: category, city_id: city }
      });
      setLoading(false);
      setData(resp.data);
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadEvents();
  }, [category, city]);
  return { loadingEvents: isLoading, events: data };
}

function useAllCities() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const loadCities = async () => {
    setLoading(true);
    try {
      const resp = await Axios.get("/api/v1/cities/");
      setLoading(false);
      setData(resp.data);
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadCities();
  }, []);
  return { loadingCities: isLoading, allCities: data };
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
  }
}));

export default function Events({ location }) {
  const classes = useStyles();
  const { category } = queryString.parse(location.search);
  const { allCities, loadingCities } = useAllCities();
  const { currentUser } = useContext(AuthContext);
  const [city, selectCity] = useState(currentUser.city.id);
  const { events, loadingEvents } = useEventsData(category, city);
  return (
    <Grid container spacing={3} justify="center">
      <Grid item xs={12}>
        <FormControl className={classes.citySelect}>
          <InputLabel htmlFor="city">City</InputLabel>
          <Select
            value={city}
            onChange={e => selectCity(e.target.value)}
            disabled={loadingCities}
            inputProps={{
              name: "city",
              id: "city"
            }}
          >
            {allCities.map(c => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {loadingEvents && (
        <Grid item xs={12} className={classes.progressWrapper}>
          <CircularProgress className={classes.progress} />
        </Grid>
      )}
      {events.map(event => (
        <Grid item key={event.id} xs={12} md={4}>
          <EventItem
            id={event.id}
            name={event.name}
            description={event.description}
            createdAt={event.created_at}
            category={event.category.name}
            resources={event.resources}
          />
        </Grid>
      ))}
      {!events.length && !loadingEvents && (
        <Grid item key={event.id} xs={10} md={6}>
          <Typography variant="h5" align="center" color="textSecondary">
            Currently there are no events for selected category and city
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
