'use client';

import { useState } from 'react';
import { Heart, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';
import { formatPrice } from '@/utils/formatters';
import toast from 'react-hot-toast';

export function ProductDetailClient({ product }: { product: Product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { addItem, openCart } = useCartStore();

  // State for Variants (Default to first if exists)
  const colors = product.attributes?.find(a => a.name.toLowerCase() === 'color')?.values || ['Standard'];
  const sizes = product.attributes?.find(a => a.name.toLowerCase() === 'size')?.values || ['Standard'];
  
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  const isFlashSale = product.isFlashSale && product.flashSalePrice;
  const price = isFlashSale ? product.flashSalePrice! : product.price;

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    setIsLoading(true);
    try {
      addItem({
        productId: product.id,
        name: product.name,
        price,
        image: product.images[0] || '',
        qty: 1, // Defaulting to 1 as per UI screenshot (no qty selector shown)
        stock: product.stock,
        attributes: { Color: selectedColor, Size: selectedSize },
      });
      toast.success(`${product.name} added to bag`);
      openCart();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = () => {
    handleAddToCart();
    // In a real app we would navigate to checkout page here, but we will just open cart for now.
  };

  return (
    <div className="space-y-6">
      {/* Meta Headers */}
      <div>
        <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest mb-2">
          {product.brand ?? 'John Lewis'}
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-black leading-tight lg:leading-tight">
          {product.name}
        </h1>
      </div>

      {/* Price & Rating Bar */}
      <div className="flex items-center justify-between border-b pb-6">
        <div className="flex items-end gap-3">
          {product.comparePrice && (
            <span className="text-lg text-gray-400 line-through font-medium tabular-nums mb-0.5">
              {formatPrice(product.comparePrice)}
            </span>
          )}
          <span className="text-3xl font-extrabold text-black tabular-nums">
            {formatPrice(price)}
          </span>
        </div>
        
        {/* Rating Summary Snippet */}
        <div className="flex items-center gap-2 cursor-pointer hover:underline" onClick={() => document.getElementById('reviews')?.scrollIntoView({behavior: 'smooth'})}>
           <span className="flex text-amber-500 text-lg">★</span>
           <span className="font-bold text-[15px]">{product.rating > 0 ? product.rating.toFixed(1) : '0.0'}</span>
           <span className="text-gray-500 text-[13px]">({product.reviewCount || 0} reviews)</span>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2 pt-2">
        <h3 className="font-bold text-black text-[15px]">Description</h3>
        <p className={`text-[14px] text-gray-600 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
          {product.description}
        </p>
        {product.description.length > 150 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[13px] font-bold text-black underline tracking-wide"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Color Selection */}
      <div className="pt-4">
        <p className="text-[13px] text-gray-800 font-bold mb-3">
          Color: <span className="font-normal text-gray-600">{selectedColor}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              title={color}
              className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center p-0.5 ${
                selectedColor === color ? 'border-black' : 'border-transparent hover:border-gray-300'
              }`}
            >
              <div 
                className="w-full h-full rounded-full border border-gray-200"
                style={{ 
                   backgroundColor: color.toLowerCase().includes('brown') ? '#654321' : 
                                    color.toLowerCase().includes('blue') ? '#3b82f6' : 
                                    color.toLowerCase().includes('black') ? '#000000' : 
                                    color.toLowerCase().includes('white') ? '#ffffff' : color 
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[13px] text-gray-800 font-bold">Size</p>
          <button className="text-[12px] text-gray-500 underline hover:text-black">Size Guide</button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-3 text-[13px] font-bold rounded transition-all ${
                selectedSize === size
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-800 border border-gray-300 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Call to Actions */}
      <div className="pt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isLoading}
          className="flex-1 py-4 bg-black text-white text-[14px] font-bold rounded flex items-center justify-center gap-2 hover:bg-gray-900 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Add To Cart'}
        </button>
        <button
          onClick={handleCheckout}
          disabled={product.stock === 0 || isLoading}
          className="flex-1 py-4 bg-white text-black text-[14px] font-bold rounded border border-black flex items-center justify-center gap-2 hover:bg-gray-50 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          Checkout Now
        </button>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`w-[54px] border border-gray-300 rounded flex items-center justify-center transition-all ${
            isWishlisted ? 'text-red-500' : 'text-gray-500 hover:text-black hover:border-black'
          }`}
        >
          <Heart size={20} className={isWishlisted ? 'fill-red-500' : ''} />
        </button>
      </div>

      {/* Info Notice */}
      <div className="pt-4 text-[12px] text-gray-500 flex flex-col gap-1">
        <p>Delivery: 3-5 Working Days</p>
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-red-600 font-bold">Low stock — only {product.stock} remaining.</p>
        )}
      </div>
    </div>
  );
}
