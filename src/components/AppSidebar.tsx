import { Home, Users, UserPlus, Settings, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Página Inicial", url: "/", icon: Home },
  { title: "Lista de Clientes", url: "/clientes", icon: Users },
];

const managementItems = [
  { title: "Cadastrar Novo Cliente", url: "/novocliente", icon: UserPlus },
  { title: "Relatórios", url: "/relatorios", icon: FileText },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  const getNavClasses = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-energy" 
      : "hover:bg-secondary/60 transition-colors";

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} border-r border-border bg-card transition-all duration-300`}
      collapsible="icon"
    >
      <SidebarContent className="p-4">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-gradient-solar flex items-center justify-center">
            <div className="h-4 w-4 bg-white rounded-full"></div>
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-foreground">CRM Solar</h2>
              <p className="text-xs text-muted-foreground">Energia Fotovoltaica</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground mb-2">
            {!collapsed && "Menu Principal"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClasses}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground mb-2 mt-6">
            {!collapsed && "Gestão"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {managementItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClasses}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}