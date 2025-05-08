
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search } from "lucide-react";
import { ViewMode } from "@/services/orderService";

interface OrdersToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const OrdersToolbar: React.FC<OrdersToolbarProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  setViewMode,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
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
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter</span>
        </Button>
        
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-none h-8 px-3 ${viewMode === 'card' ? 'bg-orange-500 text-white' : ''}`}
            onClick={() => setViewMode('card')}
          >
            Cards
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`rounded-none h-8 px-3 ${viewMode === 'table' ? 'bg-orange-500 text-white' : ''}`}
            onClick={() => setViewMode('table')}
          >
            Table
          </Button>
        </div>
        
        <Button className="bg-orange-500 hover:bg-orange-600">+ New Order</Button>
      </div>
    </div>
  );
};

export default OrdersToolbar;
