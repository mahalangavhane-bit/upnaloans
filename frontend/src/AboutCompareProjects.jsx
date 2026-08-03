import React, { useState } from "react";
import "./AboutCompareProjects.css";

/**
 * Tab options for the pill toggle buttons.
 */
const TABS = [
  { id: "buyers", label: "Benefits for Buyers" },
  { id: "investors", label: "Benefits for Investors" },
];

/**
 * Benefit list content for each tab, keyed by tab id.
 * Stored as data so the cards can be rendered with map().
 */
const BENEFITS = {
  buyers: [
    { id: 1, text: "Exclusive Discounts on Premium Projects" },
    { id: 2, text: "Flexible Payment Plans with Bulk Booking Benefits" },
    { id: 3, text: "Zero Brokerage Fees — Save More on Every Deal" },
    {
      id: 4,
      text: "Direct Communication with Developers for Transparency and Faster Decisions",
    },
    { id: 5, text: "Free Expert Guidance for Home Loans and Financing" },
    {
      id: 6,
      text: "End-to-End Support for Home Interiors and Commercial Fit-outs",
    },
  ],
  investors: [
    { id: 1, text: "Exclusive Discounts on Premium Projects" },
    { id: 2, text: "Flexible Payment Plans with Bulk Booking Benefits" },
    { id: 3, text: "Zero Brokerage Fees — Save More on Every Deal" },
    {
      id: 4,
      text: "Direct Communication with Developers for Transparency and Faster Decisions",
    },
    { id: 5, text: "Free Expert Guidance for Home Loans and Financing" },
    {
      id: 6,
      text: "End-to-End Support for Home Interiors and Commercial Fit-outs",
    },
  ],
};

const IMAGE_URL =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80";

const AboutCompareProjects = () => {
  const [activeTab, setActiveTab] = useState("buyers");

  const activeBenefits = BENEFITS[activeTab];

  return (
    <section className="acp">
      {/* Decorative blurred background circles */}
      <div className="acp-blob acp-blob-top" aria-hidden="true" />
      <div className="acp-blob acp-blob-bottom" aria-hidden="true" />

      <div className="acp-container">
        {/* ---------- Left: Image ---------- */}
        <div className="acp-image-col">
          <div className="acp-image-wrapper">
            <img
              src={IMAGE_URL}
              alt="Modern living room interior"
              className="acp-image"
            />
          </div>
        </div>

        {/* ---------- Right: Content ---------- */}
        <div className="acp-content-col">
          <h2 className="acp-heading">
            About <span className="acp-heading-accent">CompareProjects</span>
          </h2>

          <p className="acp-description">
            CompareProjects is a next-generation real estate comparison
            platform designed to make property discovery transparent,
            data-driven, and reliable.
          </p>

          <div className="acp-tabs">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`acp-tab ${
                  activeTab === tab.id ? "acp-tab-active" : ""
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="acp-cards">
            {activeBenefits.map((benefit) => (
              <div className="acp-card" key={benefit.id}>
                <p className="acp-card-text">{benefit.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCompareProjects;
