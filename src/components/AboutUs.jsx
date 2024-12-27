import React from 'react';
import './AboutUs.css'; // Include your CSS for styling
import Hom from "../assets/home.jpg";
import Laptop from "../assets/Laptop.jpg";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* What We Offer Section */}
      <section className="offer-section">
        <h2 className="offer-title">What We Are</h2>
       
      </section>

      {/* About Section with Image and Text */}
      <section className="about-section">
        <div className="about-image">
          <img
            src={Laptop}
            alt="Team working on laptops"
            className="responsive-image"
          />
        </div>
        <div className="about-text">
         
          <p>
            QuickStay is dedicated to making hotel booking effortless and
            enjoyable. With a wide selection of accommodations and a
            user-friendly interface, we ensure that every traveler finds their
            ideal stay.
          </p>
        </div>
      </section>

     
    </div>
  );
};

export default AboutUs;
