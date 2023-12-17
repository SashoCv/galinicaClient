import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// services
import { setUser } from 'services/redux/userSlice';
import Auth from 'services/rest/auth';
// ui comps
import Input from 'comp/ui/Input';
import Button from 'comp/ui/Button';
// icons
import ICON_GALENIKA from 'assets/icons/galenika-logo.png';
import ICON_GALENIKA_MAIN from 'assets/icons/galenika-main.png';
// styles
import './style.css';

const PublicTemplate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initState = {
        email: '',
        password: ''
    };

    const [loginFields, setLoginFields] = useState(initState);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        setLoginFields({
            ...loginFields,
            [e.target.name]: e.target.value
        })
    };

    const handleOnLogin = async () => {
        setIsLoading(true);
        try {
            await Auth.Login(loginFields);
            navigate('/');
        } catch (error) {
            // console.log('error', error)
        } finally {
            setIsLoading(false);
        }
    }

    // console.log(loginFields);

    return (
        <div className='public-template'>
            <div className='public-template__left'>
                <img src={ICON_GALENIKA} className='logo'/>
                <div className='public-template__left-form'>
                    <div className='public-template__left-form__header'>
                        <h1>Hi, Welcome Back</h1>
                        <span>Enter your credentials to continue</span>
                    </div>
                    <div className='public-template__left-form__main'>
                        <Input placeholder="Email" type="email" name='email' value={loginFields.email} onChange={handleOnChange}/>
                        <Input placeholder="Password" type="password" name='password' value={loginFields.password} onChange={handleOnChange}/>
                    </div>
                    <div className='public-template__left-form__footer'>
                        <label>
                            <input type='checkbox'/>
                            Keep me logged in
                        </label>
                        <Button label="login" onClick={handleOnLogin} isLoading={isLoading} />
                    </div>
                </div>
            </div>
            <div className='public-template__right'>
                
                <div>
                    <h1>Welcome to Galenika</h1>
                    <span>Slider goes here</span>
                </div>
                <img src={ICON_GALENIKA_MAIN}/>
            </div>
        </div>
    )
}

export default PublicTemplate;