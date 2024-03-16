import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {useGlobalContext} from "../../context/GlobalContext";
import Search from "./Search"
import {slide as Menu} from 'react-burger-menu';

import './Header.css';
import './MobileHeader.css';

const Header = () => {
    const {user, setUser} = useGlobalContext();
    const [headerType, setHeaderType] = useState();
    const logo = (
        <Link to="/">
            <img className="nav-img" src="/img/logo.png" alt=""/>
        </Link>
    );

    const desktopNotLoggedInUser = (
        <div className="nav-links-container">
            <div className="nav-links">
                <Link className="nav-item" to="/login">LOGIN / REGISTER</Link>
                <Search/>
            </div>
        </div>
    )

    const desktopLoggedInUser = (
        <div className="nav-links-container">
            <div className="nav-links">
                <Link className="nav-item" to="/account">ACCOUNT</Link>
                <Link className="nav-item" to="/" onClick={() => setUser(null)}>LOGOUT</Link>
                <Search/>
            </div>
        </div>
    )

    const desktopAdminUser = (
        <div className="nav-links-container">
            <div className="nav-links">
                <Link className="nav-item" to="/admin">ADMINISTRATOR PANEL</Link>
                <Link className="nav-item" to="/" onClick={() => setUser(null)}>LOGOUT</Link>
                <Search/>
            </div>
        </div>
    )

    const mobileNotLoggedInUser = (
        <Menu>
            <Search/>
            <Link className="nav-item" to="/login">LOGIN / REGISTER</Link>
        </Menu>
    )

    const mobileLoggedInUser = (
        <Menu>
            <Search/>
            <Link className="nav-item" to="/account">ACCOUNT</Link>
            <Link className="nav-item" to="/" onClick={() => setUser(null)}>LOGOUT</Link>
        </Menu>
    )

    const mobileAdminUser = (
        <Menu>
            <Search/>
            <Link className="nav-item" to="/admin">ADMINISTRATOR PANEL</Link>
            <Link className="nav-item" to="/" onClick={() => setUser(null)}>LOGOUT</Link>
        </Menu>
    )

    function desktopNavItems() {
        if (user && user.IsAdmin === 1) {
            return (desktopAdminUser);
        } else if (user && user.IsAdmin === 0) {
            return (desktopLoggedInUser);
        } else {
            return (desktopNotLoggedInUser);
        }
    }

    function mobileNavItems() {
        if (user && user.IsAdmin === 1) {
            return (mobileAdminUser);
        } else if (user && user.IsAdmin === 0) {
            return (mobileLoggedInUser);
        } else {
            return (mobileNotLoggedInUser);
        }
    }


    const desktopHeader = (
        <div className="header">
            {logo}
            {desktopNavItems()}
        </div>
    );

    const mobileHeader = (
        <div>
            <div className="mobile-container">
                {mobileNavItems()}
                {logo}
            </div>
        </div>
    );


    useEffect(() => {

        function handleResize() {
            const width = window.innerWidth;

            if (width < 800) {
                setHeaderType(mobileHeader); // Mobile Header
            } else {
                setHeaderType(desktopHeader); // Desktop Header
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial number of items

        return () => window.removeEventListener("resize", handleResize);
    }, [user]);

    const getHeader = () => {
        return headerType;
    }

    return (
        <div>
            {getHeader()}
        </div>
    );
};

export default Header;