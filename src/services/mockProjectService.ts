
export interface ProjectData {
  projectNumber: string;
  projectDate: string;
  projectTotal: number;
  projectStatus: 'In-progress' | 'Completed' | 'Pending' | 'On Hold';
  projectFulfillDate: string;
  numberOfUnits: number;
  opportunity: string;
  unitStatus: {
    completed: number;
    total: number;
  };
  progress: number;
}

export const mockProjects: ProjectData[] = [
  {
    projectNumber: "AVSO125",
    projectDate: "2025-05-07",
    projectTotal: 15750.00,
    projectStatus: "In-progress",
    projectFulfillDate: "2025-05-22",
    numberOfUnits: 15,
    opportunity: "3306 Proforce | Qty 15 | Charlotte, NC - Vehicle wrapping and branding for fleet expansion",
    unitStatus: {
      completed: 7,
      total: 15
    },
    progress: 47
  },
  {
    projectNumber: "AVSO1794",
    projectDate: "2025-05-10", 
    projectTotal: 12400.00,
    projectStatus: "In-progress",
    projectFulfillDate: "2025-05-20",
    numberOfUnits: 8,
    opportunity: "4221 Oak Street | Qty 8 | Austin, TX - Frame installation for outdoor signage campaign",
    unitStatus: {
      completed: 6,
      total: 8
    },
    progress: 75
  },
  {
    projectNumber: "AVSO1795",
    projectDate: "2025-05-01",
    projectTotal: 28900.00,
    projectStatus: "Completed",
    projectFulfillDate: "2025-05-18",
    numberOfUnits: 22,
    opportunity: "Millennium Fleet | Qty 22 | Denver, CO - Complete design and installation for fleet vehicles",
    unitStatus: {
      completed: 22,
      total: 22
    },
    progress: 100
  },
  {
    projectNumber: "AVSO1796",
    projectDate: "2025-05-05",
    projectTotal: 8200.00,
    projectStatus: "Pending",
    projectFulfillDate: "2025-05-25",
    numberOfUnits: 5,
    opportunity: "NewTech Industries | Qty 5 | Seattle, WA - High-visibility vinyl printing for night operations",
    unitStatus: {
      completed: 1,
      total: 5
    },
    progress: 20
  }
];

export const getProjectList = () => {
  return Promise.resolve({
    data: {
      records: mockProjects,
      total_count: mockProjects.length
    }
  });
};
