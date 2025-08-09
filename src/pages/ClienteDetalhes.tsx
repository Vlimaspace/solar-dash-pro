import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MetricCard } from "@/components/MetricCard";
import { StatusBadge } from "@/components/StatusBadge";
import { mockClientes, mockGeracaoDiaria } from "@/data/mockData";
import { ArrowLeft, Download, FileText, Zap, Activity, TrendingUp, Phone, Mail, MapPin } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function ClienteDetalhes() {
  const { id } = useParams();
  const cliente = mockClientes.find(c => c.id === id);

  if (!cliente) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Cliente não encontrado</h1>
        <Button asChild>
          <Link to="/clientes">Voltar à Lista</Link>
        </Button>
      </div>
    );
  }

  // Simular dados específicos do cliente
  const dadosCliente = mockGeracaoDiaria.map(d => ({
    ...d,
    geracao: Math.round(d.geracao * (cliente.geracaoTotal / 1000)),
    consumo: Math.round(d.consumo * (cliente.consumoTotal / 1000))
  }));

  const dadosMensais = [
    { mes: "Jul/23", geracao: 180, consumo: 160 },
    { mes: "Ago/23", geracao: 195, consumo: 155 },
    { mes: "Set/23", geracao: 210, consumo: 150 },
    { mes: "Out/23", geracao: 225, consumo: 165 },
    { mes: "Nov/23", geracao: 240, consumo: 170 },
    { mes: "Dez/23", geracao: 235, consumo: 180 },
    { mes: "Jan/24", geracao: 250, consumo: 175 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link to="/clientes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{cliente.nome}</h1>
            <p className="text-muted-foreground">Detalhes do cliente e monitoramento</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Informações do Cliente */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Informações do Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">{cliente.telefone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">E-mail</p>
                <p className="font-medium">{cliente.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Endereço</p>
                <p className="font-medium text-sm">{cliente.endereco}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Status do Cliente</p>
                <StatusBadge status={cliente.status} />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Status do Equipamento</p>
                <StatusBadge status={cliente.equipamentoStatus} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Consumo Total"
          value={`${cliente.consumoTotal.toLocaleString()} kWh`}
          subtitle="Acumulado mensal"
          icon={Activity}
          variant="energy"
        />
        <MetricCard
          title="Geração Total"
          value={`${cliente.geracaoTotal.toLocaleString()} kWh`}
          subtitle="Acumulado mensal"
          icon={Zap}
          variant="solar"
        />
        <MetricCard
          title="Delta (Economia)"
          value={`${cliente.delta > 0 ? '+' : ''}${cliente.delta} kWh`}
          subtitle={`${cliente.deltaPercentual.toFixed(1)}% de economia`}
          icon={TrendingUp}
          variant={cliente.delta > 0 ? "default" : "warning"}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Geração vs Consumo Diário (Últimos 30 dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dadosCliente}>
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
            <CardTitle>Histórico Mensal (Últimos 12 meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dadosMensais}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="mes" />
                <YAxis label={{ value: 'kWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} kWh`, 
                    name === 'geracao' ? 'Geração' : 'Consumo'
                  ]}
                />
                <Bar 
                  dataKey="geracao" 
                  fill="hsl(var(--solar-yellow))"
                  radius={[2, 2, 0, 0]}
                  name="geracao"
                />
                <Bar 
                  dataKey="consumo" 
                  fill="hsl(var(--energy-blue))"
                  radius={[2, 2, 0, 0]}
                  name="consumo"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Status do Equipamento */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Status do Equipamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-status-active/10 rounded-lg border border-status-active/30">
              <div className="h-12 w-12 bg-status-active rounded-full mx-auto mb-3 flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-status-active">Sistema Ativo</h3>
              <p className="text-sm text-muted-foreground mt-1">Funcionando normalmente</p>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <div className="h-12 w-12 bg-muted rounded-full mx-auto mb-3 flex items-center justify-center">
                <Activity className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">Última Leitura</h3>
              <p className="text-sm text-muted-foreground mt-1">{cliente.ultimaLeitura}</p>
            </div>
            <div className="text-center p-6 bg-muted/50 rounded-lg">
              <div className="h-12 w-12 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold">Eficiência</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {((cliente.geracaoTotal / cliente.consumoTotal) * 100).toFixed(1)}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}