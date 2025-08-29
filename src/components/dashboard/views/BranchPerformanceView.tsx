import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ScatterChart,
  Scatter,
  Cell
} from 'recharts';
import { ChartCard } from "../ChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building,
  TrendingUp, 
  TrendingDown, 
  Users,
  DollarSign,
  Target,
  Eye,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Enhanced branch performance data
const branchPerformanceData = [
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
    branchName: "Gurgaon",
    region: "North", 
    policies: 380,
    collections: 1900000,
    collectionRate: 95.2,
    productivity: 5000,
    growth: 6.2,
    riskScore: 18,
    manager: "Priya Singh",
    size: "Medium"
  },
  {
    branchCode: "BR021",
    branchName: "Bangalore Tech",
    region: "South",
    policies: 520,
    collections: 2080000,
    collectionRate: 92.4,
    productivity: 4000,
    growth: 4.8,
    riskScore: 22,
    manager: "Suresh Nair",
    size: "Large"
  },
  {
    branchCode: "BR022",
    branchName: "Chennai Port",
    region: "South",
    policies: 410,
    collections: 1640000,
    collectionRate: 88.9,
    productivity: 4000,
    growth: -1.2,
    riskScore: 35,
    manager: "Lakshmi Devi",
    size: "Medium"
  },
  {
    branchCode: "BR041",
    branchName: "Kolkata Commercial",
    region: "East",
    policies: 485,
    collections: 1940000,
    collectionRate: 89.7,
    productivity: 4000,
    growth: 3.1,
    riskScore: 28,
    manager: "Amit Roy",
    size: "Large"
  },
  {
    branchCode: "BR061",
    branchName: "Mumbai Central",
    region: "West",
    policies: 680,
    collections: 3400000,
    collectionRate: 95.1,
    productivity: 5000,
    growth: 12.3,
    riskScore: 12,
    manager: "Neha Sharma",
    size: "Large"
  },
  {
    branchCode: "BR081",
    branchName: "Indore",
    region: "Central",
    policies: 285,
    collections: 1140000,
    collectionRate: 88.4,
    productivity: 4000,
    growth: -2.1,
    riskScore: 42,
    manager: "Vikash Gupta",
    size: "Small"
  }
];

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--secondary))', 
  'hsl(var(--accent))',
  'hsl(var(--teal))',
  'hsl(var(--muted-foreground))'
];

export function BranchPerformanceView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  const filteredBranches = branchPerformanceData.filter(branch =>
    branch.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.branchCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBranchClick = (branchCode: string) => {
    setSelectedBranch(selectedBranch === branchCode ? null : branchCode);
  };

  const selectedBranchData = branchPerformanceData.find(b => b.branchCode === selectedBranch);

  const getRiskColor = (score: number) => {
    if (score <= 20) return "text-teal bg-teal/10";
    if (score <= 35) return "text-accent bg-accent/10";
    return "text-destructive bg-destructive/10";
  };

  const getRiskLabel = (score: number) => {
    if (score <= 20) return "Low Risk";
    if (score <= 35) return "Medium Risk";
    return "High Risk";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Branch Performance Analysis</h2>
          <p className="text-muted-foreground">
            Individual branch metrics with productivity and risk scoring
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search branches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Performance Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                {Math.round(filteredBranches.reduce((sum, b) => sum + b.collectionRate, 0) / filteredBranches.length)}%
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

      {/* Performance vs Risk Scatter Chart */}
      <ChartCard 
        title="Branch Performance vs Risk Matrix" 
        description="Collection rate vs risk score - size indicates policy volume"
        variant="primary"
      >
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                type="number"
                dataKey="riskScore"
                name="Risk Score"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, 50]}
              />
              <YAxis 
                type="number"
                dataKey="collectionRate"
                name="Collection Rate"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[85, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => {
                  if (name === 'Collection Rate') return [`${value}%`, name];
                  if (name === 'Risk Score') return [value, name];
                  return [value, name];
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload[0]) {
                    const data = payload[0].payload;
                    return `${data.branchName} (${data.branchCode})`;
                  }
                  return label;
                }}
              />
              <Scatter 
                data={filteredBranches} 
                fill="hsl(var(--primary))"
              >
                {filteredBranches.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={selectedBranch === entry.branchCode ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}
                    onClick={() => handleBranchClick(entry.branchCode)}
                    style={{ cursor: 'pointer' }}
                    r={Math.sqrt(entry.policies) / 5} // Size based on policies
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Branch Collection Performance Chart */}
      <ChartCard 
        title="Branch Collection Performance Ranking" 
        description="Click on bars to view detailed branch information"
        variant="secondary"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={filteredBranches.sort((a, b) => b.collectionRate - a.collectionRate)} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="branchCode" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[85, 100]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [`${value}%`, 'Collection Rate']}
                labelFormatter={(label) => {
                  const branch = filteredBranches.find(b => b.branchCode === label);
                  return branch ? `${branch.branchName} (${label})` : label;
                }}
              />
              <Bar dataKey="collectionRate" radius={[4, 4, 0, 0]}>
                {filteredBranches.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={selectedBranch === entry.branchCode ? 'hsl(var(--accent))' : COLORS[index % COLORS.length]}
                    onClick={() => handleBranchClick(entry.branchCode)}
                    style={{ cursor: 'pointer' }}
                  />
                ))}
              </Bar>
            </BarChart>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Branch Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Branch Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Code:</span>
                    <span className="font-medium">{selectedBranchData.branchCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Region:</span>
                    <span>{selectedBranchData.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Manager:</span>
                    <span>{selectedBranchData.manager}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <Badge variant="outline">{selectedBranchData.size}</Badge>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Target className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Collection Rate</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {selectedBranchData.collectionRate}%
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-4 h-4 text-teal" />
                      <span className="text-sm font-medium">Collections</span>
                    </div>
                    <div className="text-2xl font-bold text-teal">
                      ₹{(selectedBranchData.collections / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">Policies</span>
                    </div>
                    <div className="text-2xl font-bold text-accent">
                      {selectedBranchData.policies.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk & Growth */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Risk & Growth</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Risk Score</span>
                      <Badge className={getRiskColor(selectedBranchData.riskScore)}>
                        {getRiskLabel(selectedBranchData.riskScore)}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">
                      {selectedBranchData.riskScore}/50
                    </div>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      {selectedBranchData.growth > 0 ? (
                        <TrendingUp className="w-4 h-4 text-teal" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span className="text-sm font-medium">Growth Rate</span>
                    </div>
                    <div className={`text-2xl font-bold ${selectedBranchData.growth > 0 ? 'text-teal' : 'text-destructive'}`}>
                      {selectedBranchData.growth > 0 ? '+' : ''}{selectedBranchData.growth}%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex gap-2 mb-4">
                <Button variant="outline" className="flex items-center gap-2">
                  Compare with Peers
                </Button>
              </div>
              
              {/* Peer Comparison Table */}
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
                      <span className="font-medium">Delhi Central (BR001)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Policies:</span>
                      <span className="font-medium">450</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Collection Rate:</span>
                      <span className="font-medium text-teal">96.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Common Products:</span>
                      <span className="font-medium">Term Life, ULIP, Endowment</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Performance Gap:</span>
                      <span className={`font-medium ${(96.8 - selectedBranchData.collectionRate) > 0 ? 'text-accent' : 'text-teal'}`}>
                        {(96.8 - selectedBranchData.collectionRate) > 0 ? '+' : ''}{(96.8 - selectedBranchData.collectionRate).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Policy Gap:</span>
                      <span className="font-medium">{(450 - selectedBranchData.policies).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Opportunity:</span>
                      <span className="font-medium text-accent">₹{((450 - selectedBranchData.policies) * 5000 / 1000000).toFixed(1)}M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Ranking:</span>
                      <Badge variant="outline">
                        #{branchPerformanceData.sort((a, b) => b.collectionRate - a.collectionRate).findIndex(b => b.branchCode === selectedBranchData.branchCode) + 1} of {branchPerformanceData.length}
                      </Badge>
                    </div>
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