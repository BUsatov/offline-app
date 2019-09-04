import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrivateRoute from "app/router";
import Auth from "app/auth/auth-context";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import Home from "./home";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  }
}));

const Authenticated = () => {
  const classes = useStyles();
  const { logout } = useContext(Auth);
  return (
    <Container maxWidth="lg">
      <Toolbar className={classes.toolbar}>
        <Button size="small">TODO</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          Offline
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
      <PrivateRoute exact path="/" component={Home} />
    </Container>
  );
};

export default Authenticated;
