import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Userlogin from './userlogin';
import Product from './product';
import Usersignup from './usersignup';
import SubCategory from './subcategory';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/userlogin" element={<Userlogin />} />
        {/* <Route exact path="/usersignup" element={<Usersignup />} /> */}
        <Route exact path="/subcategory/:cid" element={<SubCategory />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
