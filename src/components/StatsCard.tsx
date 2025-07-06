
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-purple-100 hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          </div>
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg",
            `bg-gradient-to-r ${color}`
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
