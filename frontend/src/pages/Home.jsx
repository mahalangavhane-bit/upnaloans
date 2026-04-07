// pages/Home.jsx
import Hero            from "../Hero";
import StatsBar        from "../StatsBar";
import PlatformProducts from "../PlatformProducts";
import TopBanks        from "../TopBanks";
import EmiCalculator   from "../EmiCalculator";
import WhyChooseUs     from "../WhyChooseUs";
import CalculatorTools from "../CalculatorTools";
import HowItWorks      from "../HowItWorks";
import Testimonials    from "../Testimonials";
import CtaBanner       from "../CtaBanner";

export default function Home() {
  return (
    <>
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
    </>
  );
}
