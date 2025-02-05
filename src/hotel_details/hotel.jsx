import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./hotel.css";

const HotelForm = ({ onAddHotel }) => {
  const [newHotel, setNewHotel] = useState({
    name: "",
    image: "",
    imageFile: null, // Store the actual file
    description: "",
    pricePerNight: "",
    rooms: "Available",
  });

  // Handle file drop and store both preview and actual file
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setNewHotel({
      ...newHotel,
      image: URL.createObjectURL(file), // Image preview
      imageFile: file, // Store actual file
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel({ ...newHotel, [name]: value });
  };

  // Handle form submission
  const handleAddHotel = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newHotel.name);
      formData.append("description", newHotel.description);
      formData.append("pricePerNight", newHotel.pricePerNight);
      formData.append("rooms", newHotel.rooms);
  
      // Append the file (image) to the form data if an image is selected
      if (newHotel.imageFile) {
        formData.append("file", newHotel.imageFile); // Attach the actual file
      } else {
        console.error("Image file is missing!");
      }
  
      // Send request to backend
      const response = await axios.post("http://localhost:5000/api/hotels", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Log the full response to the console to verify
      console.log("Hotel added successfully:", response);
  
      // If the hotel is successfully added, show success message
      if (response.status === 200) {
        toast.success('Hotel added successfully!', { position: 'top-right', autoClose: 3000 });
  
        // Reset the form after success
        setNewHotel({
          name: "",
          image: "",
          imageFile: null, // Reset file
          description: "",
          pricePerNight: "",
          rooms: "Available",
        });
      }
    } catch (error) {
      console.error("Error adding hotel:", error);
      toast.error('Failed to add hotel', { position: 'top-center', autoClose: 3000 });
    }
  };
  

  return (
    <div className="add-hotel-form">
      <h4>Add New Hotel</h4>
      <Form>
        <Form.Group controlId="formHotelName">
          <Form.Label>Hotel Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={newHotel.name}
            onChange={handleInputChange}
            placeholder="Enter hotel name"
          />
        </Form.Group>

        <Form.Group controlId="formHotelImage">
          <Form.Label>Image</Form.Label>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select</p>
            {newHotel.image && (
              <img src={newHotel.image} alt="Hotel" className="hotel-image-preview" width="100" height="70" />
            )}
          </div>
        </Form.Group>

        <Form.Group controlId="formHotelDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={newHotel.description}
            onChange={handleInputChange}
            placeholder="Enter hotel description"
          />
        </Form.Group>

        <Form.Group controlId="formHotelPrice">
          <Form.Label>Price per Night</Form.Label>
          <Form.Control
            type="number"
            name="pricePerNight"
            value={newHotel.pricePerNight}
            onChange={handleInputChange}
            placeholder="Enter price per night"
          />
        </Form.Group>

        <Form.Group controlId="formHotelRooms">
          <Form.Label>Room Status</Form.Label>
          <Form.Control as="select" name="rooms" value={newHotel.rooms} onChange={handleInputChange}>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-center mt-3">
          <Button variant="primary" type="button" onClick={handleAddHotel}>
            Add Hotel
          </Button>
        </div>
      </Form>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default HotelForm;
