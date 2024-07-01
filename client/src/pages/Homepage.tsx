import React from "react";
import Navbar from "../components/layout/Navbar";
import CarouselContentView from "../components/pages/homepage/CarouselContentView";
import ScholarshipNewest from "../components/pages/homepage/ScholarshipNewest";
import MostFavorit from "../components/pages/homepage/MostFavorit";
import HeroSection from "../components/pages/homepage/HeroSection";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <CarouselContentView />
      <ScholarshipNewest />
      <MostFavorit />
      <HeroSection />
    </>
  );
};

export default Homepage;
