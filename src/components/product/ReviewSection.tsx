import { useState, useMemo } from "react";
import { Star, ThumbsUp, ThumbsDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/data/products";

interface Props {
  product: Product;
}

const ReviewSection = ({ product }: Props) => {
  const [activeTab, setActiveTab] = useState("all");
  const [ratingFilter, setRatingFilter] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;

  const tabs = [
    { id: "all", label: "All Reviews" },
    { id: "photo", label: "With Photo & Video" },
    { id: "desc", label: "With Description" },
  ];

  const filteredReviews = useMemo(() => {
    let reviews = product.reviews;
    if (ratingFilter.length > 0) {
      reviews = reviews.filter((r) => ratingFilter.includes(r.rating));
    }
    return reviews;
  }, [product.reviews, ratingFilter]);

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );
  const totalPages = Math.max(1, Math.ceil(filteredReviews.length / reviewsPerPage));

  const maxCount = Math.max(...product.reviewBreakdown.map((b) => b.count), 1);

  const toggleRating = (stars: number) => {
    setRatingFilter((prev) =>
      prev.includes(stars) ? prev.filter((s) => s !== stars) : [...prev, stars]
    );
    setCurrentPage(1);
  };

  const renderStars = (count: number) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count ? "fill-[hsl(var(--star))] text-[hsl(var(--star))]" : "text-border"
          }`}
        />
      ))}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-6">Product Reviews</h2>

      {/* Rating Overview */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-8">
        {/* Score */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-foreground flex items-center justify-center">
            <span className="text-xl font-bold text-foreground">{product.rating}</span>
          </div>
          <div>
            {renderStars(Math.round(product.rating))}
            <p className="text-xs text-muted-foreground mt-1">from {product.totalReviews.toLocaleString()} reviews</p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1 space-y-1.5 max-w-md">
          {product.reviewBreakdown.map((b) => (
            <div key={b.stars} className="flex items-center gap-2 text-sm">
              <span className="w-6 text-right text-muted-foreground">{b.stars}.0</span>
              <Star className="w-3 h-3 fill-[hsl(var(--star))] text-[hsl(var(--star))]" />
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-all"
                  style={{ width: `${(b.count / maxCount) * 100}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs text-muted-foreground">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filters & Reviews */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Left sidebar filters */}
        <div className="lg:w-48 flex-shrink-0 space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Reviews Filter</h4>
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Rating</p>
              {[5, 4, 3, 2, 1].map((s) => (
                <label key={s} className="flex items-center gap-2 py-1 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={ratingFilter.includes(s)}
                    onChange={() => toggleRating(s)}
                    className="rounded border-border"
                  />
                  <Star className="w-3.5 h-3.5 fill-[hsl(var(--star))] text-[hsl(var(--star))]" />
                  <span className="text-muted-foreground">{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-foreground mb-2">Review Topics</p>
            {["Product Quality", "Seller Services", "Product Price", "Shipment", "Match with Description"].map(
              (topic) => (
                <label key={topic} className="flex items-center gap-2 py-1 cursor-pointer text-sm text-muted-foreground">
                  <input type="checkbox" className="rounded border-border" />
                  {topic}
                </label>
              )
            )}
          </div>
        </div>

        {/* Reviews list */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="text-sm font-semibold text-foreground mr-2 self-center">Review Lists</span>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-foreground text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Review items */}
          <div className="space-y-6">
            {paginatedReviews.map((review) => (
              <div key={review.id} className="border-b border-border pb-5 last:border-0">
                {renderStars(review.rating)}
                <h4 className="font-medium text-foreground mt-2">{review.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                      {review.author.charAt(0)}
                    </div>
                    <span className="text-sm text-foreground">{review.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <button className="flex items-center gap-1 text-xs hover:text-foreground transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" /> {review.likes}
                    </button>
                    <button className="hover:text-foreground transition-colors">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 border border-border rounded flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 border rounded text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-foreground text-primary-foreground border-foreground"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 4 && <span className="text-muted-foreground">...</span>}
              {totalPages > 3 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`w-8 h-8 border rounded text-sm font-medium transition-colors ${
                    currentPage === totalPages
                      ? "bg-foreground text-primary-foreground border-foreground"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  {totalPages}
                </button>
              )}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 border border-border rounded flex items-center justify-center disabled:opacity-30 hover:bg-muted transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
