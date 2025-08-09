import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save, UserPlus, X } from "lucide-react";

export default function NovoCliente() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    status: "ativo" as "ativo" | "inativo",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome || !formData.email || !formData.telefone || !formData.endereco) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Simular salvamento
    toast({
      title: "Cliente cadastrado com sucesso!",
      description: `${formData.nome} foi adicionado ao sistema.`,
    });

    // Redirecionar para a lista de clientes
    navigate("/clientes");
  };

  const handleReset = () => {
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      endereco: "",
      status: "ativo",
      observacoes: ""
    });
  };

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
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <UserPlus className="h-8 w-8 text-primary" />
              Cadastrar Novo Cliente
            </h1>
            <p className="text-muted-foreground">Adicione um novo cliente ao sistema</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Dados do Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sm font-medium">
                Nome Completo *
              </Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite o nome completo do cliente"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                required
              />
            </div>

            {/* Email e Telefone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="cliente@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone" className="text-sm font-medium">
                  Telefone *
                </Label>
                <Input
                  id="telefone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={formData.telefone}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-2">
              <Label htmlFor="endereco" className="text-sm font-medium">
                Endereço Completo *
              </Label>
              <Textarea
                id="endereco"
                placeholder="Rua, número, bairro, cidade, CEP"
                value={formData.endereco}
                onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
                rows={3}
                required
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="text-sm font-medium">
                Status do Cliente
              </Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: "ativo" | "inativo") => 
                  setFormData(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <Label htmlFor="observacoes" className="text-sm font-medium">
                Observações
              </Label>
              <Textarea
                id="observacoes"
                placeholder="Informações adicionais sobre o cliente (opcional)"
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                rows={4}
              />
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4 border-t">
              <Button 
                type="submit" 
                className="bg-gradient-energy shadow-energy flex-1"
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar Cliente
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={handleReset}
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Limpar Campos
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informações de ajuda */}
        <Card className="mt-6 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 bg-primary rounded-full mt-2"></div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Dicas para o cadastro:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Certifique-se de que o e-mail esteja correto para notificações</li>
                  <li>• O telefone será usado para contato em caso de problemas</li>
                  <li>• O endereço deve ser completo para instalação dos equipamentos</li>
                  <li>• Clientes inativos não recebem notificações automáticas</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}