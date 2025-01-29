import React, { useState, useEffect } from 'react';
import { Table, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Import the FontAwesome search icon
import axios from 'axios'; // Import axios for making HTTP requests
import './customer.css';

const Customer = () => {
  const [customers, setCustomers] = useState([]); // Ensure customers is initialized as an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(null); // Error state for handling fetch errors

  useEffect(() => {
    axios.get('/api/customers')
      .then((response) => {
        console.log('API Response:', response.data);

        // Check if the response contains data and it's an array
        if (response.status === 200 && Array.isArray(response.data)) {
          setCustomers(response.data);
        } else if (response.data && response.data.customers) {
          // Handle case where the data structure might include 'customers' field
          setCustomers(response.data.customers);
        } else {
          setError('Invalid data format received from server');
        }
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
        setError('Failed to load customers');
      });
  }, []);

  const handleDelete = (id) => {
    // Handle deleting a customer by their ID
    axios
      .delete(`/api/customers/${id}`) // Backend route for deleting a customer
      .then(() => {
        setCustomers(customers.filter((customer) => customer._id !== id)); // Remove deleted customer from state
      })
      .catch((error) => {
        setError('Failed to delete customer');
      });
  };

  const filteredCustomers = Array.isArray(customers)
    ? customers.filter((customer) =>
        customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="customer-container">
      <h3 className="customer-title">Customer Table</h3>

      <InputGroup className="customer-input-group">
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl
          placeholder="Search by Username or Email"
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {/* Loading or error state */}
      {loading ? (
        <p>Loading customers...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {filteredCustomers.length === 0 ? (
            <p>No customers found</p>
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
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id}>
                    <td>{customer._id}</td>
                    <td>{customer.username}</td>
                    <td>{customer.email}</td>
                    <td>
                      <button className="customer-btn customer-btn-primary">Edit</button>
                      <button
                        className="customer-btn customer-btn-danger customer-ml-3"
                        onClick={() => handleDelete(customer._id)} // Trigger delete action
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
