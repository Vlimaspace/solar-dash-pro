import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "ativo" | "inativo" | "manutencao" | "offline";
  size?: "sm" | "default" | "lg";
}

export function StatusBadge({ status, size = "default" }: StatusBadgeProps) {
  const statusConfig = {
    ativo: {
      label: "Ativo",
      className: "bg-status-active/10 text-status-active border-status-active/30",
      iconColor: "text-status-active"
    },
    inativo: {
      label: "Inativo", 
      className: "bg-muted text-muted-foreground border-muted-foreground/30",
      iconColor: "text-muted-foreground"
    },
    manutencao: {
      label: "Manutenção",
      className: "bg-status-warning/10 text-status-warning border-status-warning/30", 
      iconColor: "text-status-warning"
    },
    offline: {
      label: "Offline",
      className: "bg-status-error/10 text-status-error border-status-error/30",
      iconColor: "text-status-error"
    }
  };

  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="outline" 
      className={cn(
        "flex items-center gap-1 font-medium",
        config.className,
        size === "sm" && "text-xs px-2 py-0.5",
        size === "lg" && "text-sm px-3 py-1"
      )}
    >
      <Circle className={cn(
        config.iconColor,
        size === "sm" ? "h-2 w-2" : "h-3 w-3"
      )} fill="currentColor" />
      {config.label}
    </Badge>
  );
}