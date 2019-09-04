import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import AuthProvider from "app/auth/auth-provider";
import Auth from "app/auth/auth-context";
import PrivateRoute from "app/router";
import LoginScreen from "app/login";
import Authenticated from "app/authenticated";

const Loader = () => <div>loader</div>;

const App = () => (
  <Router>
    <CssBaseline />
    <AuthProvider>
      <Auth.Consumer>
        {({ isAuthenticating }) =>
          isAuthenticating ? (
            <Loader />
          ) : (
            <React.Fragment>
              <PrivateRoute exact path="/" component={Authenticated} />

              <Route path="/login" component={LoginScreen} />
            </React.Fragment>
          )
        }
      </Auth.Consumer>
    </AuthProvider>
  </Router>
);

export default App;
