import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import api from './Layout/api';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return false;
    }

    try {
      // Verify the token with your backend if needed
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth" />
        )
      }
    />
  );
};

export default ProtectedRoute;
