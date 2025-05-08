
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="shadow-md border-none bg-white transition-all hover:shadow-lg">
      <CardContent className="p-4">
        <div className="space-y-3">
          {contacts.slice(0, 2).map((contact, index) => (
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
                </div>
              </div>
            </div>
          ))}
          
          {contacts.length > 2 && (
            <div className="text-center mt-2">
              <a href="#" className="text-sm text-blue-500 flex items-center justify-center gap-1 hover:underline">
                View all ({contacts.length})
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactBox;
