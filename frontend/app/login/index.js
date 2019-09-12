import React, { useContext, useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import authContext from "app/auth/auth-context";
import api from "app/api";
import LoginForm from "./form";
import { NotificationsContext } from "app/global-snackbar";

const LoginScreen = () => {
  const { authenticate, setToken, isAuthenticated } = useContext(authContext);
  const showNotification = useContext(NotificationsContext);
  const [isUserLoading, setUserLoading] = useState(false);
  const login = useCallback(async (username, password) => {
    setUserLoading(true);
    try {
      const { data: token } = await api.login.accessToken(username, password);
      if (token) {
        setToken(token);
        await authenticate(token);
      }
    } catch (e) {
      showNotification(e.response.data.detail || "Invalid auth");
      setUserLoading(false);
    }
  }, []);
  return isAuthenticated ? (
    <Redirect to="/home" />
  ) : (
    <LoginForm submit={login} isSubmitting={isUserLoading} />
  );
};

export default LoginScreen;
