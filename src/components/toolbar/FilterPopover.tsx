
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, Calendar as CalendarIcon } from "lucide-react";
import { FilterOption } from "@/services/orderService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FilterPopoverProps {
  filterOption: FilterOption;
  setFilterOption: (option: FilterOption) => void;
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  filterOption,
  setFilterOption,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  const [calendarView, setCalendarView] = useState<"start" | "end">("start");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
        >
          <Filter className="h-3.5 w-3.5 text-blue-200" />
          <span>Filter</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Filter by status</h4>
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

          <div className="space-y-2">
            <h4 className="font-medium text-sm">Filter by date range</h4>
            <div className="flex flex-col gap-2">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Start date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                      {startDate ? format(startDate, "MMM dd, yyyy") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <div className="text-xs text-muted-foreground mb-1">End date</div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-3.5 w-3.5" />
                      {endDate ? format(endDate, "MMM dd, yyyy") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      disabled={date => startDate ? date < startDate : false}
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {(startDate || endDate) && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-1"
                  onClick={() => {
                    setStartDate(undefined);
                    setEndDate(undefined);
                  }}
                >
                  Clear date filter
                </Button>
              )}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
