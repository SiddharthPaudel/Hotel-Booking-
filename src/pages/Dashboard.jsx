import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import Sidebar from "../components/Sidebar";


// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Dashboard = () => {
  // Static Data for Pie Chart
  const pieData = {
    labels: ["Direct Bookings", "Third-Party Websites", "Corporate Clients"],
    datasets: [
      {
        label: "Booking Sources",
        data: [45, 35, 20],
        backgroundColor: ["#4CAF50", "#FF9800", "#03A9F4"],
        hoverBackgroundColor: ["#66BB6A", "#FFB74D", "#29B6F6"],
        borderWidth: 2,
        borderColor: "#ffffff",
      },
    ],
  };

  // Pie Chart Options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ddd",
        borderWidth: 1,
      },
    },
  };

  // Static Data for Bar Graph
  const barData = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "Number of Customers",
        data: [20, 35, 40, 30, 50, 60, 45],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6384",
        ],
        hoverBackgroundColor: [
          "#FF8196",
          "#5CA9F3",
          "#FFE57C",
          "#67D2D2",
          "#B59CFF",
          "#FFB369",
          "#FF8196",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  // Bar Graph Options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ddd",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days of the Week",
          color: "#666",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "#333",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Customers",
          color: "#666",
          font: {
            size: 14,
            weight: "bold",
          },
        },
        ticks: {
          color: "#333",
        },
      },
    },
  };

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={2}>
        <Sidebar/>
        </Col>

        {/* Main Content */}
        <Col md={10} className="bg-light">
          <Row className="p-4">
            <Col>
              <h3>Dashboard</h3>
              <p>Hi, Samantha</p>
            </Col>
          </Row>

          {/* Charts Section */}
          <Row className="p-4">
            <Col md={6}>
              {/* Pie Chart */}
              <Card className="p-3 mb-4 shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">Booking Sources (Pie Chart)</h5>
                  <Pie data={pieData} options={pieOptions} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              {/* Bar Graph */}
              <Card className="p-3 shadow-sm">
                <Card.Body>
                  <h5 className="mb-3">Customer Distribution (Bar Graph)</h5>
                  <Bar data={barData} options={barOptions} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
