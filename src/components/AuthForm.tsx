
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, LogIn, Mail, User } from "lucide-react";
import { toast } from "sonner";

interface AuthFormProps {
  className?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ className }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login successful!");
    // In a real app, you'd handle authentication here
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupForm.password !== signupForm.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    toast.success("Account created successfully!");
    // In a real app, you'd handle registration here
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const updateLoginForm = (field: keyof typeof loginForm, value: string) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateSignupForm = (field: keyof typeof signupForm, value: string) => {
    setSignupForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className={`w-full max-w-md shadow-lg border-none ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl text-center font-bold">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            Welcome Back
          </span>
        </CardTitle>
        <CardDescription className="text-center">
          Sign in to your account or create a new one
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="login" value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <CardContent className="pt-6">
          <TabsContent value="login" className="form-fade-in">
            <form onSubmit={handleLoginSubmit}>
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
                      value={loginForm.email}
                      onChange={(e) => updateLoginForm("email", e.target.value)}
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
                      value={loginForm.password}
                      onChange={(e) => updateLoginForm("password", e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <Button type="submit" className="mt-2">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="form-fade-in">
            <form onSubmit={handleSignupSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="name" 
                      placeholder="John Doe" 
                      className="pl-10"
                      value={signupForm.name}
                      onChange={(e) => updateSignupForm("name", e.target.value)}
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
                      value={signupForm.email}
                      onChange={(e) => updateSignupForm("email", e.target.value)}
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
                      value={signupForm.password}
                      onChange={(e) => updateSignupForm("password", e.target.value)}
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
                      value={signupForm.confirmPassword}
                      onChange={(e) => updateSignupForm("confirmPassword", e.target.value)}
                      required 
                    />
                  </div>
                </div>

                <Button type="submit" className="mt-2">
                  <LogIn className="mr-2 h-4 w-4" /> Create Account
                </Button>
              </div>
            </form>
          </TabsContent>
        </CardContent>
      </Tabs>

      <CardFooter className="flex flex-col space-y-2 border-t pt-4">
        <div className="text-center text-sm text-muted-foreground">
          By signing in, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> and <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
        </div>
      </CardFooter>
    </Card>
  );
};
