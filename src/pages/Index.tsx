
import { useState } from "react";
import { Plus, Search, Filter, Users, Calendar, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TaskCard } from "@/components/TaskCard";
import { CreateTaskDialog } from "@/components/CreateTaskDialog";
import { FilterBar } from "@/components/FilterBar";
import { StatsCard } from "@/components/StatsCard";
import { AuthSection } from "@/components/AuthSection";

const Index = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock data for development
  const mockTasks = [
    {
      id: "1",
      title: "Complete project proposal",
      description: "Finish the Q4 project proposal for the marketing campaign",
      priority: "high" as const,
      status: "in-progress" as const,
      dueDate: "2025-01-08",
      assignee: "John Doe",
      tags: ["work", "urgent"],
      sharedWith: ["jane@example.com"]
    },
    {
      id: "2", 
      title: "Review design mockups",
      description: "Check the new UI designs from the design team",
      priority: "medium" as const,
      status: "todo" as const,
      dueDate: "2025-01-10",
      assignee: "Jane Smith",
      tags: ["design", "review"],
      sharedWith: []
    },
    {
      id: "3",
      title: "Update documentation",
      description: "Update the API documentation with new endpoints",
      priority: "low" as const,
      status: "completed" as const,
      dueDate: "2025-01-05",
      assignee: "Mike Johnson",
      tags: ["docs"],
      sharedWith: []
    }
  ];

  const stats = {
    total: mockTasks.length,
    completed: mockTasks.filter(t => t.status === "completed").length,
    inProgress: mockTasks.filter(t => t.status === "in-progress").length,
    overdue: mockTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "completed").length
  };

  if (!isAuthenticated) {
    return <AuthSection onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-white/50 border-purple-200 focus:border-purple-400"
                />
              </div>
              
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Task
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Tasks"
            value={stats.total}
            icon={<Flag className="w-5 h-5" />}
            color="from-blue-500 to-blue-600"
          />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={<Calendar className="w-5 h-5" />}
            color="from-green-500 to-green-600"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={<Users className="w-5 h-5" />}
            color="from-yellow-500 to-yellow-600"
          />
          <StatsCard
            title="Overdue"
            value={stats.overdue}
            icon={<Filter className="w-5 h-5" />}
            color="from-red-500 to-red-600"
          />
        </div>

        {/* Filter Bar */}
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Empty State */}
        {mockTasks.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-12 h-12 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks yet</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first task</p>
            <Button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Task
            </Button>
          </div>
        )}
      </div>

      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default Index;
