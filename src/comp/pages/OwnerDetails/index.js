import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useParams } from 'react-router-dom';
// templates
import OwnerDetailsTemplate from 'comp/templates/OwnerDetailsTemplate';
// ui comps
import Input from 'comp/ui/Input';
import Button from 'comp/ui/Button';
// widgets
import Table from 'comp/widgets/Table';
// services 
import OwnersRest from 'services/rest/owners';
// icons 
import ICON_LIST from "assets/icons/ico-list.svg";
import ICON_EDIT from "assets/icons/ico-edit.svg";
// styles
import './style.css';

const OwnerDetails = ({ owner, handleOnChange, onClick }) => {

    // const { id } = useParams();
    // const [owner, setOwner] = useState({ id: 0, name: '', email: '', phone: 0 });

    // const handleOnChange = (e) => {
    //     setOwner({
    //         ...owner,
    //         [e.target.name]: e.target.value
    //     });
    // };

    // // useEffect(() => {
    // //     fetchOwner();
    // // }, []);

    // const fetchOwner = async() => {
    //     let o = await OwnersRest.getOneById(id);
    //     setOwner(o);
    // };

    console.log('owner', owner)
    // console.log('props', props)
    // console.log('props', props)

    
    return (
        // <OwnerDetailsTemplate name={owner.name} email={owner.email}>
        // <>
        //     <div className='owner-details__top'>
        //         <Input label="Име" value={owner.ownerName} onChange={handleOnChange} name='name' />
        //         <Input label="Email" value={owner.email} onChange={handleOnChange} name='email' />
        //         <Input label="Phone" value={owner.ownerPhone} onChange={handleOnChange} name='phone' />
        //     </div>
        //     <div className='owner-details__bottom'>
        //         <Button label="Зачувај"/>
        //     </div>
        // </>
        <div className='owner-view__main'>
            {/* <div className='product-edit__top-header' onClick={() => navigate('/products')}>
                <span>Back to product list</span>
                <img />
            </div> */}
            <div className='owner-view__main-content'>
                {/* <h1 className='owner-view__main-content-header'>Owner info</h1> */}
                <div className='owner-view__main-content__main'>
                    <Input label="Име" value={owner.ownerName} onChange={handleOnChange} name='ownerName' customClassName="owner-view__main-content__main-input"/>
                    <Input label="Email" value={owner.email} onChange={handleOnChange} name='email' customClassName="owner-view__main-content__main-input"/>
                    <Input label="Phone" value={owner.ownerPhone} onChange={handleOnChange} name='ownerPhone' customClassName="owner-view__main-content__main-input"/>
                    <Button label="Зачувај" customClassName="owner-view__main-content__main-btn" onClick={onClick}/>
                </div>
            </div>
        </div>
    )
};

const OwnerPharmacies = (props) => {
    console.log('props', props)

    const drugstoreColumns = [
        {name: 'Name'},
        {name: 'City'},
        {name: 'Address'},
        // {name: 'Owner'},
        {name: '', className: 'left-auto__header'}
    ];
    return (
        <>
            <div className="">
                {/* <div className='products-list__header'>
                    <div className='products-list__header-left'>
                        <img src={ICON_LIST}/>
                        <span>Drugstores</span>
                    </div>
                    <Button type="warning" label="Add Drugstore" onClick={() => {}} />
                </div> */}
                <Table columns={drugstoreColumns} customClassName="dark border-radius">
                    {props.drugstores?.map((d, i) => (
                        <tr className="owner-pharmacies-row" key={i}>
                            <Table.Cell>{d.nameDrugstore}</Table.Cell>
                            <Table.Cell>city name</Table.Cell>
                            <Table.Cell>{d.address}</Table.Cell>
                            {/* <Table.Cell>{d.owner.ownerName}</Table.Cell> */}
                            <Table.Cell className="left-auto" ></Table.Cell>
                        </tr>
                    ))}
                </Table>
            </div>
        </>
    )
};

export {
    OwnerDetails,
    OwnerPharmacies,
};