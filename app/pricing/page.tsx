"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const plans = [
  {
    name: "Free",
    price: "0",
    features: [
      "10 AI study sessions",
      "Basic summaries",
      "Text-only input",
      "Community support",
    ],
    priceId: "",
  },
  {
    name: "Pro",
    price: "9.99",
    features: [
      "Unlimited AI study sessions",
      "Advanced summaries",
      "Document & video input",
      "Priority support",
      "Custom study plans",
      "Progress tracking",
    ],
    priceId: "price_xyz123", // Replace with actual Stripe price ID
  },
];

export default function Pricing() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubscribe = async (priceId: string) => {
    if (!session) {
      window.location.href = "/login";
      return;
    }

    setLoading(priceId);
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that best fits your needs. All plans include our core
            features.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className="p-8 hover:shadow-lg transition-shadow relative overflow-hidden"
            >
              {plan.name === "Pro" && (
                <div className="absolute top-4 right-4">
                  <div className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Popular
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.name === "Pro" ? "default" : "outline"}
                onClick={() => plan.priceId && handleSubscribe(plan.priceId)}
                disabled={loading === plan.priceId}
              >
                {loading === plan.priceId
                  ? "Processing..."
                  : plan.name === "Free"
                  ? "Get Started"
                  : "Subscribe Now"}
              </Button>
            </Card>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need more study sessions?</h2>
          <p className="text-muted-foreground mb-6">
            Watch a short ad to get 2 additional free study sessions
          </p>
          <Button variant="outline" className="rounded-full">
            Watch Ad
          </Button>
        </div>
      </div>
    </div>
  );
}