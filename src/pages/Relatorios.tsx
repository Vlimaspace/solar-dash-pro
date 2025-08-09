import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { mockClientes } from "@/data/mockData";
import { FileText, Download, Calendar, Users, Filter } from "lucide-react";

export default function Relatorios() {
  const { toast } = useToast();
  const [selectedClientes, setSelectedClientes] = useState<string[]>([]);
  const [tipoRelatorio, setTipoRelatorio] = useState<string>("");
  const [periodo, setPeriodo] = useState<string>("");
  const [dataInicio, setDataInicio] = useState<string>("");
  const [dataFim, setDataFim] = useState<string>("");

  const handleClienteToggle = (clienteId: string) => {
    setSelectedClientes(prev => 
      prev.includes(clienteId)
        ? prev.filter(id => id !== clienteId)
        : [...prev, clienteId]
    );
  };

  const handleSelectAllClientes = () => {
    if (selectedClientes.length === mockClientes.length) {
      setSelectedClientes([]);
    } else {
      setSelectedClientes(mockClientes.map(c => c.id));
    }
  };

  const handleExportPDF = () => {
    if (!tipoRelatorio || selectedClientes.length === 0) {
      toast({
        title: "Erro de validação",
        description: "Selecione pelo menos um cliente e o tipo de relatório.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Relatório PDF gerado!",
      description: `Relatório de ${tipoRelatorio} exportado com sucesso.`,
    });
  };

  const handleExportExcel = () => {
    if (!tipoRelatorio || selectedClientes.length === 0) {
      toast({
        title: "Erro de validação",
        description: "Selecione pelo menos um cliente e o tipo de relatório.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Relatório Excel gerado!",
      description: `Planilha de ${tipoRelatorio} exportada com sucesso.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          Relatórios
        </h1>
        <p className="text-muted-foreground">Gere relatórios personalizados do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuração do Relatório */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tipo de Relatório */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-primary" />
                Tipo de Relatório
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Selecione o tipo de relatório</Label>
                <Select value={tipoRelatorio} onValueChange={setTipoRelatorio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o tipo de relatório" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geracao">Relatório de Geração</SelectItem>
                    <SelectItem value="consumo">Relatório de Consumo</SelectItem>
                    <SelectItem value="delta">Relatório de Delta/Economia</SelectItem>
                    <SelectItem value="completo">Relatório Completo</SelectItem>
                    <SelectItem value="mensal">Relatório Mensal</SelectItem>
                    <SelectItem value="anual">Relatório Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Período */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Período
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Selecione o período</Label>
                <Select value={periodo} onValueChange={setPeriodo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Últimos 7 dias</SelectItem>
                    <SelectItem value="30">Últimos 30 dias</SelectItem>
                    <SelectItem value="90">Últimos 90 dias</SelectItem>
                    <SelectItem value="mes">Mês atual</SelectItem>
                    <SelectItem value="ano">Ano atual</SelectItem>
                    <SelectItem value="personalizado">Período personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {periodo === "personalizado" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataInicio">Data de Início</Label>
                    <Input
                      id="dataInicio"
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataFim">Data de Fim</Label>
                    <Input
                      id="dataFim"
                      type="date"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seleção de Clientes */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Clientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Selecione os clientes para o relatório</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleSelectAllClientes}
                  >
                    {selectedClientes.length === mockClientes.length ? "Desmarcar Todos" : "Selecionar Todos"}
                  </Button>
                </div>

                <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-3">
                  {mockClientes.map((cliente) => (
                    <div key={cliente.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={cliente.id}
                        checked={selectedClientes.includes(cliente.id)}
                        onCheckedChange={() => handleClienteToggle(cliente.id)}
                      />
                      <Label 
                        htmlFor={cliente.id} 
                        className="text-sm font-normal cursor-pointer flex-1"
                      >
                        {cliente.nome}
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        {cliente.status === "ativo" ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  {selectedClientes.length} de {mockClientes.length} clientes selecionados
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview e Exportação */}
        <div className="space-y-6">
          {/* Preview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Preview do Relatório</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tipo:</span>
                    <span className="font-medium">
                      {tipoRelatorio || "Não selecionado"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Período:</span>
                    <span className="font-medium">
                      {periodo ? (
                        periodo === "personalizado" 
                          ? `${dataInicio} até ${dataFim}`
                          : periodo === "7" ? "Últimos 7 dias"
                          : periodo === "30" ? "Últimos 30 dias"
                          : periodo === "90" ? "Últimos 90 dias"
                          : periodo === "mes" ? "Mês atual"
                          : "Ano atual"
                      ) : "Não selecionado"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Clientes:</span>
                    <span className="font-medium">
                      {selectedClientes.length} selecionados
                    </span>
                  </div>
                </div>
              </div>

              {selectedClientes.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Clientes incluídos:</Label>
                  <div className="max-h-32 overflow-y-auto text-xs space-y-1">
                    {selectedClientes.map(id => {
                      const cliente = mockClientes.find(c => c.id === id);
                      return (
                        <div key={id} className="p-2 bg-primary/5 rounded text-primary">
                          {cliente?.nome}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Botões de Exportação */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Exportar Relatório</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={handleExportPDF}
                className="w-full bg-gradient-energy shadow-energy"
                disabled={!tipoRelatorio || selectedClientes.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button 
                onClick={handleExportExcel}
                variant="outline"
                className="w-full"
                disabled={!tipoRelatorio || selectedClientes.length === 0}
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar Excel
              </Button>
            </CardContent>
          </Card>

          {/* Informações */}
          <Card className="shadow-card bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="text-sm space-y-2">
                <h4 className="font-medium text-primary">Sobre os Relatórios</h4>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• PDF: Ideal para apresentações e arquivamento</li>
                  <li>• Excel: Permite análises e edições posteriores</li>
                  <li>• Dados atualizados em tempo real</li>
                  <li>• Histórico completo disponível</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}