import React from 'react';
import './Admin.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  Outlet,
  Link,
  useNavigate
} from "react-router-dom";
import { useGlobalContext } from "../../shared/context/GlobalContext";
import { margin } from '@mui/system';


const Admin = () => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();

  const admin = (
    <div className="home-container">
      <div className="admin-container">
        <div className = "panel" id="panel-container" style={{ width: '20%'}}>
          <div><h1>Welcome!</h1></div>
          <div className = "admin-menu">
            <div className = "admin-menu-options">
              <div className="admin-menu-section">
                <h3>Manage Movies</h3>
                  <Link to="add-movies">
                      <button className="admin-menu-li">Add Movies</button>
                  </Link>
                  <Link to="edit-movies">
                      <button className="admin-menu-li">Edit Movies</button>
                  </Link>
                  <Link to="sched-movies">
                      <button className="admin-menu-li">Schedule Movie</button>
                  </Link>
                </div>
                <div className="admin-menu-section">
                  <h3>Promotions</h3>
                  <Link to="manage-promos">
                    <button className="admin-menu-li">Manage Promotions</button>
                  </Link>
                  <Link to="promotions">
                    <button className = "admin-menu-li">Add Promotions</button>
                  </Link>
                </div>
                <div className="admin-menu-section">
                  <h3>Manage Tickets</h3>
                  <Link to="ticket-prices">
                  <button className = "admin-menu-li">Ticket prices</button>
                  </Link>
                </div>
                <div className="admin-menu-section">
                  <h3>Manage Users</h3>
                  <Link to="manage-admins">
                    <button className = "admin-menu-li">Manage Admins</button>
                  </Link>
                  <Link to="manage-members">
                    <button className = "admin-menu-li">Manage Members</button>
                  </Link>
                </div>
              <div className="admin-menu-section">
                <h3>Reports</h3>
              </div>
            </div>
          </div>
        </div>
        <div id="panel-container" style={{ width: '78%' }}>
          <div className="admin-view">
            <h1>Admin view</h1>
            <hr/>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );

  const customer = (
    <div className="home-container">
      <div className="panel-container">
        <h1 id="warning">You are not permitted to view this page.</h1>
      </div>
    </div>
  )

  function isAdmin() {
    if (user && user.IsAdmin === 1) {
        return (admin); 
    } else {
      return (customer);
    }
  }

  return(
    <div>
      {isAdmin()}
    </div>
  );
}

export default Admin;