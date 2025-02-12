import React, { useState, useEffect } from "react";
import { Table, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./customer.css";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers data on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/customers") // Ensure correct API endpoint
      .then((response) => {
        console.log("API Response:", response.data); // Debugging log
        if (Array.isArray(response.data)) {
          setCustomers(response.data);
        } else {
          setError("Invalid data format received from server");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError("Failed to load customers");
        setLoading(false);
      });
  }, []);

  // Fetch active status of a customer
  const getActiveStatus = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/customers/active-status/${id}`
      );
      return response.data.isActive;
    } catch (err) {
      console.error("Error fetching active status:", err);
      setError("Failed to fetch active status");
      return false;
    }
  };

  // Toggle active status of a customer
  const toggleActiveStatus = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus; // Toggle the status
      const response = await axios.put(
        `http://localhost:5000/api/customers/active-status/${id}`,
        {
          isActive: newStatus,
        }
      );

      if (response.status === 200) {
        // Optimistic UI update: reflect the change immediately in the table
        setCustomers(
          customers.map((customer) =>
            customer._id === id ? { ...customer, isActive: newStatus } : customer
          )
        );
        toast.success(`User ${newStatus ? "activated" : "deactivated"} successfully!`);
      } else {
        setError("Failed to update active status");
      }
    } catch (err) {
      console.error("Error updating active status:", err);
      setError("Failed to update active status");
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/customers/${id}`);
      if (response.status === 200) {
        // Remove the customer from the UI immediately after successful deletion
        setCustomers(customers.filter((customer) => customer._id !== id));
        toast.success("Customer deleted successfully");
      } else {
        setError("Failed to delete customer");
      }
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError("Failed to delete customer");
    }
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-container">
      <h3 className="customer-title">Registered Users</h3>

      {/* Search Input */}
      <InputGroup className="customer-input-group">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          placeholder="Search by Username or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Show Loading, Error, or Data */}
      {loading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {filteredCustomers.length === 0 ? (
            <p>No users found</p>
          ) : (
            <Table hover responsive="sm" className="customer-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Active Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer, index) => (
                  <tr key={customer._id || index}>
                    <td>{index + 1}</td>
                    <td>{customer?.username || "No Username"}</td>
                    <td>{customer?.email || "No Email"}</td>
                    <td>
                      {customer.isActive ? (
                        <span style={{ color: "green" }}>Active</span>
                      ) : (
                        <span style={{ color: "red" }}>Inactive</span>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() =>
                          toggleActiveStatus(customer._id, customer.isActive)
                        }
                      >
                        {customer.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(customer._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Customer;
