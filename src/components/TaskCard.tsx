
import { useState } from "react";
import { Calendar, Flag, Users, MoreVertical, Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in-progress" | "completed";
  dueDate: string;
  assignee: string;
  tags: string[];
  sharedWith: string[];
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isCompleted, setIsCompleted] = useState(task.status === "completed");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "todo":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== "completed";
  const daysUntilDue = Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-200 border-l-4 bg-white/80 backdrop-blur-sm",
      task.priority === "high" && "border-l-red-500",
      task.priority === "medium" && "border-l-yellow-500", 
      task.priority === "low" && "border-l-green-500",
      isCompleted && "opacity-75"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-6 w-6 mt-1"
              onClick={() => setIsCompleted(!isCompleted)}
            >
              <CheckCircle2 className={cn(
                "w-5 h-5 transition-colors",
                isCompleted ? "text-green-600 fill-green-100" : "text-gray-400 hover:text-green-500"
              )} />
            </Button>
            <div className="flex-1 min-w-0">
              <h3 className={cn(
                "font-semibold text-gray-900 line-clamp-2",
                isCompleted && "line-through text-gray-500"
              )}>
                {task.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {task.description}
              </p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>Share Task</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Status and Priority */}
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getStatusColor(task.status)}>
              {task.status.replace("-", " ")}
            </Badge>
            <Badge variant="outline" className={getPriorityColor(task.priority)}>
              <Flag className="w-3 h-3 mr-1" />
              {task.priority}
            </Badge>
          </div>

          {/* Due Date */}
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className={cn(
              "text-gray-600",
              isOverdue && "text-red-600 font-medium"
            )}>
              {isOverdue ? "Overdue" : daysUntilDue === 0 ? "Due today" : daysUntilDue === 1 ? "Due tomorrow" : `Due in ${daysUntilDue} days`}
            </span>
            {isOverdue && <Clock className="w-3 h-3 text-red-500" />}
          </div>

          {/* Assignee and Shared */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center text-xs font-medium text-white">
                {task.assignee.split(" ").map(n => n[0]).join("")}
              </div>
              <span>{task.assignee}</span>
            </div>
            
            {task.sharedWith.length > 0 && (
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4 text-gray-400" />
                <span className="text-xs text-gray-500">+{task.sharedWith.length}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {task.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {task.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs bg-purple-100 text-purple-700 hover:bg-purple-200">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
