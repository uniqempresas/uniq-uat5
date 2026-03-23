# Módulo 06: Vendas - Configurações do PDV - UI/UX Documentation

## 📋 Metadados do Documento

| Campo | Valor |
|-------|-------|
| **Módulo** | Vendas & PDV - Configurações |
| **Código** | MOD-VEN-CONFIG-001 |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Prioridade** | MUST HAVE (MVP) |
| **Autor** | UNIQ Design Team |
| **Data de Criação** | 2024-03-12 |
| **Última Atualização** | 2024-03-12 |
| **Stack** | Next.js 14 + React 18 + TypeScript + Tailwind CSS + Lucide React |

---

## 🎨 Design System

### Paleta de Cores UNIQ

```css
:root {
  /* Cores Primárias */
  --jet-black: #1f2937;        /* Sidebar, textos principais */
  --dark-slate: #3e5653;       /* Botões primários, ações */
  --dim-grey: #627271;         /* Textos secundários, ícones */
  
  /* Cores de Apoio */
  --platinum: #efefef;         /* Background principal */
  --emerald: #86cb92;          /* Accent, sucesso, valores positivos */
  --white: #ffffff;            /* Cards, superfícies */
  
  /* Cores de Status */
  --success: #86cb92;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
  
  /* Bordas */
  --border: #e5e7eb;
  --border-light: #f3f4f6;
}
```

### Tipografia

```css
/* Fonte Principal */
font-family: 'Poppins', sans-serif;

/* Escalas */
--text-xs: 0.75rem;    /* 12px - Badges, tags */
--text-sm: 0.875rem;   /* 14px - Labels, captions */
--text-base: 1rem;     /* 16px - Corpo */
--text-lg: 1.125rem;   /* 18px - Subtítulos */
--text-xl: 1.25rem;    /* 20px - Títulos pequenos */
--text-2xl: 1.5rem;    /* 24px - Títulos médios */
```

### Ícones (Lucide React)

```typescript
import {
  Settings,
  Printer,
  CreditCard,
  Percent,
  Calculator,
  Receipt,
  Smartphone,
  Save,
  RotateCcw,
  AlertTriangle,
  Check,
  X,
  ChevronRight,
  Info,
  DollarSign,
  Barcode,
  FileText,
  ToggleLeft,
  ToggleRight,
  Shield
} from 'lucide-react';
```

---

## 🖥️ Tela 1: Configurações Gerais do PDV

### URL
`/vendas/pdv/configuracoes`

### Descrição
Tela de configurações do sistema PDV permitindo ajustar comportamentos de venda, impressão, taxas e integrações. Interface organizada em abas para fácil navegação.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ HEADER (64px)                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │ ⚙️ Configurações do PDV               [💾 Salvar Configurações]        │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ ABAS DE NAVEGAÇÃO                                                  │   │
│  │ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌─────────┐ │   │
│  │ │ Geral     │ │ Impressão │ │  Taxas    │ │ Pagamento │ │ Avançado│ │   │
│  │ │ [active]  │ │           │ │           │ │           │ │         │ │   │
│  │ └───────────┘ └───────────┘ └───────────┘ └───────────┘ └─────────┘ │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ CONTEÚDO - ABA GERAL                                               │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ COMPORTAMENTO DO PDV                                        │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Permitir venda sem estoque                              │   │   │
│  │  │     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Exigir cliente na venda                                 │   │   │
│  │  │     ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━    │   │   │
│  │  │                                                             │   │   │
│  │  │  ☐ Bloquear desconto acima de: [____%]                      │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Permitir troca de operador durante venda               │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Exibir imagem dos produtos na busca rápida             │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ CONFIGURAÇÕES DE CAIXA                                      │   │   │
│  │  │                                                             │   │   │
│  │  │  Valor de abertura padrão:        R$ [    200,00   ]        │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Exigir sangria quando valor exceder: R$ [ 1000,00 ]     │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Alertar suprimento automático ao atingir: R$ [ 100,00 ] │   │   │
│  │  │                                                             │   │   │
│  │  │  Tempo de inatividade para bloqueio: [ 5 ] minutos          │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 2: Configurações de Impressão

### URL
`/vendas/pdv/configuracoes?aba=impressao`

### Descrição
Configurações específicas para impressão de cupons fiscais, recibos e comandas. Suporte para múltiplas impressoras e formatos.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ABAS: [Geral] [Impressão] [Taxas] [Pagamento] [Avançado]                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ CONFIGURAÇÕES DE IMPRESSÃO                                         │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ IMPRESSORA PRINCIPAL                                          │   │   │
│  │  │                                                               │   │   │
│  │  │  Modelo: [EPSON TM-T20X -------------------------- ▼]         │   │   │
│  │  │                                                               │   │   │
│  │  │  Porta:  [USB001 (EPSON TM-T20X) ----------------- ▼]         │   │   │
│  │  │                                                               │   │   │
│  │  │  [🔄 Testar Impressão]  [🔧 Configurar Driver]               │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ FORMATO DO CUPOM                                            │   │   │
│  │  │                                                             │   │   │
│  │  │  Largura: [ 80mm ▼]  (58mm / 80mm)                          │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Imprimir logo no topo                                   │   │   │
│  │  │  ☑️ Imprimir endereço da empresa                            │   │   │
│  │  │  ☑️ Imprimir CNPJ na nota                                   │   │   │
│  │  │  ☐ Imprimir código de barras do produto                     │   │   │
│  │  │  ☑️ Imprimir QR Code para pix                               │   │   │
│  │  │                                                             │   │   │
│  │  │  Número de vias: [ 1 ▼]  (1 / 2 / 3)                        │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Cortar papel automaticamente                            │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ IMPRESSÕES AUTOMÁTICAS                                      │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Imprimir cupom ao finalizar venda                       │   │   │
│  │  │  ☑️ Imprimir via do cliente para cartão                     │   │   │
│  │  │  ☑️ Imprimir via da loja para cartão                        │   │   │
│  │  │  ☐ Imprimir comanda na cozinha (restaurantes)               │   │   │
│  │  │  ☑️ Imprimir recibo de sangria/suprimento                   │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 3: Configurações de Taxas

### URL
`/vendas/pdv/configuracoes?aba=taxas`

### Descrição
Gerenciamento de taxas e impostos aplicados nas vendas, incluindo taxas de serviço para restaurantes e configurações de ICMS.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ABAS: [Geral] [Impressão] [Taxas] [Pagamento] [Avançado]                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ TAXAS E IMPOSTOS                                                   │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ TAXA DE SERVIÇO (RESTAURANTES)                                │   │   │
│  │  │                                                               │   │   │
│  │  │  ☐ Aplicar taxa de serviço automaticamente                   │   │   │
│  │  │                                                               │   │   │
│  │  │     Percentual: [   10,00 %   ]  (somente quando ativado)     │   │   │
│  │  │                                                               │   │   │
│  │  │     Incidência: [Subtotal ▼]  (Subtotal / Total com desconto) │   │   │
│  │  │                                                               │   │   │
│  │  │     ☑️ Permitir remoção da taxa pelo operador                 │   │   │
│  │  │                                                               │   │   │
│  │  │     ☑️ Exigir senha de supervisor para remover taxa           │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ IMPOSTOS PADRÃO                                             │   │   │
│  │  │                                                             │   │   │
│  │  │  Regime tributário: [Simples Nacional ----------------- ▼]  │   │   │
│  │  │                                                             │   │   │
│  │  │  ☑️ Incluir impostos no preço (vat included)                │   │   │
│  │  │                                                             │   │   │
│  │  │  Alíquota padrão ICMS: [ 12,00 %   ]                        │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ OUTRAS TAXAS                                                │   │   │
│  │  │                                                             │   │   │
│  │  │  +----------------+----------+-------------+---------+      │   │   │
│  │  │  | Nome           | Tipo     | Valor       | Status  |      │   │   │
│  │  │  +----------------+----------+-------------+---------+      │   │   │
│  │  │  | Embalagem      | Fixo     | R$ 1,00     | ☑️      |      │   │   │
│  │  │  | Delivery       | %        | 5,00%       | ☑️      |      │   │   │
│  │  │  | Couvert        | Fixo     | R$ 10,00    | ☐       |      │   │   │
│  │  │  +----------------+----------+-------------+---------+      │   │   │
│  │  │                                                             │   │   │
│  │  │  [+ Adicionar Taxa]                                         │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ Tela 4: Configurações de Pagamento

### URL
`/vendas/pdv/configuracoes?aba=pagamento`

### Descrição
Configuração das formas de pagamento aceitas, integrações com gateways e regras de parcelamento.

### Layout ASCII

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ ABAS: [Geral] [Impressão] [Taxas] [Pagamento] [Avançado]                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ FORMAS DE PAGAMENTO                                                │   │
│  │                                                                    │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │ FORMAS ATIVAS                                                 │   │   │
│  │  │                                                               │   │   │
│  │  │  ☑️ Dinheiro                                                  │   │   │
│  │  │     ├─ Permite troco: ☑️                                      │   │   │
│  │  │     └─ Permitir valor inferior: ☐                            │   │   │
│  │  │                                                               │   │   │
│  │  │  ☑️ PIX                                                       │   │   │
│  │  │     ├─ Gerar QR Code: ☑️                                      │   │   │
│  │  │     ├─ Copia e Cola: ☑️                                       │   │   │
│  │  │     └─ Chave PIX: [ cnpj@empresa.com.br ------------- ]      │   │   │
│  │  │                                                               │   │   │
│  │  │  ☑️ Cartão de Crédito                                         │   │   │
│  │  │     ├─ Parcelamento máximo: [ 12x ▼]                          │   │   │
│  │  │     ├─ Valor mínimo parcela: R$ [   10,00  ]                  │   │   │
│  │  │     ├─ Taxa parcela loja: [   0,00 %   ]                      │   │   │
│  │  │     └─ Exigir senha supervisor >3x: ☑️                        │   │   │
│  │  │                                                               │   │   │
│  │  │  ☑️ Cartão de Débito                                          │   │   │
│  │  │                                                               │   │   │
│  │  │  ☑️ Voucher/Alimentação                                       │   │   │
│  │  │     └─ Aceitar troco: ☐                                       │   │   │
│  │  │                                                               │   │   │
│  │  │  ☑️ A Prazo / Crediário                                       │   │   │
│  │  │     ├─ Exigir cadastro cliente: ☑️                            │   │   │
│  │  │     ├─ Limite máximo: R$ [  500,00   ]                        │   │   │
│  │  │     └─ Prazo máximo: [ 30 dias ▼]                             │   │   │
│  │  │                                                               │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Componentes Detalhados

### Componente: Card de Configuração

```tsx
interface ConfigCardProps {
  title: string;
  description?: string;
  icon: React.ComponentType;
  children: React.ReactNode;
}

export function ConfigCard({ title, description, icon: Icon, children }: ConfigCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#e5e7eb] overflow-hidden">
      <div className="px-6 py-4 border-b border-[#e5e7eb] bg-[#efefef]/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#86cb92]/10 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-[#86cb92]" />
          </div>
          <div>
            <h3 className="font-semibold text-[#1f2937]">{title}</h3>
            {description && (
              <p className="text-xs text-[#627271]">{description}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
```

### Componente: Toggle Switch

```tsx
interface ToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function ConfigToggle({ label, description, checked, onChange, disabled }: ToggleProps) {
  return (
    <label className={`flex items-start gap-4 cursor-pointer ${disabled ? 'opacity-50' : ''}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={`
          w-12 h-7 rounded-full transition-colors
          ${checked ? 'bg-[#86cb92]' : 'bg-[#e5e7eb]'}
        `}>
          <div className={`
            w-5 h-5 bg-white rounded-full shadow-md absolute top-1 transition-transform
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `} />
        </div>
      </div>
      <div className="flex-1">
        <span className="text-sm font-medium text-[#1f2937]">{label}</span>
        {description && (
          <p className="text-xs text-[#627271] mt-0.5">{description}</p>
        )}
      </div>
    </label>
  );
}
```

### Componente: Input de Moeda

```tsx
interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  prefix?: string;
}

export function CurrencyInput({ label, value, onChange, placeholder, prefix = 'R$' }: CurrencyInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    const numeric = parseInt(raw) / 100;
    onChange(isNaN(numeric) ? 0 : numeric);
  };

  return (
    <div>
      <label className="block text-xs font-medium text-[#627271] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#627271] text-sm">
          {prefix}
        </span>
        <input
          type="text"
          value={value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
        />
      </div>
    </div>
  );
}
```

### Componente: Input de Percentual

```tsx
interface PercentInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function PercentInput({ label, value, onChange, min = 0, max = 100 }: PercentInputProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#627271] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          min={min}
          max={max}
          step="0.01"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full pl-4 pr-10 py-2 bg-[#efefef] border border-transparent rounded-lg text-sm text-[#1f2937] focus:outline-none focus:border-[#86cb92] transition-all"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#627271] text-sm">%</span>
      </div>
    </div>
  );
}
```

---

## 📋 Formulários

### Formulário: Configurações Gerais

| Campo | Tipo | Obrigatório | Valor Padrão | Descrição |
|-------|------|-------------|--------------|-----------|
| `permitir_venda_sem_estoque` | Toggle | Não | `false` | Permite vender produtos sem saldo em estoque |
| `exigir_cliente` | Toggle | Não | `false` | Torna obrigatório selecionar cliente |
| `bloquear_desconto_acima` | Percentual | Não | `null` | Limite máximo de desconto permitido |
| `permitir_troca_operador` | Toggle | Não | `true` | Permite troca de operador durante venda |
| `exibir_imagem_produtos` | Toggle | Não | `true` | Mostra imagens na busca rápida |
| `valor_abertura_padrao` | Moeda | Não | `200.00` | Valor sugerido na abertura de caixa |
| `sangria_valor_excedente` | Moeda | Não | `1000.00` | Alerta quando caixa excede valor |
| `suprimento_valor_minimo` | Moeda | Não | `100.00` | Alerta quando caixa está baixo |
| `tempo_inatividade_bloqueio` | Número | Não | `5` | Minutos para bloqueio automático |

### Formulário: Configurações de Impressão

| Campo | Tipo | Obrigatório | Valor Padrão | Descrição |
|-------|------|-------------|--------------|-----------|
| `impressora_modelo` | Select | Sim | `null` | Modelo da impressora térmica |
| `impressora_porta` | Select | Sim | `null` | Porta de comunicação |
| `cupom_largura` | Select | Sim | `80mm` | Largura do papel (58/80mm) |
| `imprimir_logo` | Toggle | Não | `true` | Incluir logo no cupom |
| `imprimir_endereco` | Toggle | Não | `true` | Incluir endereço da empresa |
| `imprimir_cnpj` | Toggle | Não | `true` | Incluir CNPJ no cabeçalho |
| `imprimir_codigo_barras` | Toggle | Não | `false` | Código de barras dos produtos |
| `imprimir_qr_pix` | Toggle | Não | `true` | QR Code para pagamento PIX |
| `numero_vias` | Select | Sim | `1` | Cópias do cupom |
| `cortar_papel` | Toggle | Não | `true` | Corte automático do papel |

### Formulário: Configurações de Taxas

| Campo | Tipo | Obrigatório | Valor Padrão | Descrição |
|-------|------|-------------|--------------|-----------|
| `taxa_servico_ativa` | Toggle | Não | `false` | Aplica taxa de serviço automaticamente |
| `taxa_servico_percentual` | Percentual | Condicional | `10.00` | Percentual da taxa de serviço |
| `taxa_servico_incidencia` | Select | Condicional | `subtotal` | Base de cálculo da taxa |
| `taxa_servico_permitir_remocao` | Toggle | Não | `true` | Cliente pode remover taxa |
| `taxa_servico_senha_remocao` | Toggle | Não | `true` | Exige senha para remover |
| `regime_tributario` | Select | Não | `simples_nacional` | Regime tributário da empresa |
| `precos_com_imposto` | Toggle | Não | `true` | Impostos inclusos no preço |
| `aliquota_icms_padrao` | Percentual | Não | `12.00` | Alíquota padrão de ICMS |

### Formulário: Configurações de Pagamento

| Campo | Tipo | Obrigatório | Valor Padrão | Descrição |
|-------|------|-------------|--------------|-----------|
| `pagamento_dinheiro_ativo` | Toggle | Não | `true` | Aceita pagamento em dinheiro |
| `dinheiro_permite_troco` | Toggle | Não | `true` | Calcula troco em dinheiro |
| `pagamento_pix_ativo` | Toggle | Não | `true` | Aceita PIX |
| `pix_chave` | Texto | Condicional | `null` | Chave PIX da empresa |
| `pix_qrcode` | Toggle | Não | `true` | Gera QR Code dinâmico |
| `pagamento_credito_ativo` | Toggle | Não | `true` | Aceita cartão de crédito |
| `credito_parcela_maxima` | Select | Não | `12` | Máximo de parcelas |
| `credito_valor_minimo_parcela` | Moeda | Não | `10.00` | Valor mínimo por parcela |
| `credito_senha_supervisor_3x` | Toggle | Não | `true` | Senha para +3 parcelas |
| `pagamento_prazo_ativo` | Toggle | Não | `true` | Aceita venda a prazo |
| `prazo_exige_cadastro` | Toggle | Não | `true` | Exige cliente cadastrado |
| `prazo_limite` | Moeda | Não | `500.00` | Limite de crédito |

---

## 🎭 Estados da Interface

### Estado: Carregando Configurações

```tsx
export function ConfigLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-[#86cb92] border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-[#627271]">Carregando configurações...</p>
    </div>
  );
}
```

### Estado: Erro ao Carregar

```tsx
export function ConfigErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-[#1f2937] mb-2">
        Erro ao carregar configurações
      </h3>
      <p className="text-sm text-[#627271] mb-4 max-w-md">
        Não foi possível carregar as configurações do PDV. Verifique sua conexão e tente novamente.
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors"
      >
        Tentar novamente
      </button>
    </div>
  );
}
```

### Estado: Sucesso ao Salvar

```tsx
export function ConfigSaveSuccess({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 bg-[#86cb92] text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-2">
      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
        <Check className="w-5 h-5" />
      </div>
      <div>
        <p className="font-medium">Configurações salvas!</p>
        <p className="text-sm text-white/80">As alterações foram aplicadas ao PDV.</p>
      </div>
      <button onClick={onClose} className="ml-4 text-white/80 hover:text-white">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
```

---

## 📜 Regras de Negócio

### RN-CONFIG-001: Validação de Taxa de Serviço
A taxa de serviço só pode ser configurada quando o módulo de restaurante estiver ativo. O percentual máximo permitido é 20%.

### RN-CONFIG-002: Validação de PIX
A chave PIX deve ser validada antes de salvar. QR Code dinâmico requer integração com gateway de pagamento ativo.

### RN-CONFIG-003: Impressora Obrigatória
Se `imprimir_cupom_venda` estiver ativo, o modelo e porta da impressora são obrigatórios.

### RN-CONFIG-004: Permissões
Apenas usuários com perfil "Administrador" ou "Gerente" podem acessar e modificar as configurações do PDV.

### RN-CONFIG-005: Cache de Configurações
As configurações são cacheadas no navegador por 24h. Alterações em `taxas` e `pagamentos` atualizam o cache automaticamente.

### RN-CONFIG-006: Teste de Impressão
O botão "Testar Impressão" deve imprimir um cupom de teste padrão sem afetar o histórico de vendas.

### RN-CONFIG-007: Backup Automático
Configurações são automaticamente salvas em backup a cada alteração. Últimas 10 versões mantidas.

### RN-CONFIG-008: Validação de Formas de Pagamento
Pelo menos uma forma de pagamento deve estar ativa. Não é permitido desativar todas as formas.

---

## ✅ Checklist de Implementação

### Estrutura
- [ ] Criar página `/vendas/pdv/configuracoes`
- [ ] Implementar sistema de abas (Geral, Impressão, Taxas, Pagamento, Avançado)
- [ ] Criar layout responsivo para desktop e tablet
- [ ] Implementar navegação via URL query params

### Componentes
- [ ] Componente `ConfigCard` com header e content
- [ ] Componente `ConfigToggle` para switches
- [ ] Componente `CurrencyInput` para valores monetários
- [ ] Componente `PercentInput` para percentuais
- [ ] Componente `ConfigSelect` para selects customizados
- [ ] Componente `ConfigTabs` para navegação em abas

### Integrações
- [ ] API GET `/api/pdv/configuracoes` - Carregar configurações
- [ ] API PUT `/api/pdv/configuracoes` - Salvar configurações
- [ ] API POST `/api/pdv/configuracoes/testar-impressao` - Teste de impressão
- [ ] API GET `/api/pdv/impressoras` - Listar impressoras disponíveis

### Estados
- [ ] Estado de carregamento inicial
- [ ] Estado de erro ao carregar
- [ ] Estado de salvando alterações
- [ ] Toast de sucesso ao salvar
- [ ] Confirmação ao sair com alterações não salvas

### Validações
- [ ] Validação de campos obrigatórios por aba
- [ ] Validação de formato de chave PIX
- [ ] Validação de percentuais (0-100%)
- [ ] Validação de valores monetários (positivos)
- [ ] Verificação de permissões do usuário

### Testes
- [ ] Teste de navegação entre abas
- [ ] Teste de persistência de alterações
- [ ] Teste de validação de formulários
- [ ] Teste de integração com impressora
- [ ] Teste de responsividade mobile

---

## 📝 Notas de Implementação

### Performance
- Usar React Hook Form para gerenciamento de formulários
- Implementar debounce de 500ms em inputs numéricos
- Lazy load das abas não visíveis
- Cache das configurações em localStorage

### Acessibilidade
- Navegação por teclado entre abas (Tab/Shift+Tab)
- ARIA labels em todos os toggles
- Focus visible em todos os elementos interativos
- Contraste mínimo 4.5:1 em todos os textos

### Segurança
- Sanitizar todos os inputs de texto
- Validar permissões no backend
- Log de alterações em configurações críticas
- Backup automático antes de salvar
