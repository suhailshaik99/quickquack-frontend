import Header from "../features/Overview/Header";
import SectionTwo from "../features/Overview/SectionTwo";
import HeroSection from "../features/Overview/HeroSection";
import SectionFour from "../features/Overview/SectionFour";
import SectionFive from "../features/Overview/SectionFive";
import SectionThree from "../features/Overview/SectionThree";

function Home() {
  return (
    <div className="">
      <Header />
      <HeroSection />
      <SectionTwo />
      <SectionThree />
      <SectionFour />
      <SectionFive />
    </div>
  );
}

export default Home;
