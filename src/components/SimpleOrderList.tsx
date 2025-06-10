
import React from "react";
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { getProjectList, ProjectData } from "../services/mockProjectService";

const SimpleOrderList: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const handleRowClick = (projectNumber: string, event: React.MouseEvent) => {
    // Prevent navigation if the click was on the action button
    if ((event.target as HTMLElement).closest('a, button')) {
      return;
    }
    navigate(`/order/${projectNumber}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProjectList();
        if (result) {
          setProjects(result.data.records);
        }
      } catch (error) {
        console.error("Error Fetching Data:", error);
      }
    };
    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In-progress':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Hold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-white shadow-sm">
        <p className="text-gray-500">No projects found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {projects.map((project, index) => {
        const projectDate = new Date(project.projectDate);
        const fulfillDate = new Date(project.projectFulfillDate);
        const formattedProjectDate = isNaN(projectDate.getTime())
          ? "Unknown date"
          : format(projectDate, "MMM d, yyyy");
        const formattedFulfillDate = isNaN(fulfillDate.getTime())
          ? "Unknown date"
          : format(fulfillDate, "MMM d, yyyy");

        return (
          <div
            key={project.projectNumber}
            className={cn(
              "bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer",
              "hover:border-gray-300"
            )}
            onClick={(e) => handleRowClick(project.projectNumber, e)}
          >
            {/* Header Row */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Project:</span>
                <h3 className="text-xs text-gray-900 whitespace-nowrap">#{project.projectNumber}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Project Date:</span>
                <span className="text-xs text-gray-900 whitespace-nowrap">{formattedProjectDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Status:</span>
                <Badge className={cn("text-xs", getStatusColor(project.projectStatus))}>
                  {project.projectStatus}
                </Badge>
              </div>
            </div>

            {/* Details Row */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Fulfilment Date:</span>
                <span className="text-xs text-gray-900 whitespace-nowrap">{formattedFulfillDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Units:</span>
                <span className="text-xs text-gray-900 whitespace-nowrap">{project.numberOfUnits}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Total:</span>
                <div className="text-xs text-gray-900 whitespace-nowrap">${project.projectTotal.toLocaleString()}</div>
              </div>
            </div>

            {/* Unit Status Row */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div></div>
              <div></div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Unit Status:</span>
                <div className="inline-flex items-center px-2 py-1 bg-gray-50 border border-gray-200 rounded-md text-xs text-gray-900 whitespace-nowrap">
                  {project.unitStatus.completed}/{project.unitStatus.total} Units
                </div>
              </div>
            </div>

            {/* Description and Action Row */}
            <div className="flex items-start justify-between gap-6 pt-4 border-t border-gray-100">
              <div className="flex-1">
                <span className="text-gray-500 text-xs block mb-2">Opportunity:</span>
                <p className="text-gray-900 leading-relaxed text-sm">
                  {project.opportunity}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <Link to={`/order/${project.projectNumber}`} onClick={(e) => e.stopPropagation()}>
                  <Button 
                    size="sm" 
                    className="bg-yellow-400 text-black hover:bg-yellow-500 border-none px-6"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SimpleOrderList;
