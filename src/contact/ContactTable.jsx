import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import './contactTable.css';

const ContactTable = () => {
  const [contactRequests, setContactRequests] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(""); // Store only the message
  const [showModal, setShowModal] = useState(false); // Control the visibility of the modal

  // Fetch contact requests from backend
  useEffect(() => {
    const fetchContactRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/contact/getAll");
        setContactRequests(response.data);
      } catch (error) {
        console.error("Error fetching contact requests:", error);
      }
    };

    fetchContactRequests();
  }, []); // Empty dependency array to fetch data once when the component mounts

  // Delete contact request
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/contact/delete/${id}`);
      console.log(response.data.message);
      setContactRequests(contactRequests.filter(request => request._id !== id)); // Remove from state
    } catch (error) {
      console.error("Error deleting contact request:", error);
    }
  };

  // View message details
  const handleView = (message) => {
    setSelectedMessage(message); // Set only the message to show in the modal
    setShowModal(true); // Show the modal
  };

  return (
    <div className="contact-table-container my-5">
      <h3 className="contact-table-header mb-4">Contact Form Submissions</h3>
      <Table responsive="sm" className="contact-table">
        <thead className="contact-table-header-custom">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactRequests.map((request) => (
            <tr key={request._id} className="contact-table-row">
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.phone}</td>
              <td>{request.message.length > 50 ? `${request.message.substring(0, 50)}...` : request.message}</td>
              <td>{new Date(request.createdAt).toLocaleString()}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="mr-2" onClick={() => handleView(request.message)}>View</Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(request._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal to display message details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>View Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedMessage}</p> {/* Display only the message */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContactTable;
