import React, { useContext, useCallback, useState } from "react";
import { Redirect } from "react-router-dom";
import authContext from "app/auth/auth-context";
import api from "app/api";
import SignupForm from "./form";

const SignUpScreen = () => {
  const { authenticate, setToken, isAuthenticated } = useContext(authContext);
  const [isUserLoading, setUserLoading] = useState(false);
  const signUp = useCallback(async form => {
    setUserLoading(true);
    try {
      await api.user.create(form);
      const { data: token } = await api.login.accessToken(
        form.email,
        form.password
      );
      if (token) {
        setToken(token);
        await authenticate(token);
      }
    } catch (e) {
      console.log(e); // eslint-disable-line
      setUserLoading(false);
    }
  }, []);
  return isAuthenticated ? (
    <Redirect to="/home" />
  ) : (
    <SignupForm submit={signUp} isSubmitting={isUserLoading} />
  );
};

export default SignUpScreen;
