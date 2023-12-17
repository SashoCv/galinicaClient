import React, { useState } from 'react';
// import { Sidebar, Menu, MenuItem, SidebarHeader } from 'react-pro-sidebar';
// import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
// ui
import Header from 'comp/ui/Header';
// icons
import ICON_GALENIKA from 'assets/icons/galenika-logo.png'
import ICON_HAMBURGER from 'assets/icons/hamburger.svg'
// styles
import './style.css';
import { Sidebar } from 'react-pro-sidebar';

const PrivateTemplate = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentContent, setCurrentContent] = useState('');

    const onClickColapse = () => {
        setCollapsed(!collapsed);
    };

    const handleCurrentContent = (content) => {
        setCurrentContent(content);
    };

    // const sidebar = React.Children.map(props.children, child => child.displayName === 'Sidebar' ? child : null);

    return (
        <div className='private-template'>
            <Header />
            <div className='private-template__main'>
                {props.children}
                {/* {sidebar} */}
                {/* <Sidebar
                    className='sidebar'
                    collapsed={collapsed}
                    >
                    <Menu menuItemStyles={{
                        button: {
                            color: '#616161',
                            '&:hover': {
                                background: '#B9F6CA'
                            }
                        }
                    }}>
                        <div className={`sidebar-header ${collapsed && 'collapsed'}`}>
                            <img src={ICON_GALENIKA} className='logo'/>
                            <img src={ICON_HAMBURGER} className='ham' onClick={onClickColapse}/> 
                        </div>
                        {collapsed && 
                            <MenuItem>
                            <img src={ICON_HAMBURGER} className='ham' onClick={onClickColapse}/> 
                            
                            </MenuItem>
                        }
                        <MenuItem
                            onClick={() => handleCurrentContent("Dashboard")}
                        >
                            Dashboard
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCurrentContent("Financial")}
                        >
                            Financial
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCurrentContent("Products")}
                        >
                            Products
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCurrentContent("Pharmacies")}
                        >
                            Pharmacies
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCurrentContent("Add report")}
                        >
                            Add Report
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCurrentContent("Add pharmacy")}
                        >
                            Add Pharmacy
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCurrentContent("Add Wholesaler")}
                        >
                            Add Wholesaler
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCurrentContent("Add Owner")}
                        >
                            Add Owner
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCurrentContent("Add Employee")}
                        >
                            Add Employee
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCurrentContent("Learning Hub")}
                        >
                            Learning Hub
                        </MenuItem>
                    </Menu>
                </Sidebar>
                <div className='private-template__main-content'>
                    <div className='private-template__main-header'>
                    </div>
                    {currentContent}
                </div> */}
            </div>
        </div>
    )
}

const AppSidebar = (props) => {
    const [collapsed, setCollapsed] = useState(false);
    // const [currentContent, setCurrentContent] = useState('');

    const onClickColapse = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Sidebar
            collapsed={false}
            className='sidebar'
            // width='300px'
        >
            <div className={`sidebar-header`}>
                <img src={props.icon}/>
                <span>{props.label}</span>
            </div>
            <div className='sidebar-content'>
                {props.children}
            </div>
            {/* <input /> */}
        </Sidebar>
    )
};
AppSidebar.displayName = 'AppSidebar';
PrivateTemplate.AppSidebar = AppSidebar;

export default PrivateTemplate