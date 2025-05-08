
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login successful!");
    // Redirect to orders page after successful login
    navigate("/orders");
  };

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
