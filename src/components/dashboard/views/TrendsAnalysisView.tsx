import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
  AreaChart
} from 'recharts';
import { ChartCard } from '../ChartCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Target
} from "lucide-react";

const forecastData = [
  { month: 'Jan-25', collectionRate: 89.2, rpDue: 45.2, collection: 40.3, forecast: null },
  { month: 'Feb-25', collectionRate: 91.5, rpDue: 47.8, collection: 43.8, forecast: null },
  { month: 'Mar-25', collectionRate: 88.7, rpDue: 44.1, collection: 39.1, forecast: null },
  { month: 'Apr-25', collectionRate: 92.3, rpDue: 48.9, collection: 45.1, forecast: null },
  { month: 'May-25', collectionRate: 90.8, rpDue: 46.5, collection: 42.2, forecast: null },
  { month: 'Jun-25', collectionRate: 93.1, rpDue: 49.7, collection: 46.3, forecast: null },
  { month: 'Jul-25', collectionRate: 91.9, rpDue: 47.2, collection: 43.4, forecast: null },
  { month: 'Aug-25', collectionRate: 92.7, rpDue: 48.3, collection: 44.8, forecast: null },
  { month: 'Sep-25', collectionRate: null, rpDue: 49.1, collection: null, forecast: 45.9 },
  { month: 'Oct-25', collectionRate: null, rpDue: 50.2, collection: null, forecast: 47.3 },
  { month: 'Nov-25', collectionRate: null, rpDue: 51.0, collection: null, forecast: 48.4 },
  { month: 'Dec-25', collectionRate: null, rpDue: 51.8, collection: null, forecast: 49.2 }
];

export function TrendsAnalysisView() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Trends & Forecasting</h2>
        <p className="text-muted-foreground">AI-powered analytics and future performance predictions</p>
      </div>

      {/* Advanced Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Growth Momentum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">+5.8%</div>
            <p className="text-sm text-muted-foreground">Monthly growth rate</p>
            <Badge variant="secondary" className="mt-2">Accelerating</Badge>
          </CardContent>
        </Card>

        <Card className="border-teal/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-teal" />
              Forecast Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal">94.3%</div>
            <p className="text-sm text-muted-foreground">Model precision</p>
            <Badge variant="secondary" className="mt-2">High Confidence</Badge>
          </CardContent>
        </Card>

        <Card className="border-accent/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              Risk Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">Medium</div>
            <p className="text-sm text-muted-foreground">Market volatility</p>
            <Badge variant="secondary" className="mt-2">Monitored</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Collection Rate Trends & Forecast */}
      <ChartCard 
        title="Collection Rate Trends & Forecast" 
        description="Historical performance with AI-powered future predictions"
        variant="primary"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[85, 98]}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
                formatter={(value, name) => [
                  `${value}%`, 
                  name === 'collectionRate' ? 'Collection Rate' : 'Forecast Rate'
                ]}
              />
              <Area
                type="monotone"
                dataKey="collectionRate"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#actualGradient)"
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="hsl(var(--teal))"
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={{ fill: 'hsl(var(--teal))', strokeWidth: 2, r: 4 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Revenue Growth Trajectory */}
      <ChartCard 
        title="Revenue Growth Trajectory" 
        description="Total RP Due vs Collections with forecasted values (₹ Millions)"
        variant="secondary"
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--chart-grid))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
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
                formatter={(value, name) => [
                  `₹${value}M`, 
                  name === 'rpDue' ? 'Total RP Due' : name === 'collection' ? 'Total Collections' : 'Forecasted Collections'
                ]}
              />
              <Bar 
                dataKey="rpDue" 
                fill="hsl(var(--chart-2))" 
                name="rpDue"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="collection" 
                fill="hsl(var(--primary))" 
                name="collection"
                radius={[4, 4, 0, 0]}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="hsl(var(--teal))" 
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={{ fill: 'hsl(var(--teal))', strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Key Insights & Recommendations */}
      <div className="mt-12 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          📊 Predictive Insights & Strategic Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-medium text-teal mb-2">💡 Growth Opportunities</h3>
            <p className="text-sm text-muted-foreground">
              Forecasted collections show 8.5% growth potential. Focus on Q4 retention strategies to maximize revenue.
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-medium text-primary mb-2">📈 Trend Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Collection rate trending upward with 94.3% forecast accuracy. Expected to reach 95% target by Dec.
            </p>
          </div>
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-medium text-accent mb-2">⚡ Action Items</h3>
            <p className="text-sm text-muted-foreground">
              Deploy AI-powered risk models to identify vulnerable policies. Implement proactive outreach programs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}