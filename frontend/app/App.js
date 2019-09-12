import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AuthProvider from "app/auth/auth-provider";
import Auth from "app/auth/auth-context";
import PrivateRoute from "app/router";
import LoginScreen from "app/login";
import SignUpScreen from "./signup";
import Authenticated from "app/authenticated";
import theme from "./theme";
import GlobalSnackbar from "./global-snackbar";

const Loader = () => <div>loader</div>;

const App = () => (
  <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <GlobalSnackbar>
          <Auth.Consumer>
            {({ isAuthenticating }) =>
              isAuthenticating ? (
                <Loader />
              ) : (
                <Switch>
                  <Route exact path="/login" component={LoginScreen} />
                  <Route path="/register" component={SignUpScreen} />
                  <PrivateRoute path="/" component={Authenticated} />
                </Switch>
              )
            }
          </Auth.Consumer>
        </GlobalSnackbar>
      </AuthProvider>
    </ThemeProvider>
  </Router>
);

export default App;
