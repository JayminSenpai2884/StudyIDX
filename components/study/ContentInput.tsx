"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Upload, Youtube, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { generateSummary } from "@/lib/gemini";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ContentInput({
  onSummaryGenerated,
}: {
  onSummaryGenerated: (summary: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("text");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usage, setUsage] = useState<number>(0);
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (session?.user) {
      fetchUsage();
    }
  }, [session]);

  const fetchUsage = async () => {
    try {
      const response = await fetch("/api/usage");
      const data = await response.json();
      setUsage(data?.count || 0);
    } catch (error) {
      console.error("Error fetching usage:", error);
    }
  };

  const handleGenerateSummary = async () => {
    if (!session) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to use this feature",
        variant: "destructive",
      });
      return;
    }

    if (!content) {
      toast({
        title: "Error",
        description: "Please enter some content first",
        variant: "destructive",
      });
      return;
    }

    if (usage >= 10) {
      setShowUpgradeDialog(true);
      return;
    }

    setIsLoading(true);
    try {
      const summary = await generateSummary(content);
      await fetch("/api/usage", { method: "POST" });
      await fetchUsage();
      onSummaryGenerated(summary);
      toast({
        title: "Success",
        description: "Study materials generated successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate study materials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 gap-4 mb-6">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="file" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Document
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Youtube className="h-4 w-4" />
              Video
            </TabsTrigger>
          </TabsList>

          <TabsContent value="text">
            <motion.textarea
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full h-64 p-4 rounded-md border border-input bg-background"
              placeholder="Paste your study material here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </TabsContent>

          <TabsContent value="file">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center"
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">
                Drag and drop your files here, or click to browse
              </p>
              <Input
                type="file"
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setContent(e.target?.result as string);
                    };
                    reader.readAsText(file);
                  }
                }}
              />
              <Button asChild>
                <label htmlFor="file-upload">Choose File</label>
              </Button>
            </motion.div>
          </TabsContent>

          <TabsContent value="video">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <Input
                type="url"
                placeholder="Enter YouTube video URL"
                className="w-full"
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Note: Video transcription will be used for generating study
                materials
              </p>
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 space-y-4">
          {session && usage < 10 && (
            <p className="text-sm text-muted-foreground text-center">
              {10 - usage} free generations remaining
            </p>
          )}
          <Button
            className="w-full"
            onClick={handleGenerateSummary}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Study Materials"}
          </Button>
        </div>
      </Card>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade to Continue</DialogTitle>
            <DialogDescription>
              You've reached your free usage limit. Upgrade to Pro for unlimited
              access or watch an ad for additional free uses.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Watch Ad
            </Button>
            <Button onClick={() => (window.location.href = "/pricing")}>
              Upgrade to Pro
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}