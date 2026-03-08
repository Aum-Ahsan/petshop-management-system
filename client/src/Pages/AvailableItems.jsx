import { useEffect, useState } from 'react';
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
    customerQuantity: 1,
    productDelivery: '1',
    pickupDate: ''
  });

  /* ===========================
     FETCH PRODUCTS
  ============================ */

  useEffect(() => {

    axios.get("http://localhost:3002/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, []);


  /* ===========================
     ORDER BUTTON
  ============================ */

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


  /* ===========================
     FORM INPUT
  ============================ */

  const handleInputChange = (e) => {

    const { id, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

  };


  /* ===========================
     SUBMIT ORDER
  ============================ */

  const handleSubmit = (e) => {

    e.preventDefault();

    const orderData = {
      ...formData,
      productName: selectedProduct.name,
      productPrice: selectedProduct.price
    };

    if (formData.productDelivery === "1") {
      delete orderData.pickupDate;
    }

    axios.post("http://localhost:3002/orders", orderData)
      .then(() => {

        alert("Order placed successfully!");
        handleCloseForm();

      })
      .catch(err => console.log(err));

  };


  /* ===========================
     UI
  ============================ */

  return (

    <div className="container mt-5">

      <h2 className="text-left mb-5 fs-4 text-success">
        Available Items
      </h2>


      {loading ? (

        <div className="text-center my-5">

          <img src={loading2} alt="Loading..." />
          <h4 className="text-secondary mt-3">
            Loading Products...
          </h4>

        </div>

      ) : (

        <div className="row">

          {products.map((product) => (

            <div className="col-md-3 mb-4" key={product._id}>

              <div className="card h-100 custom-card">

                <img
                  src={`/${product.image}`}
                  alt={product.name}
                  className="card-img-top custom-card-img"
                />

                <div className="card-body">

                  <h5 className="card-title">
                    {product.name}
                  </h5>

                  <p className="card-text opacity-75">
                    {product.description}
                  </p>

                  <p className="card-text">
                    <strong>Price:</strong> ${product.price}
                  </p>

                  <button
                    className="btn btn-success"
                    onClick={() => handleOrderClick(product)}
                  >
                    Order
                  </button>

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
            <br />

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <input
                  type="text"
                  id="customerName"
                  className="form-control"
                  placeholder="Enter your name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  id="customerEmail"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  id="customerAddress"
                  className="form-control"
                  placeholder="Enter your address"
                  value={formData.customerAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  id="customerContact"
                  className="form-control"
                  placeholder="Enter your contact number"
                  value={formData.customerContact}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  id="customerQuantity"
                  className="form-control"
                  placeholder="Enter quantity"
                  value={formData.customerQuantity}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">

                <select
                  id="productDelivery"
                  className="form-select"
                  value={formData.productDelivery}
                  onChange={handleInputChange}
                  required
                >

                  <option value="1">Deliver</option>
                  <option value="2">Pick-Up</option>

                </select>

              </div>

              {formData.productDelivery === "2" && (

                <div className="mb-3">

                  <label>Pick-up Date</label>

                  <input
                    type="date"
                    id="pickupDate"
                    className="form-control"
                    value={formData.pickupDate}
                    onChange={handleInputChange}
                    required
                  />

                </div>

              )}

              <button type="submit" className="btn btn-primary me-2">
                Submit
              </button>

              <button
                type="button"
                className="btn btn-light"
                onClick={handleCloseForm}
              >
                Cancel
              </button>

            </form>

          </div>

        </div>

      )}

    </div>

  );

};

export default AvailableItems;