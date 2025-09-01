import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Area,
  AreaChart
} from "recharts";
import { Building, TrendingUp, Users, DollarSign, Target } from "lucide-react";

// Mock branch data
const branchData = [
  {
    branchCode: "BR001",
    branchName: "Delhi Central",
    region: "North",
    policies: 450,
    collections: 2250000,
    collectionRate: 96.8,
    productivity: 5000,
    growth: 8.5,
    riskScore: 15,
    manager: "Rajesh Kumar",
    size: "Large"
  },
  {
    branchCode: "BR002", 
    branchName: "Mumbai West",
    region: "West",
    policies: 520,
    collections: 2860000,
    collectionRate: 94.2,
    productivity: 5500,
    growth: 12.3,
    riskScore: 18,
    manager: "Priya Sharma",
    size: "Large"
  },
  {
    branchCode: "BR003",
    branchName: "Bangalore South",
    region: "South", 
    policies: 380,
    collections: 1900000,
    collectionRate: 92.1,
    productivity: 5000,
    growth: 6.8,
    riskScore: 22,
    manager: "Suresh Reddy",
    size: "Medium"
  },
  {
    branchCode: "BR004",
    branchName: "Chennai Central",
    region: "South",
    policies: 420,
    collections: 2100000,
    collectionRate: 89.7,
    productivity: 4000,
    growth: 3.1,
    riskScore: 28,
    manager: "Amit Roy",
    size: "Large"
  },
  {
    branchCode: "BR005",
    branchName: "Kolkata North",
    region: "East",
    policies: 350,
    collections: 1750000,
    collectionRate: 91.4,
    productivity: 5000,
    growth: 4.2,
    riskScore: 25,
    manager: "Anita Das",
    size: "Medium"
  }
];

// Monthly trends data for selected branch
const monthlyTrendsData = [
  {
    month: "Apr",
    totalDue: 850000,
    totalCollection: 782000,
    forecastedCollection: 795000,
    collectionRate: 92.0,
  },
  {
    month: "May", 
    totalDue: 920000,
    totalCollection: 856400,
    forecastedCollection: 874000,
    collectionRate: 93.1,
  },
  {
    month: "Jun",
    totalDue: 880000,
    totalCollection: 825600,
    forecastedCollection: 845000,
    collectionRate: 93.8,
  },
  {
    month: "Jul",
    totalDue: 950000,
    totalCollection: 893500,
    forecastedCollection: 912000,
    collectionRate: 94.1,
  },
  {
    month: "Aug",
    totalDue: 1020000,
    totalCollection: 969900,
    forecastedCollection: 985000,
    collectionRate: 95.1,
  },
  {
    month: "Sep",
    totalDue: 1100000,
    totalCollection: 1045000,
    forecastedCollection: 1065000,
    collectionRate: 95.0,
  },
  {
    month: "Oct",
    totalDue: 1150000,
    totalCollection: null,
    forecastedCollection: 1104000,
    collectionRate: null,
  },
  {
    month: "Nov",
    totalDue: 1200000,
    totalCollection: null,
    forecastedCollection: 1152000,
    collectionRate: null,
  },
  {
    month: "Dec",
    totalDue: 1180000,
    totalCollection: null,
    forecastedCollection: 1133000,
    collectionRate: null,
  }
];

export function BranchPerformanceView() {
  const [selectedBranch, setSelectedBranch] = useState<string>("BR001");
  const [showPeerComparison, setShowPeerComparison] = useState(false);

  const selectedBranchData = branchData.find(b => b.branchCode === selectedBranch);
  const filteredBranches = branchData;

  // Get peer branch (same region, similar size)
  const peerBranch = branchData.find(b => 
    b.branchCode !== selectedBranch && 
    b.region === selectedBranchData?.region &&
    b.size === selectedBranchData?.size
  ) || branchData.find(b => b.branchCode !== selectedBranch); // fallback to any other branch

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Branch Performance Analysis</h2>
          <p className="text-muted-foreground">Individual branch metrics with productivity and forecasting</p>
        </div>
      </div>

      {/* Branch Selection and KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredBranches.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Branches</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal">
                {(filteredBranches.reduce((sum, b) => sum + b.collectionRate, 0) / filteredBranches.length).toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Avg Collection Rate</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">
                ₹{(filteredBranches.reduce((sum, b) => sum + b.collections, 0) / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Total Collections</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">
                {filteredBranches.reduce((sum, b) => sum + b.policies, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Policies</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Branch Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Branch for Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {branchData.map((branch) => (
              <Button
                key={branch.branchCode}
                variant={selectedBranch === branch.branchCode ? "default" : "outline"}
                className="p-4 h-auto flex flex-col items-start"
                onClick={() => {
                  setSelectedBranch(branch.branchCode);
                  setShowPeerComparison(false);
                }}
              >
                <div className="font-semibold">{branch.branchCode}</div>
                <div className="text-xs opacity-70">{branch.branchName}</div>
                <div className="text-xs opacity-70">{branch.collectionRate}%</div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trends Chart */}
      <ChartCard 
        title="Monthly Collection Trends & Forecast" 
        description="Total Due vs Collections with forecasted performance"
        variant="primary"
      >
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthlyTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value: any, name: string) => {
                  if (name === 'totalDue') return [`₹${(value / 1000).toFixed(0)}K`, 'Total Due'];
                  if (name === 'totalCollection') return [`₹${(value / 1000).toFixed(0)}K`, 'Total Collection'];
                  if (name === 'forecastedCollection') return [`₹${(value / 1000).toFixed(0)}K`, 'Forecasted Collection'];
                  return [value, name];
                }}
              />
              <Bar dataKey="totalDue" fill="hsl(var(--chart-2))" name="totalDue" opacity={0.7} />
              <Bar dataKey="totalCollection" fill="hsl(var(--chart-1))" name="totalCollection" />
              <Line 
                type="monotone" 
                dataKey="forecastedCollection" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={3}
                strokeDasharray="5 5"
                name="forecastedCollection"
                dot={{ fill: 'hsl(var(--chart-3))', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Detailed Branch Information */}
      {selectedBranchData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              {selectedBranchData.branchName} - Detailed Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary">
                  {selectedBranchData.policies.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Policies</div>
              </div>
              
              <div className="text-center p-4 bg-teal/5 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-5 h-5 text-teal" />
                </div>
                <div className="text-2xl font-bold text-teal">
                  {selectedBranchData.collectionRate}%
                </div>
                <div className="text-sm text-muted-foreground">Collection Rate</div>
              </div>
              
              <div className="text-center p-4 bg-accent/5 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent">
                  ₹{(selectedBranchData.collections / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-muted-foreground">Collections</div>
              </div>
              
              <div className="text-center p-4 bg-secondary/5 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Target className="w-5 h-5 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-secondary">
                  {selectedBranchData.productivity.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Productivity Score</div>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <Button 
                onClick={() => setShowPeerComparison(!showPeerComparison)}
                variant={showPeerComparison ? "default" : "outline"}
              >
                Compare with Peers
              </Button>
            </div>
            
            {showPeerComparison && peerBranch && (
              <div className="mt-4 p-4 bg-muted/20 rounded-lg">
                <h4 className="font-semibold text-foreground mb-3">Branch vs Peer Comparison</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Branch:</span>
                      <span className="font-medium">{selectedBranchData.branchName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Policies:</span>
                      <span className="font-medium">{selectedBranchData.policies.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Collection Rate:</span>
                      <span className="font-medium text-primary">{selectedBranchData.collectionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Common Products:</span>
                      <span className="font-medium">Term Life, ULIP, Endowment</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Peer Branch:</span>
                      <span className="font-medium">{peerBranch.branchName} ({peerBranch.branchCode})</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Policies:</span>
                      <span className="font-medium">{peerBranch.policies.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Collection Rate:</span>
                      <span className="font-medium text-teal">{peerBranch.collectionRate}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Common Products:</span>
                      <span className="font-medium">Term Life, ULIP, Endowment</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Performance Gap:</span>
                      <span className={`font-medium ${(peerBranch.collectionRate - selectedBranchData.collectionRate) > 0 ? 'text-accent' : 'text-teal'}`}>
                        {(peerBranch.collectionRate - selectedBranchData.collectionRate) > 0 ? '+' : ''}{(peerBranch.collectionRate - selectedBranchData.collectionRate).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Policy Volume Gap:</span>
                      <span className={`font-medium ${(peerBranch.policies - selectedBranchData.policies) > 0 ? 'text-accent' : 'text-teal'}`}>
                        {(peerBranch.policies - selectedBranchData.policies) > 0 ? '+' : ''}{(peerBranch.policies - selectedBranchData.policies)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Opportunity:</span>
                      <span className="font-medium text-primary">
                        ₹{(((peerBranch.collectionRate - selectedBranchData.collectionRate) / 100) * selectedBranchData.collections / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Potential additional collection if performance matches peer
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-foreground mb-2">Branch Details</div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manager:</span>
                    <span>{selectedBranchData.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span>{selectedBranchData.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Branch Size:</span>
                    <span>{selectedBranchData.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Growth Rate:</span>
                    <span className={selectedBranchData.growth > 0 ? "text-teal" : "text-accent"}>
                      {selectedBranchData.growth > 0 ? "+" : ""}{selectedBranchData.growth}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="font-medium text-foreground mb-2">Performance Insights</div>
                <div className="space-y-1 text-xs">
                  <div className="p-2 bg-primary/5 rounded">
                    <span className="font-medium">Risk Assessment:</span> {selectedBranchData.riskScore < 20 ? "Low Risk" : selectedBranchData.riskScore < 30 ? "Medium Risk" : "High Risk"}
                  </div>
                  <div className="p-2 bg-teal/5 rounded">
                    <span className="font-medium">Performance:</span> {selectedBranchData.collectionRate > 95 ? "Excellent" : selectedBranchData.collectionRate > 90 ? "Good" : "Needs Improvement"}
                  </div>
                  <div className="p-2 bg-accent/5 rounded">
                    <span className="font-medium">Trend:</span> {selectedBranchData.growth > 5 ? "Growing" : selectedBranchData.growth > 0 ? "Stable" : "Declining"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}