import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
export const useSignup = () => {
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
      // Do not auto-login or navigate; return the created user payload
      // Consumers can decide next steps (e.g., send verification email, show UI)
      return json;
    }
  };

  return { signup, error };
};
