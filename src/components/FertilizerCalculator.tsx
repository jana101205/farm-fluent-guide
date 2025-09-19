import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Calculator, Beaker } from "lucide-react";
import { translations } from "@/utils/translations";

interface FertilizerCalculatorProps {
  onBack: () => void;
  language: string;
}

export function FertilizerCalculator({ onBack, language }: FertilizerCalculatorProps) {
  const [cropType, setCropType] = useState("");
  const [area, setArea] = useState("");
  const [soilType, setSoilType] = useState("");
  const [results, setResults] = useState<any>(null);
  const t = translations[language as keyof typeof translations] || translations.en;

  const calculateFertilizer = () => {
    if (!cropType || !area || !soilType) return;

    const baseRequirement = {
      wheat: { n: 120, p: 60, k: 40 },
      rice: { n: 100, p: 50, k: 60 },
      maize: { n: 150, p: 75, k: 50 }
    };

    const crop = baseRequirement[cropType as keyof typeof baseRequirement] || baseRequirement.wheat;
    const areaNum = parseFloat(area);

    setResults({
      nitrogen: Math.round(crop.n * areaNum),
      phosphorus: Math.round(crop.p * areaNum),
      potassium: Math.round(crop.k * areaNum),
      urea: Math.round((crop.n * areaNum) / 0.46),
      dap: Math.round((crop.p * areaNum) / 0.46),
      mop: Math.round((crop.k * areaNum) / 0.6)
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lightest to-primary-lighter p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="text-primary">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <Calculator className="w-6 h-6 text-primary" />
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary flex items-center">
              <Beaker className="w-5 h-5 mr-2" />
              {t.fertilizerCalc}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Crop Type</label>
                <Select value={cropType} onValueChange={setCropType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Area (Hectares)</label>
                <Input
                  type="number"
                  placeholder="Enter area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Soil Type</label>
                <Select value={soilType} onValueChange={setSoilType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="loamy">Loamy</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateFertilizer} className="w-full bg-gradient-card text-white">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate
              </Button>
            </div>

            {results && (
              <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                <h3 className="font-bold text-primary mb-3">Fertilizer Requirements</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Nitrogen (N):</span>
                    <span className="font-medium">{results.nitrogen} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phosphorus (P):</span>
                    <span className="font-medium">{results.phosphorus} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Potassium (K):</span>
                    <span className="font-medium">{results.potassium} kg</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-primary font-medium">
                    <span>Urea:</span>
                    <span>{results.urea} kg</span>
                  </div>
                  <div className="flex justify-between text-primary font-medium">
                    <span>DAP:</span>
                    <span>{results.dap} kg</span>
                  </div>
                  <div className="flex justify-between text-primary font-medium">
                    <span>MOP:</span>
                    <span>{results.mop} kg</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}