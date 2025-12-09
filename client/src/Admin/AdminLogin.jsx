import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAdminLoggedIn = !!localStorage.getItem('adminLoggedIn');
    if (isAdminLoggedIn) {
      navigate('/Products'); // Redirect to products if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);

        // Set admin login session
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/Products');
      } else {
        const error = await response.json();
        alert(error.message);
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-6 col-lg-4">
          <div className="login-form animation-pop-down">
            <h3 className="text-center mb-4">Welcome Admin</h3>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter User name" value={username} onChange={(e) => setUsername(e.target.value)} required /><br/>
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <button type="button" className="btn btn-light btn-block" onClick={handleReset}>Clear</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
