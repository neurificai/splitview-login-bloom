
import React from "react";
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar, DollarSign, Package, TrendingUp } from "lucide-react";
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
            {/* Header Row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-900">#{project.projectNumber}</h3>
                <Badge className={cn("text-xs", getStatusColor(project.projectStatus))}>
                  {project.projectStatus}
                </Badge>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Units Container - Non-clickable button-like styling */}
                <div className="px-3 py-1 border border-black rounded text-xs text-black bg-white flex items-center gap-1">
                  <Package size={12} />
                  <span>{project.unitStatus.completed}/{project.unitStatus.total} Units</span>
                </div>
                
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

            {/* Project Description */}
            <p className="text-sm text-gray-700 mb-3 line-clamp-2">
              {project.opportunity}
            </p>

            {/* Info Grid - 3 columns instead of 4 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-1">
                <Calendar size={12} className="text-gray-400" />
                <span className="text-gray-600">Project:</span>
                <span className="font-medium">{formattedProjectDate}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Calendar size={12} className="text-gray-400" />
                <span className="text-gray-600">Fulfill:</span>
                <span className="font-medium">{formattedFulfillDate}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <DollarSign size={12} className="text-gray-400" />
                <span className="text-gray-600">Total:</span>
                <span className="font-medium">${project.projectTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SimpleOrderList;
