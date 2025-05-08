
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
    <Card className="shadow-md border-none bg-white h-full transition-all hover:shadow-lg">
      <CardHeader className="pb-2 bg-gradient-to-r from-sky-50 to-white">
        <CardTitle className="text-base font-medium text-sky-700">Your Contacts</CardTitle>
      </CardHeader>
      <CardContent className="pt-3">
        <div className="space-y-3">
          {contacts.map((contact, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-sky-50 transition-colors">
              <Avatar className="h-10 w-10 border border-sky-100 shadow-sm">
                {contact.avatar ? (
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-sky-100 to-blue-100 text-sky-600">
                    {contact.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="space-y-0.5 flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium leading-none text-gray-800">{contact.name}</p>
                <p className="text-xs text-sky-600 font-medium">{contact.role}</p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs mt-1">
                  <div className="flex items-center">
                    <Mail className="h-3 w-3 mr-1 text-blue-500" />
                    <span className="truncate text-muted-foreground">{contact.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-gray-700 font-medium">{contact.phone}</span>
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
