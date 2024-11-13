import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, FileText, Upload, Youtube, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Brain className="h-16 w-16 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/50">
            StudyGenius
          </h1>
          <p className="text-xl text-muted-foreground">
            Transform your learning experience with AI-powered study tools
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="rounded-full gap-2 group" asChild>
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full" asChild>
              <Link href="/features">Learn More</Link>
            </Button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<FileText className="h-8 w-8" />}
            title="Multi-Format Input"
            description="Upload documents, paste text, or import content from various sources"
          />
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="AI-Powered Analysis"
            description="Get intelligent summaries and key concepts extracted from your content"
          />
          <FeatureCard
            icon={<Upload className="h-8 w-8" />}
            title="Study Materials"
            description="Generate comprehensive study aids, flashcards, and practice questions"
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-muted">
      <div className="space-y-4">
        <div className="text-primary">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
}