import React from "react";
import * as ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  Outlet
} from "react-router-dom";

import Home from "./pages/home/Home";
import Movie from "./pages/movie/Movie";
import Account from "./pages/account/Account";
import Admin from "./pages/admin/Admin";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ConfirmReg from "./pages/auth/ConfirmReg";
import ValidateReg from "./pages/auth/ValidateReg";
import RequestResetPwd from "./pages/auth/RequestResetPwd";
import ResetPwd from "./pages/reset-pwd/ResetPwd";
import Checkout from "./pages/checkout/Checkout";

import Header from "./shared/components/header/Header";
import Footer from "./shared/components/footer/Footer";
import Loading from "./shared/components/loading/Loading";
import Success from "./shared/components/success/Success";
import Error from "./shared/components/error/Error";
import PrivateRoute from "./shared/components/PrivateRoute";

import { GlobalProvider } from "./shared/context/GlobalContext.js";
import { useGlobalContext } from "./shared/context/GlobalContext.js";
import { AddMovies } from "./pages/admin/manage-movies/AddMovies";
import { SchedMovies } from "./pages/admin/manage-movies/SchedMovies";
import { TicketPrices } from "./pages/admin/manage-tickets/TicketPrices";
import { AddPromotions } from "./pages/admin/promotions/AddPromotions";
import { ManageMembers } from "./pages/admin/manage-users/ManageMembers";
import { ManageAdmins } from "./pages/admin/manage-users/ManageAdmins";
import { EditMovies } from "./pages/admin/manage-movies/EditMovies";
import "./shared/style/common.css";
import { ManagePromos } from "./pages/admin/promotions/ManagePromos";
import { SelectSeat } from "./pages/movie/SelectSeat";
import { Ticket } from "./pages/movie/Ticket";
import  Showings  from "./pages/movie/Showings";
import { SearchPage } from "./pages/search-page/SearchPage"
import OrderConfirm from "./pages/checkout/OrderConfirm";

const App = () => {
  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<SearchPage />}/>
      <Route path="/browse/movie/:id" element={<Movie />} />
      <Route path="/browse/movie/:id/order" element={<Showings />} />
      <Route path="/browse/movie/:id/order/tickets" element={<Ticket />} />
      <Route path="/browse/movie/:id/order/tickets/select-seat" element={<SelectSeat />} />
      <Route path="/browse/movie/:id/order/tickets/select-seat/checkout" element={<Checkout />} />
      <Route path="/browse/movie/:id/order/tickets/select-seat/checkout/order-confirmation" element={<OrderConfirm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirmation" element={<ConfirmReg />} />
      <Route path="/admin" element={<Admin />}>
        <Route path="add-movies" element={<AddMovies />} />
        <Route path="edit-movies" element={<EditMovies />} />
        <Route path="sched-movies" element={<SchedMovies />} />
        <Route path="ticket-prices" element={<TicketPrices />} />
        <Route path="promotions" element={<AddPromotions />} />
        <Route path="manage-admins" element={<ManageAdmins />} />
        <Route path="manage-members" element={<ManageMembers />} />
        <Route path="manage-promos" element={<ManagePromos />} />
      </Route>
      <Route path="/account" element={<Account />} />
      <Route path="/request-reset-password" element={<RequestResetPwd />} />
      <Route path="/reset-pwd" element={<ResetPwd />} />
      <Route path="/validation" element={<ValidateReg />} />
    </Routes>
  );

  return (
    //This gives access to global variables which are in GlobalContext.js.
    <GlobalProvider>
      <Router>
        <Header />
        {routes}
      </Router>
    </GlobalProvider>
  );
}

export default App;