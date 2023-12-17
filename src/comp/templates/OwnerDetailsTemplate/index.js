import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
// templates
import PrivateTemplate from 'comp/templates/PrivateTemplate';
//
import { OwnerDetails, OwnerPharmacies } from 'comp/pages/OwnerDetails';
// services 
import OwnersRest from 'services/rest/owners';
// styles
import './style.css';

const OwnerDetailsTemplate = (props) => {
    const { id } = useParams();
    const [owner, setOwner] = useState({ ownerName: '', email: '', ownerPhone: '' });
    const [activeTab, setActiveTab] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        if (id === 'add') return;
        fetchOwner();
    }, []);

    const fetchOwner = async() => {
        let o = await OwnersRest.getOneById(id);
        setOwner(o);
    };

    const handleOnChange = (e) => {
        setOwner({
            ...owner,
            [e.target.name]: e.target.value
        });
    };

    console.log(owner)

    const onClickSave = async() => {
        await OwnersRest.updateOneById(owner.id, owner);
    }

    const onClickCreate = async() => {
        await OwnersRest.create(owner);
        console.log('clicked create', owner)
    }

    const handleTabChange = (e) => setActiveTab(parseInt(e.target.dataset.index));
    return (
        <PrivateTemplate>
            {/* <PrivateTemplate.AppSidebar>
                <div className='owner-details__sidebar'>
                    <span className='owner-details__sidebar__name'>{props.name}</span>
                    <span className='owner-details__sidebar__email'>{props.email}</span>
                </div>
            </PrivateTemplate.AppSidebar>
            <div className='owners-details'>
                <ul className='owners-navbar'>
                    <li className={`owners-navbar__nav-link ${activeTab === 1 && 'active'}`} data-index={1} onClick={handleTabChange}>Personal details</li>
                    <li className={`owners-navbar__nav-link ${activeTab === 2 && 'active'}`} data-index={2} onClick={handleTabChange}>Pharmacies</li>
                </ul>
                <div className='owners-details__main-wrapper'>
                    <div className='owners-details__main'>
                        {
                            activeTab === 1
                            ?   <OwnerDetails owner={owner} handleOnChange={handleOnChange}/>
                            :   <OwnerPharmacies drugstores={owner.drugstores}/>
                        }
                    </div>
                </div>
            </div> */}
            <div className='width-container'>
                <div className='owners-details-v2'>
                    <div className='owners-details-v2__header'>
                        <span>Owners id</span>
                        <div className='owners-details-v2__bck-btn' onClick={() => navigate('/owners')}>
                            <span>Back to owner list</span>
                            <img />
                        </div>
                    </div>
                    <div className='owners-details-v2__main'>
                        <ul className='owners-details-v2__main-tabs'>
                            <li className={`${activeTab === 1 && 'active'}`} data-index={1} onClick={handleTabChange}>Personal info</li>
                            {id != 'add' &&
                                <li className={`${activeTab === 2 && 'active'}`} data-index={2} onClick={handleTabChange}>Drugstores</li>
                            }
                        </ul>
                        <div className='owners-details-v2__main-content'>
                        {
                            activeTab === 1
                            ?   <OwnerDetails owner={owner} handleOnChange={handleOnChange} onClick={id === "add" ? onClickCreate : onClickSave}/>
                            :   <OwnerPharmacies drugstores={owner.drugstores} />
                        }
                        </div>
                    </div>
                </div>
            </div>
        </PrivateTemplate>
    )
};

export default OwnerDetailsTemplate;