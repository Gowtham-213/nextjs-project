import Categories from "./Categories/page";
import Products from "./Products/page";
import HomeBanner from "./components/HomeBanner";
import WhyChooseUs from "./components/WhyChooseUs";
import TopReviews from "./components/TopReviews";
import { Suspense } from "react";


export default function HomePage() {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-4">
      <HomeBanner />
      <Categories />
      <Suspense fallback={<div className="py-6 text-sm text-gray-500">Loading products...</div>}>
        <Products />
      </Suspense>
      <WhyChooseUs />
      <TopReviews />
    </div>
  );
}
