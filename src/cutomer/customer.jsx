import React, { useState } from 'react';
import { Table, InputGroup, FormControl } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa'; // Import the FontAwesome search icon
import './customer.css';

const Customer = () => {
  const customers = [
    { id: 1, username: "JohnDoe", email: "john.doe@example.com" },
    { id: 2, username: "JaneSmith", email: "jane.smith@example.com" },
    // Add more customer data here
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter((customer) =>
    customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.username}</td>
              <td>{customer.email}</td>
              <td>
                <button className="customer-btn customer-btn-primary">Edit</button>
                <button className="customer-btn customer-btn-danger customer-ml-3">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Customer;
