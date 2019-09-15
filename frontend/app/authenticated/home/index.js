import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import SVGIconButton from "app/components/svg-icon-button";
import ButtonRouter from "app/components/button-router";

import { Context as ConfigContext } from "app/authenticated/config-context";

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
  },
  categoryButton: {
    width: "100%"
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
          <Grid container justify="center" spacing={2}>
            {categories.map(category => (
              <Grid key={category.id} item xs={6} md={3}>
                <SVGIconButton
                  component={AdapterLink}
                  svg={category.icon}
                  title={category.label}
                  className={classes.categoryButton}
                  to={`/events?category=${category.id}`}
                />
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
            to="/new-event"
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
