import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";

import { Context as ConfigContext } from "app/authenticated/config-context";
import ButtonRouter from "app/components/button-router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },
  paper: {
    width: "100%"
  },
  cardContent: {
    textAlign: "center"
  },
  headerText: {
    textAlign: "center"
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const Home = () => {
  const classes = useStyles();
  const { categories } = useContext(ConfigContext);
  return (
    <Container>
      <Typography gutterBottom className={classes.headerText} variant="h6">
        Please select a category
      </Typography>
      <Grid container className={classes.root} justify="center" spacing={2}>
        <Grid item xs={12} md={10}>
          <Grid container justify="center" spacing={4}>
            {categories.map(value => (
              <Grid key={value.id} item xs={6} md={3}>
                <Card className={classes.paper}>
                  <CardActionArea
                    component={AdapterLink}
                    to={`/home/events?category=${value.id}`}
                  >
                    <CardContent className={classes.cardContent}>
                      <value.icon fontSize="large" />
                      <Typography variant="subtitle1">{value.label}</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Typography gutterBottom className={classes.headerText} variant="h6">
        or
      </Typography>
      <Grid container>
        <Grid item xs={12} align="center">
          <ButtonRouter
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            to="/home/new-event"
          >
            Create new event
            <AddIcon className={classes.rightIcon} />
          </ButtonRouter>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Home;
