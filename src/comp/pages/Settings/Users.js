import React, { useState, useEffect } from 'react';
import Settings from '.';
import './style.css';
import UsersRest from 'services/rest/users';

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        (async() => {
            let u = await UsersRest.getAll();
            setUsers(u);
        })();
    }, [])

    return (
        <Settings>
            <div className='users'>
                <div className='users-header'>
                    <span>Name</span>
                    <span>Email</span>
                    <span>Role</span>
                    <span className='left-auto'>View</span>
                </div>
                <div className='users-list'>
                    {users?.map((u, i) => {
                        return (
                            <div>
                                <span>{u.name}</span>
                                <span>{u.email}</span>
                                <span>{u.role?.roleName}</span>
                                <span className='left-auto'>logo here</span>
                            </div>   
                        )
                    })}
                </div>
            </div>
        </Settings>
    )
};

export default Users;