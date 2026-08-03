// pages/Home.jsx
import Hero            from "../Hero";
import PlatformProducts from "../PlatformProducts";
import TopBanks        from "../TopBanks";
import EmiCalculatorPage   from "./EmiCalculatorPage";
import WhyChooseUs     from "../WhyChooseUs";
import HowItWorks      from "../HowItWorks";
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
      <PlatformProducts />
      <TopBanks />
      <section id="emi">
        <EmiCalculatorPage />
      </section>
      <WhyChooseUs />
      <HowItWorks />
      <AboutWorkSection />
      <CtaBanner />
      <section id="contact">
        <Contact />
      </section>
      <section id="supportx">
        <Support />
      </section>

    </>
  );
}
