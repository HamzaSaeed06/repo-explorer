import TopBanner from "@/components/product/TopBanner";
import Header from "@/components/product/Header";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductSection from "@/components/product/ProductSection";
import ReviewSection from "@/components/product/ReviewSection";
import Footer from "@/components/product/Footer";
import { mainProduct, relatedProducts, popularProducts } from "@/data/products";

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <TopBanner />
    <Header />
    <Breadcrumb />

    {/* Product Detail */}
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <ProductImageGallery images={mainProduct.images} />
        <ProductInfo product={mainProduct} />
      </div>
    </main>

    {/* Related Products */}
    <ProductSection title="Related Product" products={relatedProducts} />

    {/* Reviews */}
    <ReviewSection product={mainProduct} />

    {/* Popular This Week */}
    <ProductSection title="Popular this week" products={popularProducts} />

    <Footer />
  </div>
);

export default Index;
