import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Star, Send, CheckCircle } from "lucide-react";
import { translations } from "@/utils/translations";
import { useToast } from "@/hooks/use-toast";

interface FeedbackProps {
  onBack: () => void;
  language: string;
}

export function Feedback({ onBack, language }: FeedbackProps) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim() || !category) {
      toast({
        title: "Please complete all fields",
        description: "Rating, category, and feedback are required.",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: t.feedback.thankYou,
        description: "Your feedback has been submitted successfully.",
      });
    }, 1000);
  };

  const StarRating = () => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
          className="focus:outline-none transition-colors"
        >
          <Star
            className={`w-8 h-8 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground"
            }`}
          />
        </button>
      ))}
    </div>
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-gradient-primary text-white p-6">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 mr-3">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-semibold">{t.feedback.title}</h1>
          </div>
        </div>

        <div className="p-6 flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{t.feedback.thankYou}</h2>
              <p className="text-muted-foreground mb-6">
                Your feedback helps us improve the farming experience for everyone.
              </p>
              <Button onClick={onBack} className="w-full">
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-primary text-white p-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-white/20 mr-3">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold">{t.feedback.title}</h1>
        </div>
        <p className="text-white/90">{t.feedback.subtitle}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Rating */}
        <Card>
          <CardHeader>
            <CardTitle>{t.feedback.ratingLabel}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <StarRating />
              <p className="text-sm text-muted-foreground text-center">
                {rating === 0 && "Tap stars to rate your experience"}
                {rating === 1 && "Poor - Needs significant improvement"}
                {rating === 2 && "Fair - Some issues to address"}
                {rating === 3 && "Good - Meets expectations"}
                {rating === 4 && "Very Good - Exceeds expectations"}
                {rating === 5 && "Excellent - Outstanding experience"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle>{t.feedback.categoryLabel}</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select feedback category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">{t.feedback.categories.general}</SelectItem>
                <SelectItem value="features">{t.feedback.categories.features}</SelectItem>
                <SelectItem value="bugs">{t.feedback.categories.bugs}</SelectItem>
                <SelectItem value="suggestion">{t.feedback.categories.suggestion}</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Feedback Text */}
        <Card>
          <CardHeader>
            <CardTitle>{t.feedback.feedbackLabel}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="feedback">{t.feedback.feedbackLabel}</Label>
              <Textarea
                id="feedback"
                placeholder={t.feedback.feedbackPlaceholder}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {feedback.length}/500 characters
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Feedback Options */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {[
                "App is very helpful",
                "Need offline support",
                "More crop varieties",
                "Faster analysis",
                "Better UI design",
                "Voice in more languages"
              ].map((item) => (
                <Button
                  key={item}
                  variant="outline"
                  size="sm"
                  onClick={() => setFeedback(prev => prev ? `${prev}, ${item}` : item)}
                  className="text-xs h-auto py-2 px-3 whitespace-normal"
                >
                  + {item}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          size="lg"
          disabled={!feedback.trim() || !category || rating === 0}
        >
          <Send className="w-4 h-4 mr-2" />
          {t.feedback.submitButton}
        </Button>
      </div>
    </div>
  );
}