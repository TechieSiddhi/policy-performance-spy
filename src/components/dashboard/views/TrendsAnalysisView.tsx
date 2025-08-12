import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
  ReferenceLine
} from 'recharts';
import { ChartCard } from "../ChartCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  Target,
  AlertTriangle,
  Zap,
  Activity
} from "lucide-react";
import { monthlyTrends } from "@/data/mockData";

// Extended historical data with forecasting
const extendedTrendsData = [
  ...monthlyTrends.map(item => ({ ...item, forecast: false })),
  // Forecasted data
  { month: "SEP-25", policies: 13100, collectionRate: 91.8, collections: 60200000, forecast: true },
  { month: "OCT-25", policies: 13350, collectionRate: 92.2, collections: 61800000, forecast: true },
  { month: "NOV-25", policies: 13500, collectionRate: 92.0, collections: 62500000, forecast: true },
  { month: "DEC-25", policies: 13800, collectionRate: 91.5, collections: 63200000, forecast: true }
];

// Seasonal pattern analysis
const seasonalData = [
  { period: "Q1", avgCollectionRate: 89.2, volatility: 2.1, trend: "stable" },
  { period: "Q2", avgCollectionRate: 89.9, volatility: 1.8, trend: "improving" },
  { period: "Q3", avgCollectionRate: 91.0, volatility: 1.5, trend: "strong" },
  { period: "Q4", avgCollectionRate: 88.5, volatility: 2.8, trend: "volatile" }
];

// Key performance indicators trends
const kpiTrends = [
  {
    metric: "Collection Rate",
    current: 91.1,
    trend: 2.3,
    forecast: 92.0,
    target: 95.0,
    status: "improving"
  },
  {
    metric: "Policy Growth",
    current: 2847,
    trend: 8.2,
    forecast: 3200,
    target: 4000,
    status: "on-track"
  },
  {
    metric: "Premium Volume",
    current: 58.4,
    trend: 5.8,
    forecast: 62.5,
    target: 70.0,
    status: "behind"
  },
  {
    metric: "Risk Score",
    current: 24.2,
    trend: -12.1,
    forecast: 20.5,
    target: 15.0,
    status: "improving"
  }
];

export function TrendsAnalysisView() {
  const [selectedMetric, setSelectedMetric] = useState<string>("collectionRate");
  const [forecastEnabled, setForecastEnabled] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "improving":
      case "strong":
      case "on-track":
        return "text-teal bg-teal/10";
      case "stable":
        return "text-accent bg-accent/10";
      case "behind":
      case "volatile":
        return "text-destructive bg-destructive/10";
      default:
        return "text-muted-foreground bg-muted/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "improving":
      case "strong":
      case "on-track":
        return <TrendingUp className="w-4 h-4" />;
      case "behind":
      case "volatile":
        return <TrendingDown className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trends & Forecasting Dashboard</h2>
          <p className="text-muted-foreground">
            Historical analysis with AI-powered forecasting and seasonal insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={forecastEnabled ? "default" : "outline"}
            onClick={() => setForecastEnabled(!forecastEnabled)}
            size="sm"
          >
            <Zap className="w-4 h-4 mr-1" />
            {forecastEnabled ? "Hide" : "Show"} Forecast
          </Button>
        </div>
      </div>

      {/* KPI Trends Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiTrends.map((kpi, index) => (
          <Card key={kpi.metric}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>{kpi.metric}</span>
                <Badge className={getStatusColor(kpi.status)}>
                  {getStatusIcon(kpi.status)}
                  {kpi.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">
                  {kpi.metric.includes("Rate") ? `${kpi.current}%` : 
                   kpi.metric.includes("Volume") ? `₹${kpi.current}M` : 
                   kpi.current.toLocaleString()}
                </div>
                <div className="flex items-center gap-1">
                  {kpi.trend > 0 ? (
                    <TrendingUp className="w-3 h-3 text-teal" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-destructive" />
                  )}
                  <span className={`text-xs ${kpi.trend > 0 ? 'text-teal' : 'text-destructive'}`}>
                    {kpi.trend > 0 ? '+' : ''}{kpi.trend}%
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Target: {kpi.metric.includes("Rate") ? `${kpi.target}%` : 
                          kpi.metric.includes("Volume") ? `₹${kpi.target}M` : 
                          kpi.target.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Historical Trends with Forecast */}
      <ChartCard 
        title="Collection Rate Trends & Forecast" 
        description="Historical performance with AI-powered 4-month forecast"
        variant="primary"
      >
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={extendedTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[86, 94]}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name, props) => {
                  const isForecast = props.payload?.forecast;
                  if (name === 'collectionRate') {
                    return [`${value}%${isForecast ? ' (Forecast)' : ''}`, 'Collection Rate'];
                  }
                  if (name === 'policies') {
                    return [Number(value).toLocaleString(), 'Total Policies'];
                  }
                  return [value, name];
                }}
              />
              
              {/* Historical data */}
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="collectionRate"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.1}
                strokeWidth={3}
                data={extendedTrendsData.filter(d => !d.forecast)}
              />
              
              {/* Forecast data */}
              {forecastEnabled && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="collectionRate"
                  stroke="hsl(var(--accent))"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2, r: 4 }}
                  data={extendedTrendsData.filter(d => d.forecast)}
                />
              )}

              <Bar 
                yAxisId="right" 
                dataKey="policies" 
                fill="hsl(var(--secondary))" 
                opacity={0.3}
                radius={[2, 2, 0, 0]}
              />

              {/* Target line */}
              <ReferenceLine 
                yAxisId="left" 
                y={95} 
                stroke="hsl(var(--teal))" 
                strokeDasharray="3 3" 
                label={{ value: "Target: 95%", position: "top" }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Seasonal Analysis & Revenue Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seasonal Patterns */}
        <ChartCard 
          title="Seasonal Performance Patterns" 
          description="Quarterly trends showing seasonal variations"
          variant="secondary"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={seasonalData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
                <XAxis 
                  dataKey="period" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => {
                    if (name === 'avgCollectionRate') return [`${value}%`, 'Avg Collection Rate'];
                    if (name === 'volatility') return [`${value}%`, 'Volatility'];
                    return [value, name];
                  }}
                />
                <Bar 
                  yAxisId="left" 
                  dataKey="avgCollectionRate" 
                  fill="hsl(var(--primary))" 
                  opacity={0.8}
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="volatility" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Revenue Growth Trajectory */}
        <ChartCard 
          title="Revenue Growth Trajectory" 
          description="Monthly collections with growth trend analysis"
          variant="secondary"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={extendedTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name, props) => {
                    const isForecast = props.payload?.forecast;
                    return [`₹${(Number(value) / 1000000).toFixed(1)}M${isForecast ? ' (Forecast)' : ''}`, 'Collections'];
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="collections"
                  stroke="hsl(var(--teal))"
                  fill="hsl(var(--teal))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Key Insights & Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Predictive Insights & Strategic Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal" />
                Opportunities
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-teal/10 border border-teal/20 rounded-lg">
                  <div className="font-medium text-teal mb-1">Q3 Peak Performance</div>
                  <div className="text-sm text-muted-foreground">
                    Collection rates consistently peak in Q3. Optimize resource allocation during Jul-Sep.
                  </div>
                </div>
                <div className="p-3 bg-teal/10 border border-teal/20 rounded-lg">
                  <div className="font-medium text-teal mb-1">Growth Acceleration</div>
                  <div className="text-sm text-muted-foreground">
                    Policy acquisition trending 8.2% YoY. Target 15% growth with enhanced digital channels.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-destructive" />
                Risk Factors
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="font-medium text-destructive mb-1">Q4 Volatility</div>
                  <div className="text-sm text-muted-foreground">
                    Historical 2.8% volatility in Q4. Implement proactive retention strategies.
                  </div>
                </div>
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="font-medium text-destructive mb-1">Collection Gap</div>
                  <div className="text-sm text-muted-foreground">
                    Current 91.1% vs 95% target. Need 4% improvement to meet annual goals.
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Action Items
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="font-medium text-primary mb-1">AI-Powered Collections</div>
                  <div className="text-sm text-muted-foreground">
                    Deploy predictive models to identify at-risk policies 30 days in advance.
                  </div>
                </div>
                <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <div className="font-medium text-primary mb-1">Seasonal Strategies</div>
                  <div className="text-sm text-muted-foreground">
                    Develop Q4-specific retention programs targeting high-value policies.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <div className="flex gap-2 flex-wrap">
              <Button className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Strategic Review
              </Button>
              <Button variant="outline">
                Export Trend Report
              </Button>
              <Button variant="outline">
                Set Forecast Alerts
              </Button>
              <Button variant="outline">
                <BarChart3 className="w-4 h-4 mr-1" />
                Advanced Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}