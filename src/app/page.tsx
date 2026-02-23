import Categories from "./Categories/page";
import Products from "./Products/page";
import HomeBanner from "./components/HomeBanner";
import WhyChooseUs from "./components/WhyChooseUs";
import TopReviews from "./components/TopReviews";


export default function HomePage() {
  return (
    <div className="px-4 md:px-6 lg:px-8 py-4">
      <HomeBanner />
      <Categories />
      <Products />
      <WhyChooseUs />
      <TopReviews />
    </div>
  );
}
