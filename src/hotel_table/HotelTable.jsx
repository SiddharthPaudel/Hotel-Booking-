import React from "react";
import { Table, Button } from "react-bootstrap";
import "./hotel.css"; // Custom styling

const HotelTable = () => {
  // Static data for the table
  const staticHotels = [
    {
      id: 1,
      name: "Hotel Paradise",
      image: "https://via.placeholder.com/100x70",
      description: "A luxurious stay with a beautiful view.",
      pricePerNight: 150,
      rooms: "Available",
    },
    {
      id: 2,
      name: "Mountain Retreat",
      image: "https://via.placeholder.com/100x70",
      description: "Relax in the serene mountain landscapes.",
      pricePerNight: 200,
      rooms: "Booked",
    },
    {
      id: 3,
      name: "Seaside Resort",
      image: "https://via.placeholder.com/100x70",
      description: "Experience the tranquility of the ocean.",
      pricePerNight: 180,
      rooms: "Available",
    },
  ];

  return (
    <div className="hotel-table-container">
      <h3 className="hotel-table-title">Hotel</h3>

      <div className="table-wrapper">
        <Table responsive className="modern-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price per Night</th>
              <th>Room Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staticHotels.map((hotel) => (
              <tr key={hotel.id}>
                <td>{hotel.id}</td>
                <td>{hotel.name}</td>
                <td>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="hotel-image"
                  />
                </td>
                <td>{hotel.description}</td>
                <td>${hotel.pricePerNight}</td>
                <td>
                  <span
                    className={`status-badge ${
                      hotel.rooms === "Available"
                        ? "available"
                        : hotel.rooms === "Booked"
                        ? "booked"
                        : "maintenance"
                    }`}
                  >
                    {hotel.rooms}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Button variant="warning" size="sm" className="action-btn">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" className="action-btn">
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default HotelTable;
