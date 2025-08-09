import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getTotalsData, mockGeracaoDiaria, mockAlerts } from "@/data/mockData";
import { Zap, Users, TrendingUp, Activity, AlertTriangle, CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function Home() {
  const totals = getTotalsData();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Monitoramento em tempo real do sistema fotovoltaico</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Período Personalizado</Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Geração Total"
          value={`${totals.geracaoTotal.toLocaleString()} kWh`}
          subtitle="Acumulado mensal"
          icon={Zap}
          variant="solar"
          trend={{ value: 12.5, label: "vs mês anterior" }}
        />
        <MetricCard
          title="Consumo Total"
          value={`${totals.consumoTotal.toLocaleString()} kWh`}
          subtitle="Acumulado mensal"
          icon={Activity}
          variant="energy"
          trend={{ value: -5.2, label: "vs mês anterior" }}
        />
        <MetricCard
          title="Delta (Economia)"
          value={`${totals.deltaTotal.toLocaleString()} kWh`}
          subtitle={`${totals.deltaPercentual.toFixed(1)}% de economia`}
          icon={TrendingUp}
          trend={{ value: 8.3, label: "vs mês anterior" }}
        />
        <MetricCard
          title="Clientes Ativos"
          value={`${totals.clientesAtivos}/${totals.totalClientes}`}
          subtitle="Total de clientes"
          icon={Users}
          trend={{ value: 2, label: "novos clientes" }}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Geração vs Consumo Diário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockGeracaoDiaria}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="data" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                />
                <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                  formatter={(value, name) => [
                    `${value} kWh`, 
                    name === 'geracao' ? 'Geração' : 'Consumo'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="geracao" 
                  stroke="hsl(var(--solar-yellow))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--solar-yellow))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="consumo" 
                  stroke="hsl(var(--energy-blue))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--energy-blue))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Eficiência Diária
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockGeracaoDiaria.map(d => ({
                ...d,
                eficiencia: ((d.geracao / d.consumo) * 100).toFixed(1)
              }))}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis 
                  dataKey="data"
                  tickFormatter={(value) => new Date(value).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                />
                <YAxis label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('pt-BR')}
                  formatter={(value) => [`${value}%`, 'Eficiência']}
                />
                <Bar 
                  dataKey="eficiencia" 
                  fill="hsl(var(--energy-green))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Recentes */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-status-warning" />
            Alertas e Status Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  {alert.tipo === "offline" ? (
                    <div className="h-3 w-3 bg-status-error rounded-full animate-glow"></div>
                  ) : (
                    <CheckCircle className="h-5 w-5 text-status-warning" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{alert.cliente}</p>
                    <p className="text-sm text-muted-foreground">{alert.mensagem}</p>
                  </div>
                </div>
                <div className="text-right">
                  <StatusBadge status={alert.tipo as any} size="sm" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(alert.timestamp).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}