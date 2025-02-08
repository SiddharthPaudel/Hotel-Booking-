import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Carousel,
  Form,
} from "react-bootstrap";
import axios from "axios";
import "./HotelPage.css";

const HotelPage = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numRooms, setNumRooms] = useState(1);

  // Fetch hotels from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hotels")
      .then((response) => {
        setHotels(
          response.data.map((hotel) => ({
            ...hotel,
            images: hotel.images
              ? hotel.images.map((img) =>
                  img.startsWith("http")
                    ? img
                    : `http://localhost:5000/hotel_images/${img}`
                )
              : [],
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching hotels:", error);
      });
  }, []);

  // Filter hotels based on search criteria
  const handleSearch = () => {
    const filtered = hotels.filter((hotel) => {
      const matchesLocation = hotel.location
        .toLowerCase()
        .includes(location.toLowerCase());
      return matchesLocation;
    });
    setFilteredHotels(filtered);
  };

  // Initialize filtered hotels when hotels data is fetched or search criteria change
  useEffect(() => {
    setFilteredHotels(hotels);
  }, [hotels]);

  return (
    <Container className="hotel-page py-4">
      {/* Search Form */}
      <Form className="hotel-search-form mb-4 p-4 bg-white rounded shadow-sm">
  <Row className="align-items-end g-3">
    <Col md={3}>
      <Form.Group controlId="location">
        <Form.Label className="form-label">Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="hotel-search-input"
        />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="checkInDate">
        <Form.Label className="form-label">Check-in Date</Form.Label>
        <Form.Control
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
          className="hotel-search-input"
        />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="checkOutDate">
        <Form.Label className="form-label">Check-out Date</Form.Label>
        <Form.Control
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
          className="hotel-search-input"
        />
      </Form.Group>
    </Col>
    <Col md={2}>
      <Form.Group controlId="numRooms">
        <Form.Label className="form-label">Rooms</Form.Label>
        <Form.Control
          type="number"
          min="1"
          value={numRooms}
          onChange={(e) => setNumRooms(e.target.value)}
          className="hotel-search-input"
        />
      </Form.Group>
    </Col>
    <Col md={3} className="d-flex align-items-end">
      <Button
        variant="primary"
        onClick={handleSearch}
        className="hotel-search-btn w-100"
      >
        Search
      </Button>
    </Col>
  </Row>
</Form>
      <Row className="g-4">
      {filteredHotels.map((hotel) => (
  <Col key={hotel._id} xs={12} sm={6} lg={4}>
    <Link to={`/hotel/${hotel._id}`} style={{ textDecoration: 'none' }}>
      <Card className="hotel-card shadow-sm border-0">
        <Carousel>
          {hotel.images.length > 0 ? (
            hotel.images.map((img, index) => (
              <Carousel.Item key={index}>
                <Card.Img
                  variant="top"
                  src={img}
                  alt={`Hotel ${index}`}
                />
              </Carousel.Item>
            ))
          ) : (
            <Carousel.Item>
              <Card.Img
                variant="top"
                src="https://via.placeholder.com/300"
                alt="Placeholder"
              />
            </Carousel.Item>
          )}
        </Carousel>

        <Card.Body>
          <Card.Title className="fw-bold">{hotel.name}</Card.Title>
          <Card.Text>
            <small className="text-muted">
              <i className="bi bi-geo-alt-fill"></i> {hotel.location}
            </small>
          </Card.Text>
          <Card.Text>
            <strong>Price:</strong> ${hotel.pricePerNight} per night
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  </Col>
))}
      </Row>
    </Container>
  );
};

export default HotelPage;