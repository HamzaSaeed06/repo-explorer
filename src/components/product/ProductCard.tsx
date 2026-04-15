import { Star } from "lucide-react";
import type { RelatedProduct } from "@/data/products";

interface Props {
  product: RelatedProduct;
}

const ProductCard = ({ product }: Props) => (
  <div className="group cursor-pointer min-w-[160px] sm:min-w-[200px]">
    <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden mb-3">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <p className="text-xs text-muted-foreground mb-0.5 truncate">{product.brand}</p>
    <h3 className="text-sm font-medium text-foreground mb-1 truncate">${product.price}</h3>
    <p className="text-xs text-muted-foreground truncate">{product.name}</p>
    <div className="flex items-center gap-2 mt-1.5 text-xs text-muted-foreground">
      <span className="flex items-center gap-0.5">
        <Star className="w-3 h-3 fill-[hsl(var(--star))] text-[hsl(var(--star))]" />
        {product.rating}
      </span>
      <span>{product.totalSold.toLocaleString()} Sold</span>
    </div>
  </div>
);

export default ProductCard;
