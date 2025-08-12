import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Download, 
  Filter, 
  RefreshCw,
  TrendingUp
} from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Renewals Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive KPI analysis for policy renewals and collections
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm">
          <Calendar className="w-4 h-4 mr-2" />
          AUG-25
        </Button>
        
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
        
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
        
        <Button variant="default" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}