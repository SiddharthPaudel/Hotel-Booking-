import Footer from "../components/Footer";
import Header from "../components/Header";
import HomePageImage from "../assets/HomePage_image.jpg"; // Ensure correct path and file extension
import Hotel1 from "../assets/n1.webp";
import Hotel2 from "../assets/n4.jpg";
import Hotel3 from "../assets/n3.webp";
import './Home.css';
import Card from "../components/Card";

const Home = () => {
  return (
    <>
      <Header />
      {/* Image Section */}
      <div className="image-container">
        <img src={Hotel1} alt="Welcome to the site" />
        <div className="search-bar-container">
          <h2>Book Perfect Stay for Your Vacation</h2>
          
        </div>
      </div>

      
         {/* Card Section */}
      <div className="card-section">
        <h3 className="section-title">Our Top Rated & Highly Visited Hotels </h3>
        <Card />
      </div>

      


      

      <Footer />
    </>
  );
};

export default Home;
