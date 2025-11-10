import { Hero } from "./components/Hero/Hero";
import { FeaturedProducts } from "./components/FeaturedProducts/FeaturedProducts";
import { Categories } from "./components/Categories/Categories";
import { About } from "./components/About/About";
import { Newsletter } from "./components/Newsletter/Newsletter";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Categories />
      <About />
      <Newsletter />
    </main>
  );
}
