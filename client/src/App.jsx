import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';  
import 'bootstrap/dist/css/bootstrap.min.css';
import Topnav from './components/Topnav';
import Home from './Pages/Home';
import AboutUs from './Pages/AboutUs';
import AvailableItems from './Pages/AvailableItems';
import ContactUs from './Pages/ContactUs';
import Footer from './components/Footer';
import AdminFooter from './components/AdminFooter';
import AdminNavbar from './components/AdminNavbar';
import AdminLogin from './Admin/AdminLogin';
import Products from './Admin/Products';
import CreateProducts from './Admin/CreateProducts';
import UpdateProducts from './Admin/UpdateProducts';
import Orders from './Admin/Orders';
import Account from './Admin/Account';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  const location = useLocation(); // Hook to access the current route

  // Determine if we are on an admin page
  const isAdminRoute = location.pathname.startsWith('/Products') ||
   location.pathname.startsWith('/CreateProducts') ||
   location.pathname.startsWith('/UpdateProducts') ||
   location.pathname.startsWith('/Orders') ||
   location.pathname.startsWith('/Account');

   const ProtectAdminRoute = ({ element }) => {
    const isAdminLoggedIn = localStorage.getItem('adminLoggedIn');
    return isAdminLoggedIn? element : <Navigate to = "/AdminLogin" replace /> ;  
  }

  return (
    <>
      {/* Conditionally render Navbars */}
      {!isAdminRoute && <Topnav />}
      {isAdminRoute && <AdminNavbar />}
      
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} /> 
        <Route path="/Home" element={<Home />} /> 
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/AvailableItems" element={<AvailableItems />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/AdminLogin" element={<AdminLogin/>} />

        <Route path="/Products" element={<ProtectAdminRoute element={<Products/>} />} />
        <Route path="/CreateProducts" element={<ProtectAdminRoute element={<CreateProducts />} />} />
        <Route path="/UpdateProducts/:id" element={<ProtectAdminRoute element={<UpdateProducts />} />} />
        <Route path="/Orders" element={<ProtectAdminRoute element={<Orders />} />} />
        <Route path="/Account" element={<ProtectAdminRoute element={<Account />} />} />
      </Routes>

      {/* Conditionally render Footers */}
      {!isAdminRoute && <Footer />}
      {isAdminRoute && <AdminFooter />}
    </>
  );
}

export default App;

