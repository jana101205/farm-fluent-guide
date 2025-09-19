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
  { id: "soil", icon: TestTube, gradient: "from-primary to-primary-variant", shadowColor: "shadow-primary/20" },
  { id: "pest", icon: Bug, gradient: "from-primary-variant to-primary-light", shadowColor: "shadow-primary/20" },
  { id: "advisor", icon: Mic, gradient: "from-primary-light to-primary-lighter", shadowColor: "shadow-primary/20" },
  { id: "weather", icon: Sun, gradient: "from-primary to-primary-light", shadowColor: "shadow-primary/20" },
  { id: "market", icon: TrendingUp, gradient: "from-primary-variant to-primary-lighter", shadowColor: "shadow-primary/20" },
  { id: "feedback", icon: ScrollText, gradient: "from-primary-light to-primary-lightest", shadowColor: "shadow-primary/20" },
];

export function Dashboard({ onNavigate, language, onLanguageChange, userProfile }: DashboardProps) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const userName = userProfile?.full_name?.split(' ')[0] || 'Farmer';
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lightest via-background to-primary-lighter">
      {/* Modern Header inspired by plant care app */}
      <div className="bg-gradient-card text-white p-6 pb-12 shadow-lg rounded-b-3xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
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
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-bold leading-tight">{t.myPlants}</h1>
          <p className="text-white/90 text-lg font-medium">{t.greeting}, {userName}! 🌱</p>
          <p className="text-white/80 text-base">{t.subtitle}</p>
        </div>
      </div>

      {/* Plant Care Card */}
      <div className="px-6 -mt-8 mb-8 relative">
        <Card className="bg-gradient-to-br from-primary to-primary-variant text-white shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{t.plantCare}</h3>
                <p className="text-white/80 text-sm">Next watering</p>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 border-4 border-white/30 rounded-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xl font-bold">3</div>
                    <div className="text-xs">days</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-white/70 mb-1">Every 3 weeks</div>
                <div className="text-sm font-medium">Fertilizer</div>
              </div>
              <div>
                <div className="text-xs text-white/70 mb-1">Natural light</div>
                <div className="text-sm font-medium">6hrs daily</div>
              </div>
              <div>
                <div className="text-xs text-white/70 mb-1">Temperature</div>
                <div className="text-sm font-medium">18-24°C</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Smart Farming Tools */}
      <div className="px-6 pb-8">
        <h2 className="text-2xl font-bold mb-6 text-primary">{t.smartFarmingTools} ✨</h2>
        <div className="grid grid-cols-2 gap-4">
          {featureIcons.map((feature) => {
            const IconComponent = feature.icon;
            const featureData = t.features[feature.id as keyof typeof t.features];
            return (
              <Card 
                key={feature.id}
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 bg-white/80 backdrop-blur-sm border-0 shadow-lg group overflow-hidden"
                onClick={() => onNavigate(feature.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-md ${feature.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm text-primary mb-1">{featureData.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{featureData.description}</p>
                    </div>
                  </div>
                  <div className="w-full h-1 bg-gradient-to-r from-primary-lighter to-primary-lightest rounded-full opacity-60"></div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-6 pb-8">
        <h2 className="text-xl font-bold mb-4 text-primary">Recent Activity 📈</h2>
        <div className="space-y-3">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-variant rounded-full flex items-center justify-center shadow-sm">
                <TestTube className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">Soil analysis completed</p>
                <p className="text-xs text-muted-foreground">Wheat crop recommended • 2 hours ago</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-variant to-primary-light rounded-full flex items-center justify-center shadow-sm">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">Weather alert received</p>
                <p className="text-xs text-muted-foreground">Heavy rain forecast tomorrow • 4 hours ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modern Footer */}
      <div className="bg-gradient-to-br from-primary-lightest to-white px-6 py-8 rounded-t-3xl mt-8 shadow-2xl">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-bold text-primary mb-3 flex items-center">
              💡 Quick Tips
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Check soil moisture daily</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Monitor weather patterns</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Early pest detection</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-primary mb-3 flex items-center">
              🤝 Support
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>24/7 Expert helpline</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Community forums</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                <span>Video tutorials</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center border-t border-primary/20 pt-4">
          <p className="text-xs text-muted-foreground font-medium">
            🌱 SmartCropAdvisor v2.1 • Making farming smarter, one crop at a time
          </p>
        </div>
      </div>
    </div>
  );
}