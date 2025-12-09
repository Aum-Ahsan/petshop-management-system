import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Products.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loading2 from '../images/loading2.gif';  // Correct import path

const Products = () => {
  // Get product details from the database
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state

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

  // Delete function to delete record from the table
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/products/${id}`)
      .then(() => {
        setProducts(products.filter(product => product._id !== id));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="row w-100 mt-3 mb-3">
        <div className="col-12 text-center">
          <h3 className="text-left mb-4 fs-4 text-success"> Pets and Accessories</h3>
          <Link to="/CreateProducts" className="btn btn-success mb-5">Add Product</Link>
        </div>
      </div>
      {loading ? (
        <div className="text-center my-7">
          <img src={loading2} alt="Loading..." />
          <h3 className="text-secondary mt-2 mb-4">Loading...</h3>
        </div>
      ) : (
        <div className="row w-100 flex-grow-1 overflow-auto">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table custom-table">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.price}</td>
                      <td>
                        <img src={product.image} alt={product.name} className="img-fluid product-image" />
                      </td>
                      <td>
                        <Link to={`/UpdateProducts/${product._id}`} className="btn btn-light m-1">Update</Link>
                        <button className="btn btn-danger m-1" onClick={() => handleDelete(product._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
