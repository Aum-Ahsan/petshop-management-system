import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Orders.css";
import axios from 'axios';
import jsPDF from 'jspdf';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/orders')
      .then(result => setOrders(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleOrderAction = (orderId, action) => {
    switch(action) {
      case 'deliver':
        alert(`Order ${orderId} delivered`);
        break;
      case 'download':
        const order = orders.find(order => order._id === orderId);
        generateReceipt(order);
        break;
      default:
        break;
    }
  };

  const generateReceipt = (order) => {
    const doc = new jsPDF();
    const deliveryCharge = 400;
    const totalPrice = order.productPrice * order.customerQuantity + deliveryCharge;

    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 102, 204); 
    doc.text('Welcome to our pupptail Store', 105, 20, null, null, 'center');

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0, 0, 0); 

    // Customer Information
    doc.text('Customer Information:', 20, 40);
    doc.text(`Name: ${order.customerName}`, 20, 50);
    doc.text(`Email: ${order.customerEmail}`, 20, 60);
    doc.text(`Address: ${order.customerAddress}`, 20, 70);
    doc.text(`Contact: ${order.customerContact}`, 20, 80);

    // Ordered Product
    doc.setTextColor(255, 0, 0); 
    doc.text('Ordered Product', 20, 100);
    doc.setTextColor(0, 0, 0); 
    doc.text(`Name: ${order.productName}`, 20, 110);
    doc.text(`Price: Rs.${order.productPrice}`, 20, 120);
    doc.text(`Quantity: ${order.customerQuantity}`, 20, 130);
    doc.text(`Delivery Charge: Rs.${deliveryCharge}`, 20, 140);
    doc.text(`Total Price: Rs.${totalPrice}`, 20, 150);

    doc.save('receipt.pdf');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-left mb-4 fs-4 text-success">Order Details</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr className='text-center'>
              <th scope="col">Customer</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Contact</th>
              <th scope="col">Quantity</th>
              <th scope="col">Delivery Method</th>
              <th scope="col">Pick-up Date</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index} className="text-center">
                <td>{order.customerName}</td>
                <td>{order.customerEmail}</td>
                <td>{order.customerAddress}</td>
                <td>{order.customerContact}</td>
                <td>{order.customerQuantity}</td>
                <td>{order.productDelivery === '1' ? 'Deliver' : 'Pick-Up'}</td>
                <td>{order.productDelivery === '2' ? new Date(order.pickupDate).toLocaleDateString() : 'Delivery'}</td>
                <td>{order.productName}</td>
                <td>${order.productPrice}</td>
                <td>
                  <button className="btn btn-link-style" onClick={() => handleOrderAction(order._id, 'deliver')}>Deliver</button>
                  <button className="btn btn-light" onClick={() => handleOrderAction(order._id, 'download')}>Download</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
