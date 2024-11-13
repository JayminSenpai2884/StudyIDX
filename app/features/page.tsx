import { Card } from "@/components/ui/card";
import {
  Brain,
  FileText,
  Upload,
  Youtube,
  Zap,
  Users,
  BarChart,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Multi-Format Content Input",
    description:
      "Upload documents, paste text, or input YouTube video links. Support for PDF, DOCX, and more.",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI-Powered Analysis",
    description:
      "Advanced content analysis using Google's Gemini AI to extract key concepts and generate study materials.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Instant Study Materials",
    description:
      "Get comprehensive summaries, key points, important terms, and study questions in seconds.",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Collaborative Learning",
    description:
      "Share study materials with peers and engage in group study sessions.",
  },
  {
    icon: <BarChart className="h-8 w-8" />,
    title: "Progress Tracking",
    description:
      "Monitor your learning progress and get insights into your study patterns.",
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Personalized Learning",
    description:
      "Adaptive study recommendations based on your learning style and progress.",
  },
];

export default function Features() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted pt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Features
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how StudyGenius transforms your learning experience with
            powerful AI-driven features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-lg transition-shadow border-muted"
            >
              <div className="space-y-4">
                <div className="text-primary">{feature.icon}</div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}