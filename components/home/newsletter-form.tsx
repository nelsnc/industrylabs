"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  return (
    <section className="py-12 md:py-16 border-t">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Stay updated</h2>
          <p className="text-muted-foreground">
            Get weekly insights on AI tools and HR trends
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            aria-label="Email address"
          />
          <Button type="submit" className="sm:w-auto">
            Subscribe
          </Button>
        </form>

        {status === "success" && (
          <p className="text-sm text-green-600">
            Thanks for subscribing! (mock)
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">
            Please enter a valid email address
          </p>
        )}
      </div>
    </section>
  );
}
