
import React from "react";
import { FilterOption } from "@/services/orderService";
import SearchBar from "@/components/toolbar/SearchBar";
import FilterPopover from "@/components/toolbar/FilterPopover";
import ActionButtons from "@/components/toolbar/ActionButtons";

interface OrdersToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filterOption: FilterOption;
  setFilterOption: (option: FilterOption) => void;
  filterJobType?: string;
  setFilterJobType?: (jobType: string) => void;
  filterAEName?: string;
  setFilterAEName?: (aeName: string) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
  jobTypes?: string[];
  aeNames?: string[];
}

const OrdersToolbar: React.FC<OrdersToolbarProps> = ({
  searchQuery,
  onSearchChange,
  filterOption,
  setFilterOption,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="space-y-4 mb-6">
      {/* <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"> */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />

        <div className="flex items-center gap-2">
          <FilterPopover
            filterOption={filterOption}
            setFilterOption={setFilterOption}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />

          {/* <ActionButtons /> */}
        </div>
      </div>
    </div>
  );
};

export default OrdersToolbar;
