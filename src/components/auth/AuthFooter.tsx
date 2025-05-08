
import React from "react";
import { CardFooter } from "@/components/ui/card";

export const AuthFooter: React.FC = () => {
  return (
    <CardFooter className="flex flex-col space-y-2 border-t pt-4">
      <div className="text-center text-sm text-muted-foreground">
        By signing in, you agree to our{" "}
        <a href="#" className="underline hover:text-primary">Terms of Service</a> and{" "} 
        <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
      </div>
    </CardFooter>
  );
};
