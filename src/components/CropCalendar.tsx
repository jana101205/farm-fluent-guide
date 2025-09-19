import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Droplets, Sprout, Scissors } from "lucide-react";
import { translations } from "@/utils/translations";

interface CropCalendarProps {
  onBack: () => void;
  language: string;
}

export function CropCalendar({ onBack, language }: CropCalendarProps) {
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const t = translations[language as keyof typeof translations] || translations.en;

  const cropData = {
    wheat: {
      name: "Wheat",
      season: "Rabi",
      duration: "120-150 days",
      activities: [
        { week: 1, activity: "Soil Preparation", icon: Sprout, color: "bg-primary" },
        { week: 2, activity: "Sowing", icon: Sprout, color: "bg-primary-variant" },
        { week: 6, activity: "First Irrigation", icon: Droplets, color: "bg-primary-light" },
        { week: 12, activity: "Fertilizer Application", icon: Sprout, color: "bg-primary-lighter" },
        { week: 18, activity: "Harvest", icon: Scissors, color: "bg-primary" },
      ]
    }
  };

  const crop = cropData[selectedCrop as keyof typeof cropData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lightest to-primary-lighter p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="text-primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <Calendar className="w-6 h-6 text-primary" />
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              {t.cropCalendar}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-card text-white rounded-xl">
                <div>
                  <h3 className="text-lg font-bold">{crop.name}</h3>
                  <p className="text-white/80 text-sm">{crop.season} Season</p>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  {crop.duration}
                </Badge>
              </div>

              <div className="space-y-3">
                {crop.activities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-white/50 rounded-lg">
                    <div className={`w-10 h-10 ${activity.color} rounded-full flex items-center justify-center`}>
                      <activity.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-primary">Week {activity.week}</p>
                      <p className="text-sm text-muted-foreground">{activity.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}