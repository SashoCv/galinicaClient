import React from 'react';
import { useSelector } from 'react-redux';

export const RoleBox = ({ userRole, role, children }) => {
    const userData = useSelector(state => state.user);
    // console.log('userData', userData)

    let allowed = false;

    if (userData.user) {
        // for (let r of userData.role) {
        //     allowed = role.includes(r);
        //     if (allowed) break;
        // }
        // console.log('role', role)
        allowed = role.includes(userData.user.id);
        // console.log('allowed', allowed)
        
    }
    // return <>{children}</>
    return allowed ? <>{children}</> : null;
};