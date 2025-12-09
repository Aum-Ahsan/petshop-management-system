import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css';

const Account = () => {
  const [adminDetails, setAdminDetails] = useState({
    adminName: '',
    phone: '',
    email: '',
    username: '',
    password: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      const response = await fetch('http://localhost:3002/admin');
      const data = await response.json();
      setAdminDetails(data);
    };

    fetchAdminDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminDetails),
      });

      if (response.ok) {
        alert('Details updated successfully');
        setIsEditing(false);
      } else {
        alert('Error updating details');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="account-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8 col-lg-6">
          <div className="account-admin-form text-center">
          <h2 className='mb-5 text-muted fs-4 text-center bg-info p-2'>
          <span><i className="fas fa-edit fs-4"></i></span> Update Admin details
          </h2>
            {isEditing ? (
              <form onSubmit={handleSaveChanges}>
                {Object.keys(adminDetails).map((field) => (
                  <div className="row mb-3" key={field}>
                    <label htmlFor={field} className="col-sm-4 col-form-label text-secondary">
                      {field.replace(/([A-Z])/g, ' $1')}
                    </label>
                    <div className="col-sm-8">
                      <input
                        type={field === 'password' ? 'password' : 'text'}
                        className="form-control"
                        id={field}
                        name={field}
                        value={adminDetails[field]}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                ))}
                <div className='d-flex justify-content-between'>
                  <button type="submit" className="btn btn-success me-2" style={{ width: '48%' }}>Update</button>
                  <button type="reset" className="btn btn-light border border-dark" style={{ width: '48%' }} onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
              </form>
            ) : (
              <div>
                {Object.keys(adminDetails).map((field) => (
                  <div className="row mb-3" key={field}>
                    <label className="col-sm-4 col-form-label text-secondary">
                      {field.replace(/([A-Z])/g, ' $1')}:
                    </label>
                    <div className="col-sm-8 text-start">
                      <p className="form-control-plaintext">{adminDetails[field]}</p>
                    </div>
                  </div>
                ))}
                <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
