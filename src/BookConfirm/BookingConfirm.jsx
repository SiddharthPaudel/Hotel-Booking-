import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const BookingConfirmation = () => {
  const [bookedHotel, setBookedHotel] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const hotelData = localStorage.getItem("bookedHotel");
    if (hotelData) {
      setBookedHotel(JSON.parse(hotelData));
    } else {
      navigate("/"); // Redirect to homepage if no booking found
    }
  }, [navigate]);

  const handleGoBack = () => {
    navigate("/"); // Navigate to homepage
  };

  if (!bookedHotel) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="booking-confirmation py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm border-0 p-4">
            <h2 className="text-center">Booking Confirmation</h2>
            <div className="text-center">
              <h4>{bookedHotel.name}</h4>
              <p>{bookedHotel.location}</p>
              <p><strong>Price:</strong> ${bookedHotel.pricePerNight} / night</p>
              <p><strong>Rooms:</strong> {bookedHotel.rooms}</p>
              <Button variant="primary" onClick={handleGoBack}>Go to Home</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingConfirmation;
