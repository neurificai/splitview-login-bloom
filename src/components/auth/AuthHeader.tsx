
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const AuthHeader: React.FC = () => {
  return (
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
  );
};
