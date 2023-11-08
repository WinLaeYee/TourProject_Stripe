import { createContext, useEffect, useReducer } from "react";
import { json } from "react-router-dom";

const initial_state = {
  user:
    localStorage.getItem("user") != "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };

    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 



/* import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user:
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };

    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };

    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };

    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initial_state);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const handleLogin = (email, password) => {
    if (!email || !password) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Please provide both email and password." });
      return;
    }

    if (password.length < 5) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Password must be at least 5 characters long." });
      return;
    }

    if (!isValidEmail(email)) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Invalid email format." });
      return;
    }

    // Dispatch the LOGIN_START action to indicate the login process has started
    //dispatch({ type: "LOGIN_START" });

    // Perform the login process here
    // If successful, dispatch LOGIN_SUCCESS
    // If failed, dispatch LOGIN_FAILURE with an appropriate error message
  };

  const isValidEmail = (email) => {
    // Implement your email validation logic here
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
        handleLogin, // Include the handleLogin function in the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; */

