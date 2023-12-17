import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import PublicTemplate from 'comp/templates/PublicTemplate';
import PrivateTemplate from 'comp/templates/PrivateTemplate';
import Dashboard from 'comp/pages/Dashboard';
import Financial from 'comp/pages/Financial';
import Settings from 'comp/pages/Settings';
import Products from 'comp/pages/Products';
import ProductDetails from 'comp/pages/ProductDetails';
import Owners from 'comp/pages/Owners';
import { OwnerDetails, OwnerPharmacies } from 'comp/pages/OwnerDetails';
import SalesDeals from 'comp/pages/SalesDeals';
import QuartalyDeals from 'comp/pages/QuartalyDeals';
import DealView from 'comp/pages/DealView';
import Drugstores from 'comp/pages/Drugstores';
import DrugstoreDetails from 'comp/pages/DrugstoreDetails';
// import OwnerDetails from 'comp/pages/OwnerDetails';
// import PersonalDetails from 'comp/pages/OwnerDetails/PersonalDetails';
// import OwnerPharmacies from 'comp/pages/OwnerPharmacies';
import SettingsReports from 'comp/pages/SettingsReports';
import SettingsPharmacies from 'comp/pages/SettingsPharmacies';
import SettingsWholesalers from 'comp/pages/SettingsWholesalers';
import SettingsOwners from 'comp/pages/SettingsOwners';
import SettingsEmployees from 'comp/pages/SettingsEmployees';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, clearUser } from 'services/redux/userSlice';
import Reports from 'comp/pages/Reports';
import routes from 'data/routes';
// services
import Auth from 'services/rest/auth';
// styles
import './assets/styles/global.css';
import OwnerDetailsTemplate from 'comp/templates/OwnerDetailsTemplate';
import SalesDealView from 'comp/pages/SalesDealsView';
import AddUser from 'comp/pages/Settings/AddUser';
// import Users from 'services/rest/users';
import Users from 'comp/pages/Settings/Users';
import Target from 'comp/pages/Settings/Target';

function App() {
    const u = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPrivate, setShowPrivate] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const token = window.localStorage.getItem('token');
        // console.log('token', token)
        if (token) {
            (async() => {
                setShowPrivate(true);
                let u = await Auth.ValidateToken(token);
                dispatch(setUser({
                    user: u,
                    isLogged: true
                }));
            })();
        } else {
            navigate('/');
            setShowPrivate(false);
        }
        setLoading(false);
    }, [window.localStorage.getItem('token')]);
    // console.log('uaaaaaaaaaaaaaaaaa', u)

    if (loading) {
        return <div>Loading</div>
    }

    return (
        <Routes>
            {
                showPrivate
                ?   <>
                        <Route path='/' element={ <Dashboard />} />
                        <Route path='/financial' element={ <Financial />} />
                        <Route path='/settings' element={ <Settings />} />
                        <Route path='/products' element={ <Products />} />
                        <Route path='/drugstores' element={ <Drugstores />} />
                        <Route path='/owners' element={ <Owners />} />
                        <Route path='/sales-deals' element={ <SalesDeals />} />
                        <Route path='/:deal/:id' element={ <DealView />} />
                        <Route path='/sales-deals/view/:id' element={ <SalesDealView />} />
                        <Route path='/quartaly-deals' element={ <QuartalyDeals />} />
                        <Route path='/:deal/:id' element={ <DealView />} />
                        <Route path='/owners/:id' element={ <OwnerDetailsTemplate />}/>
                        <Route path='/reports'  element={ <Reports />}/>
                        {/* <Route path='/owners/:id/pharmacies' element={ <OwnerPharmacies />} /> */}
                        <Route path='/products/:id' element={ <ProductDetails />} />
                        <Route path='/drugstores/:id' element={ <DrugstoreDetails />} />
                        <Route path='/settings/add-report' element={ <SettingsReports />} />
                        <Route path='/settings/add-pharmacy' element={ <SettingsPharmacies />} />
                        <Route path='/settings/add-wholesaler' element={ <SettingsWholesalers />} />
                        <Route path='/settings/add-owner' element={ <SettingsOwners />} />
                        <Route path='/settings/add-employee' element={ <SettingsEmployees />} />
                        <Route path='/settings/add-user' element={ <AddUser />} />
                        <Route path='/settings/users' element={ <Users />} />
                        <Route path='/settings/target' element={ <Target />} />

                    </>
                : <Route path="/" element={<PublicTemplate />}/>
            } 
        </Routes>
    );
}

export default App;