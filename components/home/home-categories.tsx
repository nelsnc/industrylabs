import { CategoryCard } from "@/components/categories/category-card";
import { categories } from "@/lib/mock-data";

export function HomeCategoriesPreview() {
  return (
    <section className="py-12 md:py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Browse by vertical</h2>
        <p className="text-muted-foreground">
          Find AI tools curated for your specific industry needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
