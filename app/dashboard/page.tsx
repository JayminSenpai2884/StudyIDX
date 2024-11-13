"use client";

import { useState } from "react";
import { ContentInput } from "@/components/study/ContentInput";
import { SummaryDisplay } from "@/components/study/SummaryDisplay";
import { Card } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [summary, setSummary] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-24">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-8"
        >
          <Brain className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Study Dashboard</h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <ContentInput onSummaryGenerated={setSummary} />
            {summary && <SummaryDisplay summary={summary} />}
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="p-6 border-muted">
                <h3 className="text-lg font-semibold mb-4">Recent Studies</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Your recent study materials will appear here
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="p-6 border-muted">
                <h3 className="text-lg font-semibold mb-4">Study Progress</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Track your learning progress and achievements
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}