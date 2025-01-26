
import hom from "../assets/new_img.jpg";
import './Home.css';

import Service from "../components/Service";
import AboutUs from "../components/AboutUs";
import HotelList from "../components/HotelList";
import Quote from "../components/Quote";


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

      


      

    
    </>
  );
};

export default Home;
