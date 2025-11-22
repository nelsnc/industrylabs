import { Container } from "@/components/layout/container";
import { RequestForm } from "@/components/request/request-form";

export default function RequestPage() {
  return (
    <Container>
      <div className="max-w-2xl mx-auto py-12 md:py-16 space-y-10">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">Post an HR AI request</h1>
          <p className="text-lg text-muted-foreground">
            Tell us what you're trying to solve, and we'll match you with the right tools.
            No commitment, no vendor spam—just curated recommendations.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Free service:</strong> We'll review your use case
              and send you personalized tool recommendations within 2-3 business days.
              We never sell your data or share it with vendors without your permission.
            </p>
          </div>
        </div>

        <RequestForm />
      </div>
    </Container>
  );
}
