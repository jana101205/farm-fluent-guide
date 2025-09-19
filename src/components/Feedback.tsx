import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Star } from "lucide-react";
import { translations } from "@/utils/translations";
import { useToast } from "@/hooks/use-toast";

interface FeedbackProps {
  onBack: () => void;
  language: string;
}

export function Feedback({ onBack, language }: FeedbackProps) {
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const t = translations[language as keyof typeof translations] || translations.en;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Feedback Submitted!",
      description: "Thank you for helping us improve our service.",
      duration: 3000,
    });
    
    setIsSubmitting(false);
    setRating(0);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-lightest to-primary-lighter p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              {t.feedbackTitle}
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              {t.feedbackDesc}
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Rating */}
            <div className="text-center">
              <p className="text-sm font-medium mb-3">Rate your experience</p>
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-all duration-200 hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email (Optional)
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-primary/30 focus:border-primary"
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Your Feedback
                </label>
                <Textarea
                  placeholder="Tell us about your experience, suggestions, or report any issues..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="border-primary/30 focus:border-primary resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="w-full bg-gradient-card text-white hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t.submitFeedback}
                  </>
                )}
              </Button>
            </form>

            {/* Quick Feedback Options */}
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-gray-700 mb-3">Quick feedback:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "App is helpful",
                  "Need more features", 
                  "Easy to use",
                  "Improve accuracy"
                ].map((feedback) => (
                  <Button
                    key={feedback}
                    variant="outline"
                    size="sm"
                    onClick={() => setMessage(message + (message ? "\n" : "") + feedback)}
                    className="text-xs border-primary/30 hover:bg-primary/10"
                  >
                    {feedback}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}