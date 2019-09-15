import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import PrivateRoute from "app/router";
import Auth from "app/auth/auth-context";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import SvgIcon from "@material-ui/core/SvgIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import Home from "./home";
import NewEvent from "./new-event";
import Events from "./events";
import Event from "./event";
import ConfigContext from "./config-context";
import OfflinePic from "./offline.svg";

const useStyles = makeStyles(theme => ({
  appbar: {
    backgroundColor: "#E83372"
  },
  toolbarTitle: {
    flex: 1,
    textAlign: "center"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
  container: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(1)
  }
}));

const Authenticated = ({ history }) => {
  const classes = useStyles();
  const { logout } = useContext(Auth);
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <React.Fragment>
      <AppBar className={classes.appbar}>
        <Toolbar>
          <IconButton size="small" onClick={() => history.goBack()}>
            <ArrowBackIcon />
          </IconButton>

          <div className={classes.toolbarTitle}>
            <Link to="/">
              <OfflinePic width="200" height="auto" viewBox="0 0 1200 210" />
            </Link>
          </div>
          <IconButton
            aria-controls="account-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="account-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" className={classes.container}>
        <ConfigContext>
          <PrivateRoute exact path="/new-event" component={NewEvent} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/events" component={Events} />
          <PrivateRoute exact path="/events/:id" component={Event} />
        </ConfigContext>
      </Container>
    </React.Fragment>
  );
};

export default Authenticated;
