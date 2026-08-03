import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  FaHome,
  FaBriefcase,
  FaUser,
  FaCar,
  FaGraduationCap,
  FaBuilding,
  FaCreditCard,
  FaHeartbeat,
} from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./FinancialCategories.css";

/**
 * All loan / financial category data.
 * Rendered dynamically inside the carousel via map().
 */
const CATEGORIES = [
  {
    id: 1,
    icon: FaHome,
    title: "Home Loan",
    subtitle: "Best Rates",
    iconColor: "#f37021",
    bgColor: "#fdece1",
  },
  {
    id: 2,
    icon: FaBriefcase,
    title: "Business Loan",
    subtitle: "Available Now",
    iconColor: "#e8a63b",
    bgColor: "#fdf3df",
  },
  {
    id: 3,
    icon: FaUser,
    title: "Personal Loan",
    subtitle: "Quick Approval",
    iconColor: "#e2574c",
    bgColor: "#fbe7e5",
  },
  {
    id: 4,
    icon: FaCar,
    title: "Car Loan",
    subtitle: "Low Interest",
    iconColor: "#e8a63b",
    bgColor: "#fdf3df",
  },
  {
    id: 5,
    icon: FaGraduationCap,
    title: "Education Loan",
    subtitle: "Flexible EMI",
    iconColor: "#2fa878",
    bgColor: "#e4f5ee",
  },
  {
    id: 6,
    icon: FaBuilding,
    title: "Plot Loan",
    subtitle: "Best Rates",
    iconColor: "#f37021",
    bgColor: "#fdece1",
  },
  {
    id: 7,
    icon: FaCreditCard,
    title: "Credit Card",
    subtitle: "Instant Approval",
    iconColor: "#e8a63b",
    bgColor: "#fdf3df",
  },
  {
    id: 8,
    icon: FaHeartbeat,
    title: "Medical Loan",
    subtitle: "Available Now",
    iconColor: "#e2574c",
    bgColor: "#fbe7e5",
  },
];

const FinancialCategories = () => {
  return (
    <section className="fc">
      <div className="fc-header">
        <h2 className="fc-heading">Every Financial Need, One Platform</h2>
        <p className="fc-subtitle">
          From home loans to credit cards — compare, apply and get approved
          across all categories.
        </p>
      </div>

      <div className="fc-carousel-wrapper">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={6}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: ".fc-nav-next",
            prevEl: ".fc-nav-prev",
          }}
          pagination={{
            clickable: true,
            el: ".fc-pagination",
          }}
          grabCursor={true}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 24,
            },
          }}
          className="fc-swiper"
        >
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <SwiperSlide key={category.id} className="fc-slide">
                <div className="fc-card">
                  <div
                    className="fc-icon-circle"
                    style={{ backgroundColor: category.bgColor }}
                  >
                    <Icon
                      className="fc-icon"
                      style={{ color: category.iconColor }}
                    />
                  </div>
                  <h3 className="fc-card-title">{category.title}</h3>
                  <p className="fc-card-subtitle">{category.subtitle}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Navigation arrows (desktop only, styled via CSS) */}
        <button className="fc-nav fc-nav-prev" aria-label="Previous slide">
          &#8249;
        </button>
        <button className="fc-nav fc-nav-next" aria-label="Next slide">
          &#8250;
        </button>
      </div>

      {/* Pagination dots */}
      <div className="fc-pagination" />
    </section>
  );
};

export default FinancialCategories;
