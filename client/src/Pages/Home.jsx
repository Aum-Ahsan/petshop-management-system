import React, { useState } from 'react';
import { Container, Row, Col, Button, Carousel, Card, Collapse} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import petBg from '../images/petbg1.jpg';
import aboutImage from '../images/Aboutimg.jpg';
import visionIcon from '../images/vission.png';
import missionIcon from '../images/mission.jpg';
import Homebnr from '../images/supervite-dog.webp';
import BirdFood from '../images/bird-food.png';
import DogFood from '../images/Dogfood.jpg';
import CatFood from '../images/cat-food.png';
import RabbitFood from '../images/Rabbit-food.png';
import Dogbelt from '../images/dog-belt.webp';
import Birdcage from '../images/bird-cage.webp';
import Foodcup from '../images/food-cup.webp';
import scrumbBrush from '../images/ScrumbBrush.webp';
import { useInView } from 'react-intersection-observer'; // Import the hook from react-intersection-observer
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyringe, faCut, faBone, faPaw } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [showContent, setShowContent] = useState('vision');

  const categories = [
    {
      img: DogFood,
      title: 'Dog Food',
      description: 'Nutritious dog food for optimal health at every life stage',
    },
    {
      img: BirdFood,
      title: 'Bird Food',
      description: 'High-quality bird food for a balanced diet and vibrant health',
    },
    {
      img: CatFood,
      title: 'Cat Food',
      description: "Premium cat food for nourishment and overall well-being",
    },
    {
      img: RabbitFood,
      title: 'Rabbit Food',
      description: "Nutritious rabbit food for a healthy and happy pet",
    },
    {
      img: Dogbelt,
      title: 'Dog Belt',
      description: "Durable and comfortable dog belt for easy control and walks.",
    },
    {
      img: Birdcage,
      title: 'CateBird Cage',
      description: "Spacious and secure birdcage for your pet's comfort and safety.",
    },
    {
      img: Foodcup,
      title: 'Food cup',
      description: "Durable and easy-to-clean food cup for your pet's meals",
    },
    {
      img: scrumbBrush,
      title: 'Scrum Brush for your pet',
      description: "Effective scrub brush for cleaning pet cages and accessories.",
    },
  ];

  // Create refs for the sections that you want to animate
  const { ref: visionRef, inView: visionInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const { ref: missionRef, inView: missionInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });


  const services = [
    {
      icon: faSyringe,
      title: "Vaccination",
      description:
        "Protecting your pet's health is our priority. We ensure your furry friend receives the right vaccinations at the right time to safeguard them against diseases and keep them healthy year-round.",
    },
    {
      icon: faCut,
      title: "Pet Grooming",
      description:
        "Your pet deserves to look and feel their best. Our professional grooming services provide gentle care with top-quality products, making every grooming session a comfortable experience.",
    },
    {
      icon: faBone,
      title: "Pet Food",
      description:
        "Good nutrition is essential for your pet's well-being. We offer a range of premium pet food options tailored to provide the nutrients your pet needs for a happy and active life.",
    },
    {
      icon: faPaw,
      title: "Pet Care",
      description:
        "Our veterinary services are designed to support your pet's overall health. From preventive care to advanced treatments, we’re here to keep your beloved companion thriving.",
    },
  ];

  return (
    <div>
      <div className="hero-section" style={{ backgroundImage: `url(${petBg})` }}>
      <Container>
      <Row>
  <Col md={12} className="text-center hero-text">
    <h1>Welcome to Our Pet Shop</h1>
    <p>Your one-stop shop for all your pet needs!</p>
    <Button href="/AvailableItems" size="lg" className="custom-button">
      Shop Now
    </Button>
  </Col>
</Row>
</Container>
      </div>
      <Container className="my-5">
        <Row>
          <Col md={12} className="text-center mb-4">
            <Button className='custom-button ' onClick={() => setShowContent('vision')}>Our Vision</Button>
            <Button className='custom-button ' onClick={() => setShowContent('mission')}>Our Mission</Button>
          </Col>
        </Row>
        <Row ref={visionRef} className={`fade-in-section ${visionInView ? 'is-visible' : ''}`}>
          <Col md={6} className="text-center d-flex align-items-center justify-content-center">
            {showContent === 'vision' && <img src={visionIcon} alt="Vision Icon" className="img-fluid" />}
          </Col>
          <Col md={6} className="text-center d-flex align-items-center justify-content-center">
            {showContent === 'vision' && (
              <div>
                <h2 className='mb-5'>Our Vision</h2>
                <p>We aim to create a world where every pet is happy, healthy, and part of a loving family.</p>
              </div>
            )}
          </Col>
        </Row>
        <Row ref={missionRef} className={`fade-in-section ${missionInView ? 'is-visible' : ''}`}>
          <Col md={6} className="text-center d-flex align-items-center justify-content-center">
            {showContent === 'mission' && <img src={missionIcon} alt="Mission Icon" className="img-fluid" />}
          </Col>
          <Col md={6} className="text-center d-flex align-items-center justify-content-center">
            {showContent === 'mission' && (
              <div>
                <h2 className='mb-5'>Our Mission</h2>
                <p>To provide the best products and services for pets and pet owners, ensuring the well-being of pets and the happiness of their owners.</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row ref={aboutRef} className={`fade-in-section ${aboutInView ? 'is-visible' : ''}`}>
          <Col md={6} className=" text-center d-flex align-items-center justify-content-center">
            <div>
              <h2 className='mb-5'>About Us</h2>
              <p>Our pet shop offers a wide range of products and services to cater to all your pet's needs. From nutritious food to fun toys, we have it all. Our team is passionate about pets and dedicated to providing excellent customer service.</p>
            </div>
          </Col>
          <Col md={6} className="d-flex align-items-center justify-content-center">
            <img src={aboutImage} alt="About Us" className="img-fluid" />
          </Col>
        </Row>
      </Container>

  <Container className="my-5">
      {/* Shop By Categories Section */}
      <Container className="my-5">
  <Row>
    <Col md={12} className="text-center">
      <h2 className="stylish-underline mb-5">Shop By Categories</h2>
    </Col>
  </Row>
  <Carousel
    indicators={false}
    interval={3000}
    controls={true}
    className="custom-carousel"
  >
    {[0, 1].map((_, index) => (
      <Carousel.Item key={index}>
        <Row className="justify-content-center">
          {categories
            .slice(index * 4, index * 4 + 3) // Show 4 items per slide
            .map((category, i) => (
              <Col
                key={i}
                md={3}
                sm={4}
                xs={10}
                className="mb-4 text-justify category-card"
              >
                <Card className="border-0 h-100 bg-light shadow-lg custom-card">
                  <Card.Img
                    variant="top"
                    src={category.img}
                    className="rounded img-fluid custom-card-img"
                    style={{
                      objectFit: 'cover',
                      height: "130px", // Set consistent height for images
                      width: '100%',
                    }}
                  />
                  <Card.Body className="d- flex-column">
                    <Card.Title>{category.title}</Card.Title>
                    <Card.Text
                      className="flex-grow-1 description-text"
                      style={{
                        fontSize: '14px',
                        height: '90px', // Control the height for description space
                        overflow: 'hidden', // Hide excess text
                      }}
                    >
                      {category.description}
                    </Card.Text>
                    {/* Shortened description for mobile */}
                    <Card.Text className="d-block d-sm-none">
                      {category.description.substring(0, 50)}...
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Carousel.Item>
    ))}
  </Carousel>
</Container>

   

<div className="services-section py-5" style={{ backgroundColor: "#fef4e7" }}>
      <Container>
        <Row>
          <Col md={12} className="text-center">
            <h2 className="fw-bold">We are Here for all Your Pet Care Needs!</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
            We are dedicated to keeping your pets healthy, happy, and well-groomed with 
            personalized care and expert services tailored to their unique needs.
            </p>
            <br></br>
          </Col>
        </Row>
        <Row className="text-center">
          {services.map((service, index) => (
            <Col key={index} md={3} sm={6} className="mb-4">
              <div className="service-card">
                <div
                  className="service-icon mb-3"
                  style={{
                    backgroundColor: "#0056ff",
                    borderRadius: "50%",
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 auto",
                  }}
                >
                  <FontAwesomeIcon
                    icon={service.icon}
                    style={{ color: "white", fontSize: "24px" }}
                  />
                </div>
                <h5 className="fw-bold">{service.title}</h5>
                <p className="text-muted">{service.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>

      {/* Promotional Banner Section */}
      <Row className="align-items-center">
        <Col md={6}>
          <img src={Homebnr} alt="Featured Dog" className="img-fluid rounded" />
        </Col>
        <Col md={6}>
          <h2>Help Your Dog Maintain A Healthier Life</h2>
          <p>
            Discover our range of premium dog foods designed to promote a healthier lifestyle for
            your furry friends.
          </p>
          <ul>
            <li>24/7 Support</li>
            <li>Pet Trial Facility</li>
            <li>Personalized Care</li>
            <li>Quick Delivery</li>
          </ul>
          <Button variant="success">Shop Now</Button>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default Home;
