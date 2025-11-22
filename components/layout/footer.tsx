import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground md:flex-row">
          <p>© {currentYear} IndustryLabs. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/about" className="transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/request" className="transition-colors hover:text-primary">
              Request Board
            </Link>
            <span className="text-xs">Privacy (coming soon)</span>
            <span className="text-xs">LinkedIn (coming soon)</span>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
