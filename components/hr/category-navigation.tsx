// DEPRECATED: Removed in TASK-114 (converted categories to filters)
// This component is no longer used after refactoring /hr-talent page to use filters instead of category sections.
// Categories are now implemented as a "Use Case" filter in the sidebar.
// Kept for reference only - can be deleted after verification.

"use client";

import { useEffect, useState } from "react";
import { UserPlus, GraduationCap, Target, Heart, BarChart3 } from "lucide-react";

interface CategoryLink {
  id: string;
  name: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
}

const categories: CategoryLink[] = [
  { id: "recruiting-ats", name: "Recruiting & ATS", slug: "recruiting-ats", icon: UserPlus },
  { id: "onboarding", name: "Onboarding", slug: "onboarding", icon: GraduationCap },
  { id: "performance-management", name: "Performance Management", slug: "performance-management", icon: Target },
  { id: "employee-engagement", name: "Employee Engagement", slug: "employee-engagement", icon: Heart },
  { id: "hr-analytics", name: "HR Analytics", slug: "hr-analytics", icon: BarChart3 },
];

export function CategoryNavigation() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    categories.forEach((cat) => {
      const element = document.getElementById(cat.slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (slug: string) => {
    const element = document.getElementById(slug);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-16 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
          <span className="text-sm font-medium text-gray-600 whitespace-nowrap mr-2">
            Browse by:
          </span>
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeSection === category.slug;

            return (
              <button
                key={category.id}
                onClick={() => scrollToSection(category.slug)}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap
                  transition-colors duration-200
                  ${isActive
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
