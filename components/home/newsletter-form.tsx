"use client";

import { useState, FormEvent } from "react";
import { Mail, Check, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus("loading");
    setErrorMessage("");

    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to subscribe. Please try again.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stay Updated on AI Tools for HR
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get weekly insights on the latest AI tools, buyer guides, and exclusive
              recommendations delivered to your inbox.
            </p>
          </div>

          {status === "success" ? (
            <Alert className="bg-green-50 border-green-200 max-w-2xl mx-auto">
              <Check className="w-5 h-5 text-green-600" />
              <AlertDescription className="text-green-800 ml-2">
                <strong>Success!</strong> Check your email to confirm your subscription.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading"}
                    className="flex-1 h-12 text-base"
                    required
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="h-12 px-8 whitespace-nowrap"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </Button>
                </div>

                {status === "error" && errorMessage && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription className="ml-2">{errorMessage}</AlertDescription>
                  </Alert>
                )}

                <p className="text-sm text-gray-500 text-center">
                  Join 500+ HR leaders. No spam, unsubscribe anytime.
                  {" "}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-700 underline">
                    Read our privacy policy
                  </a>
                  .
                </p>
              </form>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">Weekly</div>
                  <div className="text-sm text-gray-600">New tools & insights every week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">Curated</div>
                  <div className="text-sm text-gray-600">Hand-picked tools for mid-market</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-2">Exclusive</div>
                  <div className="text-sm text-gray-600">Early access to new features</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
