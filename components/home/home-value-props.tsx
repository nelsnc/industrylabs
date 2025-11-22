import { Card } from "@/components/ui/card";
import { valueProps } from "@/lib/mock-data";

export function HomeValueProps() {
  return (
    <section className="py-12 md:py-16">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {valueProps.map((prop) => (
          <Card key={prop.id} className="p-6">
            <h3 className="font-semibold text-lg mb-2">{prop.title}</h3>
            <p className="text-sm text-muted-foreground">{prop.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
