"use client";

import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Features", href: "/features" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl">
      <div className="backdrop-blur-lg bg-background/80 border rounded-full px-4 py-2 shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="font-semibold">StudyGenius</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant={pathname === item.href ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "rounded-full",
                  pathname === item.href && "bg-muted"
                )}
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              Sign In
            </Button>
            <Button size="sm" className="rounded-full">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}