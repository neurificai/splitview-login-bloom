
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

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
    <Card className="shadow-sm border-none bg-white">
      <CardContent className="p-2">
        <div className="space-y-2">
          {contacts.slice(0, 2).map((contact, index) => (
            <div key={index} className="flex items-center gap-2 p-1.5 rounded-md hover:bg-sky-50 transition-colors">
              <Avatar className="h-8 w-8 border border-sky-100">
                {contact.avatar ? (
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-sky-100 to-blue-100 text-sky-600 text-xs">
                    {contact.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="space-y-0 flex-1 min-w-0 overflow-hidden">
                <p className="text-xs font-medium leading-none text-gray-800">{contact.name}</p>
                <p className="text-xs text-sky-600">{contact.role}</p>
                <div className="flex items-center gap-1 text-xs mt-0.5">
                  <Mail className="h-3 w-3 mr-0.5 text-blue-500" />
                  <span className="truncate text-muted-foreground text-[10px]">{contact.email}</span>
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
