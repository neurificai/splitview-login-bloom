
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { encryptAES } from '../../utils/hash';
/*import axios from "axios";
const NS_API_URL = import.meta.env.VITE_APP_API_URL;
const LOGIN_SCRIPT_ID = import.meta.env.VITE_APP_LOGIN_SCRIPT_ID;*/

interface LoginFormProps {
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  isPasswordVisible,
  togglePasswordVisibility
}) => {
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  //  Reset session if redirected to login
  localStorage.removeItem("user");

  // Handles form submission and login API call
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    const result = await loginUser({ email: encryptAES(form.email), password: encryptAES(form.password) });
    if (result.success) {
      toast.success("Login successful!");
      // localStorage.setItem("user", result.user);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");

    } else {
      toast.error(result.message);
    }

    /*try {
      // Prepare and send POST request to NetSuite login API
      console.log(LOGIN_SCRIPT_ID);
      const payload = {
        usn: encryptAES(form.email),
        psd: encryptAES(form.password),
        sci: encryptAES(LOGIN_SCRIPT_ID),
        dpi: 1,
      };

      const response = await axios.post(`${NS_API_URL}/netsuite-api/call-api-on-netSuite`, payload, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      console.log("Login API response:", response);

      const result = response.data;
      if (response.status == 200 && result.success) {
        toast.success("Login successful!");
        localStorage.setItem("user", result.user);
        navigate("/orders");
      } else {
        console.warn("Login failed:", result);
        toast.error(result.message || "Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      // Catch and log network or unexpected errors
      console.error("Unexpected error during login:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Login failed.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }*/
  }

  // Updates the form state on input change
  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <EyeOff
              className={`absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer ${isPasswordVisible ? 'hidden' : 'block'}`}
              onClick={togglePasswordVisibility}
            />
            <Eye
              className={`absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer ${isPasswordVisible ? 'block' : 'hidden'}`}
              onClick={togglePasswordVisibility}
            />
            <Input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="••••••••"
              className="pl-10"
              value={form.password}
              onChange={(e) => updateForm("password", e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="mt-2">
          <LogIn className="mr-2 h-4 w-4" /> Sign In
        </Button>
      </div>
    </form>
  );
};
