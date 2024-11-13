"use client";

import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

interface SummaryDisplayProps {
  summary: string;
}

export function SummaryDisplay({ summary }: SummaryDisplayProps) {
  // Parse the summary sections
  const sections = summary.split('\n\n').reduce((acc: any, section) => {
    if (section.toLowerCase().includes('summary:')) {
      acc.summary = section.replace(/summary:/i, '').trim();
    } else if (section.toLowerCase().includes('key points:')) {
      acc.keyPoints = section
        .replace(/key points:/i, '')
        .trim()
        .split('\n')
        .filter((point: string) => point.trim());
    } else if (section.toLowerCase().includes('important terms:')) {
      acc.terms = section
        .replace(/important terms:/i, '')
        .trim()
        .split('\n')
        .filter((term: string) => term.trim());
    } else if (section.toLowerCase().includes('study questions:')) {
      acc.questions = section
        .replace(/study questions:/i, '')
        .trim()
        .split('\n')
        .filter((question: string) => question.trim());
    }
    return acc;
  }, {
    summary: '',
    keyPoints: [],
    terms: [],
    questions: [],
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Study Materials</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="summary">
            <AccordionTrigger className="text-lg font-semibold">
              Summary
            </AccordionTrigger>
            <AccordionContent className="prose dark:prose-invert">
              <p className="text-muted-foreground whitespace-pre-wrap">{sections.summary}</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="keyPoints">
            <AccordionTrigger className="text-lg font-semibold">
              Key Points
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                {sections.keyPoints.map((point: string, index: number) => (
                  <li key={index} className="text-muted-foreground">{point}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="terms">
            <AccordionTrigger className="text-lg font-semibold">
              Important Terms
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                {sections.terms.map((term: string, index: number) => (
                  <li key={index} className="text-muted-foreground">{term}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="questions">
            <AccordionTrigger className="text-lg font-semibold">
              Study Questions
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-decimal pl-6 space-y-2">
                {sections.questions.map((question: string, index: number) => (
                  <li key={index} className="text-muted-foreground">{question}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </motion.div>
  );
}