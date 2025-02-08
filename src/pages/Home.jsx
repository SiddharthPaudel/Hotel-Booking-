
import hom from "../assets/new_img.jpg";
import './Home.css';

import Service from "../components/Service";
import AboutUs from "../components/AboutUs";
import Quote from "../components/Quote";

import HotelList from "../components/HotelList";
import ContactForm from "../contact/ContactForm";


const Home = () => {
  return (
    <>
      {/* Image Section */}
      <div className="image-container">
        <img src={hom} alt="Welcome to the site" />
        <div className="search-bar-container">
          <h2>Book Perfect Stay for Your Vacation</h2>
          <button className="explore-btn">Explore</button>
        </div>
      </div>
      <br/>
      <AboutUs/>
      <br/>
      <Service/>
      <br/>
      <HotelList/>
      <br/>
      <Quote/>
      <br/>
      <ContactForm/>

      


      

    
    </>
  );
};

export default Home;
