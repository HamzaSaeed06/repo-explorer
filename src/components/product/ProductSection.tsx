import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import type { RelatedProduct } from "@/data/products";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  products: RelatedProduct[];
}

const ProductSection = ({ title, products }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.6;
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-foreground">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-2 hidden sm:block">
            View All
          </button>
        </div>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {products.map((p) => (
          <div key={p.id} className="flex-shrink-0 w-[160px] sm:w-[200px] lg:w-[calc(20%-12.8px)]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
