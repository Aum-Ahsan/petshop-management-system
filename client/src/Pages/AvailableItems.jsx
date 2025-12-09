import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import loading2 from '../images/loading2.gif';  
import './AvailableItems.css';

const AvailableItems = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    customerContact: '',
    customerQuantity: '',
    productDelivery: '1',
    pickupDate: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3002/products')
      .then(result => {
        setProducts(result.data);
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch(err => {
        console.log(err);
        setLoading(false);  // Set loading to false in case of error
      });
  }, []);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
    setFormData({
      customerName: '',
      customerEmail: '',
      customerAddress: '',
      customerContact: '',
      customerQuantity: 1,
      productDelivery: '1',
      pickupDate: ''
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      productName: selectedProduct.name,
      productPrice: selectedProduct.price
    };

    // Remove pickupDate from orderData if the delivery option is selected
    if (formData.productDelivery === '1') {
      delete orderData.pickupDate;
    }

    axios.post('http://localhost:3002/orders', orderData)
      .then(response => {
        console.log('Order submitted:', response.data);
        alert('Your order has been placed successfully!');
        handleCloseForm();
      })
      .catch(error => console.error('Error submitting order:', error));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-left mb-5 fs-4 text-success">Available Items</h2>
      
      {loading ? (
      <div className="text-center my-7">
      <img src={loading2} alt="Loading..." />
      <h3 className="text-secondary mt-2 mb-4">Loading...</h3>
      </div>
      
      ) : (
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 custom-card">
                <img src={product.image} alt={product.name} className="card-img-top custom-card-img" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text opacity-75">{product.description}</p>
                  <p className="card-text"><strong>Price: </strong>${product.price}</p>
                  <button className="btn btn-success" onClick={() => handleOrderClick(product)}>Order</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="customer-form-container">
          <div className="customer-form">
            <h4>Customer Information</h4>
            <br/>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input type="text" className="form-control" id="customerName" placeholder='Enter your name' value={formData.customerName} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <input type="email" className="form-control" id="customerEmail" placeholder='Enter your email' value={formData.customerEmail} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="customerAddress" placeholder='Enter your address' value={formData.customerAddress} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="customerContact" placeholder='Enter your contact number' value={formData.customerContact} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <input type="number" className="form-control" id="customerQuantity" placeholder='Enter quantity' value={formData.customerQuantity} onChange={handleInputChange} required />
              </div>
              <div className="mb-3">
                <select className="form-select" id="productDelivery" value={formData.productDelivery} onChange={handleInputChange} required>
                  <option value="1">Deliver</option>
                  <option value="2">Pick-Up</option>
                </select>
              </div>
              {formData.productDelivery === '2' && (
                <>
                  <label>Pick-up Date</label>
                  <div className="mb-3">
                    <input type="date" className="form-control" id="pickupDate" value={formData.pickupDate} onChange={handleInputChange} required />
                  </div>
                </>
              )}
              <button type="submit" className="btn btn-primary me-2">Submit</button>
              <button type="button" className="btn btn-light" onClick={handleCloseForm}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableItems;
