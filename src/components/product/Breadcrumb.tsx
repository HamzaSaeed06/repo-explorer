import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const items: BreadcrumbItem[] = [
  { label: "Homepage", href: "/" },
  { label: "Women", href: "/" },
  { label: "Women's Shirts & Tops", href: "/" },
  { label: "Long Sleeve Overshirt, Khaki, 8" },
];

const Breadcrumb = () => (
  <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 overflow-x-auto">
    <ol className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
          {item.href ? (
            <a href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
