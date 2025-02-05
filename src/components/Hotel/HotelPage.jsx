import { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./HotelPage.css";

const HotelPage = () => {
  const [hotels, setHotels] = useState([]);

  // Fetch hotels from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/hotels")
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, []);

  return (
    <Container className="hotel-page py-4">
      <Row className="g-4">
        {hotels.map((hotel) => (
          <Col key={hotel._id} xs={12} sm={6} lg={4}>
            <Card className="hotel-card shadow-sm border-0">
              {/* Updated Image Source */}
              <Card.Img
                variant="top"
                src={hotel.image ? `http://localhost:5000/uploads/${hotel.image}` : "https://via.placeholder.com/300"}
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
                  <strong>Price:</strong> ${hotel.pricePerNight} per night
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
