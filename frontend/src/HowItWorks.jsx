import React from "react";
import { FaScroll, FaIndustry, FaTruck, FaKey } from "react-icons/fa";
import { GiCrane } from "react-icons/gi";
import { FaRegClock, FaDollarSign, FaShieldAlt, FaLeaf } from "react-icons/fa";
import "./HowItWorks.css";

/**
 * Data for the 5-step "How It Works" process.
 * Kept as a reusable array so the markup can be generated with .map()
 */
const STEPS = [
  {
    id: 1,
    icon: FaScroll,
    title: "Check Eligibility",
    description: "Enter basic details and instantly see how much loan you qualify for — no documents needed.",
  },
  {
    id: 2,
    icon: FaIndustry,
    title: "Compare Offers",
    description:
      "View personalised offers from 50+ lenders sorted by lowest EMI and best terms.",
  },
  {
    id: 3,
    icon: FaTruck,
    title: "Choose the Best Offer",
    description:
      "Select the loan offer that best matches your needs, budget, and repayment preferences.",
  },
  {
    id: 4,
    icon: GiCrane,
    title: "Apply Online",
    description:
      "Submit your application digitally. Upload documents once and apply to multiple banks.",
  },
  {
    id: 5,
    icon: FaKey,
    title: "Disbursal in 24 hrs",
    description: "After approval, get funds directly in your bank account within 24 hours.",
  },
];

/**
 * Data for the bottom "Speed & Efficiency" statistics band.
 */
const STATS = [
  {
    id: "speed",
    icon: FaRegClock,
    value: "50%",
    label: "Faster Delivery",
  },
  {
    id: "cost",
    icon: FaDollarSign,
    value: "20%",
    label: "Cost Savings",
  },
  {
    id: "quality",
    icon: FaShieldAlt,
    value: "High",
    label: "Quality Control",
  },
  {
    id: "impact",
    icon: FaLeaf,
    value: "Low",
    label: "Environmental Impact",
  },
];

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80";

const HowItWorks = () => {
  return (
    <section className="hiw">
      {/* ---------- Top Section: Steps ---------- */}
      <div className="hiw-top">
        <p className="hiw-eyebrow">HOW IT WORKS</p>
        <h2 className="hiw-heading">A Smarter Way to Build</h2>

        <div className="hiw-steps">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <div className="hiw-step">
                  <div className="hiw-icon-wrapper">
                    <div className="hiw-icon-circle">
                      <Icon className="hiw-icon" />
                    </div>
                    <span className="hiw-step-number">{step.id}</span>
                  </div>
                  <h3 className="hiw-step-title">{step.title}</h3>
                  <p className="hiw-step-description">{step.description}</p>
                </div>

                {index < STEPS.length - 1 && (
                  <div className="hiw-connector" aria-hidden="true" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ---------- Bottom Section: Speed & Efficiency ---------- */}
      <div className="hiw-bottom">
        <div className="hiw-bottom-image-wrapper">
          <img
            src={PLACEHOLDER_IMAGE}
            alt="Modular building under construction"
            className="hiw-bottom-image"
          />
        </div>

        <div className="hiw-bottom-content">
          <p className="hiw-bottom-eyebrow">SPEED &amp; EFFICIENCY</p>
          <h2 className="hiw-bottom-heading">
            Better Buildings. Better Outcomes.
          </h2>

          <div className="hiw-stats">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div className="hiw-stat" key={stat.id}>
                  <div className="hiw-stat-icon-circle">
                    <Icon className="hiw-stat-icon" />
                  </div>
                  <div className="hiw-stat-value">{stat.value}</div>
                  <div className="hiw-stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
