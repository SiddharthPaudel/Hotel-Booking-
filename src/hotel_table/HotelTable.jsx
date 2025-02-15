import { useEffect, useState } from "react";
import { Table, Button, Form, Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa"; 
import './hotel.css';

const HotelTable = () => {
  const [hotels, setHotels] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
    rooms: "Available",
  });
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingHotel, setDeletingHotel] = useState(null);

  // Fetch hotels from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/hotels")
      .then((response) => setHotels(response.data))
      .catch((error) => console.error("Error fetching hotels:", error));
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Open Edit Mode
  const handleEdit = (hotel) => {
    setEditingHotel(hotel._id);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      pricePerNight: hotel.pricePerNight,
      rooms: hotel.rooms,
    });
    setShowModal(true);
  };

  // Handle Update
  const handleUpdate = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("pricePerNight", formData.pricePerNight);
    formDataToSend.append("rooms", formData.rooms);

    if (imageFile) {
      formDataToSend.append("image", imageFile);
    }

    axios
      .put(`http://localhost:5000/api/hotels/${editingHotel}`, formDataToSend)
      .then((response) => {
        setHotels(
          hotels.map((hotel) =>
            hotel._id === editingHotel ? response.data : hotel
          )
        );
        setShowModal(false);
        setEditingHotel(null);
        setFormData({ name: "", location: "", description: "", pricePerNight: "", rooms: "Available" });
        toast.success("Hotel updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating hotel:", error.response || error.message);
        toast.error("Failed to update hotel!");
      });
  };

  // Open Delete Confirmation Modal
  const handleDelete = (hotelId) => {
    setDeletingHotel(hotelId);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    axios
      .delete(`http://localhost:5000/api/hotels/${deletingHotel}`)
      .then(() => {
        setHotels(hotels.filter((hotel) => hotel._id !== deletingHotel));
        setShowDeleteModal(false);
        setDeletingHotel(null);
        toast.success("Hotel deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting hotel:", error);
        toast.error("Failed to delete hotel!");
        setShowDeleteModal(false);
      });
  };

  // Filter hotels based on search query
  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="hotel-table-container mt-4">
      <h2 className="hotel-table-title">Hotel Details</h2>

      {/* Search Bar */}
      <div className="hotel-search-bar-wrapper">
        <input
          type="text"
          className="hotel-search-input"
          placeholder="Search hotels..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="hotel-search-button">
          <FaSearch className="hotel-search-icon" />
        </Button>
      </div>

      {/* Hotels Table */}
      <div className="hotel-table-wrapper">
        <Table striped bordered hover className="hotel-modern-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Description</th>
              <th>Price</th>
              <th>Room Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHotels.map((hotel) => (
              <tr key={hotel._id}>
                <td>{hotel.name}</td>
                <td>{hotel.location}</td>
                <td className="hotel-description">{hotel.description}</td>
                <td>{`$${hotel.pricePerNight}`}</td>
                <td>{hotel.rooms}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEdit(hotel)} // Edit hotel
                    className="hotel-action-button me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(hotel._id)} // Delete hotel
                    className="hotel-action-button"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for Editing Hotel */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name">
                  <Form.Label>Hotel Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group controlId="pricePerNight">
                  <Form.Label>Price Per Night</Form.Label>
                  <Form.Control
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="rooms">
                  <Form.Label>Room Status</Form.Label>
                  <Form.Control
                    as="select"
                    name="rooms"
                    value={formData.rooms}
                    onChange={handleChange}
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                    <option value="Under Maintenance">Under Maintenance</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Image Upload */}
            <Form.Group controlId="image">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Hotel</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this hotel?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HotelTable;
