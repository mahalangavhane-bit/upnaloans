// pages/Home.jsx
import Hero            from "../Hero";
import StatsBar        from "../StatsBar";
import PlatformProducts from "../PlatformProducts";
import TopBanks        from "../TopBanks";
import EmiCalculatorPage   from "./EmiCalculatorPage";
import WhyChooseUs     from "../WhyChooseUs";
import HowItWorks      from "../HowItWorks";
import Testimonials    from "../Testimonials";
import AboutWorkSection from "../AboutWorkSection";
import CtaBanner       from "../CtaBanner";
import Contact         from "./Contact";
import Support         from "./Support";

export default function Home() {
  return (
    <>
    <section id="home">
      <Hero />
    </section>
      <StatsBar />
      <PlatformProducts />
      <TopBanks />
      <section id="emi">
        <EmiCalculatorPage />
      </section>
      <WhyChooseUs />
      <HowItWorks />
      <AboutWorkSection />
      <Testimonials />
      <CtaBanner />
      <section id="contact">
        <Contact />
      </section>
      <section id="support">
        <Support />
      </section>

    </>
  );
}
