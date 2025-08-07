import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload, isInitialized: true };
    case "LOGOUT":
      return { user: null, isInitialized: true };
    case "INITIALIZE":
      return { ...state, isInitialized: true };
    case "UPDATE_USER":
      return { ...state, user: action.payload, isInitialized: true };
    default:
      return state;
  }
};

export const validateUser = async (dispatch) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    dispatch({ type: "INITIALIZE" });
    return false;
  }

  try {
    // First, validate the user exists
    const checkResponse = await fetch("https://api.revwheel.fr/api/user/checkUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: storedUser.user }),
    });

    const checkData = await checkResponse.json();

    if (!checkResponse.ok || !checkData.success) {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      return false;
    }

    // If validation passes, fetch the most updated user data
    const fetchResponse = await fetch(`https://api.revwheel.fr/api/user/getUserById/${storedUser.user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const fetchData = await fetchResponse.json();

    if (fetchResponse.ok && fetchData.data) {
      // Check if data has actually changed
      const hasChanged = JSON.stringify(storedUser.user) !== JSON.stringify(fetchData.data);
      console.log('Data changed:', hasChanged);
      console.log('Stored data:', storedUser.user);
      console.log('Fresh data:', fetchData.data);
      
      // Update both context and localStorage with fresh data
      const updatedUser = { user: fetchData.data };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch({ type: "LOGIN", payload: updatedUser });
      return true;
    } else {
      console.log('Fetch failed, using stored data. Response:', fetchData);
      // If fetch fails, fall back to stored data
      dispatch({ type: "LOGIN", payload: storedUser });
      return true;
    }
  } catch (error) {
    console.error("Error validating/fetching user:", error);
    // If there's an error, try to use stored data as fallback
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: storedUser });
      return true;
    } else {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT" });
      return false;
    }
  }
};

// Function to refresh user data (can be called from anywhere)
export const refreshUserData = async (dispatch) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser?.user?._id) {
    return false;
  }

  try {
    const response = await fetch(`https://api.revwheel.fr/api/user/getUserById/${storedUser.user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok && data.data) {
      const updatedUser = { user: data.data };
      console.log('Refreshed user data:', data.data);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch({ type: "UPDATE_USER", payload: updatedUser });
      return true;
    } else {
      console.error("Failed to refresh user data:", data);
      return false;
    }
  } catch (error) {
    console.error("Error refreshing user data:", error);
    return false;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isInitialized: false,
  });

  useEffect(() => {
    const checkUser = async () => {
      await validateUser(dispatch);
    };

    checkUser();
  }, []);

  // Create a refresh function that can be called from components
  const refreshUser = async () => {
    return await refreshUserData(dispatch);
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
