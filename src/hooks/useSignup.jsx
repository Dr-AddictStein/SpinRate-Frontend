import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (fullName, userName, email, password) => {
    setError(null);

    const response = await fetch(
      `https://spin-rate-backend.vercel.app//api/user/signup`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ fullName, userName, email, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      
      return json.error;
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      navigate('/dashboard');
    }
  };


  return { signup, error };
};
