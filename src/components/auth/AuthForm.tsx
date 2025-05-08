
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthHeader } from "./AuthHeader";
import { AuthFooter } from "./AuthFooter";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

interface AuthFormProps {
  className?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({ className }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [tab, setTab] = useState("login");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Card className={`w-full max-w-md shadow-lg border-none ${className}`}>
      <AuthHeader />

      <Tabs defaultValue="login" value={tab} onValueChange={setTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <CardContent className="pt-6">
          <TabsContent value="login" className="form-fade-in">
            <LoginForm 
              isPasswordVisible={isPasswordVisible} 
              togglePasswordVisibility={togglePasswordVisibility} 
            />
          </TabsContent>

          <TabsContent value="signup" className="form-fade-in">
            <SignupForm 
              isPasswordVisible={isPasswordVisible} 
              togglePasswordVisibility={togglePasswordVisibility} 
            />
          </TabsContent>
        </CardContent>
      </Tabs>

      <AuthFooter />
    </Card>
  );
};
