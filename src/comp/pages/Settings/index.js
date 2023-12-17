import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PrivateTemplate from 'comp/templates/PrivateTemplate';
import { Menu, MenuItem } from 'react-pro-sidebar';
import SettingsReports from '../SettingsReports';
import './style.css';

const Settings = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    // console.log('location', location)
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOnClickItem = (item) => {
        setSelectedItem(item);
        navigate(`/settings/${item}`);
    };

    return (
        <PrivateTemplate>
            {/* <PrivateTemplate.AppSidebar>
                <Menu
                    menuItemStyles={{
                        button: {
                        // the active class will be added automatically by react router
                        // so we can use it to style the active menu item
                        [`&.ps-active`]: {
                            backgroundColor: '#498a49',
                            color: '#fff',
                        },
                        },
                    }}
                >
                    <MenuItem onClick={() => handleOnClickItem('add-report')} active={location.pathname.includes('add-report')}>Add Report</MenuItem>
                    <MenuItem onClick={() => handleOnClickItem('add-pharmacy')} active={location.pathname.includes('add-pharmacy')}>Add Pharmacy</MenuItem>
                    <MenuItem onClick={() => handleOnClickItem('add-wholesaler')} active={location.pathname.includes('add-wholesaler')}>Add Wholesaler</MenuItem>
                    <MenuItem onClick={() => handleOnClickItem('add-owner')} active={location.pathname.includes('add-owner')}>Add Owner</MenuItem>
                    <MenuItem onClick={() => handleOnClickItem('add-employee')} active={location.pathname.includes('add-employee')}>Add Employee</MenuItem>
                </Menu>
            </PrivateTemplate.AppSidebar>
            {props.children} */}
            {/* {handleSelectedItem()} */}
            <div className='width-container'>
                <div className='settings-v2'>
                    <div className='settings-v2__header'>
                        <span>Settings</span>
                    </div>
                    <div className='settings-v2__main'>
                        <SettingsSidebar />
                        {props.children}
                    </div>
                </div>
            </div>
        </PrivateTemplate>
    )
}

const SettingsSidebar = () => {
    let navigate = useNavigate();


    return (
        <div className='settings-sidebar'>
            <ul>
                <li onClick={() => navigate('/settings/add-user')}>Add user</li>
                <li onClick={() => navigate('/settings/add-report')}>Add report</li>
                <li onClick={() => navigate('/settings/users')}>All users</li>
                <li>Product codes for update</li>
                <li>Drugstore codes for update</li>
                <li onClick={() => navigate('/settings/target')}>Set target</li>
            </ul>
        </div>
    )
}

export default Settings