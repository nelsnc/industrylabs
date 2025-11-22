"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RequestFormValues = {
  companyName: string;
  contactName: string;
  email: string;
  vertical: string;
  useCase: string;
  companySize: string;
  geography: string;
  budget: string;
  timeline: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof RequestFormValues, string>>;

export function RequestForm() {
  const [values, setValues] = useState<RequestFormValues>({
    companyName: "",
    contactName: "",
    email: "",
    vertical: "",
    useCase: "",
    companySize: "",
    geography: "",
    budget: "",
    timeline: "",
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!values.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!values.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!values.vertical) {
      newErrors.vertical = "Please select a vertical";
    }

    if (!values.useCase.trim()) {
      newErrors.useCase = "Please describe your use case";
    }

    if (!values.companySize) {
      newErrors.companySize = "Please select your company size";
    }

    if (!values.geography) {
      newErrors.geography = "Please select your geography";
    }

    if (!values.consent) {
      newErrors.consent = "Please confirm you consent to data processing";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);
      console.log("Form submitted (mock):", values);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold">Request received!</h2>
        <p className="text-muted-foreground">
          We'll review your use case and send you curated tool recommendations within 2-3 business days.
        </p>
        <p className="text-sm text-muted-foreground">(This is a mock submission)</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Company & Contact Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Company & Contact Information</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="companyName">
              Company name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="companyName"
              value={values.companyName}
              onChange={(e) =>
                setValues({ ...values, companyName: e.target.value })
              }
              aria-invalid={!!errors.companyName}
              aria-describedby={errors.companyName ? "companyName-error" : undefined}
            />
            {errors.companyName && (
              <p id="companyName-error" className="text-xs text-red-500 mt-1">
                {errors.companyName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="contactName">
              Contact name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactName"
              value={values.contactName}
              onChange={(e) =>
                setValues({ ...values, contactName: e.target.value })
              }
              aria-invalid={!!errors.contactName}
              aria-describedby={errors.contactName ? "contactName-error" : undefined}
            />
            {errors.contactName && (
              <p id="contactName-error" className="text-xs text-red-500 mt-1">
                {errors.contactName}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500 mt-1">
                {errors.email}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Context */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Context</h3>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="vertical">
              Vertical <span className="text-red-500">*</span>
            </Label>
            <Select
              value={values.vertical}
              onValueChange={(value) => setValues({ ...values, vertical: value })}
            >
              <SelectTrigger
                id="vertical"
                aria-invalid={!!errors.vertical}
                aria-describedby={errors.vertical ? "vertical-error" : undefined}
              >
                <SelectValue placeholder="Select vertical" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hr-talent">HR & Talent</SelectItem>
              </SelectContent>
            </Select>
            {errors.vertical && (
              <p id="vertical-error" className="text-xs text-red-500 mt-1">
                {errors.vertical}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="useCase">
              Use case <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="useCase"
              placeholder="Tell us what you're trying to solve..."
              rows={5}
              value={values.useCase}
              onChange={(e) => setValues({ ...values, useCase: e.target.value })}
              aria-invalid={!!errors.useCase}
              aria-describedby={errors.useCase ? "useCase-error" : undefined}
            />
            {errors.useCase && (
              <p id="useCase-error" className="text-xs text-red-500 mt-1">
                {errors.useCase}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Be specific about your goals, constraints, and current tools.
            </p>
          </div>
        </div>
      </div>

      {/* Company Characteristics */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Company Characteristics</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="companySize">
              Company size <span className="text-red-500">*</span>
            </Label>
            <Select
              value={values.companySize}
              onValueChange={(value) =>
                setValues({ ...values, companySize: value })
              }
            >
              <SelectTrigger
                id="companySize"
                aria-invalid={!!errors.companySize}
                aria-describedby={errors.companySize ? "companySize-error" : undefined}
              >
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10</SelectItem>
                <SelectItem value="11-50">11-50</SelectItem>
                <SelectItem value="51-200">51-200</SelectItem>
                <SelectItem value="201-500">201-500</SelectItem>
                <SelectItem value="500+">500+</SelectItem>
              </SelectContent>
            </Select>
            {errors.companySize && (
              <p id="companySize-error" className="text-xs text-red-500 mt-1">
                {errors.companySize}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="geography">
              Geography <span className="text-red-500">*</span>
            </Label>
            <Select
              value={values.geography}
              onValueChange={(value) => setValues({ ...values, geography: value })}
            >
              <SelectTrigger
                id="geography"
                aria-invalid={!!errors.geography}
                aria-describedby={errors.geography ? "geography-error" : undefined}
              >
                <SelectValue placeholder="Select geography" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="UK">UK</SelectItem>
                <SelectItem value="EU">EU</SelectItem>
                <SelectItem value="Canada">Canada</SelectItem>
                <SelectItem value="Australia">Australia</SelectItem>
                <SelectItem value="Global">Global</SelectItem>
              </SelectContent>
            </Select>
            {errors.geography && (
              <p id="geography-error" className="text-xs text-red-500 mt-1">
                {errors.geography}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="budget">Budget (optional)</Label>
            <Select
              value={values.budget}
              onValueChange={(value) => setValues({ ...values, budget: value })}
            >
              <SelectTrigger id="budget">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="<1k">&lt; $1,000/mo</SelectItem>
                <SelectItem value="1k-5k">$1,000 - $5,000/mo</SelectItem>
                <SelectItem value="5k-10k">$5,000 - $10,000/mo</SelectItem>
                <SelectItem value="10k+">$10,000+/mo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="timeline">Timeline (optional)</Label>
            <Select
              value={values.timeline}
              onValueChange={(value) => setValues({ ...values, timeline: value })}
            >
              <SelectTrigger id="timeline">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">Urgent (within 2 weeks)</SelectItem>
                <SelectItem value="1-month">Within 1 month</SelectItem>
                <SelectItem value="1-3-months">1-3 months</SelectItem>
                <SelectItem value="exploring">Just exploring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* GDPR Consent */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consent"
            checked={values.consent}
            onCheckedChange={(checked) =>
              setValues({ ...values, consent: checked === true })
            }
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
          />
          <div className="flex-1">
            <Label
              htmlFor="consent"
              className="text-sm font-normal cursor-pointer leading-relaxed"
            >
              I consent to Industry Labs processing my information to provide tool
              recommendations. We will not sell your data or share it with vendors
              without your explicit permission.{" "}
              <span className="text-red-500">*</span>
            </Label>
          </div>
        </div>
        {errors.consent && (
          <p id="consent-error" className="text-xs text-red-500">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="pt-4">
        <Button type="submit" size="lg" className="w-full md:w-auto">
          Submit Request
        </Button>
      </div>
    </form>
  );
}
