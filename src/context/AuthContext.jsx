import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload, isInitialized: true };
        case 'LOGOUT':
            return { user: null, isInitialized: true };
        case 'INITIALIZE':
            return { ...state, isInitialized: true };
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
        const response = await fetch("https://spin-rate-backend.vercel.app/api/user/checkUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user: storedUser.user }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            dispatch({ type: "LOGIN", payload: storedUser });
            return true;
        } else {
            localStorage.removeItem("user");
            dispatch({ type: "LOGOUT" });
            return false;
        }
    } catch (error) {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        return false;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isInitialized: false
    });

    useEffect(() => {
        const checkUser = async () => {
            await validateUser(dispatch);
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};