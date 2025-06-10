
import React from "react";
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { Layers } from "lucide-react";
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
        <p className="text-xs text-gray-500">No projects found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-4">
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
              "bg-white border border-[#003864] rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer",
              "hover:border-gray-300"
            )}
            onClick={(e) => handleRowClick(project.projectNumber, e)}
          >
            {/* First Row with Background - Horizontally Aligned Labels */}
            <div className="bg-gray-50 rounded-t-lg p-3 mb-0">
              <div className="grid grid-cols-5 gap-2 items-baseline">
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 mb-0.5 leading-tight">Project</span>
                  <h3 className="text-[15px] text-gray-900 truncate leading-tight">#{project.projectNumber}</h3>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 mb-0.5 leading-tight">Project Date</span>
                  <span className="text-[15px] text-gray-900 truncate leading-tight">{formattedProjectDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 mb-0.5 leading-tight">Fulfilment Date</span>
                  <span className="text-[15px] text-gray-900 truncate leading-tight">{formattedFulfillDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 mb-0.5 leading-tight">Project Total</span>
                  <div className="text-[15px] text-gray-900 truncate leading-tight">${project.projectTotal.toLocaleString()}</div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[15px] text-gray-500 mb-0.5 leading-tight">Unit Status</span>
                  <div className="inline-flex items-center px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[15px] text-gray-900 w-fit">
                    <Layers size={10} className="mr-1 text-green-600" />
                    {project.unitStatus.completed}/{project.unitStatus.total}
                  </div>
                </div>
              </div>
            </div>

            {/* Second Row with White Background - Horizontally Aligned */}
            <div className="p-3 pt-2 flex items-baseline justify-between gap-3">
              <div className="flex-1">
                <span className="text-gray-500 text-[15px] leading-tight mb-1 block">Opportunity</span>
                <p className="text-gray-900 leading-relaxed text-[15px]">
                  {project.opportunity}
                </p>
              </div>
              <div className="flex items-baseline gap-2">
                <Badge className={cn("text-xs whitespace-nowrap", getStatusColor(project.projectStatus))}>
                  {project.projectStatus}
                </Badge>
                <Link to={`/order/${project.projectNumber}`} onClick={(e) => e.stopPropagation()}>
                  <Button 
                    size="sm" 
                    className="bg-[#40bbea] text-white hover:bg-[#2da8d8] border-none text-xs py-1 px-3 h-6 whitespace-nowrap"
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
