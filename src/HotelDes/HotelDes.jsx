import { useState, useEffect } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap";
import "./HotelDes.css";

const HotelDes = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate(); // To navigate after booking

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/hotels/${id}`)
      .then((response) => {
        const formattedImages = response.data.images
          ? response.data.images.map((img) =>
              img.startsWith("http")
                ? img
                : `http://localhost:5000/hotel_images/${img}`
            )
          : [];
        setHotel({
          ...response.data,
          images: formattedImages,
        });
        setSelectedImage(formattedImages[0]);
      })
      .catch((error) => {
        console.error("Error fetching hotel details:", error);
      });
  }, [id]);

  const handleBooking = () => {
    // Save the selected hotel to localStorage
    
    localStorage.setItem("bookedHotel", JSON.stringify(hotel));
  
    // Navigate to the confirmation page or homepage
    navigate("/booking-confirmation"); // Navigate to confirmation page (or any other page)
  };
  

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="hotel-details-page py-5">
      <Row className="g-4">
        {/* Left Side: Vertical Image Grid */}
        <Col lg={3} md={4} xs={12} className="order-md-1 order-2">
          <div className="image-grid">
            {hotel.images.map((img, index) => (
              <div
                key={index}
                className={`grid-item ${selectedImage === img ? "active" : ""}`}
                onClick={() => setSelectedImage(img)}
              >
                <Image src={img} alt={`Hotel image ${index + 1}`} fluid thumbnail />
              </div>
            ))}
          </div>
        </Col>

        {/* Right Side: Hotel Details and Image in Card */}
        <Col lg={9} md={8} xs={12} className="order-md-2 order-1">
          <Card className="hotel-card shadow-sm border-0 p-4">
            <Row>
              {/* Square Image Preview */}
              <Col md={5} xs={12}>
                <div className="selected-image-preview">
                  <Image
                    src={selectedImage || "https://via.placeholder.com/400"}
                    alt="Selected Hotel"
                    fluid
                    className="rounded-square"
                  />
                </div>
              </Col>

              {/* Hotel Details */}
              <Col md={7} xs={12} className="d-flex flex-column justify-content-between">
                <div>
                  <h1 className="fw-bold">{hotel.name}</h1>
                  <p className="text-muted">
                    <i className="bi bi-geo-alt-fill"></i> {hotel.location}
                  </p>
                  <p className="hotel-description">{hotel.description}</p>
                  <div className="price-info d-flex justify-content-between align-items-center">
                    <p className="fs-4">
                      <strong>Price:</strong> ${hotel.pricePerNight} / night
                    </p>
                    <p className="fs-4">
                      <strong>Rooms:</strong> {hotel.rooms}
                    </p>
                  </div>
                </div>
                <Button
    variant="primary"
    as={Link}
    to={`/book/${hotel._id}`} // Link to the booking page for the specific hotel
    className="w-100"
  >
    Book Now
  </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelDes;
