import { useState } from "react";
import { ChevronLeft, ChevronRight, Share2, Heart } from "lucide-react";
import type { ProductImage } from "@/data/products";

interface Props {
  images: ProductImage[];
}

const ProductImageGallery = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden group">
        <img
          src={images[activeIndex]?.url}
          alt={images[activeIndex]?.alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-sm">
            <Share2 className="w-4 h-4 text-foreground" />
          </button>
          <button className="w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-sm">
            <Heart className="w-4 h-4 text-foreground" />
          </button>
        </div>
        {/* Arrows */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setActiveIndex(i)}
            className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border-2 transition-colors ${
              i === activeIndex ? "border-foreground" : "border-transparent hover:border-muted-foreground/50"
            }`}
          >
            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
