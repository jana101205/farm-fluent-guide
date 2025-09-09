import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TestTube, 
  Bug, 
  Mic, 
  Sun, 
  TrendingUp, 
  ScrollText,
  Bell,
  Settings,
  MapPin
} from "lucide-react";

interface DashboardProps {
  onNavigate: (page: string) => void;
  language: string;
}

const features = [
  { id: "soil", icon: TestTube, title: "Soil Scan", description: "Analyze soil type", color: "bg-amber-500" },
  { id: "pest", icon: Bug, title: "Pest Scan", description: "Detect crop diseases", color: "bg-red-500" },
  { id: "advisor", icon: Mic, title: "Ask Advisor", description: "Voice assistance", color: "bg-blue-500" },
  { id: "weather", icon: Sun, title: "Weather", description: "7-day forecast", color: "bg-orange-500" },
  { id: "market", icon: TrendingUp, title: "Market Prices", description: "Latest mandi rates", color: "bg-green-500" },
  { id: "history", icon: ScrollText, title: "History", description: "Past advisories", color: "bg-purple-500" },
];

export function Dashboard({ onNavigate, language }: DashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 pb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span className="text-sm opacity-90">Rajkot, Gujarat</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
              onClick={() => onNavigate("settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <h1 className="text-2xl font-bold">Good Morning, Ramesh!</h1>
        <p className="text-white/90">Ready to grow your crops smarter?</p>
      </div>

      {/* Alert Banner */}
      <div className="mx-6 -mt-4 mb-6">
        <Card className="bg-warning/10 border-warning/20">
          <CardContent className="p-4 flex items-center space-x-3">
            <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium">Weather Alert</p>
              <p className="text-xs text-muted-foreground">Heavy rain expected tomorrow - avoid spraying</p>
            </div>
            <Badge variant="outline" className="text-xs">Active</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4">Smart Farming Tools</h2>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="cursor-pointer hover:shadow-medium transition-smooth transform hover:scale-105 active:scale-95"
                onClick={() => onNavigate(feature.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 pb-6">
        <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">23</div>
              <div className="text-xs text-muted-foreground">Scans Done</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">₹45</div>
              <div className="text-xs text-muted-foreground">Avg Price</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">85%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}