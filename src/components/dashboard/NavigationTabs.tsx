import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  BarChart3,
  Building,
  Globe,
  Package,
  Radio,
  AlertTriangle,
  TrendingUp,
  Users,
  CreditCard
} from "lucide-react";

export type DashboardView = 
  | "overview" 
  | "regional" 
  | "branch" 
  | "product" 
  | "channel" 
  | "concerning" 
  | "trends" 
  | "performance";

interface NavigationTabsProps {
  activeView: DashboardView;
  onViewChange: (view: DashboardView) => void;
}

const navigationItems = [
  { key: "overview" as DashboardView, label: "Overview", icon: BarChart3 },
  { key: "regional" as DashboardView, label: "Regional Analysis", icon: Globe },
  { key: "branch" as DashboardView, label: "Branch Performance", icon: Building },
  { key: "product" as DashboardView, label: "Product Portfolio", icon: Package },
  { key: "channel" as DashboardView, label: "Channel Analysis", icon: Radio },
  { key: "concerning" as DashboardView, label: "Concerning Cases", icon: AlertTriangle },
  { key: "trends" as DashboardView, label: "Trends & Forecasts", icon: TrendingUp },
  { key: "performance" as DashboardView, label: "Performance Metrics", icon: Users }
];

export function NavigationTabs({ activeView, onViewChange }: NavigationTabsProps) {
  return (
    <div className="bg-card border rounded-lg p-2 mb-6">
      <div className="flex flex-wrap gap-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.key;
          
          return (
            <Button
              key={item.key}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange(item.key)}
              className={cn(
                "flex items-center gap-2 transition-all duration-200",
                isActive && "bg-primary text-primary-foreground shadow-sm"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}