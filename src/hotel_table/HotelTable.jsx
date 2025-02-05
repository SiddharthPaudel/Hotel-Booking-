import { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";  // Import toastify

const HotelTable = () => {
  const [hotels, setHotels] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null);  // Store hotelId here
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    pricePerNight: "",
    rooms: "Available",
  });
  const [imageFile, setImageFile] = useState(null);

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
    setEditingHotel(hotel._id);  // Save hotelId
    setFormData({
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
      pricePerNight: hotel.pricePerNight,
      rooms: hotel.rooms,
    });
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
      formDataToSend.append("image", imageFile); // Handle image file upload
    }

    axios
      .put(`http://localhost:5000/api/hotels/${editingHotel}`, formDataToSend)
      .then((response) => {
        setHotels(
          hotels.map((hotel) =>
            hotel._id === editingHotel ? response.data : hotel
          )
        );
        setEditingHotel(null); // Reset the editing state
        setFormData({ name: "", location: "", description: "", pricePerNight: "", rooms: "Available" });
        toast.success("Hotel updated successfully!");  // Success toast
      })
      .catch((error) => {
        console.error("Error updating hotel:", error.response || error.message);
        toast.error("Failed to update hotel!");  // Error toast
      });
  };

  // Handle Delete
  const handleDelete = (hotelId) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      axios
        .delete(`http://localhost:5000/api/hotels/${hotelId}`)
        .then(() => {
          setHotels(hotels.filter((hotel) => hotel._id !== hotelId));
          toast.success("Hotel deleted successfully!");  // Success toast
        })
        .catch((error) => {
          console.error("Error deleting hotel:", error);
          toast.error("Failed to delete hotel!");  // Error toast
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Hotels</h2>
      <Table striped bordered hover>
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
          {hotels.map((hotel) => (
            <tr key={hotel._id}>
              <td>
                {editingHotel === hotel._id ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                ) : (
                  hotel.name
                )}
              </td>
              <td>
                {editingHotel === hotel._id ? (
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                ) : (
                  hotel.location
                )}
              </td>
              <td>
                {editingHotel === hotel._id ? (
                  <Form.Control
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                ) : (
                  hotel.description
                )}
              </td>
              <td>
                {editingHotel === hotel._id ? (
                  <Form.Control
                    type="number"
                    name="pricePerNight"
                    value={formData.pricePerNight}
                    onChange={handleChange}
                  />
                ) : (
                  `$${hotel.pricePerNight}`
                )}
              </td>
              <td>
                {editingHotel === hotel._id ? (
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
                ) : (
                  hotel.rooms
                )}
              </td>
              <td>
                {editingHotel === hotel._id ? (
                  <Button
                    variant="success"
                    onClick={handleUpdate} // Directly handle update action here
                    className="me-2"
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() => handleEdit(hotel)}  // Pass hotel data to edit
                    className="me-2"
                  >
                    Edit
                  </Button>
                )}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(hotel._id)}  // Delete action
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HotelTable;
