import React from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import "./Landing.css";
import TopSection from "./Sections/TopSection";
import WhySecion from "./Sections/WhySection";
import UpComingSection from "./Sections/UpComingSection";
import TestimonialSection from "./Sections/TestimonialSection";
import PartnerSection from "./Sections/PartnerSection";
import FooterPage from "../FooterPage/FooterPage";

function LandingPage() {
  const userState = useSelector((state) => state.user);

  if (userState.info.isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin />
      </div>
    );
  } else {
    return (
      <>
        <div>
          <TopSection />
          <WhySecion />
          <UpComingSection />
          <TestimonialSection />
          <PartnerSection />
        </div>
        <div>
          <FooterPage />
        </div>
      </>
    );
  }
}

export default LandingPage;
