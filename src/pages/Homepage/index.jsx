import Header from "../../Components/layout/Header";
import Footer from "../../Components/layout/Footer";
import HeroSection from "../../Components/homepage_component/HeroSection";
const HomePage = () => {
  return (
    <main>
      <Header />
      <div><HeroSection/></div>
      <Footer />
    </main>
  );
};
export default HomePage;
