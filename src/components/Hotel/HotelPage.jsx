import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Hom from "../../assets/home.jpg"; // Import your local image
import Hotel2 from "../../assets/blue_hotel.jpg"; // Import any additional images
import Hotel3 from "../../assets/hotel5.jpeg"; // Import any additional images
import Hotel4 from "../../assets/n1.webp"; // Import any additional images
import Hotel5 from "../../assets/n3.webp"; // Import any additional images
import "./HotelPage.css";

const HotelPage = () => {
  const hotels = [
    {
      id: 1,
      name: "Ocean View Resort",
      image: Hom,
      price: 120,
      description: "Relax by the ocean and enjoy stunning sunsets.",
      location: "California, USA",
    },
    {
      id: 2,
      name: "Mountain Retreat",
      image: Hotel2,
      price: 150,
      description: "A peaceful getaway in the heart of the mountains.",
      location: "Aspen, Colorado",
    },
    {
      id: 3,
      name: "City Center Hotel",
      image: Hotel3,
      price: 100,
      description: "Stay close to the city's best attractions.",
      location: "New York City, USA",
    },
    {
      id: 4,
      name: "Coastal Paradise",
      image: Hotel4,
      price: 180,
      description: "Luxury and comfort by the sea.",
      location: "Miami, Florida",
    },
    {
      id: 5,
      name: "Countryside Inn",
      image: Hotel5,
      price: 90,
      description: "Experience the charm of the countryside.",
      location: "Yorkshire, UK",
    },
    {
      id: 6,
      name: "Luxury Urban Hotel",
      image: Hotel3,
      price: 200,
      description: "A premium stay with modern amenities.",
      location: "London, UK",
    },
  ];

  return (
    <Container className="hotel-page py-4">
    <Row className="g-4">
      {hotels.map((hotel) => (
        <Col key={hotel.id} xs={12} sm={6} lg={4}>
          <Card className="hotel-card shadow-sm border-0">
            <Card.Img
              variant="top"
              src={hotel.image || "https://via.placeholder.com/300"}
              alt={hotel.name}
            />
            <Card.Body>
              <Card.Title className="fw-bold">{hotel.name}</Card.Title>
              <Card.Text>
                <small className="text-muted">
                  <i className="bi bi-geo-alt-fill"></i> {hotel.location}
                </small>
              </Card.Text>
              <Card.Text className="text-muted">{hotel.description}</Card.Text>
              <Card.Text>
                <strong>Price:</strong> ${hotel.price} per night
              </Card.Text>
              <Button variant="primary" className="w-100">
                Book Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  
  );
};

export default HotelPage;
