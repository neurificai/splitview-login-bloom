
// Project model
export interface Project {
  Project_ID: string;
  Project_Name: string;
  Project_Type: string;
  Client: string;
  Start_Date: string;
  Owner: string;
  Manager: string;
  Budget: number;
  Progress: number;
  Is_Approved: boolean;
  Is_Funded: boolean;
  Notes: string;
}

// View mode and filter options
export type ViewMode = "card" | "table";
export type FilterOption = "all" | "inProgress" | "completed";

// Sample data for projects
export const projects: Project[] = [
  {
    Project_ID: "PRJ2501",
    Project_Name: "Website Redesign for XYZ Corp",
    Project_Type: "Web Development",
    Client: "XYZ Corporation",
    Start_Date: "2025-04-10",
    Owner: "Sarah Johnson",
    Manager: "Michael Chen",
    Budget: 45000,
    Progress: 65,
    Is_Approved: true,
    Is_Funded: true,
    Notes: "Client wants a modern, responsive design with improved user experience. Focus on mobile-first approach and accessibility features."
  },
  {
    Project_ID: "PRJ2502",
    Project_Name: "E-commerce Platform Integration",
    Project_Type: "System Integration",
    Client: "Retail Partners Inc.",
    Start_Date: "2025-05-05",
    Owner: "Thomas Wright",
    Manager: "Jennifer Lopez",
    Budget: 75000,
    Progress: 30,
    Is_Approved: true,
    Is_Funded: false,
    Notes: "Integration between existing POS system and new online store. Data migration needs to be carefully planned to avoid disruption to operations."
  },
  {
    Project_ID: "PRJ2503",
    Project_Name: "Mobile App Development",
    Project_Type: "App Development",
    Client: "HealthTech Solutions",
    Start_Date: "2025-03-15",
    Owner: "Adam Parrock",
    Manager: "Michael Schultz",
    Budget: 120000,
    Progress: 85,
    Is_Approved: true,
    Is_Funded: true,
    Notes: "Health tracking app with integration to wearable devices. Privacy and security are top priorities. App needs to work offline and sync when connection is available."
  },
  {
    Project_ID: "PRJ2504",
    Project_Name: "Digital Marketing Campaign",
    Project_Type: "Marketing",
    Client: "New Edge Sports",
    Start_Date: "2025-05-01",
    Owner: "Samantha Lee",
    Manager: "Raj Patel",
    Budget: 35000,
    Progress: 15,
    Is_Approved: false,
    Is_Funded: true,
    Notes: "Multi-channel campaign for product launch. Includes social media, email marketing, content creation, and paid advertising. Target audience is 18-35 year old sports enthusiasts."
  }
];

// Helper function to calculate due date (30 days from start date for projects)
export const calculateDueDate = (startDate: string): Date => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + 30); // Projects have 30-day timelines instead of 15
  return date;
};

// Format date to "Month Day, Year" format
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

// Find a project by its ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.Project_ID === id);
};
