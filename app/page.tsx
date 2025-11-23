import { Container } from "@/components/layout/container";
import { HomeHero } from "@/components/home/home-hero";
import { HomeValueProps } from "@/components/home/home-value-props";
import { HomeCategoriesPreview } from "@/components/home/home-categories";
import { HomeFeaturedTools } from "@/components/home/home-featured-tools";
import { HomeRequestCta } from "@/components/home/home-request-cta";
import { NewsletterForm } from "@/components/home/newsletter-form";
import { getFeaturedTools } from "@/lib/airtable-helpers";
import { featuredTools as mockFeaturedTools } from "@/lib/mock-data";

export default async function Home() {
  // Fetch featured tools from Airtable with fallback to mock data
  let featuredTools;
  try {
    featuredTools = await getFeaturedTools(4);

    // If Airtable returns empty, use mock data
    if (featuredTools.length === 0) {
      console.warn("No tools found in Airtable, using mock data");
      featuredTools = mockFeaturedTools;
    }
  } catch (error) {
    console.error("Failed to load tools from Airtable:", error);
    featuredTools = mockFeaturedTools;
  }

  return (
    <Container>
      <HomeHero />
      <HomeValueProps />
      <HomeCategoriesPreview />
      <HomeFeaturedTools tools={featuredTools} />
      <HomeRequestCta />
      <NewsletterForm />
    </Container>
  );
}
