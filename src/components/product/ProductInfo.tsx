import { useState } from "react";
import { Star } from "lucide-react";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const discount = Math.round(((product.originalPrice - product.salePrice) / product.originalPrice) * 100);

  return (
    <div className="space-y-5">
      {/* Brand */}
      <p className="text-sm text-muted-foreground">{product.brand}</p>

      {/* Name */}
      <h2 className="text-xl sm:text-2xl font-semibold text-foreground leading-tight">{product.name}</h2>

      {/* Price & Rating */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground line-through">{product.currency}{product.originalPrice.toFixed(2)}</span>
        <span className="text-2xl font-bold text-foreground">{product.currency}{product.salePrice.toFixed(2)}</span>
        <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded font-medium">-{discount}%</span>
        <div className="flex items-center gap-3 ml-auto text-sm text-muted-foreground">
          <span>{product.totalSold.toLocaleString()} Sold</span>
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[hsl(var(--star))] text-[hsl(var(--star))]" />
            {product.rating}
          </span>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-1">Description:</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {showFullDesc ? product.description : product.description.slice(0, 150) + "..."}
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="ml-1 text-foreground font-medium hover:underline"
          >
            {showFullDesc ? "Show Less" : "See More..."}
          </button>
        </p>
      </div>

      {/* Color */}
      <div>
        <p className="text-sm text-foreground mb-2">
          Color: <span className="font-semibold">{product.colors[selectedColor]?.name}</span>
        </p>
        <div className="flex gap-2">
          {product.colors.map((color, i) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(i)}
              className={`w-9 h-9 rounded-full border-2 transition-all ${
                i === selectedColor ? "border-foreground scale-110" : "border-transparent hover:border-muted-foreground"
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-foreground">
            Size: <span className="font-semibold">{product.sizes[selectedSize]?.label}</span>
          </p>
          <button className="text-sm text-muted-foreground hover:text-foreground underline transition-colors">
            View Size Chart
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size, i) => (
            <button
              key={size.value}
              onClick={() => setSelectedSize(i)}
              disabled={!size.inStock}
              className={`min-w-[44px] h-10 px-3 rounded-md border text-sm font-medium transition-all ${
                i === selectedSize
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : size.inStock
                  ? "bg-background text-foreground border-border hover:border-foreground"
                  : "bg-muted text-muted-foreground border-border cursor-not-allowed opacity-50"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button className="flex-1 h-12 bg-foreground text-primary-foreground rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity">
          Add To Cart
        </button>
        <button className="flex-1 h-12 bg-background text-foreground border border-foreground rounded-lg font-semibold text-sm hover:bg-muted transition-colors">
          Checkout Now
        </button>
      </div>

      {/* Delivery */}
      <button className="text-sm text-muted-foreground hover:text-foreground underline transition-colors">
        Delivery T&C
      </button>
    </div>
  );
};

export default ProductInfo;
