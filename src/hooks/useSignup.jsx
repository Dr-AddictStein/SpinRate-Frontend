import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (fullName, email, phoneNumber, password) => {
    setError(null);

    const response = await fetch(`https://api.revwheel.fr/api/user/signup`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ fullName, email, phoneNumber, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      return json.error;
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));

      dispatch({ type: "LOGIN", payload: json });
      navigate("/dashboard");
    }
  };

  return { signup, error };
};
