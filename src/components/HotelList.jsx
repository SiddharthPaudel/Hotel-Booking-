import React from "react";
import "./HotelList.css"; // Custom styles
import Hom from "../assets/home.jpg"; // Import your local image
import Hotel2 from "../assets/blue_hotel.jpg"; // Import any additional images
import Hotel3 from "../assets/hotel5.jpeg"; // Import any additional images

const hotels = [
  {
    name: "Hotel Mystic Mountain",
    address: "Baluwapati Deupur 44812",
    rating: "9.4/10",
    reviews: "2500+ Happy Guests",
    image: Hom, // Use the imported image directly
  },
  {
    name: "Hotel Shambala",
    address: "Bansbari Rd, Kathmandu",
    rating: "9.4/10",
    reviews: "2500+ Happy Guests",
    image: Hotel2, // Reuse the imported image if needed
  },
  {
    name: "Redstone Regency Hotel",
    address: "Paknajol, Kathmandu 44600",
    rating: "9.4/10",
    reviews: "2500+ Happy Guests",
    image: Hotel3, // Use the correct imported path for this image
  },
];

const HotelList = () => {
  return (
    <div className="container my-4">
      {hotels.map((hotel, index) => (
        <div className="hotel-box d-flex align-items-center my-3 shadow rounded" key={index}>
          <div className="hotel-image">
            <img
              src={hotel.image} // Reference the `image` property correctly
              alt={hotel.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="hotel-info flex-grow-1 px-3">
            <h5 className="hotel-name mb-1">{hotel.name}</h5>
            <p className="hotel-address text-muted mb-1">{hotel.address}</p>
            <p className="hotel-reviews text-muted mb-1">
              🌟 {hotel.rating} | {hotel.reviews}
            </p>
          </div>
          <div>
            <button className="btn btn-primary btn-sm">Explore</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelList;
