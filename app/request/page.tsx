import { Container } from "@/components/layout/container";
import { RequestFormNew } from "@/components/request/request-form-new";

export default function RequestPage() {
  return (
    <Container className="py-12 md:py-16">
      <RequestFormNew />
    </Container>
  );
}
