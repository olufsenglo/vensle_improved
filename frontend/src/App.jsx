import React from "react";

import { useDispatch, useSelector } from "react-redux";

import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import Filter from "layouts/front/filter";
import Home from "layouts/front/home";
import Detail from "layouts/front/detail";
import GroceryDetail from "layouts/front/groceryDetail";
import Cart from "layouts/front/cart";
import OrderSummary from "layouts/front/orderSummary";
import Checkout from "layouts/front/checkout";
import UserProfile from "layouts/front/userProfile";
import Toaster from "components/front/toaster/Toaster";

const App = () => {

    const message = useSelector(state => state.message.message);

  return (
<>	  
	  {<Toaster />}
    <Routes>
      <Route path="auth/*" element={<AuthLayout />} />
      <Route path="admin/*" element={<AdminLayout />} />
      <Route path="rtl/*" element={<RtlLayout />} />
      <Route path="filter/*" element={<Filter />} />
      <Route path="detail/*" element={<Detail />} />
      <Route path="grocery-detail/*" element={<GroceryDetail />} />
      <Route path="user-profile/*" element={<UserProfile />} />
      <Route path="order-summary/*" element={<OrderSummary />} />
      <Route path="checkout/*" element={<Checkout />} />
      <Route path="cart/*" element={<Cart />} />
      <Route path="/" element={<Home />} />
    </Routes>
</>
  );
};

export default App;
