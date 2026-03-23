import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MetricsSection } from "@/components/dashboard/metrics-section";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { ActivitiesList } from "@/components/dashboard/activities-list";
import { QuickModules } from "@/components/dashboard/quick-modules";
import { MELWidget } from "@/components/dashboard/mel-widget";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-uniq-platinum">
      {/* Sidebar */}
      <Sidebar />

      {/* Header */}
      <Header
        pageTitle="Dashboard"
        breadcrumbs={[
          { label: "Início", href: "/dashboard" },
          { label: "Dashboard" },
        ]}
      />

      {/* Main Content */}
      <main className="ml-0 lg:ml-64 pt-16 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
        {/* Metrics */}
        <MetricsSection />

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column (2/3) */}
          <div className="xl:col-span-2 space-y-6">
            <SalesChart />
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-6">
            <ActivitiesList />
            <QuickModules />
            <MELWidget />
          </div>
        </div>
      </main>
    </div>
  );
}
