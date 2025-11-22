import { Container } from "@/components/layout/container";
import { HomeHero } from "@/components/home/home-hero";
import { HomeValueProps } from "@/components/home/home-value-props";
import { HomeCategoriesPreview } from "@/components/home/home-categories";
import { HomeFeaturedTools } from "@/components/home/home-featured-tools";
import { HomeRequestCta } from "@/components/home/home-request-cta";
import { NewsletterForm } from "@/components/home/newsletter-form";

export default function Home() {
  return (
    <Container>
      <HomeHero />
      <HomeValueProps />
      <HomeCategoriesPreview />
      <HomeFeaturedTools />
      <HomeRequestCta />
      <NewsletterForm />
    </Container>
  );
}
