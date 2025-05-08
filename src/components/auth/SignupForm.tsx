
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, Mail, User } from "lucide-react";
import { toast } from "sonner";

interface SignupFormProps {
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ 
  isPasswordVisible, 
  togglePasswordVisibility 
}) => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    toast.success("Account created successfully!");
    // In a real app, you'd handle registration here
  };

  const updateForm = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="name" 
              placeholder="John Doe" 
              className="pl-10"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              required 
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="signup-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              id="signup-email" 
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
          <Label htmlFor="signup-password">Password</Label>
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
              id="signup-password" 
              type={isPasswordVisible ? "text" : "password"}
              placeholder="••••••••" 
              className="pl-10"
              value={form.password}
              onChange={(e) => updateForm("password", e.target.value)}
              required 
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
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
              id="confirm-password" 
              type={isPasswordVisible ? "text" : "password"}
              placeholder="••••••••" 
              className="pl-10"
              value={form.confirmPassword}
              onChange={(e) => updateForm("confirmPassword", e.target.value)}
              required 
            />
          </div>
        </div>

        <Button type="submit" className="mt-2">
          <LogIn className="mr-2 h-4 w-4" /> Create Account
        </Button>
      </div>
    </form>
  );
};
