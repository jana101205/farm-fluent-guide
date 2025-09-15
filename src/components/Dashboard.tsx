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
  MapPin,
  Languages
} from "lucide-react";
import { translations } from "@/utils/translations";

interface DashboardProps {
  onNavigate: (page: string) => void;
  language: string;
  onLanguageChange?: (language?: string) => void;
  userProfile?: any;
}

const featureIcons = [
  { id: "soil", icon: TestTube, gradient: "from-amber-400 to-orange-500", shadowColor: "shadow-amber-500/20" },
  { id: "pest", icon: Bug, gradient: "from-red-400 to-pink-500", shadowColor: "shadow-red-500/20" },
  { id: "advisor", icon: Mic, gradient: "from-blue-400 to-cyan-500", shadowColor: "shadow-blue-500/20" },
  { id: "weather", icon: Sun, gradient: "from-orange-400 to-yellow-500", shadowColor: "shadow-orange-500/20" },
  { id: "market", icon: TrendingUp, gradient: "from-green-400 to-emerald-500", shadowColor: "shadow-green-500/20" },
  { id: "history", icon: ScrollText, gradient: "from-purple-400 to-violet-500", shadowColor: "shadow-purple-500/20" },
];

export function Dashboard({ onNavigate, language, onLanguageChange, userProfile }: DashboardProps) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const userName = userProfile?.full_name?.split(' ')[0] || 'Farmer';
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Enhanced Header */}
      <div className="bg-gradient-primary text-white p-6 pb-8 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 backdrop-blur-sm">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{userProfile?.location || t.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 rounded-full transition-smooth hover:scale-105"
              onClick={() => onLanguageChange && onLanguageChange()}
            >
              <Languages className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 rounded-full transition-smooth hover:scale-105"
              onClick={() => onNavigate("settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white hover:bg-white/20 rounded-full transition-smooth hover:scale-105 relative"
              onClick={() => onNavigate("notifications")}
            >
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{t.greeting}, {userName}! 🌟</h1>
          <p className="text-white/90 text-lg font-medium">{t.subtitle}</p>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="mx-6 -mt-4 mb-6 relative">
        <Card className="bg-gradient-to-r from-warning/20 to-orange-500/20 border-warning/30 backdrop-blur-sm shadow-lg">
          <CardContent className="p-5 flex items-center space-x-4">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-bold text-warning-foreground">{t.weatherAlert} ⚡</p>
              <p className="text-xs text-muted-foreground font-medium">{t.weatherAlertText}</p>
            </div>
            <Badge variant="outline" className="text-xs bg-warning/20 border-warning text-warning-foreground font-bold">
              Active
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Features Grid */}
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold mb-6 text-primary">{t.smartFarmingTools} ✨</h2>
        <div className="grid grid-cols-2 gap-5">
          {featureIcons.map((feature) => {
            const IconComponent = feature.icon;
            const featureData = t.features[feature.id as keyof typeof t.features];
            return (
              <Card 
                key={feature.id}
                className="cursor-pointer hover:shadow-lg transition-smooth transform hover:scale-105 active:scale-95 bg-card border backdrop-blur-sm group"
                onClick={() => onNavigate(feature.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto shadow-lg ${feature.shadowColor} transition-smooth`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-2 text-primary">{featureData.title}</h3>
                  <p className="text-xs text-muted-foreground">{featureData.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-6">
        <h2 className="text-2xl font-bold mb-6 text-primary">Recent Activity 📈</h2>
        <div className="space-y-3">
          <Card className="bg-card border shadow-sm">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <TestTube className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Soil analysis completed</p>
                <p className="text-xs text-muted-foreground">Wheat crop recommended • 2 hours ago</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border shadow-sm">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-full flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Weather alert received</p>
                <p className="text-xs text-muted-foreground">Heavy rain forecast tomorrow • 4 hours ago</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border shadow-sm">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Voice consultation used</p>
                <p className="text-xs text-muted-foreground">Pest control advice received • 1 day ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-br from-primary/5 to-accent/10 border-t px-6 py-8 mt-8">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-primary mb-3">Quick Tips 💡</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Check soil moisture before irrigation</li>
              <li>• Monitor weather for spray timing</li>
              <li>• Regular pest monitoring saves crops</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-primary mb-3">Support 🤝</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• 24/7 Expert helpline</li>
              <li>• Community forums</li>
              <li>• Video tutorials</li>
            </ul>
          </div>
        </div>
        <div className="text-center border-t pt-4">
          <p className="text-xs text-muted-foreground">
            SmartCropAdvisor v2.1 • Making farming smarter, one crop at a time
          </p>
        </div>
      </div>
    </div>
  );
}