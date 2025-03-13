import React from "react";
import Doctor from "./doctor-group.png";
import SolutionStep from "./SolutionStep";
import "./About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={Doctor} alt="Expert Team" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to CodeCrafters, your go-to platform for innovative and
          efficient tech solutions. We specialize in building cutting-edge web
          applications, offering expert consulting, and empowering developers
          through insightful resources. Join us in shaping the future of
          technology.
        </p>

        <h4 className="about-text-title">Our Approach</h4>

        <SolutionStep
          title="Consult with Experts"
          description="Get guidance from top industry professionals. Our team ensures personalized support tailored to your needs."
        />

        <SolutionStep
          title="Plan Your Project"
          description="Collaborate with us to map out your project’s vision, timeline, and key milestones. Precision and efficiency guaranteed."
        />

        <SolutionStep
          title="Achieve Your Goals"
          description="With our expertise, transform your ideas into reality. We deliver scalable, high-performance solutions."
        />
      </div>
    </div>
  );
}

export default About;