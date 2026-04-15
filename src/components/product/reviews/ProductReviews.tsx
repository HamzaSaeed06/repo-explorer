'use client';

import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, ThumbsDown, Filter, ChevronDown, CheckCircle } from 'lucide-react';
import { getReviewsByProduct, markReviewHelpful, addReview } from '@/lib/services/reviewService';
import type { Review } from '@/types';
import toast from 'react-hot-toast';

interface ProductReviewsProps {
  productId: string;
  initialRating?: number;
  initialReviewCount?: number;
}

export function ProductReviews({ productId, initialRating = 0, initialReviewCount = 0 }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'recent' | 'helpful'>('recent');

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true);
        const data = await getReviewsByProduct(productId, sortBy);
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [productId, sortBy]);

  // Calculate Distribution
  const distribution = [0, 0, 0, 0, 0]; // Index 0 = 5 star, 4 = 1 star
  reviews.forEach(r => {
    const idx = 5 - Math.round(r.rating);
    if (idx >= 0 && idx < 5) distribution[idx]++;
  });

  const totalReviews = reviews.length || initialReviewCount;
  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : initialRating;

  // Review Form State
  const [isWriting, setIsWriting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    rating: 5,
    userName: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.body || !formData.userName) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setSubmitting(true);
      await addReview({
        productId,
        title: formData.title,
        body: formData.body,
        rating: formData.rating,
        userName: formData.userName,
        isVerifiedPurchase: false // Default for now
      });
      
      toast.success('Review submitted successfully!');
      setIsWriting(false);
      setFormData({ title: '', body: '', rating: 5, userName: '' });
      
      // Refresh reviews
      const data = await getReviewsByProduct(productId, sortBy);
      setReviews(data);
    } catch (error) {
       toast.error('Failed to submit review');
       console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-16">
      {/* Left Panel: Summary & Filters */}
      <div className="space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full border-[3px] border-black flex items-center justify-center">
            <span className="text-3xl font-extrabold text-black">{avgRating.toFixed(1)}</span>
          </div>
          <div>
            <div className="flex text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.round(avgRating) ? "currentColor" : "none"} />
              ))}
            </div>
            <p className="text-gray-500 text-sm font-medium">{totalReviews} Reviews</p>
          </div>
        </div>

        {/* Distribution Bars */}
        <div className="space-y-3 pt-2">
          {[5, 4, 3, 2, 1].map((star, i) => {
            const count = distribution[i];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-4 text-sm font-medium">
                <span className="w-4 text-gray-800">{star}</span>
                <span className="text-amber-500">★</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gray-800 transition-all duration-500" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right text-gray-400">{count}</span>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => setIsWriting(!isWriting)}
          className="w-full py-4 border-2 border-black text-black text-[12px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] active:translate-y-[2px]"
        >
          {isWriting ? 'Cancel Review' : 'Write a Review'}
        </button>

        {/* Filters Box */}
        <div className="pt-8 space-y-6">
           <div className="border rounded px-4 py-3 flex items-center justify-between cursor-pointer hover:border-black transition-colors">
              <span className="text-[13px] font-bold text-gray-800 uppercase tracking-widest">Sort By: {sortBy === 'recent' ? 'Most Recent' : 'Most Helpful'}</span>
              <ChevronDown size={14} className="text-gray-400" />
           </div>

           <div className="space-y-4">
              <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Review Topics</p>
              <div className="flex flex-wrap gap-2 text-[12px] font-bold uppercase tracking-widest">
                 {['Product Quality', 'Product Price', 'Speed of Delivery', 'Customer Service'].map(tag => (
                   <label key={tag} className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" className="hidden" />
                      <div className="w-4 h-4 border border-gray-300 rounded group-hover:border-black transition-colors" />
                      <span className="text-gray-600 group-hover:text-black">{tag}</span>
                   </label>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Right Panel: Review List */}
      <div className="space-y-2">
        {/* Write Review Form */}
        {isWriting && (
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-xl font-bold mb-6">Share Your Experience</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Your Name</label>
                  <input 
                    type="text" 
                    value={formData.userName}
                    onChange={e => setFormData({...formData, userName: e.target.value})}
                    className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button 
                        key={star} 
                        type="button"
                        onClick={() => setFormData({...formData, rating: star})}
                        className={`transition-colors ${star <= formData.rating ? 'text-amber-500' : 'text-gray-300'}`}
                      >
                        <Star size={24} fill={star <= formData.rating ? "currentColor" : "none"} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Review Title</label>
                <input 
                   type="text" 
                   value={formData.title}
                   onChange={e => setFormData({...formData, title: e.target.value})}
                   className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:border-black outline-none transition-colors"
                   placeholder="Example: Great quality, looks premium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Your Review</label>
                <textarea 
                   rows={4}
                   value={formData.body}
                   onChange={e => setFormData({...formData, body: e.target.value})}
                   className="w-full bg-white border border-gray-200 rounded px-4 py-3 text-sm focus:border-black outline-none transition-colors resize-none"
                   placeholder="Tell us what you liked or disliked..."
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting}
                className="bg-black text-white px-10 py-4 text-[12px] font-bold uppercase tracking-widest rounded hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Post Review'}
              </button>
            </form>
          </div>
        )}

        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
           <button 
              onClick={() => setSortBy('recent')}
            className={`px-6 py-2 rounded text-[12px] font-bold uppercase tracking-widest border transition-all ${sortBy === 'recent' ? 'bg-black text-white border-black' : 'text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
           >
             All Reviews
           </button>
           <button 
              onClick={() => setSortBy('helpful')}
              className={`px-6 py-2 rounded text-[12px] font-bold uppercase tracking-widest border transition-all ${sortBy === 'helpful' ? 'bg-black text-white border-black' : 'text-gray-500 border-gray-200 hover:border-black hover:text-black'}`}
           >
             Most Helpful
           </button>
        </div>

        {loading ? (
          <div className="py-20 text-center italic text-gray-400">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          <div className="py-20 text-center italic text-gray-400 text-sm">No reviews yet for this product. Be the first to share your thoughts!</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="py-10 first:pt-0">
               <div className="flex text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
               </div>
               
               <h4 className="text-lg font-extrabold text-black mb-2 tracking-tight">{review.title}</h4>
               <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mb-4">
                  Reviewed on {review.createdAt instanceof Date ? review.createdAt.toLocaleDateString() : new Date(review.createdAt as any).toLocaleDateString()}
               </p>
               
               <p className="text-sm text-gray-600 leading-relaxed mb-6 max-w-2xl">{review.body}</p>
               
               <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[11px] font-bold text-black border">
                        {review.userName.charAt(0)}
                     </div>
                     <span className="text-[13px] font-bold text-black">{review.userName}</span>
                     {review.isVerifiedPurchase && (
                       <div className="flex items-center gap-1.5 ml-1">
                          <CheckCircle size={14} className="text-green-600" />
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Verified Purchase</span>
                       </div>
                     )}
                  </div>

                  <div className="flex items-center gap-3">
                     <button 
                       onClick={async () => {
                          await markReviewHelpful(review.id);
                          toast.success('Helpful vote recorded!');
                       }}
                       className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors"
                     >
                        <ThumbsUp size={16} />
                        <span className="text-[12px] font-bold">{review.helpful || 0}</span>
                     </button>
                     <button className="text-gray-300 hover:text-black transition-colors">
                        <ThumbsDown size={16} />
                     </button>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
