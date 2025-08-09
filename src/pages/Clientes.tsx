import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { mockClientes } from "@/data/mockData";
import { Search, Users, Eye, Plus } from "lucide-react";

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("todos");
  const [sortBy, setSortBy] = useState<string>("nome");

  const filteredClientes = mockClientes
    .filter(cliente => {
      const matchesSearch = cliente.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "todos" || cliente.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "delta":
          return b.delta - a.delta;
        case "geracao":
          return b.geracaoTotal - a.geracaoTotal;
        case "consumo":
          return b.consumoTotal - a.consumoTotal;
        default:
          return a.nome.localeCompare(b.nome);
      }
    });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <Users className="h-8 w-8 text-primary" />
            Lista de Clientes
          </h1>
          <p className="text-muted-foreground">Gerencie todos os clientes do sistema</p>
        </div>
        <Button asChild className="bg-gradient-energy shadow-energy">
          <Link to="/novocliente">
            <Plus className="h-4 w-4 mr-2" />
            Novo Cliente
          </Link>
        </Button>
      </div>

      {/* Filtros */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome do cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="nome">Nome</SelectItem>
                <SelectItem value="delta">Delta (Economia)</SelectItem>
                <SelectItem value="geracao">Geração Total</SelectItem>
                <SelectItem value="consumo">Consumo Total</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{mockClientes.length}</div>
            <div className="text-sm text-muted-foreground">Total de Clientes</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-status-active">
              {mockClientes.filter(c => c.status === "ativo").length}
            </div>
            <div className="text-sm text-muted-foreground">Clientes Ativos</div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-foreground">{filteredClientes.length}</div>
            <div className="text-sm text-muted-foreground">Resultados da Busca</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Clientes */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Clientes Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Equipamento</TableHead>
                  <TableHead className="text-right">Geração (kWh)</TableHead>
                  <TableHead className="text-right">Consumo (kWh)</TableHead>
                  <TableHead className="text-right">Delta (kWh)</TableHead>
                  <TableHead className="text-right">Economia (%)</TableHead>
                  <TableHead className="text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow key={cliente.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold text-foreground">{cliente.nome}</div>
                        <div className="text-sm text-muted-foreground">{cliente.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={cliente.status} size="sm" />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={cliente.equipamentoStatus} size="sm" />
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {cliente.geracaoTotal.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      {cliente.consumoTotal.toLocaleString()}
                    </TableCell>
                    <TableCell className={`text-right font-mono ${
                      cliente.delta > 0 ? "text-status-active" : "text-status-error"
                    }`}>
                      {cliente.delta > 0 ? "+" : ""}{cliente.delta}
                    </TableCell>
                    <TableCell className={`text-right font-mono ${
                      cliente.deltaPercentual > 0 ? "text-status-active" : "text-status-error"
                    }`}>
                      {cliente.deltaPercentual > 0 ? "+" : ""}{cliente.deltaPercentual.toFixed(1)}%
                    </TableCell>
                    <TableCell className="text-center">
                      <Button asChild variant="outline" size="sm">
                        <Link to={`/clientes/${cliente.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredClientes.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Nenhum cliente encontrado</p>
                <p className="text-sm">Tente ajustar os filtros de busca</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}