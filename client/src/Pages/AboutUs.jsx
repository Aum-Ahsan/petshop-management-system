import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble, faStar, faAmbulance, faTrophy, faClock } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import aboutImage1 from '../images/Aboutimg.jpg';
import aboutImage2 from '../images/facilities.jpg';
import aboutImage3 from '../images/healthyPet.jpg';

const AboutUs = () => {
  return (
    <Container className="my-5 about-us">
      <Row className="my-4">
        <Col md={6} className="d-flex align-items-center order-md-2">
          <img src={aboutImage1} alt="Online Orders" className="img-fluid rounded" />
        </Col>
        <Col md={6} className="d-flex align-items-center order-md-1">
          <div>
            <h3 className='mt-3'>About Us</h3>
            <p>
              Our pet shop offers a wide range of products and services to cater to all your pet's needs. From nutritious food to fun toys, we have it all. Our team is passionate about pets and dedicated to providing excellent customer service.
            </p>
            <ul>
              <li>
                <FontAwesomeIcon icon={faCheckDouble} className="me-3" />
                Best In Industry
              </li>
              <li>
                <FontAwesomeIcon icon={faCheckDouble} className="me-3" />
                24/7 Customer Support
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row className="my-4">
        <Col md={6} className="d-flex align-items-center">
          <img src={aboutImage2} alt="Customer Facilities" className="img-fluid rounded" />
        </Col>
        <Col md={6} className="d-flex align-items-center">
          <div>
            <h3 className='mt-3'>Customer Facilities</h3>
            <p>
              We prioritize the satisfaction of our customers. Our shop provides a welcoming atmosphere where you can seek advice and assistance from our knowledgeable staff. We also offer grooming services and veterinary consultations.
            </p>
          </div>
        </Col>
      </Row>

      <div className="chooseUs">
        <Row className="my-4">
          <Col md={6} className="d-flex align-items-center">
            <img src={aboutImage3} alt="Healthy Pets" className="img-fluid rounded" />
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <div>
              <h4 className='mt-3'>Why Choose Us?</h4>
              <h3 className='mt-3'>Healthy Pets</h3>
              <p>
                Our priority is the health and well-being of your pets. We offer nutritious food, regular health check-ups, and expert advice to keep your pets in the best shape. Trust us to provide the best care for your beloved companions.
              </p>
              <Row className='mb-4 services'>
                <Col className='pr-4'>
                  <FontAwesomeIcon icon={faStar} className="me-2" />
                  Premier Services
                </Col>
                <Col>
                  <FontAwesomeIcon icon={faAmbulance} className="me-2" />
                  Emergency Care
                </Col>
              </Row>

              <Row className='services'>
                <Col className='pr-4'>
                  <FontAwesomeIcon icon={faTrophy} className="me-2" />
                  Top Quality
                </Col>
                <Col>
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  24/7 Availability
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default AboutUs;
