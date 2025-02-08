import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import "./HotelDes.css";

const HotelDes = () => {
  const { id } = useParams();  // Get the hotel ID from the URL
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    // Fetch hotel details by ID
    axios
      .get(`http://localhost:5000/api/hotels/${id}`)
      .then((response) => {
        setHotel({
          ...response.data,
          images: response.data.images
            ? response.data.images.map((img) =>
                img.startsWith("http")
                  ? img
                  : `http://localhost:5000/hotel_images/${img}`
              )
            : [],  // Ensure images are properly formatted
        });
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
      });
  }, [id]);  // Re-run effect when `id` changes

  if (!hotel) {
    return <div>Loading...</div>;  // Show loading message until hotel data is fetched
  }

  return (
    <Container className="hotel-details-page py-5">
      <Row className="g-4 align-items-center">
        {/* Hotel Image Section */}
        <Col md={5} xs={12}>
          <Carousel>
            {hotel.images && hotel.images.length > 0 ? (
              hotel.images.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={img}
                    alt={`Hotel image ${index + 1}`}
                    style={{ objectFit: "cover", maxHeight: "300px" }} // Set max height for the image
                  />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x400"
                  alt="Placeholder"
                  style={{ objectFit: "cover", maxHeight: "300px" }}
                />
              </Carousel.Item>
            )}
          </Carousel>
        </Col>

        {/* Hotel Description and Booking Section */}
        <Col md={7} xs={12}>
          <div className="hotel-info">
            <h1 className="fw-bold">{hotel.name}</h1>
            <p className="text-muted">
              <i className="bi bi-geo-alt-fill"></i> {hotel.location}
            </p>
            <p>{hotel.description}</p>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <p className="fs-4">
                <strong>Price:</strong> ${hotel.pricePerNight} per night
              </p>
              <p className="fs-4">
                <strong>Rooms Available:</strong> {hotel.roomsAvailable}
              </p>
            </div>

            {/* Booking Form */}
            <Button variant="primary" className="w-100">
              Book Now
            </Button>
          </div>
        </Col>
      </Row>

      {/* Sidebar for Additional Details (optional) */}
      <Row className="mt-4">
        <Col md={12}>
          <div className="card shadow-sm border-0 p-4">
            <h4 className="fw-bold mb-3">Hotel Amenities</h4>
            <ul>
              {hotel.amenities && hotel.amenities.length > 0 ? (
                hotel.amenities.map((amenity, index) => (
                  <li key={index} className="mb-2">
                    <i className="bi bi-check-circle-fill text-success"></i> {amenity}
                  </li>
                ))
              ) : (
                <li>No amenities listed</li>
              )}
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelDes;
