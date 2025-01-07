import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import Hom from "../../assets/home.jpg"; // Import your local image
import Hotel2 from "../../assets/blue_hotel.jpg"; // Import any additional images
import Hotel3 from "../../assets/hotel5.jpeg"; // Import any additional images
import Hotel4 from "../../assets/n1.webp"; // Import any additional images
import Hotel5 from "../../assets/n3.webp"; // Import any additional images

const HotelPage = () => {
  // Static hotel data
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
  ];

  return (
    <Container>
      <h2 className="my-4 text-center">Available Hotels</h2>
      <Row>
        {hotels.map((hotel) => (
          <Col key={hotel.id} md={4} className="mb-4">
            <Card className="shadow-sm border-0" style={{ minWidth: "18rem" }}>
              <Card.Img
                variant="top"
                src={hotel.image || "https://via.placeholder.com/300"}
                alt={hotel.name}
                style={{
                  height: "200px", // Set fixed height for the image
                  objectFit: "cover", // Ensures the image covers the area while maintaining aspect ratio
                  borderRadius: "0.25rem 0.25rem 0 0", // Rounded top corners
                  width: "100%", // Make sure it takes the full width of the card
                  overflow: "hidden", // Prevent any overflow
                }}
              />
              <Card.Body>
                <Card.Title className="fw-bold">{hotel.name}</Card.Title>
                <Card.Text>
                  <small className="text-muted">
                    <i className="bi bi-geo-alt-fill"></i> {hotel.location}
                  </small>
                </Card.Text>
                <Card.Text className="text-muted">
                  {hotel.description}
                </Card.Text>
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
