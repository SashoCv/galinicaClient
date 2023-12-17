import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearUser } from 'services/redux/userSlice';
import { useNavigate } from 'react-router-dom';
// 
import { RoleBox } from 'util/Rolebox';
// icons
import ICON_GALENIKA from 'assets/icons/galenika-logo.png';
import ICON_AVATAR from 'assets/icons/user-solid.svg';
import ICON_SETTINGS from 'assets/icons/settings.svg';
// constants
import { INTERNAL_USERS } from 'data/constants';
// styles
import './style.css';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleOnClickUser = () => {
        setShowUserMenu(!showUserMenu);
    };

    const handleLogout = () => {
        dispatch(clearUser());
        window.localStorage.removeItem('token');
    };

    const handleOnClickSettings = () => {
        navigate('/settings');
    };

    const handleOnClickLogo = () => navigate('/');

    return (
        <div className='header'>
            <img src={ICON_GALENIKA} className='logo' onClick={handleOnClickLogo}/>
            {/* <img src={ICON_HAMBURGER} className='ham' onClick={onClickColapse}/>  */}
            <nav>
                <NavLink className="nav-link" to="/">Dashboard</NavLink>
                <NavLink className="nav-link" to="/financial">Financial</NavLink>
                <NavLink className="nav-link" to="/products">Products</NavLink>
                <NavLink className="nav-link" to="/drugstores">Drugstores</NavLink>
                {/* <NavLink className="nav-link" to="/">Pharmacies</NavLink> */}
                <NavLink className="nav-link" to="/owners">Owners</NavLink>
                <NavLink className="nav-link" to="/sales-deals">Sales Deals</NavLink>
                <NavLink className="nav-link" to="/quartaly-deals">Quartaly Deals</NavLink>
                <NavLink className="nav-link" to="/reports">Reports</NavLink>
                {/* <NavLink className="nav-link">Products</NavLink>
                <NavLink className="nav-link">Pharmacies</NavLink>
                <NavLink className="nav-link">Add Report</NavLink>
                <NavLink className="nav-link">Add Pharmacies</NavLink>
                <NavLink className="nav-link">Add Wholesaler</NavLink>
                <NavLink className="nav-link">Add Owner</NavLink>
                <NavLink className="nav-link">Add Employee</NavLink> */}
            </nav>
            <img src={ICON_SETTINGS} className='header-settings' onClick={handleOnClickSettings}/>
            <button className='header-user' onBlur={() => setShowUserMenu(false)}>
                <img src={ICON_AVATAR} onClick={handleOnClickUser}/>
                <RoleBox role={INTERNAL_USERS}>
                    Test
                </RoleBox>
                {showUserMenu &&
                <div className='header-user__menu'>
                    <span>User Details</span>
                    <span onClick={handleLogout}>Logout</span>
                </div>
                }
            </button>
        </div>
    )
}

export default Header;