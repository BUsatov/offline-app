import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useLocalStorage } from "app/hooks";
import axios from "axios";
import Auth from "./auth-context";

const AuthProviderWrapper = ({ children, ...props }) => (
  <Auth.Provider value={props}>{children}</Auth.Provider>
);
AuthProviderWrapper.propTypes = {
  children: PropTypes.any
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [currentUser, setUser] = useState(null);
  const [tokenObj, setToken] = useLocalStorage("app_token");
  const authenticate = useCallback(async token => {
    if (token || tokenObj) {
      try {
        axios.defaults.headers.common.Authorization = `Bearer ${
          (token || tokenObj).access_token
        }`;
        const userResp = await axios("/api/v1/users/me");
        setUser(userResp.data);
        setAuthenticated(true);
      } catch (e) {
        axios.defaults.headers.common.Authorization = null;
        console.error("error authenticating", e); //eslint-disable-line
      }
    }
    setAuthenticating(false);
  }, []);
  const logout = useCallback(() => {
    setUser(null);
    setAuthenticated(false);
    setToken(undefined);
    axios.defaults.headers.common.Authorization = null;
  });
  useEffect(() => {
    authenticate();
  }, []);
  return (
    <AuthProviderWrapper
      isAuthenticated={isAuthenticated}
      isAuthenticating={isAuthenticating}
      setToken={setToken}
      currentUser={currentUser}
      authenticate={authenticate}
      logout={logout}
    >
      {children}
    </AuthProviderWrapper>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.any
};

export default AuthProvider;
