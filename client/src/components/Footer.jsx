import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row justify-content-center text-center">
          
          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">Quick Links</h5>
            <p><a href="/Home" className="text-white" style={{ textDecoration: 'none' }}>Home</a></p>
            <p><a href="/AboutUs" className="text-white" style={{ textDecoration: 'none' }}>About Us</a></p>
            <p><a href="/ContactUs" className="text-white" style={{ textDecoration: 'none' }}>Contact Us</a></p>
          </div>

          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">Contact Info</h5>
            <p><i className="fas fa-home mr-2"></i> 123 Pet St, Petville, PA 12345</p>
            <p><i className="fas fa-envelope mr-2"></i> info@petshop.com</p>
            <p><i className="fas fa-phone mr-2"></i> +94-755158190</p>
          </div>

          <div className="col-md-3 col-lg-3 col-xl-3 mb-4">
            <h5 className="text-uppercase mb-4 font-weight-bold text-info">Follow Us</h5>
            <a href="https://web.facebook.com/?_rdc=1&_rdr" className="text-white mx-2">
              <i className="fab fa-facebook-f fa-lg"></i>
            </a>
            <a href="https://x.com/i/flow/login" className="text-white mx-2">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="https://www.instagram.com/mhd___wzm/" className="text-white mx-2">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com/in/mohomed-wazeem-27aa0928b/" className="text-white mx-2">
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>

        </div>

        <hr className="mb-4" />

        <div className="row">
          <div className="col-md-12 text-center">
            <p className="mb-0">© 2024 Pet Shop. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
