export interface Cliente {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  status: "ativo" | "inativo";
  equipamentoStatus: "ativo" | "offline" | "manutencao";
  consumoTotal: number; // kWh
  geracaoTotal: number; // kWh
  delta: number; // kWh
  deltaPercentual: number; // %
  ultimaLeitura: string;
}

export interface DadosGeracao {
  data: string;
  geracao: number;
  consumo: number;
}

export const mockClientes: Cliente[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123, São Paulo",
    status: "ativo",
    equipamentoStatus: "ativo",
    consumoTotal: 850,
    geracaoTotal: 1200,
    delta: 350,
    deltaPercentual: 41.2,
    ultimaLeitura: "2024-01-09 14:30"
  },
  {
    id: "2", 
    nome: "Maria Santos",
    email: "maria@email.com",
    telefone: "(11) 88888-8888",
    endereco: "Av. Central, 456, São Paulo",
    status: "ativo",
    equipamentoStatus: "offline",
    consumoTotal: 950,
    geracaoTotal: 890,
    delta: -60,
    deltaPercentual: -6.3,
    ultimaLeitura: "2024-01-08 16:45"
  },
  {
    id: "3",
    nome: "Pedro Costa",
    email: "pedro@email.com", 
    telefone: "(11) 77777-7777",
    endereco: "Rua do Sol, 789, São Paulo",
    status: "ativo",
    equipamentoStatus: "manutencao",
    consumoTotal: 720,
    geracaoTotal: 1150,
    delta: 430,
    deltaPercentual: 59.7,
    ultimaLeitura: "2024-01-09 12:15"
  },
  {
    id: "4",
    nome: "Ana Oliveira",
    email: "ana@email.com",
    telefone: "(11) 66666-6666", 
    endereco: "Rua Verde, 321, São Paulo",
    status: "inativo",
    equipamentoStatus: "ativo",
    consumoTotal: 680,
    geracaoTotal: 820,
    delta: 140,
    deltaPercentual: 20.6,
    ultimaLeitura: "2024-01-05 10:20"
  },
  {
    id: "5",
    nome: "Carlos Mendes",
    email: "carlos@email.com",
    telefone: "(11) 55555-5555",
    endereco: "Av. Energia, 654, São Paulo", 
    status: "ativo",
    equipamentoStatus: "ativo",
    consumoTotal: 1100,
    geracaoTotal: 1380,
    delta: 280,
    deltaPercentual: 25.5,
    ultimaLeitura: "2024-01-09 15:10"
  }
];

export const mockGeracaoDiaria: DadosGeracao[] = [
  { data: "2024-01-01", geracao: 45, consumo: 38 },
  { data: "2024-01-02", geracao: 52, consumo: 42 },
  { data: "2024-01-03", geracao: 48, consumo: 35 },
  { data: "2024-01-04", geracao: 55, consumo: 40 },
  { data: "2024-01-05", geracao: 43, consumo: 39 },
  { data: "2024-01-06", geracao: 38, consumo: 45 },
  { data: "2024-01-07", geracao: 50, consumo: 37 },
  { data: "2024-01-08", geracao: 47, consumo: 41 },
  { data: "2024-01-09", geracao: 53, consumo: 36 },
];

export const mockAlerts = [
  {
    id: "1",
    cliente: "Maria Santos",
    tipo: "offline",
    mensagem: "Sistema offline há 2 horas",
    timestamp: "2024-01-09 14:30"
  },
  {
    id: "2", 
    cliente: "Pedro Costa",
    tipo: "manutencao",
    mensagem: "Manutenção programada iniciada",
    timestamp: "2024-01-09 08:00"
  }
];

// Dados agregados
export const getTotalsData = () => {
  const totalClientes = mockClientes.length;
  const clientesAtivos = mockClientes.filter(c => c.status === "ativo").length;
  const geracaoTotal = mockClientes.reduce((sum, c) => sum + c.geracaoTotal, 0);
  const consumoTotal = mockClientes.reduce((sum, c) => sum + c.consumoTotal, 0);
  const deltaTotal = geracaoTotal - consumoTotal;
  const deltaPercentual = ((deltaTotal / consumoTotal) * 100);

  return {
    totalClientes,
    clientesAtivos,
    geracaoTotal,
    consumoTotal,
    deltaTotal,
    deltaPercentual
  };
};