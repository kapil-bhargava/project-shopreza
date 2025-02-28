import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Userlogin from './userlogin';
import Products from './products';
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
import Userorders from './userorders';
import Adminorder from './admin/adminorders';
import TrackingOrder from './trackingorder';
import Managerlogin from './admin/managerlogin';
import Deliveryboylogin from './admin/deliveryboylogin';
import Sidebar from './admin/sidebars/Sidebar';
import Delboy from './admin/Manager/delboy';
import ManagerDashboard from './admin/Manager/dasboardmanager';
import Profile from './admin/profile';
import DelBoyDashboard from './admin/Manager/dasboarddelboy';
import DelboyOrders from './admin/DelboyOrders';
import Banner from './admin/banner';
import Bannerproduct from './admin/Bannerproduct';
import BnrProducts from './bnrProducts';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store} >
      <BrowserRouter>
        <Routes>

          {/* Admin Routers */}
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/customers" element={<Customer />} />
          <Route exact path="/employee" element={<Employee />} />
          <Route exact path="/stores" element={<Store />} />
          <Route exact path="/newemployee/:mob" element={<Newemployee />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/banner" element={<Banner />} />
          <Route exact path="/bannerproducts" element={<Bannerproduct />} />
          <Route exact path="/empprofile" element={<Profile />} />
          <Route exact path="/subcategory" element={<Subcategory />} />
          {/* login panels  */}
          <Route exact path="/emplogin" element={<Emplogin />} />
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          {/* orders  */}
          <Route exact path="/userorders" element={<Userorders />} />
          <Route exact path="/delboyorders" element={<DelboyOrders />} />
          <Route exact path="/adminorders" element={<Adminorder />} />
          {/* dashboards  */}
          <Route exact path="/managerdashboard" element={<ManagerDashboard />} />
          <Route exact path="/delboydashboard" element={<DelBoyDashboard />} />
          <Route exact path="/delboy" element={<Delboy />} />

          <Route exact path="/empsignup" element={<Empsignup />} />
         


          {/* Users Routers  */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/userlogin" element={<Userlogin />} />
          <Route exact path="/subcategory/:cid" element={<SubCategory />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/bnrproducts/:festivalid" element={<BnrProducts />} />

          <Route exact path="/category" element={<Category />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/trackingorder/:orderid" element={<TrackingOrder />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
