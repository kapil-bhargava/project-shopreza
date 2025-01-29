import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Userlogin from './userlogin';
import Products from './products';
import Usersignup from './usersignup';
import SubCategory from './subcategory';
import { Provider } from 'react-redux';
import store from './redstore';
import Dashboard from './admin/dashboard';
import Customer from './admin/customer';
import Employee from './admin/employee';
import Newemployee from './admin/newemployee';
import Store from './admin/stores';
import Emplogin from './admin/emplogin';
import Empsignup from './admin/empsignup';
import AdminLogin from './admin/adminlogin';
import Category from './admin/category';
import Subcategory from './admin/subcategory';
import Product from './admin/product';
import Checkout from './checkout';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store ={store} >
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/customers" element={<Customer />} />
        <Route exact path="/employee" element={<Employee />} />
        <Route exact path="/stores" element={<Store />} />
        <Route exact path="/newemployee" element={<Newemployee />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/userlogin" element={<Userlogin />} />
        <Route exact path="/subcategory/:cid" element={<SubCategory />} />
        <Route exact path="/emplogin" element={<Emplogin/>} />
        <Route exact path="/adminlogin" element={<AdminLogin/>} />
        <Route exact path="/empsignup" element={<Empsignup/>} />
        <Route exact path="/category" element={<Category/>} />
        <Route exact path="/subcategory" element={<Subcategory/>} />
        <Route exact path="/product" element={<Product/>} />
        <Route exact path="/checkout" element={<Checkout/>} />
      </Routes>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
