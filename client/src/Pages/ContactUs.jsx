import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form data:', formData);
    alert('Your message has been sent successfully!');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <Container className="contact-us-container mt-5">
      <Row>
        <Col>
          <h3 className="contact-heading">
            <span className="heading-line"></span>
            PLEASE FEEL FREE TO<br></br>CONTACT US
          </h3>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="contact-info d-flex flex-column justify-content-center">
          <div className="info-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="contact-icon" />
            <div className="info-content">
              <h5>Address</h5>
              <p>123 Petshop Street, City, Country</p>
            </div>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
            <div className="info-content">
              <h5>Email</h5>
              <p>contact@petshop.com</p>
            </div>
          </div>
          <div className="info-item">
            <FontAwesomeIcon icon={faPhone} className="contact-icon" />
            <div className="info-content">
              <h5>Phone</h5>
              <p>+123 456 7890</p>
            </div>
          </div>
        </Col>
        <Col md={6} className="contact-form">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="message" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
