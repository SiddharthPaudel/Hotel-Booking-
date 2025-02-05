import React, { useState, useEffect } from "react";
import { Table, InputGroup, FormControl } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import "./customer.css";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch registered users from API
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

  // Delete a user
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/customers/${id}`)
      .then(() => {
        setCustomers(customers.filter((customer) => customer._id !== id));
      })
      .catch((err) => {
        console.error("Delete Error:", err);
        setError("Failed to delete customer");
      });
  };

  // Filter users based on search
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
            <Table hover className="customer-modern-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
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
                      <button className="customer-btn customer-btn-primary">
                        Edit
                      </button>
                      <button
                        className="customer-btn customer-btn-danger customer-ml-3"
                        onClick={() => handleDelete(customer._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </div>
  );
};

export default Customer;
