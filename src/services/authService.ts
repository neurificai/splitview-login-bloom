import axios from 'axios';
import { encryptAES } from '../utils/hash';
const NS_API_URL = import.meta.env.VITE_APP_API_URL;
const LOGIN_SCRIPT_ID = import.meta.env.VITE_APP_LOGIN_SCRIPT_ID;

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = async ({ email, password }: LoginPayload) => {
  const payload = {
    usn: email,
    psd: password,
    sci: encryptAES(LOGIN_SCRIPT_ID),
    dpi: 1,
  };

  try {
    const response = await axios.post(`${NS_API_URL}/netsuite-api/call-api-on-netSuite`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = response.data;
    if (response.status === 200 && result.success) {
      return {
        success: true,
        user: result.user,
        message: result.message,
      };
    } else {
      return {
        success: false,
        message: result.message || "Login failed. Please check your credentials.",
      };
    }
  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || "Login failed.",
      };
    } else {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      };
    }
  }
};
