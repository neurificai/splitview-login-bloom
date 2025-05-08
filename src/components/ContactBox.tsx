
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

interface ContactPerson {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface ContactBoxProps {
  contacts: ContactPerson[];
}

const ContactBox: React.FC<ContactBoxProps> = ({ contacts }) => {
  return (
    <Card className="shadow-md border-none bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-gray-700">Your Contacts</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                {contact.avatar ? (
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                ) : (
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    {contact.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="space-y-1 flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium leading-none">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs mt-1">
                  <div className="flex items-center">
                    <Mail className="h-3 w-3 mr-1 text-blue-500" />
                    <span className="truncate text-muted-foreground">{contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-1 text-orange-500" />
                    <span className="text-muted-foreground">{contact.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactBox;
