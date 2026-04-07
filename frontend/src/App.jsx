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
        <Route path="*"               element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
