# Módulo 08: Agendamentos - Sistema de Gestão de Horários

## Metadados

| Atributo | Valor |
|----------|-------|
| **Módulo** | Agendamentos |
| **Código** | MOD-AGE-001 |
| **Versão** | 1.0.0 |
| **Status** | SHOULD HAVE |
| **Prioridade** | P1 - Negócios de Serviços |
| **Responsável** | Frontend Team |
| **Última Atualização** | 2026-03-12 |
| **Stakeholders** | Salões, Clínicas, Consultórios, Barbearias |

---

## 1. Design System UNIQ - Agendamentos

### 1.1 Paleta de Cores

| Token | Valor HEX | Uso |
|-------|-----------|-----|
| `--bg-primary` | `#efefef` | Fundo principal da aplicação |
| `--bg-card` | `#ffffff` | Fundo de cards e modais |
| `--bg-calendar` | `#ffffff` | Fundo do calendário |
| `--bg-slot` | `#f9fafb` | Fundo dos horários disponíveis |
| `--sidebar-bg` | `#1f2937` | Fundo da sidebar |
| `--btn-primary` | `#3e5653` | Botões primários |
| `--btn-primary-hover` | `#1f2937` | Hover de botões primários |
| `--btn-success` | `#86cb92` | Botões de sucesso/confirmar |
| `--accent` | `#86cb92` | Detalhes, indicadores de disponibilidade |
| `--text-primary` | `#1f2937` | Texto principal |
| `--text-secondary` | `#627271` | Texto secundário, placeholders |
| `--border` | `#e5e7eb` | Bordas e divisores |
| `--border-calendar` | `#e5e7eb` | Linhas do calendário |
| `--status-pending` | `#fef3c7` | Agendamento pendente - fundo |
| `--status-pending-text` | `#92400e` | Agendamento pendente - texto |
| `--status-confirmed` | `#dcfce7` | Confirmado - fundo |
| `--status-confirmed-text` | `#166534` | Confirmado - texto |
| `--status-completed` | `#dbeafe` | Concluído - fundo |
| `--status-completed-text` | `#1e40af` | Concluído - texto |
| `--status-cancelled` | `#fee2e2` | Cancelado - fundo |
| `--status-cancelled-text` | `#991b1b` | Cancelado - texto |
| `--status-no-show` | `#f3f4f6` | Não compareceu - fundo |
| `--status-no-show-text` | `#6b7280` | Não compareceu - texto |
| `--status-blocked` | `#fee2e2` | Horário bloqueado - fundo |
| `--status-blocked-text` | `#dc2626` | Horário bloqueado - texto |
| `--status-waiting` | `#ffedd5` | Lista de espera - fundo |
| `--status-waiting-text` | `#c2410c` | Lista de espera - texto |

### 1.2 Tipografia

| Elemento | Fonte | Tamanho | Peso | Cor |
|----------|-------|---------|------|-----|
| Título Página | Poppins | 24px (text-2xl) | 700 (bold) | `#1f2937` |
| Subtítulo | Poppins | 14px (text-sm) | 400 | `#627271` |
| Calendário Mês | Poppins | 20px (text-xl) | 600 | `#1f2937` |
| Calendário Dia | Poppins | 14px (text-sm) | 500 | `#1f2937` |
| Card Título | Poppins | 14px (text-sm) | 600 | `#1f2937` |
| Card Horário | Poppins | 12px (text-xs) | 500 | `#627271` |
| Body | Poppins | 14px (text-sm) | 400 | `#1f2937` |
| Caption | Poppins | 12px (text-xs) | 400 | `#627271` |
| Badge Status | Poppins | 11px (text-xs) | 500 | Variável |
| Hora Slot | Poppins | 13px (text-sm) | 500 | `#1f2937` |

### 1.3 Espaçamentos

| Elemento | Valor Tailwind |
|----------|----------------|
| Container padding | `p-6` |
| Card padding | `p-4` |
| Calendar cell padding | `p-2` |
| Modal padding | `p-6` |
| Section margin | `mb-6` |
| Calendar gap | `gap-1` |
| Slot gap | `gap-2` |
| Button padding | `px-4 py-2` |
| Input padding | `px-3 py-2` |
| Event card padding | `px-3 py-2` |

### 1.4 Sombras e Bordas

| Elemento | Classes Tailwind |
|----------|------------------|
| Card | `bg-white rounded-lg shadow-sm border border-gray-200` |
| Calendar Cell | `border border-gray-200 bg-white` |
| Event Card | `rounded-md shadow-sm cursor-pointer hover:shadow-md transition-shadow` |
| Button Primário | `bg-[#3e5653] text-white rounded-lg hover:bg-[#1f2937] transition-colors` |
| Button Sucesso | `bg-[#86cb92] text-white rounded-lg hover:bg-[#22c55e] transition-colors` |
| Button Secundário | `bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50` |
| Button Destrutivo | `bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors` |
| Input | `border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92] focus:border-transparent` |
| Select | `border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#86cb92]` |
| Badge | `px-2 py-0.5 rounded-full text-xs font-medium` |
| Modal | `bg-white rounded-xl shadow-2xl border border-gray-200` |
| Time Slot | `border border-gray-200 rounded-md hover:border-[#86cb92] transition-colors` |

---

## 2. Tela 1: Calendário de Agendamentos (/agendamentos)

### 2.1 Estrutura do Layout

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Agendamentos                                   [+ Novo Agendamento]│ │
│ │                     [Today] [< Março 2025 >]  [Dia][Semana][Mês] [🔍][👤] │ │
│ ├─────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Status Legend]                                                             │ │
│ │ [● Pendente] [● Confirmado] [● Concluído] [● Cancelado] [● Bloqueado]       │ │
│ ├─────────────────────────────────────────────────────────────────────────────┤ │
│ │ [Calendar View - Weekly Example]                                            │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │         │ Seg 10  │ Ter 11  │ Qua 12  │ Qui 13  │ Sex 14  │ Sáb 15  │   │ │
│ │ │         │         │         │         │         │         │         │   │ │
│ │ ├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────────┤ │ │
│ │ │ 08:00   │ ┌─────┐ │         │ ┌─────┐ │         │ ┌─────┐ │ ┌─────┐ │   │ │
│ │ │         │ │Maria│ │         │ │João │ │         │ │Ana  │ │ │Pedro│ │   │ │
│ │ │         │ │Corte│ │         │ │Barba│ │         │ │Manic│ │ │Corte│ │   │ │
│ │ │         │ └─────┘ │         │ └─────┘ │         │ └─────┘ │ └─────┘ │   │ │
│ │ ├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────────┤ │ │
│ │ │ 09:00   │ ┌─────┐ │ ┌─────┐ │         │ ┌─────┐ │         │         │   │ │
│ │ │         │ │Carla│ │ │BLOQ │ │         │ │Marcos│ │         │         │   │ │
│ │ │         │ │Spa  │ │ │     │ │         │ │Tatto│ │         │         │   │ │
│ │ │         │ └─────┘ │ └─────┘ │         │ └─────┘ │         │         │   │ │
│ │ ├─────────┼─────────┼─────────┼─────────┼─────────┼─────────┼─────────────┤ │ │
│ │ │ 10:00   │         │ ┌─────┐ │ ┌─────┐ │         │ ┌─────┐ │ ┌─────┐ │   │ │
│ │ │         │         │ │Lucas│ │ │Bia  │ │         │ │Sofia│ │ │Tiago│ │   │ │
│ │ │         │         │ │Maqui│ │ │Depil│ │         │ │Limpe│ │ │Corte│ │   │ │
│ │ │         │         │ └─────┘ │ └─────┘ │         │ └─────┘ │ └─────┘ │   │ │
│ │ └─────────┴─────────┴─────────┴─────────┴─────────┴─────────┴─────────────┘ │ │
│ │                                                                          │  │ │
│ │ [Mini Calendar Widget]  [Profissionais]  [Próximos Hoje]                    │ │
│ │ ┌──────────┐           ┌──────────┐      ┌──────────┐                       │ │
│ │ │ M T W T F│           │ ○ Ana    │      │ 14:30 João │ [Ver Todos]         │ │
│ │ │          │           │ ○ Carlos │      │ 15:00 Maria│                      │ │
│ │ │ 1 2 3 4 5│           │ ● Pedro  │      │ 16:00 Sofia│                      │ │
│ │ └──────────┘           └──────────┘      └──────────┘                       │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Componente: Calendário Semanal

```tsx
// CalendarWeekView.tsx
interface CalendarWeekViewProps {
  currentDate: Date;
  appointments: Appointment[];
  professionals: Professional[];
  onAppointmentClick: (appointment: Appointment) => void;
  onSlotClick: (slot: TimeSlot) => void;
  onDropAppointment: (appointmentId: string, newSlot: TimeSlot) => void;
}

interface Appointment {
  id: string;
  clientName: string;
  clientId: string;
  service: string;
  serviceId: string;
  professional: string;
  professionalId: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  color: string;
  phone: string;
  notes?: string;
}

interface TimeSlot {
  date: Date;
  hour: number;
  minute: number;
}

// Componente Principal
export function CalendarWeekView({
  currentDate,
  appointments,
  professionals,
  onAppointmentClick,
  onSlotClick,
  onDropAppointment
}: CalendarWeekViewProps) {
  const weekDays = getWeekDays(currentDate);
  const hours = generateHours(8, 20); // 8h às 20h

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-lg border border-gray-200">
      {/* Header dos Dias */}
      <div className="flex border-b border-gray-200">
        <div className="w-20 flex-shrink-0 border-r border-gray-200 p-2 bg-gray-50"></div>
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={`flex-1 p-3 text-center border-r border-gray-200 last:border-r-0 ${
              isToday(day) ? 'bg-[#86cb92]/10' : 'bg-white'
            }`}
          >
            <div className={`text-xs font-medium ${isToday(day) ? 'text-[#3e5653]' : 'text-gray-500'}`}>
              {format(day, 'EEE', { locale: ptBR })}
            </div>
            <div className={`text-lg font-semibold ${isToday(day) ? 'text-[#3e5653]' : 'text-gray-900'}`}>
              {format(day, 'dd')}
            </div>
          </div>
        ))}
      </div>

      {/* Grid de Horários */}
      <div className="flex-1 overflow-y-auto">
        {hours.map((hour) => (
          <div key={hour} className="flex min-h-[80px]">
            {/* Coluna de Horário */}
            <div className="w-20 flex-shrink-0 border-r border-b border-gray-200 p-2 bg-gray-50 text-xs text-gray-500 text-center">
              {formatHour(hour)}
            </div>
            
            {/* Colunas dos Dias */}
            {weekDays.map((day) => {
              const slotAppointments = getAppointmentsForSlot(appointments, day, hour);
              const isBlocked = isSlotBlocked(day, hour);
              
              return (
                <Droppable
                  key={`${day.toISOString()}-${hour}`}
                  droppableId={`${day.toISOString()}-${hour}`}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      onClick={() => !isBlocked && onSlotClick({ date: day, hour, minute: 0 })}
                      className={`flex-1 border-r border-b border-gray-200 last:border-r-0 p-1 relative ${
                        isBlocked 
                          ? 'bg-red-50 cursor-not-allowed' 
                          : snapshot.isDraggingOver 
                            ? 'bg-[#86cb92]/20' 
                            : 'hover:bg-gray-50 cursor-pointer'
                      }`}
                    >
                      {isBlocked && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-red-500 font-medium">Bloqueado</span>
                        </div>
                      )}
                      
                      {slotAppointments.map((appointment, index) => (
                        <Draggable
                          key={appointment.id}
                          draggableId={appointment.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={(e) => {
                                e.stopPropagation();
                                onAppointmentClick(appointment);
                              }}
                              className={`mb-1 p-2 rounded-md text-xs cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
                                getStatusColor(appointment.status)
                              } ${snapshot.isDragging ? 'opacity-50' : ''}`}
                            >
                              <div className="font-semibold truncate">{appointment.clientName}</div>
                              <div className="truncate opacity-75">{appointment.service}</div>
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="w-3 h-3" />
                                <span>{appointment.startTime}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 2.3 Código Tailwind - Estrutura Completa

```tsx
// app/(dashboard)/agendamentos/page.tsx
export default function AgendamentosPage() {
  return (
    <div className="min-h-screen bg-[#efefef]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1f2937]">Agendamentos</h1>
            <p className="text-sm text-[#627271]">Gerencie os horários da sua agenda</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => openNewAppointmentModal()}
              className="bg-[#3e5653] hover:bg-[#1f2937] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Novo Agendamento
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Navegação de Data */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => goToToday()}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Hoje
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigatePrevious()}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-lg font-semibold text-[#1f2937] min-w-[180px] text-center">
                Março 2025
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateNext()}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Controles de Visualização */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              {['day', 'week', 'month'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    currentView === view
                      ? 'bg-white text-[#1f2937] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {view === 'day' && 'Dia'}
                  {view === 'week' && 'Semana'}
                  {view === 'month' && 'Mês'}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="border-gray-300">
                <Search className="w-4 h-4 text-gray-600" />
              </Button>
              <Button variant="outline" size="icon" className="border-gray-300">
                <Filter className="w-4 h-4 text-gray-600" />
              </Button>
            </div>
          </div>
        </div>

        {/* Legenda de Status */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">Status:</span>
          {[
            { label: 'Pendente', color: 'bg-amber-400' },
            { label: 'Confirmado', color: 'bg-green-500' },
            { label: 'Concluído', color: 'bg-blue-500' },
            { label: 'Cancelado', color: 'bg-red-500' },
            { label: 'Bloqueado', color: 'bg-gray-400' },
          ].map((status) => (
            <div key={status.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${status.color}`}></div>
              <span className="text-xs text-gray-600">{status.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex h-[calc(100vh-220px)]">
        {/* Área do Calendário */}
        <div className="flex-1 p-6 overflow-hidden">
          <DragDropContext onDragEnd={handleDragEnd}>
            {currentView === 'week' && <CalendarWeekView />}
            {currentView === 'day' && <CalendarDayView />}
            {currentView === 'month' && <CalendarMonthView />}
          </DragDropContext>
        </div>

        {/* Sidebar Direita */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          {/* Mini Calendário */}
          <div className="p-4 border-b border-gray-200">
            <MiniCalendar
              currentDate={currentDate}
              onDateSelect={handleDateSelect}
              appointments={appointments}
            />
          </div>

          {/* Filtro de Profissionais */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-[#1f2937] mb-3">Profissionais</h3>
            <div className="space-y-2">
              {professionals.map((professional) => (
                <label
                  key={professional.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedProfessionals.includes(professional.id)}
                    onChange={() => toggleProfessional(professional.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                  />
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={professional.avatar} />
                    <AvatarFallback className="bg-[#3e5653] text-white text-xs">
                      {professional.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-700">{professional.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Próximos Agendamentos */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#1f2937]">Hoje</h3>
              <Button variant="ghost" size="sm" className="text-xs text-[#3e5653]">
                Ver Todos
              </Button>
            </div>
            <div className="space-y-2">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className={`p-3 rounded-lg border-l-4 cursor-pointer hover:shadow-sm transition-shadow ${
                    getStatusBorderColor(appointment.status)
                  } bg-white border border-gray-200`}
                  onClick={() => openAppointmentDetails(appointment)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      {appointment.startTime}
                    </span>
                    <Badge className={getStatusBadgeClass(appointment.status)}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{appointment.clientName}</p>
                  <p className="text-xs text-gray-500">{appointment.service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 2.4 Estados do Componente

#### Estado Loading

```tsx
// Loading State
function CalendarSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header Skeleton */}
      <div className="flex border-b border-gray-200">
        <div className="w-20 h-14 bg-gray-100 animate-pulse"></div>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className="flex-1 h-14 bg-gray-100 animate-pulse"></div>
        ))}
      </div>
      
      {/* Grid Skeleton */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map((hour) => (
        <div key={hour} className="flex h-20">
          <div className="w-20 bg-gray-50 animate-pulse"></div>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <div key={day} className="flex-1 bg-gray-50 animate-pulse m-0.5"></div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

#### Estado Empty

```tsx
// Empty State
function CalendarEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-lg border border-gray-200">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Calendar className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Nenhum agendamento
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
        Sua agenda está vazia para este período. Clique em um horário ou no botão "Novo Agendamento" para começar.
      </p>
      <Button
        onClick={() => openNewAppointmentModal()}
        className="bg-[#3e5653] hover:bg-[#1f2937] text-white"
      >
        <Plus className="w-4 h-4 mr-2" />
        Criar Agendamento
      </Button>
    </div>
  );
}
```

#### Estado Error

```tsx
// Error State
function CalendarErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-[400px] bg-white rounded-lg border border-red-200">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-10 h-10 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Erro ao carregar agenda
      </h3>
      <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
        Não foi possível carregar os agendamentos. Verifique sua conexão e tente novamente.
      </p>
      <Button
        onClick={onRetry}
        variant="outline"
        className="border-red-300 text-red-600 hover:bg-red-50"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Tentar Novamente
      </Button>
    </div>
  );
}
```

---

## 3. Tela 2: Novo Agendamento (Modal)

### 3.1 Estrutura do Modal

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Modal: Novo Agendamento]                                          [X]      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Passo 1: Cliente                                                       │  │
│  │                                                                       │  │
│  │ [Buscar cliente...                    🔍]                             │  │
│  │                                                                       │  │
│  │ Clientes Recentes:                                                    │  │
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐                               │  │
│  │ │ 👤       │ │ 👤       │ │ 👤       │                               │  │
│  │ │ Maria S. │ │ João P.  │ │ Ana L.   │                               │  │
│  │ │ (11)9... │ │ (11)9... │ │ (11)9... │                               │  │
│  │ └──────────┘ └──────────┘ └──────────┘                               │  │
│  │                                                                       │  │
│  │ [+ Novo Cliente]                                                     │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Passo 2: Serviço e Profissional                                        │  │
│  │                                                                       │  │
│  │ Serviço *                            Profissional *                   │  │
│  │ ┌────────────────────────────────┐   ┌────────────────────────────┐   │  │
│  │ │ Selecione...              ▼    │   │ Selecione...          ▼    │   │  │
│  │ └────────────────────────────────┘   └────────────────────────────┘   │  │
│  │                                                                       │  │
│  │ Duração: 60 min       Valor: R$ 120,00                               │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Passo 3: Data e Hora                                                   │  │
│  │                                                                       │  │
│  │     ◀    Março 2025    ▶                                              │  │
│  │   ┌────────────────────────────────────────┐                          │  │
│  │   │ D  S  T  Q  Q  S  S                    │                          │  │
│  │   │          1  2  3  4                    │                          │  │
│  │   │ 5  6  7  8  9 [10] 11                  │                          │  │
│  │   │ 12 13 14 15 16 17 18                   │                          │  │
│  │   └────────────────────────────────────────┘                          │  │
│  │                                                                       │  │
│  │ Horários Disponíveis:                                                 │  │
│  │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐    │  │
│  │ │ 09:00  │ │ 10:00  │ │ 11:00  │ │ 14:00  │ │ 15:00  │ │ 16:00  │    │  │
│  │ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘    │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ Observações (opcional)                                                 │  │
│  │ ┌─────────────────────────────────────────────────────────────────┐   │  │
│  │ │ Notas sobre o agendamento...                                    │   │  │
│  │ └─────────────────────────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ☑ Enviar confirmação por WhatsApp                                        │
│  ☑ Adicionar à lista de espera se não houver vaga                         │
│                                                                             │
│                                                    [Cancelar]  [Confirmar]  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Componente: Modal Novo Agendamento

```tsx
// components/modals/NewAppointmentModal.tsx
interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: Date;
  initialTime?: string;
}

export function NewAppointmentModal({
  isOpen,
  onClose,
  initialDate,
  initialTime
}: NewAppointmentModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AppointmentFormData>({
    clientId: '',
    clientName: '',
    clientPhone: '',
    serviceId: '',
    serviceName: '',
    professionalId: '',
    professionalName: '',
    date: initialDate || new Date(),
    time: initialTime || '',
    duration: 60,
    price: 0,
    notes: '',
    sendConfirmation: true,
    addToWaitlist: false
  });

  const steps = [
    { id: 1, label: 'Cliente', icon: User },
    { id: 2, label: 'Serviço', icon: Scissors },
    { id: 3, label: 'Horário', icon: Clock }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1f2937] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#3e5653]" />
            Novo Agendamento
          </DialogTitle>
        </DialogHeader>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
                  step === s.id
                    ? 'bg-[#3e5653] text-white'
                    : step > s.id
                      ? 'bg-[#86cb92] text-white'
                      : 'bg-gray-100 text-gray-500'
                }`}
              >
                <s.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{s.label}</span>
              </div>
              {index < steps.length - 1 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Cliente */}
        {step === 1 && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar cliente por nome ou telefone..."
                className="pl-10 border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
                value={formData.clientName}
                onChange={(e) => searchClients(e.target.value)}
              />
            </div>

            {/* Resultados da Busca */}
            {searchResults.length > 0 && (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                {searchResults.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => selectClient(client)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#3e5653] text-white">
                        {client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-900">{client.name}</p>
                      <p className="text-sm text-gray-500">{client.phone}</p>
                    </div>
                    <Check className="w-4 h-4 text-[#86cb92]" />
                  </button>
                ))}
              </div>
            )}

            {/* Clientes Recentes */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Clientes Recentes</h4>
              <div className="grid grid-cols-3 gap-3">
                {recentClients.map((client) => (
                  <button
                    key={client.id}
                    onClick={() => selectClient(client)}
                    className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-colors"
                  >
                    <Avatar className="w-12 h-12 mb-2">
                      <AvatarFallback className="bg-gray-200 text-gray-600">
                        {client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900 truncate w-full text-center">
                      {client.name.split(' ')[0]}
                    </span>
                    <span className="text-xs text-gray-500">{client.phone}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Novo Cliente */}
            <Button
              variant="outline"
              onClick={() => openNewClientModal()}
              className="w-full border-dashed border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Novo Cliente
            </Button>
          </div>
        )}

        {/* Step 2: Serviço */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Serviço *
                </label>
                <Select
                  value={formData.serviceId}
                  onValueChange={(value) => selectService(value)}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-[#86cb92]">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className="flex items-center justify-between w-full">
                          <span>{service.name}</span>
                          <span className="text-gray-500 ml-4">{formatCurrency(service.price)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Profissional *
                </label>
                <Select
                  value={formData.professionalId}
                  onValueChange={(value) => selectProfessional(value)}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-[#86cb92]">
                    <SelectValue placeholder="Selecione um profissional" />
                  </SelectTrigger>
                  <SelectContent>
                    {professionals.map((professional) => (
                      <SelectItem key={professional.id} value={professional.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: professional.color }}
                          />
                          <span>{professional.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Resumo do Serviço */}
            {formData.serviceId && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Duração</p>
                      <p className="font-medium text-gray-900">{formData.duration} min</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Valor</p>
                      <p className="font-medium text-gray-900">{formatCurrency(formData.price)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Serviços Populares */}
            {!formData.serviceId && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Serviços Populares</h4>
                <div className="grid grid-cols-2 gap-3">
                  {popularServices.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => selectService(service.id)}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[#86cb92] hover:bg-[#86cb92]/5 transition-colors text-left"
                    >
                      <div className="w-10 h-10 bg-[#3e5653]/10 rounded-lg flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-[#3e5653]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.duration} min</p>
                      </div>
                      <span className="text-sm font-medium text-[#3e5653]">
                        {formatCurrency(service.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Data e Hora */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Mini Calendário */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecione a Data
                </label>
                <div className="border border-gray-200 rounded-lg p-3">
                  <CalendarComponent
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && setFormData({ ...formData, date })}
                    disabled={(date) => isBefore(date, startOfToday())}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Horários Disponíveis */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Horários Disponíveis
                </label>
                <div className="border border-gray-200 rounded-lg p-3 h-[280px] overflow-y-auto">
                  {loadingSlots ? (
                    <div className="flex items-center justify-center h-full">
                      <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  ) : availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot.time}
                          onClick={() => setFormData({ ...formData, time: slot.time })}
                          className={`p-2 text-sm rounded-md border transition-all ${
                            formData.time === slot.time
                              ? 'bg-[#3e5653] text-white border-[#3e5653]'
                              : 'border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <AlertCircle className="w-8 h-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Nenhum horário disponível</p>
                      <p className="text-xs text-gray-400">Tente outra data</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Observações */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Observações (opcional)
              </label>
              <Textarea
                placeholder="Notas sobre o agendamento..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92] resize-none"
                rows={3}
              />
            </div>

            {/* Opções */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendConfirmation}
                  onChange={(e) => setFormData({ ...formData, sendConfirmation: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                />
                <span className="text-sm text-gray-700">Enviar confirmação por WhatsApp</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.addToWaitlist}
                  onChange={(e) => setFormData({ ...formData, addToWaitlist: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                />
                <span className="text-sm text-gray-700">Adicionar à lista de espera se não houver vaga</span>
              </label>
            </div>
          </div>
        )}

        {/* Footer */}
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-gray-300">
            Cancelar
          </Button>
          {step > 1 && (
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="border-gray-300"
            >
              Voltar
            </Button>
          )}
          {step < 3 ? (
            <Button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="bg-[#3e5653] hover:bg-[#1f2937] text-white"
            >
              Continuar
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit() || isSubmitting}
              className="bg-[#86cb92] hover:bg-[#22c55e] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Confirmar Agendamento
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### 3.3 Resumo Visual do Agendamento

```tsx
// AppointmentSummary.tsx
function AppointmentSummary({ formData }: { formData: AppointmentFormData }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <h4 className="font-medium text-gray-900 flex items-center gap-2">
        <ClipboardList className="w-4 h-4" />
        Resumo do Agendamento
      </h4>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Cliente:</span>
          <p className="font-medium text-gray-900">{formData.clientName}</p>
        </div>
        <div>
          <span className="text-gray-500">Telefone:</span>
          <p className="font-medium text-gray-900">{formData.clientPhone}</p>
        </div>
        <div>
          <span className="text-gray-500">Serviço:</span>
          <p className="font-medium text-gray-900">{formData.serviceName}</p>
        </div>
        <div>
          <span className="text-gray-500">Profissional:</span>
          <p className="font-medium text-gray-900">{formData.professionalName}</p>
        </div>
        <div>
          <span className="text-gray-500">Data:</span>
          <p className="font-medium text-gray-900">
            {format(formData.date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
          </p>
        </div>
        <div>
          <span className="text-gray-500">Horário:</span>
          <p className="font-medium text-gray-900">{formData.time}</p>
        </div>
        <div>
          <span className="text-gray-500">Duração:</span>
          <p className="font-medium text-gray-900">{formData.duration} minutos</p>
        </div>
        <div>
          <span className="text-gray-500">Valor:</span>
          <p className="font-medium text-[#3e5653]">{formatCurrency(formData.price)}</p>
        </div>
      </div>
    </div>
  );
}
```

---

## 4. Tela 3: Link Público de Agendamento (/agendar)

### 4.1 Estrutura da Página Pública

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Header Público]                                                            │
│ ┌─────────────────────────────────────────────────────────────────────────┐ │
│ │  [Logo UNIQ]                [💬 WhatsApp] [📞 (11) 99999-9999]          │ │
│ └─────────────────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │   [Foto da Empresa/Logo]                                            │    │
│  │                                                                     │    │
│  │   Salão Beleza Total                                                │    │
│  │   ⭐ 4.8 (127 avaliações) | 📍 São Paulo, SP                        │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ════════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  Passo 1: Escolha o Serviço                                                 │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ [🔍 Buscar serviço...]                                              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  Categorias: [Todas ▼]                                                      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ 💇‍♀️ CABELO                                                           │    │
│  │                                                                     │    │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │    │
│  │ │ ○ Corte Feminino                                    R$ 80,00    │ │    │
│  │ │   45 min                                                          │ │    │
│  │ ├─────────────────────────────────────────────────────────────────┤ │    │
│  │ │ ○ Corte Masculino                                   R$ 50,00    │ │    │
│  │ │   30 min                                                          │ │    │
│  │ ├─────────────────────────────────────────────────────────────────┤ │    │
│  │ │ ○ Coloração                                         R$ 180,00   │ │    │
│  │ │   120 min                                                         │ │    │
│  │ └─────────────────────────────────────────────────────────────────┘ │    │
│  │                                                                     │    │
│  │ 💅 UNHAS                                                            │    │
│  │                                                                     │    │
│  │ ┌─────────────────────────────────────────────────────────────────┐ │    │
│  │ │ ○ Manicure                                          R$ 40,00    │ │    │
│  │ │   30 min                                                          │ │    │
│  │ └─────────────────────────────────────────────────────────────────┘ │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  [Continuar →]                                                              │
│                                                                             │
│  ════════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  Passo 2: Escolha a Data e Horário                                          │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Profissional: [Qualquer Profissional ▼]                            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│       ◀    Março 2025    ▶                                                  │
│     ┌────────────────────────────────────────┐                              │
│     │ D  S  T  Q  Q  S  S                    │                              │
│     │          1  2  3  4                    │                              │
│     │ 5  6  7  8  9 [10] 11                  │                              │
│     │ 12 13 14 15 16 17 18                   │                              │
│     └────────────────────────────────────────┘                              │
│                                                                             │
│     Segunda-feira, 10 de Março                                              │
│                                                                             │
│     Horários Disponíveis:                                                   │
│     ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐      │
│     │ 09:00  │ │ 10:00  │ │ 11:00  │ │ 14:00  │ │ 15:00  │ │ 16:00  │      │
│     └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘      │
│                                                                             │
│  [← Voltar]                    [Continuar →]                                │
│                                                                             │
│  ════════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  Passo 3: Seus Dados                                                        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │ Nome Completo *                                                     │    │
│  │ [                                                 ]                 │    │
│  │                                                                     │    │
│  │ Telefone (WhatsApp) *                                               │    │
│  │ [(  ) _____-____                                   ]                 │    │
│  │                                                                     │    │
│  │ E-mail                                                              │    │
│  │ [                                                 ]                 │    │
│  │                                                                     │    │
│  │ Observações                                                         │    │
│  │ [                                                 ]                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
│  ☑ Receber lembretes por WhatsApp                                         │
│                                                                             │
│  [← Voltar]                    [Confirmar Agendamento]                      │
│                                                                             │
│  ════════════════════════════════════════════════════════════════════════   │
│                                                                             │
│  ✓ Agendamento Confirmado!                                                  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                                                                     │    │
│  │   ✅ Seu agendamento foi realizado com sucesso!                     │    │
│  │                                                                     │    │
│  │   📅 Segunda-feira, 10 de Março de 2025                             │    │
│  │   🕐 14:00                                                          │    │
│  │   💇‍♀️ Corte Feminino                                                 │    │
│  │   👤 Ana - Profissional                                             │    │
│  │   📍 Rua Augusta, 500 - São Paulo, SP                               │    │
│  │                                                                     │    │
│  │   [📲 Adicionar ao Google Calendar]  [📤 Compartilhar]              │    │
│  │                                                                     │    │
│  │   Um lembrete será enviado 24h antes do atendimento.                │    │
│  │                                                                     │    │
│  │   Precisa alterar?                                                  │    │
│  │   Entre em contato pelo WhatsApp (11) 99999-9999                    │    │
│  │                                                                     │    │
│  │                    [Fazer Novo Agendamento]                         │    │
│  │                                                                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ [Footer] © 2025 UNIQ - Agendamento Online                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Componente: Página Pública de Agendamento

```tsx
// app/(public)/agendar/[businessSlug]/page.tsx
export default function PublicBookingPage({ params }: { params: { businessSlug: string } }) {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState<PublicBookingData>({
    serviceId: '',
    serviceName: '',
    professionalId: '',
    professionalName: '',
    date: null,
    time: '',
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    notes: '',
    receiveReminders: true
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3e5653] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="font-semibold text-[#1f2937]">UNIQ Agendamentos</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${business.phone}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#3e5653]"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </header>

      {/* Business Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
              {business.logo ? (
                <img src={business.logo} alt={business.name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <Store className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-[#1f2937]">{business.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">{business.rating}</span>
                </div>
                <span className="text-sm text-gray-400">({business.reviewCount} avaliações)</span>
                <span className="text-gray-300">|</span>
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{business.city}, {business.state}</span>
              </div>
              {business.description && (
                <p className="text-sm text-gray-500 mt-2">{business.description}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        {!isConfirmed ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Progress Stepper */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  {[
                    { id: 1, label: 'Serviço' },
                    { id: 2, label: 'Data/Hora' },
                    { id: 3, label: 'Seus Dados' }
                  ].map((s, index) => (
                    <div key={s.id} className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                          step === s.id
                            ? 'bg-[#3e5653] text-white'
                            : step > s.id
                              ? 'bg-[#86cb92] text-white'
                              : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step > s.id ? <Check className="w-4 h-4" /> : s.id}
                      </div>
                      <span
                        className={`ml-2 text-sm font-medium ${
                          step >= s.id ? 'text-[#1f2937]' : 'text-gray-400'
                        }`}
                      >
                        {s.label}
                      </span>
                      {index < 2 && (
                        <ChevronRight className="w-4 h-4 text-gray-400 mx-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 1: Selecionar Serviço */}
            {step === 1 && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-[#1f2937] mb-4">
                  Escolha o Serviço
                </h2>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Buscar serviço..."
                    className="pl-10 border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Categories */}
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      !selectedCategory
                        ? 'bg-[#3e5653] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Todos
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-[#3e5653] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Services List */}
                <div className="space-y-4">
                  {groupedServices.map((group) => (
                    <div key={group.category}>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                        {group.category}
                      </h3>
                      <div className="space-y-2">
                        {group.services.map((service) => (
                          <label
                            key={service.id}
                            className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              bookingData.serviceId === service.id
                                ? 'border-[#3e5653] bg-[#3e5653]/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="service"
                              value={service.id}
                              checked={bookingData.serviceId === service.id}
                              onChange={() => selectService(service)}
                              className="w-4 h-4 text-[#3e5653] focus:ring-[#86cb92]"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-[#1f2937]">{service.name}</h4>
                              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {service.duration} min
                                </span>
                                {service.description && (
                                  <span>{service.description}</span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="font-semibold text-[#3e5653]">
                                {formatCurrency(service.price)}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Selecionar Data e Hora */}
            {step === 2 && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-[#1f2937] mb-4">
                  Escolha a Data e Horário
                </h2>

                {/* Selected Service Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Serviço selecionado</p>
                      <p className="font-medium text-[#1f2937]">{bookingData.serviceName}</p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-sm text-[#3e5653] hover:underline"
                    >
                      Alterar
                    </button>
                  </div>
                </div>

                {/* Professional Select */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profissional (opcional)
                  </label>
                  <Select
                    value={bookingData.professionalId}
                    onValueChange={(value) => selectProfessional(value)}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Qualquer profissional" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Qualquer profissional</SelectItem>
                      {professionals.map((professional) => (
                        <SelectItem key={professional.id} value={professional.id}>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={professional.avatar} />
                              <AvatarFallback className="bg-[#3e5653] text-white text-xs">
                                {professional.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            {professional.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Calendar */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selecione a Data
                    </label>
                    <div className="border border-gray-200 rounded-lg p-3">
                      <CalendarComponent
                        mode="single"
                        selected={bookingData.date}
                        onSelect={(date) => date && setBookingData({ ...bookingData, date })}
                        disabled={(date) => isBefore(date, startOfToday())}
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Horários Disponíveis
                    </label>
                    {bookingData.date ? (
                      <div className="border border-gray-200 rounded-lg p-3 h-[300px] overflow-y-auto">
                        <p className="text-sm text-gray-500 mb-3">
                          {format(bookingData.date, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                        </p>
                        {loadingSlots ? (
                          <div className="flex items-center justify-center h-40">
                            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
                          </div>
                        ) : availableSlots.length > 0 ? (
                          <div className="grid grid-cols-2 gap-2">
                            {availableSlots.map((slot) => (
                              <button
                                key={slot.time}
                                onClick={() => setBookingData({ ...bookingData, time: slot.time })}
                                className={`p-2 text-sm rounded-lg border transition-all ${
                                  bookingData.time === slot.time
                                    ? 'bg-[#3e5653] text-white border-[#3e5653]'
                                    : 'border-gray-200 hover:border-[#86cb92] hover:bg-[#86cb92]/5'
                                }`}
                              >
                                {slot.time}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <CalendarX className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Nenhum horário disponível</p>
                            <p className="text-xs text-gray-400">Tente outra data</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="border border-gray-200 rounded-lg p-8 text-center h-[300px] flex flex-col items-center justify-center">
                        <Calendar className="w-12 h-12 text-gray-300 mb-2" />
                        <p className="text-sm text-gray-500">Selecione uma data para ver os horários</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Dados do Cliente */}
            {step === 3 && (
              <div className="p-6">
                <h2 className="text-lg font-semibold text-[#1f2937] mb-4">
                  Seus Dados
                </h2>

                {/* Summary */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Serviço</span>
                    <span className="font-medium text-[#1f2937]">{bookingData.serviceName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Data e Hora</span>
                    <span className="font-medium text-[#1f2937]">
                      {format(bookingData.date!, "dd/MM/yyyy", { locale: ptBR })} às {bookingData.time}
                    </span>
                  </div>
                  {bookingData.professionalName && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Profissional</span>
                      <span className="font-medium text-[#1f2937]">{bookingData.professionalName}</span>
                    </div>
                  )}
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nome Completo *
                    </label>
                    <Input
                      value={bookingData.clientName}
                      onChange={(e) => setBookingData({ ...bookingData, clientName: e.target.value })}
                      placeholder="Digite seu nome completo"
                      className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Telefone (WhatsApp) *
                    </label>
                    <Input
                      value={bookingData.clientPhone}
                      onChange={(e) => setBookingData({ ...bookingData, clientPhone: e.target.value })}
                      placeholder="(11) 99999-9999"
                      className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      E-mail
                    </label>
                    <Input
                      type="email"
                      value={bookingData.clientEmail}
                      onChange={(e) => setBookingData({ ...bookingData, clientEmail: e.target.value })}
                      placeholder="seu@email.com"
                      className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Observações
                    </label>
                    <Textarea
                      value={bookingData.notes}
                      onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                      placeholder="Alguma observação especial?"
                      className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92] resize-none"
                      rows={3}
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bookingData.receiveReminders}
                      onChange={(e) => setBookingData({ ...bookingData, receiveReminders: e.target.checked })}
                      className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                    />
                    <span className="text-sm text-gray-700">Receber lembretes por WhatsApp</span>
                  </label>
                </div>
              </div>
            )}

            {/* Footer Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-gray-300"
                >
                  ← Voltar
                </Button>
              ) : (
                <div />
              )}
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceedToNext()}
                  className="bg-[#3e5653] hover:bg-[#1f2937] text-white"
                >
                  Continuar →
                </Button>
              ) : (
                <Button
                  onClick={handleConfirm}
                  disabled={!canConfirm() || isSubmitting}
                  className="bg-[#86cb92] hover:bg-[#22c55e] text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Confirmando...
                    </>
                  ) : (
                    'Confirmar Agendamento'
                  )}
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-[#1f2937] mb-2">
              Agendamento Confirmado!
            </h2>
            <p className="text-gray-500 mb-8">
              Seu agendamento foi realizado com sucesso.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#3e5653]" />
                  <span className="text-gray-700">
                    {format(bookingData.date!, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#3e5653]" />
                  <span className="text-gray-700">{bookingData.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Scissors className="w-5 h-5 text-[#3e5653]" />
                  <span className="text-gray-700">{bookingData.serviceName}</span>
                </div>
                {bookingData.professionalName && (
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[#3e5653]" />
                    <span className="text-gray-700">{bookingData.professionalName}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#3e5653]" />
                  <span className="text-gray-700">{business.address}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Button
                variant="outline"
                onClick={addToCalendar}
                className="border-gray-300"
              >
                <CalendarPlus className="w-4 h-4 mr-2" />
                Adicionar ao Calendário
              </Button>
              <Button
                variant="outline"
                onClick={shareAppointment}
                className="border-gray-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-500 mb-4">
                Um lembrete será enviado 24h antes do atendimento.
              </p>
              <p className="text-sm text-gray-500">
                Precisa alterar? Entre em contato pelo{' '}
                <a
                  href={`https://wa.me/${business.phone}`}
                  className="text-[#3e5653] hover:underline font-medium"
                >
                  WhatsApp
                </a>
              </p>
            </div>

            <Button
              onClick={resetAndNew}
              className="mt-6 bg-[#3e5653] hover:bg-[#1f2937] text-white"
            >
              Fazer Novo Agendamento
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-400">
            © 2025 UNIQ - Agendamento Online
          </p>
          <p className="text-xs text-gray-300 mt-1">
            powered by UNIQ Empresas
          </p>
        </div>
      </footer>
    </div>
  );
}
```

---

## 5. Tela 4: Configurações de Agenda

### 5.1 Estrutura da Tela

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Configurações da Agenda                                            │ │
│ ├─────────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Tabs: [Horários] [Serviços] [Profissionais] [Bloqueios] [Integrações]   │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ ══════════════════════════════════════════════════════════════════════════│ │
│ │                                                                             │ │
│ │ ABA: HORÁRIOS DE FUNCIONAMENTO                                              │ │
│ │                                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Dias da Semana                                                          │ │ │
│ │ │                                                                         │ │ │
│ │ │ ☑ Segunda-feira    das [08:00] até [18:00]  [+ Adicionar horário]      │ │ │
│ │ │                                                                             │ │
│ │ │ ☑ Terça-feira      das [08:00] até [18:00]                             │ │ │
│ │ │                                                                             │ │
│ │ │ ☑ Quarta-feira     das [08:00] até [18:00]                             │ │ │
│ │ │                                                                             │ │
│ │ │ ☑ Quinta-feira     das [08:00] até [18:00]                             │ │ │
│ │ │                                                                             │ │
│ │ │ ☑ Sexta-feira      das [08:00] até [20:00]                             │ │ │
│ │ │                                                                             │ │
│ │ │ ☐ Sábado           das [--:--] até [--:--]  (Fechado)                   │ │ │
│ │ │                                                                             │ │
│ │ │ ☐ Domingo          das [--:--] até [--:--]  (Fechado)                   │ │ │
│ │ │                                                                             │ │ │
│ │ │ [Intervalo para almoço]                                                │ │ │
│ │ │ Das [12:00] até [13:00]                                                │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Feriados e Dias Especiais                                               │ │ │
│ │ │                                                                         │ │ │
│ │ │ ┌────────────┬──────────────┬──────────────────────────┬──────────────┐ │ │ │
│ │ │ │ Data       │ Descrição    │ Tipo                   │ Ações        │ │ │ │
│ │ │ ├────────────┼──────────────┼──────────────────────────┼──────────────┤ │ │ │
│ │ │ │ 01/01/2025 │ Ano Novo     │ Feriado Nacional       │ 🗑️           │ │ │ │
│ │ │ │ 25/12/2025 │ Natal        │ Feriado Nacional       │ 🗑️           │ │ │ │
│ │ │ │ 15/03/2025 │ Aniversário  │ Fechado                │ 🗑️           │ │ │ │
│ │ │ └────────────┴──────────────┴──────────────────────────┴──────────────┘ │ │ │
│ │ │                                                                         │ │ │
│ │ │ [+ Adicionar Feriado]                                                   │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ ══════════════════════════════════════════════════════════════════════════│ │
│ │                                                                             │ │
│ │ ABA: SERVIÇOS                                                               │ │
│ │                                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [+ Novo Serviço]                                                        │ │ │
│ │ │                                                                         │ │ │
│ │ │ ┌──────────────────────────────────────────────────────────────────┐    │ │ │
│ │ │ │ 💇‍♀️ CABELO                                                        │    │ │ │
│ │ │ │                                                                  │    │ │ │
│ │ │ │ ┌──────────────┬────────┬──────────┬─────────┬─────────────────┐ │    │ │ │
│ │ │ │ │ Serviço      │ Duração│ Preço    │ Status  │ Ações           │ │    │ │ │
│ │ │ │ ├──────────────┼────────┼──────────┼─────────┼─────────────────┤ │    │ │ │
│ │ │ │ │ Corte Fem.   │ 45 min │ R$ 80,00 │ Ativo   │ ✏️ 🗑️           │ │    │ │ │
│ │ │ │ │ Corte Masc.  │ 30 min │ R$ 50,00 │ Ativo   │ ✏️ 🗑️           │ │    │ │ │
│ │ │ │ │ Coloração    │ 2h     │ R$180,00 │ Ativo   │ ✏️ 🗑️           │ │    │ │ │
│ │ │ │ │ Hidratação   │ 40 min │ R$ 60,00 │ Inativo │ ✏️ 🗑️           │ │    │ │ │
│ │ │ │ └──────────────┴────────┴──────────┴─────────┴─────────────────┘ │    │ │ │
│ │ │ └──────────────────────────────────────────────────────────────────┘    │ │ │
│ │ │                                                                         │ │ │
│ │ │ ┌──────────────────────────────────────────────────────────────────┐    │ │ │
│ │ │ │ 💅 UNHAS                                                         │    │ │ │
│ │ │ │                                                                  │    │ │ │
│ │ │ │ ┌──────────────┬────────┬──────────┬─────────┬─────────────────┐ │    │ │ │
│ │ │ │ │ Manicure     │ 30 min │ R$ 40,00 │ Ativo   │ ✏️ 🗑️           │ │    │ │ │
│ │ │ │ │ Pedicure     │ 40 min │ R$ 50,00 │ Ativo   │ ✏️ 🗑️           │ │    │ │ │
│ │ │ │ └──────────────┴────────┴──────────┴─────────┴─────────────────┘ │    │ │ │
│ │ │ └──────────────────────────────────────────────────────────────────┘    │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ ══════════════════════════════════════════════════════════════════════════│ │
│ │                                                                             │ │
│ │ ABA: PROFISSIONAIS                                                          │ │
│ │                                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [+ Novo Profissional]                                                   │ │ │
│ │ │                                                                         │ │ │
│ │ │ ┌─────────────────────────────────────────────────────────────────┐     │ │ │
│ │ │ │ ┌──────┐                                                        │     │ │ │
│ │ │ │ │ 👤   │  Ana Silva                                           │     │ │ │
│ │ │ │ │      │  an@email.com | (11) 99999-9999                      │     │ │ │
│ │ │ │ │      │  Cor: ● Verde | Especialidade: Coloração             │     │ │ │
│ │ │ │ │      │  Horário: Seg-Sex 09h-18h                            │     │ │ │
│ │ │ │ │      │  Serviços: Corte, Coloração, Hidratação              │     │ │ │
│ │ │ │ │      │  [✏️ Editar] [🗑️ Remover]                            │     │ │ │
│ │ │ │ └──────┘                                                        │     │ │ │
│ │ │ │                                                                   │     │ │ │
│ │ │ │ ┌──────┐                                                        │     │ │ │
│ │ │ │ │ 👤   │  Carlos Souza                                        │     │ │ │
│ │ │ │ │      │  carlos@email.com | (11) 98888-8888                  │     │ │ │
│ │ │ │ │      │  Cor: ● Azul | Especialidade: Cortes Masculinos      │     │ │ │
│ │ │ │ │      │  Horário: Seg-Sáb 10h-20h                            │     │ │ │
│ │ │ │ │      │  Serviços: Corte Masc., Barba                        │     │ │ │
│ │ │ │ │      │  [✏️ Editar] [🗑️ Remover]                            │     │ │ │
│ │ │ │ └──────┘                                                        │     │ │ │
│ │ │ └─────────────────────────────────────────────────────────────────┘     │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ ══════════════════════════════════════════════════════════════════════════│ │
│ │                                                                             │ │
│ │ ABA: BLOQUEIOS DE HORÁRIO                                                   │ │
│ │                                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ [+ Novo Bloqueio]                                                       │ │ │
│ │ │                                                                         │ │ │
│ │ │ ┌──────────────┬──────────────┬──────────────────┬─────────┬──────────┐ │ │ │
│ │ │ │ Data         │ Período      │ Motivo           │ Status  │ Ações    │ │ │ │
│ │ │ ├──────────────┼──────────────┼──────────────────┼─────────┼──────────┤ │ │ │
│ │ │ │ 15/03/2025   │ 09:00-12:00  │ Reunião          │ Ativo   │ ✏️ 🗑️    │ │ │ │
│ │ │ │ 20/03/2025   │ Todo o dia   │ Férias           │ Ativo   │ ✏️ 🗑️    │ │ │ │
│ │ │ │ 25/03/2025   │ 14:00-18:00  │ Curso            │ Ativo   │ ✏️ 🗑️    │ │ │ │
│ │ │ └──────────────┴──────────────┴──────────────────┴─────────┴──────────┘ │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Componente: Configurações de Agenda

```tsx
// app/(dashboard)/agendamentos/configuracoes/page.tsx
export default function AgendaConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState('horarios');

  return (
    <div className="min-h-screen bg-[#efefef]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1f2937]">Configurações da Agenda</h1>
            <p className="text-sm text-[#627271]">Configure horários, serviços e profissionais</p>
          </div>
          <Button
            onClick={saveSettings}
            disabled={isSaving}
            className="bg-[#86cb92] hover:bg-[#22c55e] text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex h-[calc(100vh-140px)]">
        {/* Sidebar de Tabs */}
        <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
          <nav className="p-4 space-y-1">
            {[
              { id: 'horarios', label: 'Horários', icon: Clock },
              { id: 'servicos', label: 'Serviços', icon: Scissors },
              { id: 'profissionais', label: 'Profissionais', icon: Users },
              { id: 'bloqueios', label: 'Bloqueios', icon: Lock },
              { id: 'lembretes', label: 'Lembretes', icon: Bell },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#3e5653] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* ABA: HORÁRIOS */}
          {activeTab === 'horarios' && (
            <div className="space-y-6 max-w-3xl">
              {/* Horários de Funcionamento */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-[#1f2937]">Horários de Funcionamento</h2>
                  <p className="text-sm text-gray-500">Configure os dias e horários de atendimento</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {workDays.map((day) => (
                      <div
                        key={day.dayOfWeek}
                        className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                      >
                        <label className="flex items-center gap-3 min-w-[140px]">
                          <input
                            type="checkbox"
                            checked={day.isOpen}
                            onChange={() => toggleDayOpen(day.dayOfWeek)}
                            className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                          />
                          <span className="font-medium text-gray-700">{day.label}</span>
                        </label>

                        {day.isOpen ? (
                          <div className="flex items-center gap-3 flex-1">
                            <span className="text-sm text-gray-500">das</span>
                            <Input
                              type="time"
                              value={day.openTime}
                              onChange={(e) => updateDayTime(day.dayOfWeek, 'openTime', e.target.value)}
                              className="w-24 border-gray-300"
                            />
                            <span className="text-sm text-gray-500">até</span>
                            <Input
                              type="time"
                              value={day.closeTime}
                              onChange={(e) => updateDayTime(day.dayOfWeek, 'closeTime', e.target.value)}
                              className="w-24 border-gray-300"
                            />
                            
                            {day.timeSlots.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTimeSlot(day.dayOfWeek, index)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 italic">Fechado</span>
                        )}

                        {day.isOpen && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addTimeSlot(day.dayOfWeek)}
                            className="text-[#3e5653]"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Horário
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Intervalo de Almoço */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Intervalo para Almoço</h3>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">Das</span>
                      <Input
                        type="time"
                        value={lunchBreak.start}
                        onChange={(e) => setLunchBreak({ ...lunchBreak, start: e.target.value })}
                        className="w-24 border-gray-300"
                      />
                      <span className="text-sm text-gray-500">até</span>
                      <Input
                        type="time"
                        value={lunchBreak.end}
                        onChange={(e) => setLunchBreak({ ...lunchBreak, end: e.target.value })}
                        className="w-24 border-gray-300"
                      />
                      <label className="flex items-center gap-2 ml-4">
                        <input
                          type="checkbox"
                          checked={lunchBreak.enabled}
                          onChange={(e) => setLunchBreak({ ...lunchBreak, enabled: e.target.checked })}
                          className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                        />
                        <span className="text-sm text-gray-600">Aplicar intervalo</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feriados */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-[#1f2937]">Feriados e Dias Especiais</h2>
                  <p className="text-sm text-gray-500">Adicione dias em que o estabelecimento estará fechado</p>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Data</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Descrição</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Tipo</th>
                          <th className="text-right py-2 px-3 text-sm font-medium text-gray-700">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {holidays.map((holiday) => (
                          <tr key={holiday.id} className="border-b border-gray-100 last:border-b-0">
                            <td className="py-3 px-3 text-sm">{formatDate(holiday.date)}</td>
                            <td className="py-3 px-3 text-sm">{holiday.description}</td>
                            <td className="py-3 px-3">
                              <Badge variant={holiday.type === 'national' ? 'default' : 'secondary'}>
                                {holiday.type === 'national' ? 'Nacional' : 'Personalizado'}
                              </Badge>
                            </td>
                            <td className="py-3 px-3 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeHoliday(holiday.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddHolidayModal(true)}
                    className="mt-4 border-dashed border-gray-300"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Feriado
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* ABA: SERVIÇOS */}
          {activeTab === 'servicos' && <ServicesTab />}

          {/* ABA: PROFISSIONAIS */}
          {activeTab === 'profissionais' && <ProfessionalsTab />}

          {/* ABA: BLOQUEIOS */}
          {activeTab === 'bloqueios' && <BlockingsTab />}

          {/* ABA: LEMBRETES */}
          {activeTab === 'lembretes' && <RemindersTab />}
        </div>
      </div>
    </div>
  );
}
```

### 5.3 Componente: Modal de Serviço

```tsx
// components/modals/ServiceModal.tsx
export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#1f2937]">
            {service ? 'Editar Serviço' : 'Novo Serviço'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nome do Serviço *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Corte Feminino"
              className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Categoria *
            </label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger className="border-gray-300">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Duração (min) *
              </label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                placeholder="60"
                className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Preço (R$) *
              </label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                placeholder="0,00"
                className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Descrição
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o serviço..."
              className="border-gray-300 focus:ring-[#86cb92] focus:border-[#86cb92] resize-none"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
              />
              <span className="text-sm text-gray-700">Serviço ativo</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.allowOnlineBooking}
                onChange={(e) => setFormData({ ...formData, allowOnlineBooking: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
              />
              <span className="text-sm text-gray-700">Disponível online</span>
            </label>
          </div>

          {/* Profissionais que realizam este serviço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profissionais habilitados
            </label>
            <div className="space-y-2 border border-gray-200 rounded-lg p-3">
              {professionals.map((professional) => (
                <label key={professional.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.professionalIds.includes(professional.id)}
                    onChange={() => toggleProfessional(professional.id)}
                    className="w-4 h-4 rounded border-gray-300 text-[#86cb92] focus:ring-[#86cb92]"
                  />
                  <span className="text-sm text-gray-700">{professional.name}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-300">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid() || isSubmitting}
            className="bg-[#3e5653] hover:bg-[#1f2937] text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 6. Tela 5: Lista de Espera

### 6.1 Estrutura da Tela

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│ [Sidebar #1f2937]                                                               │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │ [Header] Lista de Espera                                      [+ Adicionar] │ │
│ ├─────────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                             │ │
│ │ [Filtros: Todos] [Pendentes] [Convertidos] [Cancelados]  [🔍 Buscar] [Filtro│ │
│ │                                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Lista de Espera (15 pessoas)                                            │ │ │
│ │ │                                                                         │ │ │
│ │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │ │
│ │ │ │ 1  👤 Maria Silva                                                   │ │ │ │
│ │ │ │    📞 (11) 99999-9999                                               │ │ │ │
│ │ │ │    💇‍♀️ Corte Feminino - Qualquer profissional                       │ │ │ │
│ │ │ │    📅 Preferência: Segunda ou Quarta após 14h                       │ │ │ │
│ │ │ │    ⏱️ Aguardando há 2 dias                                          │ │ │ │
│ │ │ │    [🏷️ Pendente]                                                   │ │ │ │
│ │ │ │    [✓ Marcar como Convertido] [✉️ Notificar] [🗑️ Remover]          │ │ │ │
│ │ │ └─────────────────────────────────────────────────────────────────────┘ │ │ │
│ │ │                                                                         │ │ │
│ │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │ │
│ │ │ │ 2  👤 João Pereira                                                  │ │ │ │
│ │ │ │    📞 (11) 98888-8888                                               │ │ │ │
│ │ │ │    💅 Manicure - Preferência: Ana                                   │ │ │ │
│ │ │ │    📅 Preferência: Qualquer dia pela manhã                          │ │ │ │
│ │ │ │    ⏱️ Aguardando há 5 dias                                          │ │ │ │
│ │ │ │    [🏷️ Pendente]                                                   │ │ │ │
│ │ │ │    [✓ Marcar como Convertido] [✉️ Notificar] [🗑️ Remover]          │ │ │ │
│ │ │ └─────────────────────────────────────────────────────────────────────┘ │ │ │
│ │ │                                                                         │ │ │
│ │ │ ┌─────────────────────────────────────────────────────────────────────┐ │ │ │
│ │ │ │ 3  👤 Carla Santos                                                  │ │ │ │
│ │ │ │    📞 (11) 97777-7777                                               │ │ │ │
│ │ │ │    💆‍♀️ Hidratação - Qualquer profissional                         │ │ │ │
│ │ │ │    📅 Preferência: Sexta-feira                                      │ │ │ │
│ │ │ │    ⏱️ Aguardando há 1 semana                                        │ │ │ │
│ │ │ │    [🏷️ Notificado]                                                 │ │ │ │
│ │ │ │    [✓ Marcar como Convertido] [✉️ Notificar] [🗑️ Remover]          │ │ │ │
│ │ │ └─────────────────────────────────────────────────────────────────────┘ │ │ │
│ │ │                                                                         │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ 📊 Estatísticas da Lista de Espera                                      │ │ │
│ │ │                                                                         │ │ │
│ │ │ ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │ │ │
│ │ │ │   15        │  │    8        │  │    4        │  │    3            │  │ │ │
│ │ │ │   Total     │  │  Pendentes  │  │ Convertidos │  │   Cancelados    │  │ │ │
│ │ │ └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────┘  │ │ │
│ │ │                                                                         │ │ │
│ │ │ Tempo médio de espera: 4 dias                                             │ │ │
│ │ │ Taxa de conversão: 27%                                                    │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Componente: Lista de Espera

```tsx
// app/(dashboard)/agendamentos/lista-espera/page.tsx
export default function ListaEsperaPage() {
  return (
    <div className="min-h-screen bg-[#efefef]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1f2937]">Lista de Espera</h1>
            <p className="text-sm text-[#627271]">Gerencie clientes aguardando vagas</p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-[#3e5653] hover:bg-[#1f2937] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Adicionar à Lista
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'Todos', count: 15 },
              { id: 'pending', label: 'Pendentes', count: 8 },
              { id: 'converted', label: 'Convertidos', count: 4 },
              { id: 'cancelled', label: 'Cancelados', count: 3 },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-[#3e5653] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filter.label}
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  activeFilter === filter.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar cliente..."
                className="pl-10 w-64 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="border-gray-300">
              <Filter className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-200px)]">
        {/* Main List */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-[#1f2937]">
                Lista de Espera ({filteredWaitlist.length} pessoas)
              </h2>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredWaitlist.map((item, index) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#3e5653]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-[#3e5653]">
                        {index + 1}
                      </span>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1f2937]">{item.clientName}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5" />
                              {item.clientPhone}
                            </span>
                          </div>
                        </div>
                        <Badge className={getStatusBadgeClass(item.status)}>
                          {getStatusLabel(item.status)}
                        </Badge>
                      </div>

                      <div className="mt-3 space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Scissors className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{item.serviceName}</span>
                          {item.preferredProfessional && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="text-gray-500">
                                Preferência: {item.preferredProfessional}
                              </span>
                            </>
                          )}
                        </div>

                        {item.preferredDays && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-500">
                              Preferência: {item.preferredDays}
                              {item.preferredTime && ` - ${item.preferredTime}`}
                            </span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className={`${getWaitingTimeColor(item.waitingDays)}`}>
                            Aguardando há {formatWaitingTime(item.waitingDays)}
                          </span>
                        </div>

                        {item.notes && (
                          <div className="flex items-start gap-2 text-sm">
                            <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                            <span className="text-gray-500 italic">{item.notes}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-4">
                        {item.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => convertToAppointment(item)}
                            className="bg-[#86cb92] hover:bg-[#22c55e] text-white"
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Converter em Agendamento
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => notifyClient(item)}
                          className="border-gray-300"
                        >
                          <Bell className="w-4 h-4 mr-1" />
                          Notificar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => editWaitlistItem(item)}
                          className="border-gray-300"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromWaitlist(item.id)}
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredWaitlist.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum cliente na lista de espera
                </h3>
                <p className="text-sm text-gray-500 text-center max-w-sm">
                  Quando todos os horários estiverem ocupados, os clientes podem entrar na lista de espera.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
          <h3 className="font-semibold text-[#1f2937] mb-4">Estatísticas</h3>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-[#1f2937]">{stats.total}</p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
            <div className="bg-amber-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
              <p className="text-xs text-amber-600">Pendentes</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.converted}</p>
              <p className="text-xs text-green-600">Convertidos</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
              <p className="text-xs text-red-600">Cancelados</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Tempo médio de espera</span>
              <span className="text-sm font-medium text-[#1f2937]">{stats.avgWaitTime} dias</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Taxa de conversão</span>
              <span className="text-sm font-medium text-green-600">{stats.conversionRate}%</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">Mais solicitado</span>
              <span className="text-sm font-medium text-[#1f2937]">{stats.mostRequestedService}</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Atividade Recente</h4>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 text-sm">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${getActivityColor(activity.type)}`} />
                  <div>
                    <p className="text-gray-700">{activity.description}</p>
                    <p className="text-xs text-gray-400">{activity.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 7. Regras de Negócio

### RN-AGE-001: Disponibilidade de Horários
**Descrição:** O sistema deve verificar disponibilidade de horários em tempo real, considerando agendamentos existentes, bloqueios e horários de funcionamento.

```typescript
// Verificação de disponibilidade
function isTimeSlotAvailable(
  date: Date,
  time: string,
  duration: number,
  professionalId?: string
): boolean {
  // Verificar se está dentro do horário de funcionamento
  if (!isWithinBusinessHours(date, time)) return false;
  
  // Verificar feriados
  if (isHoliday(date)) return false;
  
  // Verificar bloqueios
  if (isBlocked(date, time, duration, professionalId)) return false;
  
  // Verificar conflitos de agendamento
  if (hasConflictingAppointment(date, time, duration, professionalId)) return false;
  
  return true;
}
```

### RN-AGE-002: Duração dos Agendamentos
**Descrição:** Todo agendamento deve ter uma duração definida baseada no serviço selecionado. O sistema deve impedir agendamentos sobrepostos.

```typescript
// Cálculo de sobreposição
function hasOverlap(
  newStart: Date,
  newEnd: Date,
  existingAppointments: Appointment[],
  buffer: number = 0 // tempo de intervalo entre agendamentos
): boolean {
  return existingAppointments.some(appointment => {
    const existingStart = new Date(appointment.startTime);
    const existingEnd = new Date(appointment.endTime);
    
    return (
      newStart < addMinutes(existingEnd, buffer) &&
      newEnd > addMinutes(existingStart, -buffer)
    );
  });
}
```

### RN-AGE-003: Confirmação Automática
**Descrição:** O sistema deve enviar confirmação automática por WhatsApp quando um agendamento for criado (se habilitado).

### RN-AGE-004: Lembretes Automáticos
**Descrição:** Lembretes devem ser enviados automaticamente:
- 24 horas antes do agendamento
- 2 horas antes do agendamento (opcional)
- Se o cliente não confirmar, enviar novo lembrete 4 horas antes

### RN-AGE-005: Cancelamento e Reagendamento
**Descrição:** 
- Clientes podem cancelar até 2 horas antes sem penalidade
- Cancelamentos com menos de 2 horas podem gerar taxa (configurável)
- Reagendamento mantém histórico do agendamento original

### RN-AGE-006: Bloqueio de Horários
**Descrição:** Profissionais e administradores podem bloquear horários por:
- Período específico (data/hora início e fim)
- Dia inteiro
- Recorrência (semanal, mensal)

### RN-AGE-007: Lista de Espera
**Descrição:**
- Cliente entra na lista de espera quando não há vagas no período desejado
- Prioridade baseada na data de entrada na lista
- Notificação automática quando houver desistência
- Conversão em agendamento mantém posição na fila

### RN-AGE-008: Vínculo com Clientes (CRM)
**Descrição:** Todo agendamento deve estar vinculado a um cliente do CRM. Se o cliente não existir, deve ser criado automaticamente.

```typescript
// Vínculo CRM
async function linkToCRM(appointmentData: AppointmentData): Promise<Client> {
  let client = await findClientByPhone(appointmentData.phone);
  
  if (!client) {
    client = await createClient({
      name: appointmentData.clientName,
      phone: appointmentData.phone,
      email: appointmentData.email,
      source: 'appointment'
    });
  }
  
  // Registrar histórico de atendimento
  await addServiceHistory(client.id, {
    service: appointmentData.serviceName,
    date: appointmentData.date,
    professional: appointmentData.professionalName,
    value: appointmentData.price
  });
  
  return client;
}
```

### RN-AGE-009: Histórico de Atendimentos
**Descrição:** Manter histórico completo de atendimentos por cliente, incluindo:
- Serviços realizados
- Profissionais que atenderam
- Frequência de visitas
- Valor gasto total

### RN-AGE-010: Agendamento Online Público
**Descrição:**
- Página pública deve ser acessível via link único
- Deve exibir apenas serviços marcados como "disponível online"
- Horários devem refletir disponibilidade em tempo real
- Confirmação enviada por WhatsApp e email

### RN-AGE-011: Gestão de Profissionais
**Descrição:**
- Cada profissional pode ter horários de trabalho específicos
- Profissional pode estar vinculado a serviços específicos
- Cor única por profissional no calendário
- Limite de agendamentos simultâneos por profissional (default: 1)

### RN-AGE-012: Integração MEL (Lembretes)
**Descrição:** Utilizar o Módulo de Engajamento e Lembretes (MEL) para:
- Envio de confirmações
- Lembretes automáticos
- Solicitação de avaliação pós-atendimento
- Recuperação de clientes inativos

---

## 8. Integrações

### 8.1 Integração com Módulo MEL (Lembretes)

```typescript
// services/appointmentReminders.ts
export async function scheduleAppointmentReminders(appointment: Appointment) {
  const reminderService = new MELReminderService();
  
  // Lembrete 24h antes
  await reminderService.schedule({
    type: 'appointment_reminder',
    targetId: appointment.id,
    channel: 'whatsapp',
    scheduledAt: subHours(appointment.startTime, 24),
    template: 'appointment_reminder_24h',
    variables: {
      clientName: appointment.clientName,
      serviceName: appointment.serviceName,
      date: format(appointment.startTime, "dd/MM/yyyy"),
      time: format(appointment.startTime, "HH:mm"),
      professional: appointment.professionalName
    }
  });
  
  // Lembrete 2h antes
  await reminderService.schedule({
    type: 'appointment_reminder',
    targetId: appointment.id,
    channel: 'whatsapp',
    scheduledAt: subHours(appointment.startTime, 2),
    template: 'appointment_reminder_2h',
    variables: {
      clientName: appointment.clientName,
      serviceName: appointment.serviceName,
      time: format(appointment.startTime, "HH:mm")
    }
  });
}
```

### 8.2 Integração com Módulo CRM

```typescript
// services/appointmentCRM.ts
export async function syncAppointmentWithCRM(appointment: Appointment) {
  // Buscar ou criar cliente
  const client = await crmService.upsertClient({
    name: appointment.clientName,
    phone: appointment.phone,
    email: appointment.email,
    source: 'appointment_booking'
  });
  
  // Registrar interação
  await crmService.addInteraction(client.id, {
    type: 'appointment_scheduled',
    date: new Date(),
    details: {
      appointmentId: appointment.id,
      service: appointment.serviceName,
      value: appointment.price,
      professional: appointment.professionalName
    }
  });
  
  // Atualizar histórico de serviços
  await crmService.updateServiceHistory(client.id, {
    service: appointment.serviceName,
    date: appointment.startTime,
    value: appointment.price,
    professional: appointment.professionalName
  });
}
```

---

## 9. Checklist de Implementação

### ✅ Componentes Core
- [ ] `CalendarWeekView` - Visualização semanal com drag-and-drop
- [ ] `CalendarDayView` - Visualização diária detalhada
- [ ] `CalendarMonthView` - Visualização mensal
- [ ] `MiniCalendar` - Calendário compacto para sidebar
- [ ] `NewAppointmentModal` - Modal de novo agendamento (3 passos)
- [ ] `AppointmentDetailsModal` - Detalhes e ações do agendamento
- [ ] `PublicBookingPage` - Página pública de agendamento
- [ ] `ConfigPage` - Configurações da agenda (5 tabs)
- [ ] `WaitlistPage` - Lista de espera

### ✅ Estados
- [ ] Loading states para todas as visualizações
- [ ] Empty states quando não há agendamentos
- [ ] Error states com retry
- [ ] Skeleton screens para carregamento

### ✅ Funcionalidades
- [ ] Criar/editar/cancelar agendamentos
- [ ] Drag-and-drop para reagendamento
- [ ] Filtro por profissionais
- [ ] Busca de clientes em tempo real
- [ ] Seleção de horários disponíveis
- [ ] Bloqueio de horários
- [ ] Lista de espera com prioridade
- [ ] Notificações automáticas
- [ ] Histórico de atendimentos

### ✅ Integrações
- [ ] Integração com MEL para lembretes
- [ ] Integração com CRM para clientes
- [ ] Integração com WhatsApp API
- [ ] Google Calendar sync (opcional)

### ✅ Responsividade
- [ ] Desktop: Layout completo com sidebar
- [ ] Tablet: Layout adaptativo
- [ ] Mobile: Visualização simplificada, lista de agendamentos

### ✅ Acessibilidade
- [ ] Navegação por teclado no calendário
- [ ] ARIA labels em todos os elementos interativos
- [ ] Contraste adequado das cores
- [ ] Suporte a screen readers

### ✅ Testes
- [ ] Unit tests para funções de data/horário
- [ ] Integration tests para fluxo de agendamento
- [ ] E2E tests para página pública
- [ ] Testes de responsividade

---

## 10. Anexos

### 10.1 URLs das Telas

| Tela | Rota | Acesso |
|------|------|--------|
| Calendário | `/agendamentos` | Admin |
| Novo Agendamento | `/agendamentos?modal=new` | Admin |
| Configurações | `/agendamentos/configuracoes` | Admin |
| Lista de Espera | `/agendamentos/lista-espera` | Admin |
| Agendamento Público | `/agendar/[businessSlug]` | Público |

### 10.2 Cores de Status

```typescript
const statusColors = {
  pending: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-400' },
  confirmed: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-400' },
  completed: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-400' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-400' },
  'no-show': { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-400' },
  blocked: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-400' },
  waiting: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-400' }
};
```

### 10.3 Profissionais - Cores Padrão

```typescript
const professionalColors = [
  '#86cb92', // Emerald
  '#3b82f6', // Blue
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#f97316', // Orange
  '#10b981', // Green
];
```

---

**Documento Versionado**
- Criado em: 2026-03-12
- Última atualização: 2026-03-12
- Versão: 1.0.0
- Autor: Frontend Team UNIQ
