import React, { useState, useEffect } from 'react';
import Settings from '.';
import Input from 'comp/ui/Input';
import './style.css';
import MultiSelect from 'comp/ui/MultiSelect';
import Button from 'comp/ui/Button';
import UsersRest from 'services/rest/users';

const AddUser = () => {

    const [user, setUser] = useState({name: '', email: '', password: '', role_id: null});

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const onChangeMulti = (e, s) => {
        setUser({
            ...user,
            [s.name]: e.value
        })
    }

    const roles = [
        {
            label: 'Admin1',
            value: 1
        },
        {

            label: 'Admin2',
            value: 2
        },
        {
            label: 'Admin3',
            value: 3
        }
    ];

    const onCreate = async () => {
        await UsersRest.create(user);
    }

    return (
        <Settings>
            <div className='add-user'>
                <h1 className='settings-header-label'>User Info</h1>
                <div className='add-user__fields'>
                    <div className='add-user__fields-group'>
                        <Input label="Name" name="name" value={user.name} onChange={onChange}/>
                        <Input label="Email" type="email" name="email" value={user.email} onChange={onChange}/>
                    </div>
                    <div className='add-user__fields-group'>
                        <Input label="Password" type="password" customClassName="add-user__fields-group__password" name="password" value={user.password} onChange={onChange}/>
                        <MultiSelect options={roles} label="Role" name="role_id" customClassName="add-user__fields-group__role" onChange={onChangeMulti}/>
                        <Button label="Save" onClick={onCreate}/>
                    </div>
                </div>
            </div>
        </Settings>   
    )
}

export default AddUser;