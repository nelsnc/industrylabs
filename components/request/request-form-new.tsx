"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { requestSchema, type RequestFormValues } from "@/lib/validation/request";
import type { RequestApiResponse } from "@/lib/types/request";

const initialValues: RequestFormValues = {
  requesterName: "",
  requesterEmail: "",
  requesterCompany: "",
  companySize: "51-200",
  companyLocation: "UK",
  vertical: "HR & Talent",
  useCase: "",
  budgetRange: undefined,
  timeline: "1-3 months",
  currentTools: "",
  requirements: "",
  complianceNeeds: [],
  gdprConsent: false,
  sourceChannel: "Direct",
  requestSourceUrl: "",
};

export function RequestFormNew() {
  const [values, setValues] = useState<RequestFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof RequestFormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (field: keyof RequestFormValues) => (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const handleSelectChange = (field: keyof RequestFormValues) => (value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setValues((v) => ({ ...v, gdprConsent: checked }));
    if (errors.gdprConsent) {
      setErrors((e) => ({ ...e, gdprConsent: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const submitValues = {
      ...values,
      requestSourceUrl: typeof window !== "undefined" ? window.location.href : "",
    };

    const result = requestSchema.safeParse(submitValues);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RequestFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0] as keyof RequestFormValues;
        if (!fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      setErrors(fieldErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data: RequestApiResponse = await res.json();

      if (!res.ok || !data.success) {
        setSubmitError(data.error || "Failed to submit request");
        if ("fieldErrors" in data && data.fieldErrors) {
          setErrors(data.fieldErrors as Partial<Record<keyof RequestFormValues, string>>);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setSubmitSuccess(true);
      setValues(initialValues);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Network error:", err);
      setSubmitError("Network error. Please check your connection and try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 text-center">
        <h1 className="mb-4">Request AI Tool Recommendations</h1>
        <p className="text-lg text-muted-foreground">
          Tell us about your needs and we'll match you with the right AI tools for your team.
        </p>
      </div>

      {submitSuccess && (
        <Alert className="mb-6 border-green-200 bg-green-50 text-green-900">
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            <strong>Success!</strong> Your request has been submitted. We'll review it and get back to you within 24 hours.
          </AlertDescription>
        </Alert>
      )}

      {submitError && (
        <Alert className="mb-6 border-red-200 bg-red-50 text-red-900">
          <XCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Error:</strong> {submitError}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>
            Fill in the form below and we'll match you with suitable AI tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              
              <div>
                <Label htmlFor="requesterName">Your Name *</Label>
                <Input
                  id="requesterName"
                  value={values.requesterName}
                  onChange={handleChange("requesterName")}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {errors.requesterName && (
                  <p className="mt-1 text-sm text-red-600">{errors.requesterName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="requesterEmail">Email Address *</Label>
                <Input
                  id="requesterEmail"
                  type="email"
                  value={values.requesterEmail}
                  onChange={handleChange("requesterEmail")}
                  placeholder="john@company.com"
                  disabled={isSubmitting}
                />
                {errors.requesterEmail && (
                  <p className="mt-1 text-sm text-red-600">{errors.requesterEmail}</p>
                )}
              </div>

              <div>
                <Label htmlFor="requesterCompany">Company Name *</Label>
                <Input
                  id="requesterCompany"
                  value={values.requesterCompany}
                  onChange={handleChange("requesterCompany")}
                  placeholder="Acme Corp"
                  disabled={isSubmitting}
                />
                {errors.requesterCompany && (
                  <p className="mt-1 text-sm text-red-600">{errors.requesterCompany}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="companySize">Company Size *</Label>
                  <Select
                    value={values.companySize}
                    onValueChange={handleSelectChange("companySize")}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="companySize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="500+">500+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.companySize && (
                    <p className="mt-1 text-sm text-red-600">{errors.companySize}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="companyLocation">Location</Label>
                  <Select
                    value={values.companyLocation}
                    onValueChange={handleSelectChange("companyLocation")}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="companyLocation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UK">UK</SelectItem>
                      <SelectItem value="US">US</SelectItem>
                      <SelectItem value="EU">EU</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What are you looking for?</h3>

              <div>
                <Label htmlFor="vertical">Vertical *</Label>
                <Select
                  value={values.vertical}
                  onValueChange={handleSelectChange("vertical")}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="vertical">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR & Talent">HR & Talent</SelectItem>
                    <SelectItem value="Learning & Development">Learning & Development</SelectItem>
                    <SelectItem value="Customer Support">Customer Support</SelectItem>
                  </SelectContent>
                </Select>
                {errors.vertical && (
                  <p className="mt-1 text-sm text-red-600">{errors.vertical}</p>
                )}
              </div>

              <div>
                <Label htmlFor="useCase">Use Case *</Label>
                <Textarea
                  id="useCase"
                  value={values.useCase}
                  onChange={handleChange("useCase")}
                  placeholder="E.g., We need to screen 100+ applications per month for hourly roles..."
                  rows={3}
                  disabled={isSubmitting}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Describe what you're trying to achieve (min 10 characters)
                </p>
                {errors.useCase && (
                  <p className="mt-1 text-sm text-red-600">{errors.useCase}</p>
                )}
              </div>

              <div>
                <Label htmlFor="requirements">Detailed Requirements *</Label>
                <Textarea
                  id="requirements"
                  value={values.requirements}
                  onChange={handleChange("requirements")}
                  placeholder="Please provide as much detail as possible about your needs, challenges, and what success looks like..."
                  rows={5}
                  disabled={isSubmitting}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Min 20 characters required
                </p>
                {errors.requirements && (
                  <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="timeline">Timeline *</Label>
                  <Select
                    value={values.timeline}
                    onValueChange={handleSelectChange("timeline")}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="timeline">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Immediate">Immediate (within 2 weeks)</SelectItem>
                      <SelectItem value="1-3 months">1-3 months</SelectItem>
                      <SelectItem value="3-6 months">3-6 months</SelectItem>
                      <SelectItem value="Exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.timeline && (
                    <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="budgetRange">Budget Range (optional)</Label>
                  <Select
                    value={values.budgetRange}
                    onValueChange={handleSelectChange("budgetRange")}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="budgetRange">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="<£500">&lt;£500/month</SelectItem>
                      <SelectItem value="£500-£2000">£500-£2,000/month</SelectItem>
                      <SelectItem value="£2000-£5000">£2,000-£5,000/month</SelectItem>
                      <SelectItem value="£5000+">£5,000+/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="currentTools">Current Tools (optional)</Label>
                <Textarea
                  id="currentTools"
                  value={values.currentTools}
                  onChange={handleChange("currentTools")}
                  placeholder="E.g., Currently using Workday for HRIS, looking to add AI screening..."
                  rows={2}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="gdprConsent"
                checked={values.gdprConsent}
                onCheckedChange={handleCheckboxChange}
                disabled={isSubmitting}
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="gdprConsent"
                  className="text-sm font-normal leading-snug peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I consent to IndustryLabs processing my data to match me with relevant AI tools. *
                </Label>
                {errors.gdprConsent && (
                  <p className="text-sm text-red-600">{errors.gdprConsent}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Request"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
