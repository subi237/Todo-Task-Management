
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Flag, CheckCircle2, AlertCircle } from "lucide-react";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  const filters = [
    { id: "all", label: "All Tasks", icon: <Flag className="w-4 h-4" />, count: 12 },
    { id: "today", label: "Due Today", icon: <Calendar className="w-4 h-4" />, count: 3 },
    { id: "overdue", label: "Overdue", icon: <Clock className="w-4 h-4" />, count: 1 },
    { id: "in-progress", label: "In Progress", icon: <AlertCircle className="w-4 h-4" />, count: 5 },
    { id: "completed", label: "Completed", icon: <CheckCircle2 className="w-4 h-4" />, count: 8 },
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-100">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "default" : "ghost"}
          onClick={() => onFilterChange(filter.id)}
          className={`flex items-center space-x-2 ${
            activeFilter === filter.id
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
              : "text-gray-600 hover:text-gray-900 hover:bg-white/80"
          }`}
        >
          {filter.icon}
          <span>{filter.label}</span>
          <Badge variant="secondary" className="ml-1 bg-white/20 text-current">
            {filter.count}
          </Badge>
        </Button>
      ))}
    </div>
  );
}
