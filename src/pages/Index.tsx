import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { CollectionRateChart } from "@/components/dashboard/charts/CollectionRateChart";
import { RegionPerformanceChart } from "@/components/dashboard/charts/RegionPerformanceChart";
import { ProductContributionChart } from "@/components/dashboard/charts/ProductContributionChart";
import { PaymentMechanismChart } from "@/components/dashboard/charts/PaymentMechanismChart";
import { ConcerningCasesChart } from "@/components/dashboard/charts/ConcerningCasesChart";
import { ChannelPerformanceChart } from "@/components/dashboard/charts/ChannelPerformanceChart";
import { kpiOverview } from "@/data/mockData";
import { 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Users, 
  CreditCard,
  Target,
  Activity,
  PieChart
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-dashboard-bg">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        
        {/* KPI Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Policies"
            value={kpiOverview.totalPolicies.toLocaleString()}
            subtitle="Active policies in portfolio"
            icon={Users}
            variant="primary"
            trend={{ value: 2.4, label: "vs last month", isPositive: true }}
          />
          <KPICard
            title="Collection Rate"
            value={`${kpiOverview.collectionRate}%`}
            subtitle="Overall efficiency"
            icon={TrendingUp}
            variant="teal"
            trend={{ value: 1.2, label: "vs last month", isPositive: true }}
          />
          <KPICard
            title="Total Collections"
            value={`₹${(kpiOverview.totalCollections / 1000000).toFixed(1)}M`}
            subtitle="Current month collections"
            icon={DollarSign}
            variant="accent"
            trend={{ value: 3.8, label: "vs last month", isPositive: true }}
          />
          <KPICard
            title="Concerning Cases"
            value={kpiOverview.concerningPolicies}
            subtitle="High risk policies"
            icon={AlertTriangle}
            variant="secondary"
            trend={{ value: -8.5, label: "vs last month", isPositive: true }}
          />
        </div>

        {/* Secondary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Premium Leakage"
            value={`₹${(kpiOverview.premiumLeakage / 1000000).toFixed(1)}M`}
            subtitle="Uncollected premiums"
            icon={Target}
            variant="default"
          />
          <KPICard
            title="Surrender Propensity"
            value={`${kpiOverview.surrenderPropensity}%`}
            subtitle="Policy exit rate"
            icon={Activity}
            variant="default"
          />
          <KPICard
            title="Payment Methods"
            value="6"
            subtitle="Active mechanisms"
            icon={CreditCard}
            variant="default"
          />
          <KPICard
            title="Product Portfolio"
            value="5"
            subtitle="Active product lines"
            icon={PieChart}
            variant="default"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CollectionRateChart />
          <RegionPerformanceChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ProductContributionChart />
          <PaymentMechanismChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ConcerningCasesChart />
          <ChannelPerformanceChart />
        </div>

        {/* Bottom Analytics Section */}
        <div className="mt-12 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            📊 Key Insights & Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-medium text-primary mb-2">🚨 Immediate Actions</h3>
              <p className="text-sm text-muted-foreground">
                342 concerning cases requiring immediate attention. Focus on policies with claims/withdrawals but zero collections.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-medium text-teal mb-2">💰 Revenue Opportunity</h3>
              <p className="text-sm text-muted-foreground">
                ₹5.8M premium leakage identified. Auto Debit shows highest success rate at 94.7%.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-medium text-accent mb-2">🎯 Performance Leaders</h3>
              <p className="text-sm text-muted-foreground">
                North region leads with 94.2% collection rate. Direct Sales channel shows strongest performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
