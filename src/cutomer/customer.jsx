import React, { useState } from 'react';
import { Table, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Import the FontAwesome search icon
import './customer.css'

const Customer = () => {
  // Example customer data
  const customers = [
    { id: 1, username: "JohnDoe", email: "john.doe@example.com" },
    { id: 2, username: "JaneSmith", email: "jane.smith@example.com" },
    // Add more customer data here
  ];

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) =>
    customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customer-table-container">
      <h3 className="customer-table-title">Customer Table</h3>

      {/* Search Bar with Icon */}
      <InputGroup className="mb-3">
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

      {/* Customer Table */}
      <Table  hover className="modern-table">
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
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.username}</td>
              <td>{customer.email}</td>
              <td>
                {/* Action buttons with a gap between them */}
                <button className="btn btn-primary btn-sm">Edit</button>
                <button className="btn btn-danger btn-sm ml-3">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Customer;
