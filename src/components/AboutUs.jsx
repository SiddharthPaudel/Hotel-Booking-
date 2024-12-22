import React from 'react';
import './AboutUs.css'; // Include your CSS for styling
import Hom from "../assets/home.jpg";
import Laptop from "../assets/Laptop.jpg";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* About Us Section */}
      <section className="about-section">
        <div className="about-image">
          <img
            src={Laptop}
            alt="Team working on laptops"
            className="responsive-image"
          />
        </div>
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            QuickStay is dedicated to making hotel
            booking effortless and enjoyable. With a wide selection of
            accommodations and a user-friendly interface, we ensure that every
            traveler finds their ideal stay.
          </p>
        </div>
      </section>


      {/* Footer Call-to-Action */}
      <section className="cta-section">
        <h2>Ready to Plan Your Next Stay?</h2>
        <p>Discover the best hotels and experiences with QuickStay.</p>
        <button className="cta-button">Explore Now</button>
      </section>
    </div>
  );
};

export default AboutUs;
