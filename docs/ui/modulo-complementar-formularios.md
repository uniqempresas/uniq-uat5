# Módulo Complementar: Formulários e Telas Adicionais

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Complementar - Formulários e Modais |
| **Código** | MOD-COMP-001 |
| **Versão** | 1.0.0 |
| **Status** | Em Desenvolvimento |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |

---

## 1. Design System UNIQ - Formulários

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal |
| `--bg-card` | `#ffffff` | Fundo de cards e modais |
| `--sidebar-bg` | `#1f2937` | Fundo da sidebar |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--btn-primary-hover` | `#1f2937` | Hover de botões |
| `--accent` | `#86cb92` | Detalhes e destaques |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário |
| `--border` | `#e5e7eb` | Bordas e divisores |
| `--error` | `#dc2626` | Estados de erro |
| `--success` | `#16a34a` | Estados de sucesso |

### 1.2 Padrão de Formulários

**Container de Modal:**
```html
<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
    <!-- Conteúdo -->
  </div>
</div>
```

**Padrão de Input:**
```html
<div class="space-y-2">
  <label class="block text-sm font-medium text-[#1f2937]">
    Nome do Campo <span class="text-red-500">*</span>
  </label>
  <input 
    type="text"
    class="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
    placeholder="Digite o valor..."
  />
  <p class="text-xs text-red-600 hidden">Mensagem de erro</p>
</div>
```

---

## 2. Módulo 00 - Autenticação (Complementar)

### 2.1 Tela: Recuperação de Senha - Passo 1 (Solicitar Email)

**Rota:** `/recuperar-senha`  
**Objetivo:** Iniciar processo de recuperação de senha

#### Layout
```
┌──────────────────────────────────────────────────────┐
│ [Sidebar Escura]    │  Recuperar Senha               │
│                     │                                │
│                     │  Digite seu email cadastrado   │
│                     │  para receber o link de        │
│                     │  redefinição                   │
│                     │                                │
│                     │  ┌──────────────────────────┐  │
│                     │  │ Email                    │  │
│                     │  │ exemplo@email.com        │  │
│                     │  └──────────────────────────┘  │
│                     │                                │
│                     │  [Enviar Link de Recuperação]  │
│                     │                                │
│                     │  Lembrou a senha? [Entrar]     │
└──────────────────────────────────────────────────────┘
```

#### Componentes

**Header:**
```html
<div class="text-center mb-8">
  <div class="w-16 h-16 bg-[#86cb92]/10 rounded-full flex items-center justify-center mx-auto mb-4">
    <Lock class="w-8 h-8 text-[#86cb92]" />
  </div>
  <h2 class="text-2xl font-bold text-[#1f2937]">Recuperar Senha</h2>
  <p class="text-[#627271] mt-2">Digite seu email cadastrado para receber o link de redefinição</p>
</div>
```

**Formulário:**
```html
<form class="space-y-5">
  <div>
    <label class="block text-sm font-medium text-[#1f2937] mb-1">
      Email <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
      <input 
        type="email"
        required
        placeholder="seu@email.com"
        class="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
      />
    </div>
    <p class="text-xs text-[#627271] mt-1">Enviaremos um link para este email</p>
  </div>

  <button 
    type="submit"
    class="w-full bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
  >
    <Send class="w-4 h-4" />
    Enviar Link de Recuperação
  </button>
</form>
```

**Footer:**
```html
<div class="text-center mt-6">
  <p class="text-[#627271]">
    Lembrou a senha? 
    <a href="/login" class="text-[#3e5653] hover:text-[#1f2937] font-semibold transition-colors">
      Entrar
    </a>
  </p>
</div>
```

#### Estados

**Estado Enviando:**
```html
<button disabled class="w-full bg-[#3e5653]/80 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
  <Loader2 class="w-4 h-4 animate-spin" />
  Enviando...
</button>
```

**Estado Sucesso:**
```html
<div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
  <CheckCircle class="w-12 h-12 text-green-600 mx-auto mb-3" />
  <h3 class="text-lg font-semibold text-green-800 mb-1">Email Enviado!</h3>
  <p class="text-sm text-green-600">Verifique sua caixa de entrada e siga as instruções.</p>
  <p class="text-xs text-[#627271] mt-3">Não recebeu? <button class="text-[#3e5653] underline">Reenviar</button></p>
</div>
```

---

### 2.2 Tela: Recuperação de Senha - Passo 3 (Redefinir Senha)

**Rota:** `/redefinir-senha?token=xxx`  
**Objetivo:** Definir nova senha com token de recuperação

#### Layout
```
┌──────────────────────────────────────────────────────┐
│ [Sidebar Escura]    │  Criar Nova Senha              │
│                     │                                │
│                     │  Digite sua nova senha abaixo  │
│                     │                                │
│                     │  Nova Senha*                   │
│                     │  [                    ] [👁️]   │
│                     │  [Indicador de força]          │
│                     │                                │
│                     │  Confirmar Nova Senha*         │
│                     │  [                    ] [👁️]   │
│                     │                                │
│                     │  [Redefinir Senha]             │
└──────────────────────────────────────────────────────┘
```

#### Componentes

**Formulário:**
```html
<form class="space-y-5">
  <!-- Nova Senha -->
  <div>
    <label class="block text-sm font-medium text-[#1f2937] mb-1">
      Nova Senha <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
      <input 
        type="password"
        required
        placeholder="••••••••"
        class="w-full pl-10 pr-12 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
      />
      <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#627271] hover:text-[#1f2937]">
        <Eye class="w-5 h-5" />
      </button>
    </div>
    
    <!-- Indicador de Força -->
    <div class="mt-3">
      <div class="flex items-center justify-between text-xs mb-1">
        <span class="text-[#627271]">Força da senha</span>
        <span class="font-medium text-green-600">Forte</span>
      </div>
      <div class="h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
        <div class="h-full w-full bg-green-500 rounded-full transition-all duration-300"></div>
      </div>
    </div>
    
    <!-- Requisitos -->
    <div class="mt-3 space-y-1">
      <div class="flex items-center gap-2 text-sm">
        <Check class="w-4 h-4 text-[#86cb92]" />
        <span class="text-[#627271]">Mínimo 8 caracteres</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <Check class="w-4 h-4 text-[#86cb92]" />
        <span class="text-[#627271]">Pelo menos uma letra maiúscula</span>
      </div>
      <div class="flex items-center gap-2 text-sm">
        <Check class="w-4 h-4 text-[#86cb92]" />
        <span class="text-[#627271]">Pelo menos um número</span>
      </div>
    </div>
  </div>

  <!-- Confirmar Senha -->
  <div>
    <label class="block text-sm font-medium text-[#1f2937] mb-1">
      Confirmar Nova Senha <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <Lock class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
      <input 
        type="password"
        required
        placeholder="••••••••"
        class="w-full pl-10 pr-12 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
      />
    </div>
    <p class="text-xs text-red-600 mt-1 hidden">As senhas não coincidem</p>
  </div>

  <button 
    type="submit"
    class="w-full bg-[#3e5653] hover:bg-[#1f2937] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
  >
    Redefinir Senha
  </button>
</form>
```

#### Regras de Negócio

| Regra | Descrição |
|-------|-----------|
| RN-REC-001 | Token de recuperação expira em 24 horas |
| RN-REC-002 | Máximo 3 tentativas de recuperação por hora |
| RN-REC-003 | Nova senha deve ser diferente da anterior |
| RN-REC-004 | Após redefinição, todos os tokens são invalidados |

---

## 3. Módulo 01 - Dashboard (Complementar)

### 3.1 Modal: Convite de Colaborador

**Rota:** Modal em `/dashboard` ou `/equipe`  
**Objetivo:** Convidar novo colaborador para a empresa

#### Layout
```
┌────────────────────────────────────────────────────────┐
│  Convidar Colaborador                              [X] │
├────────────────────────────────────────────────────────┤
│                                                        │
│  Email do Colaborador*                                 │
│  [colaborador@email.com                         ]      │
│                                                        │
│  Cargo*                                                │
│  [Selecione o cargo...                    ▼]           │
│                                                        │
│  Permissões                                            │
│  ☑ Acessar Vendas       ☑ Acessar Financeiro         │
│  ☑ Acessar Estoque      ☐ Administrador (todas)      │
│  ☑ Acessar CRM                                       │
│                                                        │
│  Mensagem (opcional)                                   │
│  [Digite uma mensagem personalizada...               ] │
│                                                        │
│                                    [Cancelar] [Enviar] │
└────────────────────────────────────────────────────────┘
```

#### Componentes

**Header:**
```html
<div class="sticky top-0 bg-white border-b border-[#e5e7eb] px-6 py-4 flex items-center justify-between">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-[#86cb92]/10 rounded-lg flex items-center justify-center">
      <UserPlus class="w-5 h-5 text-[#86cb92]" />
    </div>
    <div>
      <h3 class="text-lg font-semibold text-[#1f2937]">Convidar Colaborador</h3>
      <p class="text-sm text-[#627271]">Adicione alguém à sua equipe</p>
    </div>
  </div>
  <button class="p-2 hover:bg-[#f3f4f6] rounded-lg transition-colors">
    <X class="w-5 h-5 text-[#627271]" />
  </button>
</div>
```

**Formulário:**
```html
<div class="p-6 space-y-5">
  <!-- Email -->
  <div>
    <label class="block text-sm font-medium text-[#1f2937] mb-1">
      Email do Colaborador <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <Mail class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
      <input 
        type="email"
        required
        placeholder="colaborador@empresa.com"
        class="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
      />
    </div>
  </div>

  <!-- Cargo -->
  <div>
    <label class="block text-sm font-medium text-[#1f2937] mb-1">
      Cargo <span class="text-red-500">*</span>
    </label>
    <div class="relative">
      <Briefcase class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
      <select class="w-full pl-10 pr-10 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] appearance-none cursor-pointer">
        <option value="">Selecione o cargo...</option>
        <option value="gerente">Gerente</option>
        <option value="vendedor">Vendedor</option>
        <option value="financeiro">Financeiro</option>
        <option value="estoquista">Estoquista</option>
        <option value="atendente">Atendente</option>
        <option value="outro">Outro</option>
      </select>
      <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271] pointer-events-none" />
    </div>
  </div>

  <!-- Permissões -->
  <div>
    <label class="block text-sm font-medium text-[#1f2937] mb-3">Permissões de Acesso</label>
    <div class="grid grid-cols-2 gap-3">
      <label class="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] cursor-pointer transition-colors">
        <input type="checkbox" checked class="w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92]" />
        <span class="text-sm text-[#1f2937]">Acessar Vendas</span>
      </label>
      <label class="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] cursor-pointer transition-colors">
        <input type="checkbox" class="w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92]" />
        <span class="text-sm text-[#1f2937]">Acessar Financeiro</span>
      </label>
      <label class="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] cursor-pointer transition-colors">
        <input type="checkbox" class="w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92]" />
        <span class="text-sm text-[#1f2937]">Acessar Estoque</span>
      </label>
      <label class="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] cursor-pointer transition-colors">
        <input type="checkbox" class="w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92]" />
        <span class="text-sm text-[#1f2937]">Acessar CRM</span>
      </label>
      <label class="flex items-center gap-3 p-3 rounded-lg border border-[#e5e7eb] hover:bg-[#f9fafb] cursor-pointer transition-colors col-span-2">
        <input type="checkbox" class="w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92]" />
        <span class="text-sm text-[#1f2937]">Administrador (acesso total)</span>
      </label>
    </div>
  </div>

  <!-- Mensagem -->
  <div>
    <label class="block text-sm font-medium text-[#627271] mb-1">
      Mensagem Personalizada <span class="text-[#627271]">(opcional)</span>
    </label>
    <textarea 
      rows="3"
      placeholder="Digite uma mensagem para incluir no convite..."
      class="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all resize-none"
    ></textarea>
  </div>
</div>
```

**Footer:**
```html
<div class="sticky bottom-0 bg-white border-t border-[#e5e7eb] px-6 py-4 flex justify-end gap-3">
  <button class="px-4 py-2 text-[#627271] hover:text-[#1f2937] font-medium transition-colors">
    Cancelar
  </button>
  <button class="px-6 py-2 bg-[#3e5653] hover:bg-[#1f2937] text-white font-medium rounded-lg transition-colors flex items-center gap-2">
    <Send class="w-4 h-4" />
    Enviar Convite
  </button>
</div>
```

---

### 3.2 Tela: Gerenciamento de Equipe

**Rota:** `/equipe`  
**Objetivo:** Listar e gerenciar colaboradores da empresa

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ [Sidebar]            Equipe              [+ Convidar]           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  [Filtros] Ativos ▼ | Cargo ▼ | 🔍 Buscar                       │
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ ☑ │ Nome        │ Cargo        │ Status  │ Ações          │ │
│  │───│─────────────│──────────────│─────────│────────────────│ │
│  │ ☐ │ Ana Silva   │ Gerente      │● Ativo  │ ✏️ 🚫          │ │
│  │ ☐ │ Carlos S.   │ Vendedor     │○ Inativo│ ✏️ 🚫          │ │
│  │ ☐ │ Maria L.    │ Financeiro   │⏳ Pendente│ ✏️ 🔄        │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Componentes

**Header:**
```html
<header class="bg-white border-b border-[#e5e7eb] px-6 py-4">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold text-[#1f2937]">Equipe</h1>
      <p class="text-sm text-[#627271]">Gerencie colaboradores e permissões</p>
    </div>
    <button class="flex items-center gap-2 px-4 py-2 bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors">
      <UserPlus class="w-4 h-4" />
      Convidar
    </button>
  </div>
</header>
```

**Tabela de Colaboradores:**
```html
<div class="bg-white rounded-xl border border-[#e5e7eb] shadow-sm overflow-hidden">
  <table class="w-full">
    <thead class="bg-[#f9fafb] border-b border-[#e5e7eb]">
      <tr>
        <th class="px-4 py-3 w-12">
          <input type="checkbox" class="rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92]" />
        </th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-[#627271] uppercase">Nome</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-[#627271] uppercase">Cargo</th>
        <th class="px-4 py-3 text-left text-xs font-semibold text-[#627271] uppercase">Status</th>
        <th class="px-4 py-3 text-center text-xs font-semibold text-[#627271] uppercase w-24">Ações</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-[#e5e7eb]">
      <tr class="hover:bg-[#f9fafb] transition-colors">
        <td class="px-4 py-3">
          <input type="checkbox" class="rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92]" />
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 bg-[#86cb92] rounded-full flex items-center justify-center">
              <span class="text-sm text-white font-medium">AS</span>
            </div>
            <div>
              <p class="font-medium text-[#1f2937]">Ana Silva</p>
              <p class="text-xs text-[#627271]">ana.silva@empresa.com</p>
            </div>
          </div>
        </td>
        <td class="px-4 py-3 text-sm text-[#1f2937]">Gerente</td>
        <td class="px-4 py-3">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Ativo
          </span>
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center justify-center gap-1">
            <button class="p-1.5 hover:bg-[#e5e7eb] rounded transition-colors" title="Editar">
              <Pencil class="w-4 h-4 text-[#627271]" />
            </button>
            <button class="p-1.5 hover:bg-red-50 rounded transition-colors" title="Desativar">
              <Ban class="w-4 h-4 text-red-500" />
            </button>
          </div>
        </td>
      </tr>
      <!-- Mais linhas... -->
    </tbody>
  </table>
</div>
```

---

## 4. Módulo 03 - CRM (Complementar)

### 4.1 Modal: Nova Oportunidade

**Rota:** Modal em `/crm`  
**Objetivo:** Criar nova oportunidade no pipeline de vendas

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Nova Oportunidade                                         [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Nome da Oportunidade*                                          │
│  [Ex: Implementação ERP                                   ]     │
│                                                                 │
│  Cliente*                                         [+ Novo]      │
│  [Selecione ou busque um cliente...                 ▼]          │
│                                                                 │
│  Valor Estimado*          Probabilidade*                        │
│  [R$ 10.000,00      ]     [███████░░░] 70%                      │
│                                                                 │
│  Fechamento Previsto*     Responsável*                          │
│  [📅 31/12/2025      ]    [Selecione...               ▼]        │
│                                                                 │
│  Descrição                                                      │
│  [                                                        ]     │
│                                                                 │
│  Tags                                                           │
│  [Prioritário] [B2B] [Enterprise]  [+ Adicionar]                │
│                                                                 │
│                                    [Cancelar] [Criar]           │
└─────────────────────────────────────────────────────────────────┘
```

#### Componentes

**Formulário Completo:**
```html
<div class="p-6 space-y-5">
  <!-- Nome -->
  <div>
    <label class="block text-sm font-medium text-[#1f2937] mb-1">
      Nome da Oportunidade <span class="text-red-500">*</span>
    </label>
    <input 
      type="text"
      required
      placeholder="Ex: Implementação Sistema ERP"
      class="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
    />
  </div>

  <!-- Cliente -->
  <div>
    <div class="flex items-center justify-between mb-1">
      <label class="block text-sm font-medium text-[#1f2937]">
        Cliente <span class="text-red-500">*</span>
      </label>
      <button class="text-sm text-[#3e5653] hover:text-[#1f2937] font-medium flex items-center gap-1">
        <Plus class="w-3 h-3" />
        Novo Cliente
      </button>
    </div>
    <div class="relative">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
      <select class="w-full pl-10 pr-10 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] appearance-none cursor-pointer">
        <option value="">Selecione ou busque um cliente...</option>
        <option value="1">Tech Solutions Ltda.</option>
        <option value="2">Maria Oliveira</option>
        <option value="3">ABC Comércio</option>
      </select>
      <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271] pointer-events-none" />
    </div>
  </div>

  <!-- Valor e Probabilidade -->
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        Valor Estimado <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[#627271]">R$</span>
        <input 
          type="number"
          step="0.01"
          min="0"
          required
          placeholder="0,00"
          class="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
        />
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        Probabilidade <span class="text-red-500">*</span>
      </label>
      <div class="flex items-center gap-3">
        <input 
          type="range"
          min="0"
          max="100"
          value="50"
          class="flex-1 h-2 bg-[#e5e7eb] rounded-lg appearance-none cursor-pointer accent-[#3e5653]"
        />
        <span class="text-sm font-medium text-[#3e5653] w-10 text-right">50%</span>
      </div>
    </div>
  </div>

  <!-- Data e Responsável -->
  <div class="grid grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        Fechamento Previsto <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
        <input 
          type="date"
          required
          class="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
        />
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-[#1f2937] mb-1">
        Responsável <span class="text-red-500">*</span>
      </label>
      <div class="relative">
        <User class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
        <select class="w-full pl-10 pr-10 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] appearance-none cursor-pointer">
          <option value="">Selecione...</option>
          <option value="1">João Dias</option>
          <option value="2">Ana Silva</option>
          <option value="3">Carlos Santos</option>
        </select>
        <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271] pointer-events-none" />
      </div>
    </div>
  </div>

  <!-- Descrição -->
  <div>
    <label class="block text-sm font-medium text-[#627271] mb-1">Descrição</label>
    <textarea 
      rows="3"
      placeholder="Adicione detalhes sobre a oportunidade..."
      class="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] placeholder-[#627271]/50 focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all resize-none"
    ></textarea>
  </div>

  <!-- Tags -->
  <div>
    <label class="block text-sm font-medium text-[#627271] mb-2">Tags</label>
    <div class="flex flex-wrap gap-2">
      <span class="inline-flex items-center gap-1 px-3 py-1 bg-[#86cb92]/10 text-[#3e5653] rounded-full text-sm">
        Prioritário
        <button class="hover:text-[#1f2937]"><X class="w-3 h-3" /></button>
      </span>
      <span class="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
        B2B
        <button class="hover:text-blue-900"><X class="w-3 h-3" /></button>
      </span>
      <button class="inline-flex items-center gap-1 px-3 py-1 border border-dashed border-[#627271] text-[#627271] rounded-full text-sm hover:border-[#3e5653] hover:text-[#3e5653] transition-colors">
        <Plus class="w-3 h-3" />
        Adicionar
      </button>
    </div>
  </div>
</div>
```

---

### 4.2 Modal: Novo Cliente (Rápido)

**Rota:** Modal em `/crm` (sub-modal da Nova Oportunidade)  
**Objetivo:** Cadastro rápido de cliente durante criação de oportunidade

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Novo Cliente                                              [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Nome Completo*                                                 │
│  [Maria Oliveira                                          ]     │
│                                                                 │
│  Email                                                          │
│  [maria@email.com                                         ]     │
│                                                                 │
│  Telefone*                                                      │
│  [(11) 98765-4321                                         ]     │
│                                                                 │
│  CNPJ/CPF                                                       │
│  [000.000.000-00                                          ]     │
│                                                                 │
│  Origem                      Tags                               │
│  [Selecione...           ▼]  [B2B] [Novo] [+ Adicionar]        │
│                                                                 │
│                                    [Cancelar] [Criar Cliente]   │
└─────────────────────────────────────────────────────────────────┘
```

---

### 4.3 Modal: Nova Interação

**Rota:** Modal em `/crm/clientes/:id`  
**Objetivo:** Registrar interação com cliente (ligação, email, reunião)

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Nova Interação                                            [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Tipo*                                                          │
│  [📞 Ligação] [✉️ Email] [🤝 Reunião] [💬 WhatsApp] [📝 Nota]    │
│                                                                 │
│  Data e Hora*                                                   │
│  [📅 12/03/2025                    🕐 14:30               ]     │
│                                                                 │
│  Descrição*                                                     │
│  [                                                        ]     │
│  [                                                        ]     │
│                                                                 │
│  ☐ Agendar próximo follow-up                                    │
│     Data: [📅 15/03/2025        ]                               │
│                                                                 │
│  Anexos                                                         │
│  [📎 Anexar arquivo ou arraste aqui]                            │
│                                                                 │
│                                    [Cancelar] [Salvar]          │
└─────────────────────────────────────────────────────────────────┘
```

#### Componentes

**Seleção de Tipo:**
```html
<div>
  <label class="block text-sm font-medium text-[#1f2937] mb-2">Tipo <span class="text-red-500">*</span></label>
  <div class="grid grid-cols-5 gap-2">
    <button type="button" class="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-[#3e5653] bg-[#3e5653]/5 text-[#3e5653] transition-all">
      <Phone class="w-5 h-5" />
      <span class="text-xs font-medium">Ligação</span>
    </button>
    <button type="button" class="flex flex-col items-center gap-2 p-3 rounded-lg border border-[#e5e7eb] hover:border-[#3e5653] hover:bg-[#f9fafb] text-[#627271] transition-all">
      <Mail class="w-5 h-5" />
      <span class="text-xs font-medium">Email</span>
    </button>
    <button type="button" class="flex flex-col items-center gap-2 p-3 rounded-lg border border-[#e5e7eb] hover:border-[#3e5653] hover:bg-[#f9fafb] text-[#627271] transition-all">
      <Users class="w-5 h-5" />
      <span class="text-xs font-medium">Reunião</span>
    </button>
    <button type="button" class="flex flex-col items-center gap-2 p-3 rounded-lg border border-[#e5e7eb] hover:border-[#3e5653] hover:bg-[#f9fafb] text-[#627271] transition-all">
      <MessageCircle class="w-5 h-5" />
      <span class="text-xs font-medium">WhatsApp</span>
    </button>
    <button type="button" class="flex flex-col items-center gap-2 p-3 rounded-lg border border-[#e5e7eb] hover:border-[#3e5653] hover:bg-[#f9fafb] text-[#627271] transition-all">
      <FileText class="w-5 h-5" />
      <span class="text-xs font-medium">Nota</span>
    </button>
  </div>
</div>
```

**Checkbox de Follow-up:**
```html
<div class="space-y-3">
  <label class="flex items-center gap-3 cursor-pointer">
    <input type="checkbox" class="w-4 h-4 rounded border-[#e5e7eb] text-[#3e5653] focus:ring-[#86cb92]" />
    <span class="text-sm text-[#1f2937]">Agendar próximo follow-up</span>
  </label>
  
  <div class="pl-7">
    <div class="relative">
      <Calendar class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
      <input 
        type="datetime-local"
        class="w-full pl-10 pr-4 py-2 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] transition-all"
      />
    </div>
  </div>
</div>
```

---

## 5. Módulo 04 - Financeiro (Complementar)

### 5.1 Modal: Nova Despesa

**Rota:** Modal em `/financeiro/pagar`  
**Objetivo:** Cadastrar nova despesa/conta a pagar

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Nova Despesa                                              [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Descrição*                                                     │
│  [Aluguel Escritório                                      ]     │
│                                                                 │
│  Categoria*                         Fornecedor                  │
│  [Despesas Fixas         ▼]         [Imobiliária Central  ▼]    │
│                                                                 │
│  Valor*                         Data Vencimento*                │
│  [R$ 2.500,00                ]    [📅 10/04/2025          ]     │
│                                                                 │
│  Já foi paga? ☐                                                 │
│  Data Pagamento: [📅            ]  Forma: [PIX          ▼]      │
│                                                                 │
│  Conta Bancária*                                                │
│  [Itaú - Corrente (***1234)                      ▼]             │
│                                                                 │
│  Recorrência                                                    │
│  [Única ▼]                                                      │
│                                                                 │
│  Anexos                                                         │
│  [📎 Arraste ou clique para anexar]                             │
│                                                                 │
│  Observações                                                    │
│  [                                                        ]     │
│                                                                 │
│                                    [Cancelar] [Salvar]          │
└─────────────────────────────────────────────────────────────────┘
```

#### Campos do Formulário

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| Descrição | Text | Sim | Mínimo 3 caracteres |
| Categoria | Select | Sim | - |
| Fornecedor | Select | Não | - |
| Valor | Number | Sim | > 0 |
| Data Vencimento | Date | Sim | Futura ou presente |
| Já foi paga? | Checkbox | Não | - |
| Data Pagamento | Date | Condicional | Se paga = true |
| Forma de Pagamento | Select | Condicional | Se paga = true |
| Conta Bancária | Select | Condicional | Se paga = true |
| Recorrência | Select | Não | Única/Mensal/Anual |
| Anexos | File | Não | Max 5MB |
| Observações | Textarea | Não | - |

---

### 5.2 Modal: Nova Conta Bancária

**Rota:** Modal em `/financeiro/configuracoes`  
**Objetivo:** Cadastrar conta bancária para movimentações

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Nova Conta Bancária                                       [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Banco*                                                         │
│  [🔍 Selecione o banco...                                 ▼]    │
│                                                                 │
│  Agência*                Conta*                Tipo*            │
│  [1234               ]   [56789-0           ]  [Corrente ▼]     │
│                                                                 │
│  Saldo Inicial                                                  │
│  [R$ 0,00                                                  ]    │
│                                                                 │
│  Descrição/Apelido                                              │
│  [Conta Principal                                         ]     │
│                                                                 │
│                                    [Cancelar] [Adicionar]       │
└─────────────────────────────────────────────────────────────────┘
```

#### Componentes

**Select de Bancos:**
```html
<div>
  <label class="block text-sm font-medium text-[#1f2937] mb-1">
    Banco <span class="text-red-500">*</span>
  </label>
  <div class="relative">
    <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271]" />
    <select class="w-full pl-10 pr-10 py-3 rounded-lg border border-[#e5e7eb] bg-white text-[#1f2937] focus:outline-none focus:ring-2 focus:ring-[#86cb92] focus:border-[#86cb92] appearance-none cursor-pointer">
      <option value="">Selecione o banco...</option>
      <option value="001">001 - Banco do Brasil</option>
      <option value="033">033 - Santander</option>
      <option value="104">104 - Caixa Econômica</option>
      <option value="237">237 - Bradesco</option>
      <option value="341">341 - Itaú</option>
      <option value="260">260 - NuBank</option>
      <option value="290">290 - PagBank</option>
      <option value="380">380 - PicPay</option>
    </select>
    <ChevronDown class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#627271] pointer-events-none" />
  </div>
</div>
```

---

## 6. Módulo 05 - Estoque (Complementar)

### 6.1 Modal: Ajuste de Estoque

**Rota:** Modal em `/estoque/produtos/:id`  
**Objetivo:** Corrigir quantidade de estoque com registro de motivo

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Ajuste de Estoque                                         [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Produto                                                        │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │ [IMG] Teclado Mecânico RGB                              │    │
│  │ SKU: TEC-RGB-001                                        │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  Quantidade Atual:        45 unidades                           │
│                                                                 │
│  Nova Quantidade*                                               │
│  [◀] [  42  ] [▶]  unidades                                    │
│                                                                 │
│  Motivo do Ajuste*                                              │
│  [Selecione o motivo...                                 ▼]      │
│                                                                 │
│  Observações                                                    │
│  [Produto danificado durante transporte                  ]      │
│                                                                 │
│  Responsável: Carlos Silva (Você)                               │
│                                                                 │
│                                    [Cancelar] [Confirmar Ajuste]│
└─────────────────────────────────────────────────────────────────┘
```

#### Campos

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| Produto | Readonly | - | Auto-preenchido |
| Quantidade Atual | Readonly | - | - |
| Nova Quantidade | Number | Sim | >= 0 |
| Motivo | Select | Sim | Inventário, Quebra, Perda, Ajuste, Outro |
| Observações | Textarea | Não | - |
| Responsável | Readonly | - | Usuário logado |

---

### 6.2 Modal: Novo Fornecedor

**Rota:** Modal em `/estoque/produtos/novo` ou `/estoque/fornecedores`  
**Objetivo:** Cadastrar fornecedor de produtos

#### Campos Principais

| Campo | Tipo | Obrigatório | Observação |
|-------|------|-------------|------------|
| Nome/Razão Social | Text | Sim | - |
| CNPJ | Text | Não | Com máscara e validação |
| Telefone | Tel | Não | - |
| Email | Email | Não | - |
| CEP | Text | Não | Com autocomplete ViaCEP |
| Endereço | Text | Não | Autopreenchido |
| Número | Text | Não | - |
| Complemento | Text | Não | - |
| Bairro | Text | Não | Autopreenchido |
| Cidade | Text | Não | Autopreenchido |
| Estado | Select | Não | Autopreenchido |
| Observações | Textarea | Não | - |

---

## 7. Módulo 06 - Vendas (Complementar)

### 7.1 Tela: Abertura de Caixa

**Rota:** `/vendas/caixa/abertura`  
**Objetivo:** Registrar saldo inicial do caixa PDV

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ [Sidebar]            Abertura de Caixa                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  💰                                                       │  │
│  │                                                           │  │
│  │  Abertura de Caixa                                        │  │
│  │                                                           │  │
│  │  Data: 12/03/2025 - 08:00                                 │  │
│  │  Operador: Carlos Silva                                   │  │
│  │                                                           │  │
│  │  Saldo Inicial*                                           │  │
│  │  [R$ 200,00                                         ]     │  │
│  │                                                           │  │
│  │  Observações                                              │  │
│  │  [                                                   ]    │  │
│  │                                                           │  │
│  │  [           Abrir Caixa e Iniciar Vendas           ]     │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

### 7.2 Tela: Fechamento de Caixa

**Rota:** `/vendas/caixa/fechamento`  
**Objetivo:** Fechar caixa com conferência de valores

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ [Sidebar]            Fechamento de Caixa                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Resumo do Dia                                                  │
│  ┌──────────────┬──────────────┬──────────────┬──────────────┐  │
│  │ 23 vendas    │ R$ 5.430,00  │ R$ 2.500,00  │ 8h trabalhadas│  │
│  └──────────────┴──────────────┴──────────────┴──────────────┘  │
│                                                                 │
│  Conferência de Valores                                         │
│                                                                 │
│  Forma          Esperado       Informado         Diferença      │
│  ─────────────────────────────────────────────────────────      │
│  Dinheiro       R$ 1.200,00   [R$ 1.200,00  ]   R$ 0,00 ✓       │
│  PIX            R$ 2.500,00   [R$ 2.500,00  ]   R$ 0,00 ✓       │
│  Cartão Crédito R$ 1.000,00   [R$ 1.000,00  ]   R$ 0,00 ✓       │
│  Cartão Débito    R$ 730,00   [R$ 730,00    ]   R$ 0,00 ✓       │
│  ─────────────────────────────────────────────────────────      │
│  TOTAL          R$ 5.430,00   R$ 5.430,00       R$ 0,00 ✓       │
│                                                                 │
│  Observações                                                    │
│  [                                                        ]     │
│                                                                 │
│                                    [Cancelar] [Fechar Caixa]    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Módulo 08 - Agendamentos (Complementar)

### 8.1 Modal: Novo Serviço

**Rota:** Modal em `/agendamentos/configuracoes`  
**Objetivo:** Cadastrar serviço para agendamento

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Novo Serviço                                              [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Nome do Serviço*                                               │
│  [Corte de Cabelo                                         ]     │
│                                                                 │
│  Duração* (minutos)          Preço*                             │
│  [60                    ]    [R$ 50,00                  ]       │
│                                                                 │
│  Cor de Identificação*                                          │
│  [🔴] [🟠] [🟡] [🟢] [🔵] [🟣]                                 │
│                                                                 │
│  Descrição                                                      │
│  [Corte completo com lavagem                             ]      │
│                                                                 │
│  Profissionais que realizam                                     │
│  ☑ João Silva (Barbeiro)                                        │
│  ☑ Maria Santos (Cabeleireira)                                  │
│  ☐ Pedro Costa (Barbeiro)                                       │
│                                                                 │
│                                    [Cancelar] [Criar Serviço]   │
└─────────────────────────────────────────────────────────────────┘
```

---

### 8.2 Modal: Configurar Horários da Agenda

**Rota:** Modal em `/agendamentos/configuracoes`  
**Objetivo:** Definir horário de funcionamento por dia

#### Layout
```
┌─────────────────────────────────────────────────────────────────┐
│  Configurar Horários                                       [X]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ☑ Usar mesmo horário para todos os dias                        │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ☑ Segunda-feira       Das [08:00] até [18:00]            ││
│  │ ☑ Terça-feira         Das [08:00] até [18:00]            ││
│  │ ☑ Quarta-feira        Das [08:00] até [18:00]            ││
│  │ ☑ Quinta-feira        Das [08:00] até [18:00]            ││
│  │ ☑ Sexta-feira         Das [08:00] até [18:00]            ││
│  │ ☐ Sábado              Das [09:00] até [13:00]            ││
│  │ ☐ Domingo              ─ Fechado ─                       ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  Pausa para Almoço                                              │
│  Das [12:00] até [13:00]                                        │
│                                                                 │
│  Exceções (Feriados)                                            │
│  [+ Adicionar exceção]                                          │
│                                                                 │
│                                    [Cancelar] [Salvar]          │
└─────────────────────────────────────────────────────────────────┘
```

---

## 9. Regras de Negócio Complementares

### 9.1 Validações de Formulários

| Regra | Descrição | Implementação |
|-------|-----------|---------------|
| RN-FORM-001 | Campos obrigatórios marcados com * | Visual e validação |
| RN-FORM-002 | Validação em tempo real | onBlur para formato, onSubmit para obrigatórios |
| RN-FORM-003 | Erros exibidos abaixo do campo | Mensagem específica |
| RN-FORM-004 | Campos com erro em vermelho | border-red-500, focus:ring-red-500 |
| RN-FORM-005 | Botão submit desabilitado até form válido | disabled:opacity-50 |
| RN-FORM-006 | Máscaras automáticas (CPF, CNPJ, telefone) | onInput com regex |
| RN-FORM-007 | Autocomplete de CEP | Busca ViaCEP onBlur |

### 9.2 Estados de Modais

| Estado | Comportamento |
|--------|---------------|
| **Abertura** | Animação fade-in + scale de 0.95 para 1 |
| **Carregando** | Spinner no botão, campos desabilitados |
| **Sucesso** | Toast de confirmação, fechar modal após 500ms |
| **Erro** | Mensagem no topo do modal, campos mantidos |
| **Fechamento** | Animação reversa, limpar formulário |

### 9.3 Navegação de Modais

| Ação | Comportamento |
|------|---------------|
| **Click overlay** | Fecha modal se não houver alterações não salvas |
| **ESC** | Mesmo comportamento do overlay |
| **X no header** | Mesmo comportamento |
| **Cancelar** | Confirma se há dados não salvos |
| **Salvar** | Valida, submit, feedback |

---

## 10. Checklist de Formulários

### Formulários Críticos (MVP)
- [x] Recuperação de Senha
- [x] Convite de Colaborador
- [x] Nova Oportunidade (CRM)
- [x] Novo Cliente (CRM)
- [x] Nova Interação (CRM)
- [x] Nova Despesa (Financeiro)
- [x] Nova Conta Bancária (Financeiro)
- [x] Ajuste de Estoque (Estoque)
- [x] Abertura de Caixa (Vendas)
- [x] Fechamento de Caixa (Vendas)
- [x] Novo Serviço (Agendamentos)
- [x] Configurar Horários (Agendamentos)

### Formulários Secundários (V1)
- [ ] Nova Receita (Financeiro)
- [ ] Transferência entre Contas (Financeiro)
- [ ] Nova Categoria (Financeiro/Estoque)
- [ ] Novo Fornecedor (Estoque)
- [ ] Devolução de Venda (Vendas)
- [ ] Novo Profissional (Agendamentos)
- [ ] Bloquear Horário (Agendamentos)

---

**Documento gerado para Google Stitch - UNIQ Empresas**  
**Última atualização:** 12/03/2026
