"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Brain, Chrome } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Brain className="h-12 w-12 text-primary" />
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-center mb-8">
            Sign in to continue your learning journey
          </p>

          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          >
            <Chrome className="h-5 w-5" />
            Continue with Google
          </Button>

          <p className="text-sm text-muted-foreground text-center mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </Card>
      </motion.div>
    </div>
  );
}