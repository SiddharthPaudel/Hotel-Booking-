
import Hotel1 from "../assets/n1.webp";
import Hotel2 from "../assets/n4.jpg";
import Hotel3 from "../assets/n3.webp";
import Hotel4 from "../assets/hotel5.jpeg"
import "./Card.css"; // Import the CSS file for styling

const Card = () => {
  return (
    <>
      <div className="card-group">
        <div className="card">
          <img src={Hotel1} className="card-img-top" alt="Hotel 1" />
          <button className="explore-button">Explore</button>
          <div className="card-body">
            <h5 className="card-title">Hotel 1</h5>
           
           
          </div>
        </div>

        <div className="card">
          <img src={Hotel2} className="card-img-top" alt="Hotel 2" />
          <button className="explore-button">Explore</button>
          <div className="card-body">
            <h5 className="card-title">Hotel 2</h5>
          
          </div>
        </div>

        <div className="card">
          <img src={Hotel3} className="card-img-top" alt="Hotel 3" />
          <button className="explore-button">Explore</button>
          <div className="card-body">
            <h5 className="card-title">Hotel 3</h5>
           
          
          </div>
        </div>


        <div className="card">
          <img src={Hotel4} className="card-img-top" alt="Hotel 3" />
          <button className="explore-button">Explore</button>
          <div className="card-body">
            <h5 className="card-title">Hotel 3</h5>
           
            
          </div>
        </div>

        
      </div>
    </>
  );
};

export default Card;
