
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Plus } from "lucide-react";
import { ViewMode, FilterOption } from "@/services/orderService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrdersToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  filterOption: FilterOption;
  setFilterOption: (option: FilterOption) => void;
  filterJobType: string;
  setFilterJobType: (jobType: string) => void;
  filterAEName: string;
  setFilterAEName: (aeName: string) => void;
  jobTypes: string[];
  aeNames: string[];
}

const OrdersToolbar: React.FC<OrdersToolbarProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  setViewMode,
  filterOption,
  setFilterOption,
  filterJobType,
  setFilterJobType,
  filterAEName,
  setFilterAEName,
  jobTypes,
  aeNames,
}) => {
  const [showFilters, setShowFilters] = React.useState(false);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by order ID, title, or name..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-3.5 w-3.5" />
            <span>Filter</span>
          </Button>
          
          <div className="flex items-center border rounded-md overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none h-8 px-3 ${viewMode === 'card' ? 'bg-[#007AFF] text-white' : ''}`}
              onClick={() => setViewMode('card')}
            >
              Cards
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`rounded-none h-8 px-3 ${viewMode === 'table' ? 'bg-[#007AFF] text-white' : ''}`}
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
          </div>
          
          <Button className="bg-[#007AFF] hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-1" /> New Order
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
          <div>
            <label className="text-sm font-medium mb-1 block">Status</label>
            <Select 
              value={filterOption}
              onValueChange={(value) => setFilterOption(value as FilterOption)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Job Type</label>
            <Select 
              value={filterJobType}
              onValueChange={setFilterJobType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Job Types</SelectItem>
                {jobTypes.map(jobType => (
                  <SelectItem key={jobType} value={jobType}>{jobType}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Account Executive</label>
            <Select 
              value={filterAEName}
              onValueChange={setFilterAEName}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select AE" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Account Executives</SelectItem>
                {aeNames.map(aeName => (
                  <SelectItem key={aeName} value={aeName}>{aeName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersToolbar;
