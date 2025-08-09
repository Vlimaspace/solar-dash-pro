import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Settings, User, Bell, Palette, RefreshCw, Save } from "lucide-react";

export default function Configuracoes() {
  const { toast } = useToast();
  const [theme, setTheme] = useState("light");
  
  const [userData, setUserData] = useState({
    nome: "Administrador do Sistema",
    email: "admin@crmsolar.com",
    telefone: "(11) 99999-9999",
    empresa: "CRM Solar Ltda"
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    alertas: true
  });

  const [systemSettings, setSystemSettings] = useState({
    intervaloAtualizacao: "5", // minutos
    fusoHorario: "America/Sao_Paulo",
    moeda: "BRL",
    unidadeEnergia: "kWh"
  });

  // Simple theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    } else {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const handleSaveUserData = () => {
    toast({
      title: "Dados salvos com sucesso!",
      description: "Suas informações pessoais foram atualizadas.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Preferências de notificação salvas!",
      description: "Suas configurações de notificação foram atualizadas.",
    });
  };

  const handleSaveSystemSettings = () => {
    toast({
      title: "Configurações do sistema salvas!",
      description: "As configurações do sistema foram atualizadas.",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Settings className="h-8 w-8 text-primary" />
          Configurações
        </h1>
        <p className="text-muted-foreground">Gerencie suas preferências e configurações do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dados do Usuário */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Dados da Conta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={userData.nome}
                onChange={(e) => setUserData(prev => ({ ...prev, nome: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={userData.telefone}
                onChange={(e) => setUserData(prev => ({ ...prev, telefone: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="empresa">Empresa</Label>
              <Input
                id="empresa"
                value={userData.empresa}
                onChange={(e) => setUserData(prev => ({ ...prev, empresa: e.target.value }))}
              />
            </div>

            <Button onClick={handleSaveUserData} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Salvar Dados
            </Button>
          </CardContent>
        </Card>

        {/* Notificações */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notificações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações por E-mail</Label>
                <p className="text-sm text-muted-foreground">
                  Receber alertas e relatórios por e-mail
                </p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, email: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações Push</Label>
                <p className="text-sm text-muted-foreground">
                  Notificações no navegador
                </p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, push: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>SMS</Label>
                <p className="text-sm text-muted-foreground">
                  Alertas críticos por SMS
                </p>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, sms: checked }))
                }
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Alertas do Sistema</Label>
                <p className="text-sm text-muted-foreground">
                  Notificações de falhas e manutenção
                </p>
              </div>
              <Switch
                checked={notifications.alertas}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, alertas: checked }))
                }
              />
            </div>

            <Button onClick={handleSaveNotifications} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Salvar Notificações
            </Button>
          </CardContent>
        </Card>

        {/* Aparência */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Aparência
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Tema do Sistema</Label>
              <Select value={theme} onValueChange={handleThemeChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Escuro</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Escolha entre tema claro, escuro ou seguir o sistema
              </p>
            </div>

            <div className="p-4 bg-gradient-solar rounded-lg text-white">
              <h4 className="font-medium mb-2">Preview do Tema</h4>
              <p className="text-sm opacity-90">
                Este é um exemplo de como os elementos do sistema aparecem com o tema selecionado.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Configurações do Sistema */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-primary" />
              Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Intervalo de Atualização</Label>
              <Select 
                value={systemSettings.intervaloAtualizacao} 
                onValueChange={(value) => 
                  setSystemSettings(prev => ({ ...prev, intervaloAtualizacao: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minuto</SelectItem>
                  <SelectItem value="5">5 minutos</SelectItem>
                  <SelectItem value="10">10 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Fuso Horário</Label>
              <Select 
                value={systemSettings.fusoHorario} 
                onValueChange={(value) => 
                  setSystemSettings(prev => ({ ...prev, fusoHorario: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                  <SelectItem value="America/New_York">Nova York (GMT-4)</SelectItem>
                  <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Unidade de Energia</Label>
              <Select 
                value={systemSettings.unidadeEnergia} 
                onValueChange={(value) => 
                  setSystemSettings(prev => ({ ...prev, unidadeEnergia: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kWh">kWh (Quilowatt-hora)</SelectItem>
                  <SelectItem value="MWh">MWh (Megawatt-hora)</SelectItem>
                  <SelectItem value="Wh">Wh (Watt-hora)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleSaveSystemSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Informações do Sistema */}
      <Card className="shadow-card bg-muted/50">
        <CardHeader>
          <CardTitle>Informações do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <Label className="text-muted-foreground">Versão</Label>
              <p className="font-medium">v2.1.0</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Última Atualização</Label>
              <p className="font-medium">09/01/2024 15:30</p>
            </div>
            <div>
              <Label className="text-muted-foreground">Suporte</Label>
              <p className="font-medium">suporte@crmsolar.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}