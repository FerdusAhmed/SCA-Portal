import React from "react";
import Hero from "./Hero/Hero";
import AcademicPrograms from "../../components/Home/AcademicPrograms";
import NoticeBoard from "../../components/Home/NoticeBoard";
import SecureCloudSystem from "../../components/Home/SecureCloudSystem";
import Testimonials from "../../components/Home/Testimonials";
import Container from "../../Layouts/Container";
import Collaboration from "../../components/Home/Collaboration";
import SocialProof from "../../components/Home/SocialProof";
import HowItWorks from "../../components/Home/HowItWorks";
import FAQ from "../../components/Home/FAQ";
import Contact from "../../components/Home/Contact";

const Home = () => {
  return (
    <>
      <Hero />

      {/* Create by Saleh ahmad */}
      <AcademicPrograms />
      {/* Create by Saleh ahmad */}
      <NoticeBoard />
      
      {/* Koushik - Codes - Start */}
      {/* Marquee section */}
      {/* <div className="mt-0 mb-0 border-0">
        {/* <h2 className="text-center pt-8 text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Paid Sponsors
        </h2> */}
      {/* <LogoMarquee></LogoMarquee> */}
      {/* </div> */}
      {/* Koushik - Codes - End */}
      {/* create by polok */}
       {/* Create By Emon */}
      <SocialProof></SocialProof>
      <SecureCloudSystem></SecureCloudSystem>
      {/* create by polok */}
      <Testimonials></Testimonials>
      {/* Create By Emon */}
      <Collaboration></Collaboration>
      {/* created by Peyas */}
      <HowItWorks />
      {/* created by peyas */}
      <FAQ />
      {/* created by mahialam */}
      <Contact />
    </>
  );
};

export default Home;
