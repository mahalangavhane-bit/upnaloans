// UpnaLoans.jsx  ─── App Root
import { globalStyles }    from "./styles";
import Navbar              from "./Navbar";
import Hero                from "./Hero";
import StatsBar            from "./StatsBar";
import PlatformProducts    from "./PlatformProducts";
import TopBanks            from "./TopBanks";
import EmiCalculator       from "./EmiCalculator";
import WhyChooseUs         from "./WhyChooseUs";
import CalculatorTools     from "./CalculatorTools";
import HowItWorks          from "./HowItWorks";
import Testimonials        from "./Testimonials";
import CtaBanner           from "./CtaBanner";
import Footer              from "./Footer";

export default function UpnaLoans() {
  return (
    <>
      <style>{globalStyles}</style>
      <Navbar />
      <Hero />
      <StatsBar />
      <PlatformProducts />
      <TopBanks />
      <EmiCalculator />
      <WhyChooseUs />
      <CalculatorTools />
      <HowItWorks />
      <Testimonials />
      <CtaBanner />
      <Footer />
    </>
  );
}
