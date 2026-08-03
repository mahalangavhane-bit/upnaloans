// UniversalCalculator.jsx - Complete Responsive Calculator Component
import { useState, useEffect } from "react";
import { fmtINR } from "./styles";

// Calculator configurations
const calculatorTypes = {
  emi: {
    business: { name: "Business Loan EMI Calculator", minAmount: 500000, maxAmount: 50000000, defaultRate: 12.5, defaultTenure: 5 },
    home: { name: "Home Loan EMI Calculator", minAmount: 1000000, maxAmount: 100000000, defaultRate: 8.5, defaultTenure: 20 },
    personal: { name: "Personal Loan EMI Calculator", minAmount: 50000, maxAmount: 5000000, defaultRate: 12.0, defaultTenure: 5 },
    mudra: { name: "Mudra Loan EMI Calculator", minAmount: 50000, maxAmount: 10000000, defaultRate: 9.0, defaultTenure: 5 }
  },
  eligibility: {
    personal: { name: "Personal Loan Eligibility Calculator", minSalary: 15000, maxSalary: 500000, defaultEMI: 20000 },
    home: { name: "Home Loan Eligibility Calculator", minSalary: 25000, maxSalary: 1000000, defaultEMI: 50000 }
  },
  prepayment: {
    personal: { name: "Personal Loan Prepayment Calculator", minAmount: 50000, maxAmount: 5000000, defaultRate: 12.0, defaultTenure: 5 },
    home: { name: "Home Loan Prepayment Calculator", minAmount: 1000000, maxAmount: 100000000, defaultRate: 8.5, defaultTenure: 20 }
  },
  investment: {
    fd: { name: "Fixed Deposit Calculator", minAmount: 10000, maxAmount: 10000000, defaultRate: 6.5, defaultTenure: 1 },
    postOffice: { name: "Post Office FD Calculator", minAmount: 1000, maxAmount: 1000000, defaultRate: 6.9, defaultTenure: 1 },
    nps: { name: "NPS Calculator", minAmount: 500, maxAmount: 100000, defaultRate: 9.0, defaultTenure: 1 }
  },
  gst: { name: "GST Calculator" }
};

// Bank offers data
const bankOffers = [
  { bank: "SBI", rate: "8.50%", processing: "0%", maxLoan: "₹50L", tenure: "30 years" },
  { bank: "HDFC", rate: "8.75%", processing: "0.50%", maxLoan: "₹40L", tenure: "30 years" },
  { bank: "ICICI", rate: "9.25%", processing: "2.00%", maxLoan: "₹30L", tenure: "25 years" },
  { bank: "AXIS", rate: "9.00%", processing: "1.00%", maxLoan: "₹35L", tenure: "30 years" },
  { bank: "PNB", rate: "8.90%", processing: "0.50%", maxLoan: "₹25L", tenure: "20 years" }
];

// FAQ data
const faqs = [
  { q: "What is EMI?", a: "EMI (Equated Monthly Installment) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month." },
  { q: "How is EMI calculated?", a: "EMI is calculated using the formula: EMI = P × r × (1 + r)^n / ((1 + r)^n - 1), where P is principal, r is monthly interest rate, and n is tenure in months." },
  { q: "What factors affect loan eligibility?", a: "Loan eligibility depends on your income, credit score, existing debts, employment stability, and age." },
  { q: "What is the difference between fixed and floating interest rates?", a: "Fixed rates remain constant throughout the loan tenure, while floating rates change based on market conditions." },
  { q: "Can I prepay my loan?", a: "Yes, most lenders allow prepayment. However, some may charge a prepayment penalty." }
];

export default function UniversalCalculator() {
  const [calculatorType, setCalculatorType] = useState("emi");
  const [subType, setSubType] = useState("personal");
  const [showResults, setShowResults] = useState(false);

  // Reset states when calculator type changes
  useEffect(() => {
    setShowResults(false);
    
    if (calculatorType === "emi" || calculatorType === "prepayment") {
      setLoanAmt(calculatorTypes[calculatorType]?.[subType]?.defaultAmount || 500000);
      setRate(calculatorTypes[calculatorType]?.[subType]?.defaultRate || 12.0);
      setTenure(calculatorTypes[calculatorType]?.[subType]?.defaultTenure || 5);
    } else if (calculatorType === "eligibility") {
      setMonthlyIncome(calculatorTypes[calculatorType]?.[subType]?.minSalary || 50000);
      setExistingEMI(10000);
      setEligibilityRate(12.0);
    } else if (calculatorType === "investment") {
      setPrincipal(calculatorTypes[calculatorType]?.[subType]?.defaultAmount || 100000);
      setInvestmentRate(calculatorTypes[calculatorType]?.[subType]?.defaultRate || 6.5);
      setYears(calculatorTypes[calculatorType]?.[subType]?.defaultTenure || 1);
    } else if (calculatorType === "gst") {
      setGstAmount(100000);
      setGstRate(18);
      setGstType("exclusive");
    }
  }, [calculatorType, subType]);

  // EMI Calculator States
  const [loanAmt, setLoanAmt] = useState(500000);
  const [rate, setRate] = useState(12.0);
  const [tenure, setTenure] = useState(5);

  // Eligibility Calculator States
  const [monthlyIncome, setMonthlyIncome] = useState(50000);
  const [existingEMI, setExistingEMI] = useState(10000);
  const [eligibilityRate, setEligibilityRate] = useState(12.0);

  // Prepayment Calculator States
  const [prepaymentAmount, setPrepaymentAmount] = useState(100000);
  const [prepaymentMonth, setPrepaymentMonth] = useState(12);

  // Investment Calculator States
  const [principal, setPrincipal] = useState(100000);
  const [investmentRate, setInvestmentRate] = useState(6.5);
  const [years, setYears] = useState(1);

  // GST Calculator States
  const [gstAmount, setGstAmount] = useState(100000);
  const [gstRate, setGstRate] = useState(18);
  const [gstType, setGstType] = useState("exclusive");

  // Get current calculator config
  const currentConfig = calculatorTypes[calculatorType]?.[subType] || calculatorTypes.gst;

  // Calculate EMI
  const calculateEMI = () => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emi = loanAmt * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const total = emi * n;
    const interest = total - loanAmt;
    return { emi, total, interest };
  };

  // Calculate Eligibility
  const calculateEligibility = () => {
    const maxEMI = monthlyIncome * 0.6 - existingEMI;
    const eligibleAmount = maxEMI * 1000 / (eligibilityRate / 12 / 100);
    return { eligibleAmount, maxEMI };
  };

  // Calculate Prepayment Benefit
  const calculatePrepayment = () => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emi = loanAmt * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    
    // Calculate remaining balance after prepayment
    const monthsPassed = prepaymentMonth;
    let remainingBalance = loanAmt;
    for (let i = 1; i <= monthsPassed; i++) {
      const interestPayment = remainingBalance * r;
      const principalPayment = emi - interestPayment;
      remainingBalance -= principalPayment;
    }
    
    const newLoanAmt = remainingBalance - prepaymentAmount;
    const newTenure = n - monthsPassed;
    const newEMI = newLoanAmt * r * Math.pow(1 + r, newTenure) / (Math.pow(1 + r, newTenure) - 1);
    
    const totalSavings = (emi * n) - (emi * monthsPassed + newEMI * newTenure + prepaymentAmount);
    
    return { totalSavings, newEMI, remainingBalance };
  };

  // Calculate Investment Returns
  const calculateInvestment = () => {
    const n = years * 1; // Compounded annually
    const maturityAmount = principal * Math.pow(1 + investmentRate / 100, n);
    const totalInterest = maturityAmount - principal;
    return { maturityAmount, totalInterest };
  };

  // Calculate GST
  const calculateGST = () => {
    let taxableAmount, gstAmount, totalAmount;
    
    if (gstType === "exclusive") {
      taxableAmount = gstAmount;
      gstAmount = gstAmount * (gstRate / 100);
      totalAmount = gstAmount + gstAmount;
    } else {
      totalAmount = gstAmount;
      taxableAmount = totalAmount / (1 + gstRate / 100);
      gstAmount = totalAmount - taxableAmount;
    }
    
    return { taxableAmount, gstAmount, totalAmount };
  };

  // Generate amortization table
  const generateAmortizationTable = () => {
    const r = rate / 12 / 100;
    const n = tenure * 12;
    const emi = loanAmt * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    
    const table = [];
    let balance = loanAmt;
    
    for (let month = 1; month <= Math.min(n, 12); month++) {
      const interestPayment = balance * r;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;
      
      table.push({
        month,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, balance))
      });
    }
    
    return table;
  };

  const rangeStyle = (val, min, max) => {
    const pct = ((val - min) / (max - min)) * 100;
    return { background: `linear-gradient(to right, #f97316 ${pct}%, #fed7aa ${pct}%)` };
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  const results = showResults && (() => {
    switch (calculatorType) {
      case "emi":
      case "prepayment":
        return calculateEMI();
      case "eligibility":
        return calculateEligibility();
      case "investment":
        return calculateInvestment();
      case "gst":
        return calculateGST();
      default:
        return null;
    }
  })();

  const amortizationTable = showResults && (calculatorType === "emi" || calculatorType === "prepayment") 
    ? generateAmortizationTable() 
    : [];

  return (
    <section style={{ 
      padding: "80px 0", 
      background: "white", 
      position: "relative", 
      overflow: "hidden" 
    }}>
      {/* Hero Section */}
      <div style={{ 
        padding: "0 32px", 
        textAlign: "center", 
        marginBottom: "60px" 
      }}>
        <h1 style={{ 
          fontSize: "42px", 
          fontWeight: "700", 
          color: "#1a1a1a", 
          marginBottom: "16px",
          fontFamily: "'Sora', sans-serif"
        }}>
          {currentConfig.name}
        </h1>
        <p style={{ 
          fontSize: "18px", 
          color: "#666", 
          lineHeight: "1.6",
          maxWidth: "700px",
          margin: "0 auto"
        }}>
          {calculatorType === "emi" && "Calculate your monthly EMI, total interest and plan your loan repayment with ease."}
          {calculatorType === "eligibility" && "Check your loan eligibility based on your income and existing obligations."}
          {calculatorType === "prepayment" && "Calculate savings on loan prepayment and make informed decisions."}
          {calculatorType === "investment" && "Calculate returns on your investments and plan your financial goals."}
          {calculatorType === "gst" && "Calculate GST amount instantly for any transaction."}
        </p>
      </div>

      {/* Calculator Type Selector */}
      <div style={{ 
        padding: "0 32px", 
        marginBottom: "40px",
        display: "flex",
        gap: "20px",
        flexWrap: "wrap"
      }}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "600", 
            color: "#1a1a1a" 
          }}>Calculator Type:</label>
          <select 
            value={calculatorType} 
            onChange={(e) => {
              setCalculatorType(e.target.value);
              setSubType(Object.keys(calculatorTypes[e.target.value] || {})[0] || "");
              setShowResults(false);
            }}
            style={{ 
              padding: "12px 16px", 
              border: "2px solid #e5e7eb", 
              borderRadius: "8px", 
              fontSize: "16px",
              minWidth: "200px",
              background: "white"
            }}
          >
            <option value="emi">EMI Calculators</option>
            <option value="eligibility">Eligibility Calculators</option>
            <option value="prepayment">Prepayment Calculators</option>
            <option value="investment">Investment Calculators</option>
            <option value="gst">GST Calculator</option>
          </select>
        </div>

        {calculatorType !== "gst" && (
          <div style={{ marginBottom: "20px" }}>
            <label style={{ 
              display: "block", 
              marginBottom: "8px", 
              fontWeight: "600", 
              color: "#1a1a1a" 
            }}>Sub Type:</label>
            <select 
              value={subType} 
              onChange={(e) => {
                setSubType(e.target.value);
                setShowResults(false);
              }}
              style={{ 
                padding: "12px 16px", 
                border: "2px solid #e5e7eb", 
                borderRadius: "8px", 
                fontSize: "16px",
                minWidth: "200px",
                background: "white"
              }}
            >
              {Object.keys(calculatorTypes[calculatorType] || {}).map(key => (
                <option key={key} value={key}>
                  {calculatorTypes[calculatorType][key].name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Calculator Form */}
      <div style={{ 
        padding: "0 32px", 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "50px", 
        alignItems: "start" 
      }}>
        {/* Input Section */}
        <div style={{ 
          background: "white", 
          borderRadius: "20px", 
          padding: "36px", 
          border: "1.5px solid #e5e7eb",
          boxShadow: "0 4px 24px rgba(249,115,22,.08)"
        }}>
          {(calculatorType === "emi" || calculatorType === "prepayment") && (
            <>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Loan Amount <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {fmtINR(calculatorType === "prepayment" ? loanAmt : loanAmt)}
                  </span>
                </label>
                <input 
                  type="range" 
                  min={currentConfig.minAmount} 
                  max={currentConfig.maxAmount} 
                  step={10000}
                  value={loanAmt} 
                  onChange={e => setLoanAmt(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(loanAmt, currentConfig.minAmount, currentConfig.maxAmount)
                  }} 
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Interest Rate <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {rate.toFixed(1)}%
                  </span>
                </label>
                <input 
                  type="range" 
                  min={6} 
                  max={20} 
                  step={0.1}
                  value={rate} 
                  onChange={e => setRate(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(rate, 6, 20)
                  }} 
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Loan Tenure <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {tenure} Years
                  </span>
                </label>
                <input 
                  type="range" 
                  min={1} 
                  max={30} 
                  step={1}
                  value={tenure} 
                  onChange={e => setTenure(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(tenure, 1, 30)
                  }} 
                />
              </div>

              {calculatorType === "prepayment" && (
                <>
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ 
                      display: "block", 
                      marginBottom: "8px", 
                      fontWeight: "600", 
                      color: "#1a1a1a" 
                    }}>
                      Prepayment Amount <span style={{ color: "#f97316", fontWeight: "700" }}>
                        {fmtINR(prepaymentAmount)}
                      </span>
                    </label>
                    <input 
                      type="range" 
                      min={10000} 
                      max={loanAmt} 
                      step={5000}
                      value={prepaymentAmount} 
                      onChange={e => setPrepaymentAmount(+e.target.value)}
                      style={{ 
                        width: "100%", 
                        height: "8px", 
                        borderRadius: "4px",
                        outline: "none",
                        ...rangeStyle(prepaymentAmount, 10000, loanAmt)
                      }} 
                    />
                  </div>

                  <div style={{ marginBottom: "24px" }}>
                    <label style={{ 
                      display: "block", 
                      marginBottom: "8px", 
                      fontWeight: "600", 
                      color: "#1a1a1a" 
                    }}>
                      Prepayment Month <span style={{ color: "#f97316", fontWeight: "700" }}>
                        Month {prepaymentMonth}
                      </span>
                    </label>
                    <input 
                      type="range" 
                      min={1} 
                      max={tenure * 12} 
                      step={1}
                      value={prepaymentMonth} 
                      onChange={e => setPrepaymentMonth(+e.target.value)}
                      style={{ 
                        width: "100%", 
                        height: "8px", 
                        borderRadius: "4px",
                        outline: "none",
                        ...rangeStyle(prepaymentMonth, 1, tenure * 12)
                      }} 
                    />
                  </div>
                </>
              )}
            </>
          )}

          {calculatorType === "eligibility" && (
            <>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Monthly Income <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {fmtINR(monthlyIncome)}
                  </span>
                </label>
                <input 
                  type="range" 
                  min={currentConfig.minSalary} 
                  max={currentConfig.maxSalary} 
                  step={1000}
                  value={monthlyIncome} 
                  onChange={e => setMonthlyIncome(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(monthlyIncome, currentConfig.minSalary, currentConfig.maxSalary)
                  }} 
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Existing EMI <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {fmtINR(existingEMI)}
                  </span>
                </label>
                <input 
                  type="range" 
                  min={0} 
                  max={monthlyIncome} 
                  step={1000}
                  value={existingEMI} 
                  onChange={e => setExistingEMI(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(existingEMI, 0, monthlyIncome)
                  }} 
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Interest Rate <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {eligibilityRate.toFixed(1)}%
                  </span>
                </label>
                <input 
                  type="range" 
                  min={6} 
                  max={20} 
                  step={0.1}
                  value={eligibilityRate} 
                  onChange={e => setEligibilityRate(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(eligibilityRate, 6, 20)
                  }} 
                />
              </div>
            </>
          )}

          {calculatorType === "investment" && (
            <>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Principal Amount <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {fmtINR(principal)}
                  </span>
                </label>
                <input 
                  type="range" 
                  min={currentConfig.minAmount} 
                  max={currentConfig.maxAmount} 
                  step={1000}
                  value={principal} 
                  onChange={e => setPrincipal(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(principal, currentConfig.minAmount, currentConfig.maxAmount)
                  }} 
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Interest Rate <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {investmentRate.toFixed(1)}%
                  </span>
                </label>
                <input 
                  type="range" 
                  min={4} 
                  max={15} 
                  step={0.1}
                  value={investmentRate} 
                  onChange={e => setInvestmentRate(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(investmentRate, 4, 15)
                  }} 
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Investment Period <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {years} Years
                  </span>
                </label>
                <input 
                  type="range" 
                  min={1} 
                  max={10} 
                  step={1}
                  value={years} 
                  onChange={e => setYears(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(years, 1, 10)
                  }} 
                />
              </div>
            </>
          )}

          {calculatorType === "gst" && (
            <>
              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  Amount <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {fmtINR(gstAmount)}
                  </span>
                </label>
                <input 
                  type="range" 
                  min={100} 
                  max={10000000} 
                  step={1000}
                  value={gstAmount} 
                  onChange={e => setGstAmount(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(gstAmount, 100, 10000000)
                  }} 
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  GST Rate <span style={{ color: "#f97316", fontWeight: "700" }}>
                    {gstRate}%
                  </span>
                </label>
                <input 
                  type="range" 
                  min={0} 
                  max={28} 
                  step={0.5}
                  value={gstRate} 
                  onChange={e => setGstRate(+e.target.value)}
                  style={{ 
                    width: "100%", 
                    height: "8px", 
                    borderRadius: "4px",
                    outline: "none",
                    ...rangeStyle(gstRate, 0, 28)
                  }} 
                />
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label style={{ 
                  display: "block", 
                  marginBottom: "8px", 
                  fontWeight: "600", 
                  color: "#1a1a1a" 
                }}>
                  GST Type
                </label>
                <select 
                  value={gstType} 
                  onChange={e => setGstType(e.target.value)}
                  style={{ 
                    padding: "12px 16px", 
                    border: "2px solid #e5e7eb", 
                    borderRadius: "8px", 
                    fontSize: "16px",
                    width: "100%",
                    background: "white"
                  }}
                >
                  <option value="exclusive">Exclusive of GST</option>
                  <option value="inclusive">Inclusive of GST</option>
                </select>
              </div>
            </>
          )}

          <button 
            onClick={handleCalculate}
            style={{ 
              width: "100%", 
              height: "48", 
              background: "#f97316", 
              color: "white", 
              border: "none", 
              borderRadius: "8px", 
              fontSize: "16px", 
              fontWeight: "600", 
              cursor: "pointer",
              transition: "all 0.3s"
            }}
            onMouseEnter={e => {
              e.target.style.background = "#ea580c";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "#f97316";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Calculate {calculatorType === "emi" ? "EMI" : calculatorType === "eligibility" ? "Eligibility" : calculatorType === "investment" ? "Returns" : calculatorType === "gst" ? "GST" : "Savings"}
          </button>
        </div>

        {/* Results Section */}
        {showResults && (
          <div style={{ 
            background: "white", 
            borderRadius: "20px", 
            padding: "36px", 
            border: "1.5px solid #e5e7eb",
            boxShadow: "0 4px 24px rgba(249,115,22,.08)"
          }}>
            {results && (
              <>
                {(calculatorType === "emi" || calculatorType === "prepayment") && (
                  <>
                    <div style={{ textAlign: "center", marginBottom: "32px" }}>
                      <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                        {calculatorType === "emi" ? "Monthly EMI" : "New Monthly EMI"}
                      </div>
                      <div style={{ 
                        fontSize: "36px", 
                        fontWeight: "700", 
                        color: "#f97316",
                        fontFamily: "'Sora', sans-serif"
                      }}>
                        ₹{Math.round(results.emi || results.newEMI).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "1fr 1fr", 
                      gap: "16px", 
                      marginBottom: "32px" 
                    }}>
                      {[
                        ["Principal Amount", fmtINR(calculatorType === "prepayment" ? (loanAmt - prepaymentAmount) : loanAmt)],
                        ["Total Interest", fmtINR(results.interest || 0)],
                        ["Total Payment", fmtINR((results.total || 0) - (calculatorType === "prepayment" ? prepaymentAmount : 0))],
                        calculatorType === "prepayment" ? ["Total Savings", fmtINR(results.totalSavings)] : ["Interest Rate", rate.toFixed(1) + "%"]
                      ].map(([label, val]) => (
                        <div key={label} style={{ 
                          padding: "16px", 
                          background: "#f8fafc", 
                          borderRadius: "8px", 
                          border: "1px solid #e5e7eb" 
                        }}>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>{label}</div>
                          <div style={{ fontSize: "18px", fontWeight: "600", color: "#1a1a1a" }}>{val}</div>
                        </div>
                      ))}
                    </div>

                    {/* Pie Chart */}
                    <div style={{ marginBottom: "32px" }}>
                      <div style={{ 
                        height: "12px", 
                        background: "#f3f4f6", 
                        borderRadius: "6px", 
                        overflow: "hidden", 
                        marginBottom: "16px" 
                      }}>
                        <div style={{ 
                          height: "100%", 
                          width: Math.round((loanAmt / results.total) * 100) + "%", 
                          background: "#f97316" 
                        }} />
                      </div>
                      <div style={{ display: "flex", gap: "24px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ 
                            width: "12px", 
                            height: "12px", 
                            background: "#f97316", 
                            borderRadius: "2px" 
                          }} />
                          <span style={{ fontSize: "14px", color: "#666" }}>Principal</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ 
                            width: "12px", 
                            height: "12px", 
                            background: "#e5e7eb", 
                            borderRadius: "2px" 
                          }} />
                          <span style={{ fontSize: "14px", color: "#666" }}>Interest</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {calculatorType === "eligibility" && (
                  <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                      Eligible Loan Amount
                    </div>
                    <div style={{ 
                      fontSize: "36px", 
                      fontWeight: "700", 
                      color: "#f97316",
                      fontFamily: "'Sora', sans-serif"
                    }}>
                      ₹{Math.round(results.eligibleAmount).toLocaleString("en-IN")}
                    </div>
                    <div style={{ fontSize: "16px", color: "#666", marginTop: "8px" }}>
                      Max EMI Capacity: {fmtINR(results.maxEMI)}
                    </div>
                  </div>
                )}

                {calculatorType === "investment" && (
                  <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                      Maturity Amount
                    </div>
                    <div style={{ 
                      fontSize: "36px", 
                      fontWeight: "700", 
                      color: "#f97316",
                      fontFamily: "'Sora', sans-serif"
                    }}>
                      ₹{Math.round(results.maturityAmount).toLocaleString("en-IN")}
                    </div>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "1fr 1fr", 
                      gap: "16px", 
                      marginBottom: "32px" 
                    }}>
                      {[
                        ["Principal Amount", fmtINR(principal)],
                        ["Total Interest", fmtINR(results.totalInterest)],
                        ["Interest Rate", interestRate.toFixed(1) + "%"],
                        ["Investment Period", years + " Years"]
                      ].map(([label, val]) => (
                        <div key={label} style={{ 
                          padding: "16px", 
                          background: "#f8fafc", 
                          borderRadius: "8px", 
                          border: "1px solid #e5e7eb" 
                        }}>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>{label}</div>
                          <div style={{ fontSize: "18px", fontWeight: "600", color: "#1a1a1a" }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {calculatorType === "gst" && (
                  <div style={{ textAlign: "center", marginBottom: "32px" }}>
                    <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
                      GST Amount
                    </div>
                    <div style={{ 
                      fontSize: "36px", 
                      fontWeight: "700", 
                      color: "#f97316",
                      fontFamily: "'Sora', sans-serif"
                    }}>
                      ₹{Math.round(results.gstAmount).toLocaleString("en-IN")}
                    </div>
                    <div style={{ 
                      display: "grid", 
                      gridTemplateColumns: "1fr 1fr", 
                      gap: "16px", 
                      marginBottom: "32px" 
                    }}>
                      {[
                        ["Taxable Amount", fmtINR(results.taxableAmount)],
                        ["GST Rate", gstRate + "%"],
                        ["Total Amount", fmtINR(results.totalAmount)],
                        ["GST Type", gstType === "exclusive" ? "Exclusive" : "Inclusive"]
                      ].map(([label, val]) => (
                        <div key={label} style={{ 
                          padding: "16px", 
                          background: "#f8fafc", 
                          borderRadius: "8px", 
                          border: "1px solid #e5e7eb" 
                        }}>
                          <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>{label}</div>
                          <div style={{ fontSize: "18px", fontWeight: "600", color: "#1a1a1a" }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button 
                  style={{ 
                    width: "100%", 
                    height: "48", 
                    background: "#f97316", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "8px", 
                    fontSize: "16px", 
                    fontWeight: "600", 
                    cursor: "pointer",
                    marginBottom: "24px"
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = "#ea580c";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = "#f97316";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Apply for This Loan →
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Amortization Table */}
      {amortizationTable.length > 0 && (
        <div style={{ 
          padding: "0 32px", 
          marginBottom: "60px" 
        }}>
          <h3 style={{ 
            fontSize: "24px", 
            fontWeight: "700", 
            color: "#1a1a1a", 
            marginBottom: "24px",
            fontFamily: "'Sora', sans-serif"
          }}>
            Amortization Schedule
          </h3>
          <div style={{ 
            background: "white", 
            borderRadius: "12px", 
            overflow: "hidden", 
            border: "1px solid #e5e7eb" 
          }}>
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(5, 1fr)", 
              background: "#f8fafc" 
            }}>
              {["Month", "EMI", "Principal", "Interest", "Balance"].map(header => (
                <div key={header} style={{ 
                  padding: "16px", 
                  fontWeight: "600", 
                  color: "#1a1a1a", 
                  borderRight: "1px solid #e5e7eb" 
                }}>
                  {header}
                </div>
              ))}
            </div>
            {amortizationTable.map(row => (
              <div key={row.month} style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(5, 1fr)", 
                borderTop: "1px solid #e5e7eb" 
              }}>
                <div style={{ padding: "16px", color: "#1a1a1a" }}>{row.month}</div>
                <div style={{ padding: "16px", color: "#1a1a1a" }}>{fmtINR(row.emi)}</div>
                <div style={{ padding: "16px", color: "#1a1a1a" }}>{fmtINR(row.principal)}</div>
                <div style={{ padding: "16px", color: "#1a1a1a" }}>{fmtINR(row.interest)}</div>
                <div style={{ padding: "16px", color: "#1a1a1a" }}>{fmtINR(row.balance)}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bank Offers Section */}
      <div style={{ 
        padding: "0 32px", 
        marginBottom: "60px" 
      }}>
        <h3 style={{ 
          fontSize: "24px", 
          fontWeight: "700", 
          color: "#1a1a1a", 
          marginBottom: "24px",
          fontFamily: "'Sora', sans-serif"
        }}>
          Current Bank Offers
        </h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: "20px" 
        }}>
          {bankOffers.map((offer, index) => (
            <div key={index} style={{ 
              background: "white", 
              borderRadius: "12px", 
              padding: "24px", 
              border: "1px solid #e5e7eb",
              transition: "all 0.3s",
              cursor: "pointer"
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <div style={{ 
                fontSize: "18px", 
                fontWeight: "700", 
                color: "#1a1a1a", 
                marginBottom: "16px" 
              }}>
                {offer.bank}
              </div>
              {[
                ["Interest Rate", offer.rate],
                ["Processing Fee", offer.processing],
                ["Max Loan", offer.maxLoan],
                ["Tenure", offer.tenure]
              ].map(([label, val]) => (
                <div key={label} style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  marginBottom: "8px" 
                }}>
                  <span style={{ fontSize: "14px", color: "#666" }}>{label}</span>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#1a1a1a" }}>{val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div style={{ 
        padding: "0 32px", 
        marginBottom: "60px" 
      }}>
        <h3 style={{ 
          fontSize: "24px", 
          fontWeight: "700", 
          color: "#1a1a1a", 
          marginBottom: "24px",
          fontFamily: "'Sora', sans-serif"
        }}>
          Frequently Asked Questions
        </h3>
        <div style={{ 
          display: "grid", 
          gap: "16px" 
        }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ 
              background: "white", 
              borderRadius: "12px", 
              border: "1px solid #e5e7eb",
              overflow: "hidden"
            }}>
              <div style={{ 
                padding: "20px", 
                background: "#f8fafc", 
                cursor: "pointer",
                fontWeight: "600",
                color: "#1a1a1a"
              }}
                onClick={() => {
                  const element = document.getElementById(`faq-${index}`);
                  element.style.display = element.style.display === "block" ? "none" : "block";
                }}
              >
                {faq.q}
              </div>
              <div 
                id={`faq-${index}`}
                style={{ 
                  padding: "20px", 
                  display: "none", 
                  borderTop: "1px solid #e5e7eb" 
                }}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div style={{ 
        padding: "0 32px", 
        marginBottom: "60px" 
      }}>
        <div style={{ 
          background: "linear-gradient(135deg, #f97316, #ea580c)", 
          borderRadius: "16px", 
          padding: "32px", 
          color: "white",
          textAlign: "center"
        }}>
          <h3 style={{ 
            fontSize: "24px", 
            fontWeight: "700", 
            marginBottom: "16px",
            fontFamily: "'Sora', sans-serif"
          }}>
            Why Choose Our Calculator?
          </h3>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: "24px" 
          }}>
            {[
              "Accurate calculations based on RBI guidelines",
              "Compare multiple loan options instantly",
              "Plan your finances better",
              "Save money with prepayment analysis",
              "Make informed investment decisions"
            ].map((point, index) => (
              <div key={index} style={{ 
                fontSize: "16px", 
                lineHeight: "1.6" 
              }}>
                ✓ {point}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 768px) {
          .calc-wrapper {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          
          .calc-box, .calc-result {
            padding: 24px !important;
          }
          
          .section-title {
            font-size: 32px !important;
          }
          
          .result-emi {
            font-size: 28px !important;
          }
        }
        
        @media (max-width: 768px) {
          section {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          
          .calc-wrapper {
            grid-template-columns: 1fr !important;
          }
          
          .result-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
