import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateProducts = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3002/products/${id}`)
      .then(result => {
        const product = result.data;
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setImage(product.image);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3002/UpdateProducts/${id}`, { name, description, price, image })
      .then((result) => {
        console.log(result);
        navigate('/Products');
      })
      .catch((err) => console.log(err));
  };

  const handleReset = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  return (
    <div className="container-fluid d-flex vh-100 bg-light justify-content-center align-items-center">
      <div className="col-10 col-md-6 col-lg-4 bg-white rounded p-4 shadow-lg" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <h2 className='mb-5 text-muted fs-4'>
          <span><i className="fas fa-edit fs-4"></i></span> Update Products
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">Product Name</label>
            <input
              type="text"
              id="productName"
              value={name}
              className="form-control"
              required
              placeholder="Enter product name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">Product Description</label>
            <textarea
              id="productDescription"
              value={description}
              className="form-control"
              required
              placeholder="Enter product description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">Product Price</label>
            <input
              type="number"
              id="productPrice"
              value={price}
              className="form-control"
              required
              placeholder="Enter product price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productImage" className="form-label">Product Image</label>
            <input
              type="file"
              id="productImage"
              className="form-control"
              required
              onChange={handleImageChange}
            />
            {image && <img src={image} alt={name} className="img-fluid mt-2" style={{ maxHeight: '200px', width: '100%', objectFit: 'contain' }} />}
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success me-2" style={{ width: '48%' }}>Update</button>
            <button type="reset" className="btn btn-light border border-dark" style={{ width: '48%' }} onClick={handleReset}>Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
