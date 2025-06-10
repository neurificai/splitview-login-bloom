
import React from "react";
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar, DollarSign, Package } from "lucide-react";
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
    <div className="space-y-3 mt-6">
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
              "bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
              "hover:border-gray-300"
            )}
            onClick={(e) => handleRowClick(project.projectNumber, e)}
          >
            {/* Row 1 - Header Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-xs">Project:</span>
                <h3 className="font-semibold text-gray-900">#{project.projectNumber}</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-blue-500" />
                <span className="text-gray-600 text-xs">Project Date:</span>
                <span className="font-medium text-gray-900">{formattedProjectDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-green-500" />
                <span className="text-gray-600 text-xs">Total:</span>
                <span className="font-semibold text-gray-900">${project.projectTotal.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-xs">Status:</span>
                <Badge className={cn("text-xs", getStatusColor(project.projectStatus))}>
                  {project.projectStatus}
                </Badge>
              </div>
            </div>

            {/* Row 2 - Fulfillment & Units */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-purple-500" />
                <span className="text-gray-600 text-xs">Fulfilment Date:</span>
                <span className="font-medium text-gray-900">{formattedFulfillDate}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Package size={14} className="text-orange-500" />
                <span className="text-gray-600 text-xs">Units:</span>
                <span className="font-medium text-gray-900">{project.numberOfUnits}</span>
              </div>
              
              <div className="flex items-center justify-start">
                <div className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-900 bg-white flex items-center gap-1">
                  <Package size={12} className="text-gray-600" />
                  <span>{project.unitStatus.completed}/{project.unitStatus.total} Units</span>
                </div>
              </div>
            </div>

            {/* Row 3 - Description & Actions */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <span className="text-gray-600 text-xs block mb-1">Opportunity:</span>
                <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">
                  {project.opportunity}
                </p>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link to={`/order/${project.projectNumber}`} onClick={(e) => e.stopPropagation()}>
                  <Button 
                    size="sm" 
                    className="bg-yellow-400 text-black hover:bg-yellow-500 border-none"
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
