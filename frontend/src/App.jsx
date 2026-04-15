// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { globalStyles }    from "./styles";
import Navbar              from "./Navbar";
import Footer              from "./Footer";
import Home                from "./pages/Home";
import Properties          from "./pages/Properties";
import EmiCalculatorPage   from "./pages/EmiCalculatorPage";
import Contact             from "./pages/Contact";
import Support             from "./pages/Support";
import UniversalCalculator  from "./UniversalCalculator";

import PersonalLoanCalc from "./pages/PersonalLoanCalc";
import BusinessLoanCalc from "./pages/BusinessLoanCalc";
import HomeLoanCalc from "./pages/HomeLoanCalc";
import MudraLoanCalc from "./pages/MudraLoanCalc";
import PLECalc from "./pages/PLECalc";
import HLECalc from "./pages/HLECalc";
import PLPCalc from "./pages/PLPCalc";
import HLPCalc from "./pages/HLPCalc";
import GstCalc from "./pages/GstCalc";
import FDCalc from "./pages/FDCalc";
import NPSCalc from "./pages/NPSCalc";
import PofdCalc from "./pages/PofdCalc";


export default function App() {
  return (
    <BrowserRouter>
      <style>{globalStyles}</style>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/properties"     element={<Properties />} />
        <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
        <Route path="/contact"        element={<Contact />} />
        <Route path="/support"        element={<Support />} />
        <Route path="/calculator"       element={<UniversalCalculator />} />

        <Route path="/calculator/personal-loan"
        element={<PersonalLoanCalc />}/>
        <Route path="/calculator/business-loan"
        element={<BusinessLoanCalc />}/>
        <Route path="/calculator/home-loan"
        element={<HomeLoanCalc />}/>
        <Route path="/calculator/mudra-loan"
        element={<MudraLoanCalc />} />
        <Route path="/calculator/gst"
        element={<GstCalc />} />
        <Route path="/calculator/fd"
        element={<FDCalc />} />
        <Route path="/calculator/nps"
        element={<NPSCalc />} />
        <Route path="/calculator/post-office-fd"
        element={<PofdCalc />} />
        <Route path="/calculator/personal-eligibility"
        element={<PLECalc />} />
        <Route path="/calculator/home-eligibility"
        element={<HLECalc />} />
        <Route path="/calculator/personal-prepayment"
        element={<PLPCalc />} />
        <Route path="/calculator/home-prepayment"
        element={<HLPCalc />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
