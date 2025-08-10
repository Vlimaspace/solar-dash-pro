import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  variant?: "default" | "solar" | "energy" | "warning" | "error";
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend, 
  variant = "default",
  className 
}: MetricCardProps) {
  const variantClasses = {
    default: "bg-card border-border",
    solar: "bg-gradient-solar text-white border-0 shadow-solar",
    energy: "bg-gradient-to-r from-blue-700 via-blue-800 to-blue-950 text-white border-0 shadow-lg",
    warning: "bg-status-warning/10 border-status-warning/30",
    error: "bg-status-error/10 border-status-error/30"
  };

  const iconClasses = {
    default: "text-primary",
    solar: "text-white",
    energy: "text-white", 
    warning: "text-status-warning",
    error: "text-status-error"
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:scale-105 animate-fade-in",
      variantClasses[variant],
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={cn(
          "text-sm font-medium",
          variant === "solar" || variant === "energy" ? "text-white" : "text-muted-foreground"
        )}>
          {title}
        </CardTitle>
        <Icon className={cn("h-5 w-5", iconClasses[variant])} />
      </CardHeader>
      <CardContent>
        <div className={cn(
          "text-2xl font-bold",
          variant === "solar" || variant === "energy" ? "text-white" : "text-foreground"
        )}>
          {value}
        </div>
        {subtitle && (
          <p className={cn(
            "text-xs mt-1",
            variant === "solar" || variant === "energy" ? "text-white/80" : "text-muted-foreground"
          )}>
            {subtitle}
          </p>
        )}
        {trend && (
          <div className={cn(
            "flex items-center text-xs mt-2",
            variant === "solar" || variant === "energy" ? "text-white/90" : "text-muted-foreground"
          )}>
            <span className={cn(
              
            )}>
              {trend.value > 0 ? "+" : ""}{trend.value}%
            </span>
            <span className="ml-1">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}