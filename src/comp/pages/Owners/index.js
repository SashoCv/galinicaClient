import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// templates
import PrivateTemplate from 'comp/templates/PrivateTemplate';
// widgets
import Table from 'comp/widgets/Table';
// services
import OwnersRest from 'services/rest/owners';
// ui comps
import Input from 'comp/ui/Input';
import Button from 'comp/ui/Button';
// icons
import ICON_EDIT from 'assets/icons/ico-edit.svg';
import ICON_LIST from 'assets/icons/ico-list.svg';
import ICON_FUNNEL from 'assets/icons/ico-funnel.svg';
// styles
import './style.css';

const Owners = () => {

    const navigate = useNavigate();
    const [owners, setOwners] = useState([]);
    const [filters, setFilters] = useState({ownerName: ''});

    const fakeData = [
        { id: 1, name: "Meto 1", email: 'meto.a1@beyondbasics.co', phone: 111111 },
        { id: 2, name: "Meto 2", email: 'meto.a2@beyondbasics.co', phone: 222222 },
        { id: 3, name: "Meto 3", email: 'meto.a3@beyondbasics.co', phone: 333333 },
        { id: 4, name: "Meto 4", email: 'meto.a4@beyondbasics.co', phone: 444444 },
        { id: 5, name: "Meto 5", email: 'meto.a5@beyondbasics.co', phone: 555555 },
    ];

    const ownersColumns = [
        { name: 'Name' },
        { name: 'Email' },
        { name: 'Phone' },
        { name: 'Edit', className: 'left-auto__header' },
    ];

    const fetchOwners = async() => {
        let o = await OwnersRest.getAll();
        setOwners(o);
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    const onClickSearch = () => {
        console.log('onClickSearch')
        setOwners(owners.filter(o => o.ownerName.trim().toLowerCase().includes(filters.ownerName.toLowerCase())));
    };

    const onClickClearFilters = () => {
        console.log('onClickClearFilters')
        setFilters({ownerName: ''});
        fetchOwners();
    };

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setFilters({...filters, [name]: value});
    };

    const onClickAddOwner = () => {
        navigate('/owners/add')
    };

    console.log('owners', owners)

    return (
        <PrivateTemplate>
            <PrivateTemplate.AppSidebar>
                <div className='owners-filters'>
                    <Input label="Име" name="ownerName" value={filters.ownerName} onChange={handleOnChange}/>
                    {/* <Input label="Град"/> */}
                    <div className='products-filters__actions'>
                        <Button label="Филтрирај" onClick={onClickSearch}/>
                        <Button label="Избриши филтри" type="ghost" onClick={onClickClearFilters}/>
                    </div>
                </div>
            </PrivateTemplate.AppSidebar>
            <div className='products-list'>
                <div className='products-list__header'>
                    <div className='products-list__header-left'>
                        <img src={ICON_LIST}/>
                        <span>Owners</span>
                    </div>
                    <Button type="warning" label="Add Owner" onClick={onClickAddOwner} />
                </div>
                <Table columns={ownersColumns}>
                    {owners.map((o, i) => { 
                        return (
                            <tr className='products-row' key={i}>
                                <Table.Cell>{o.ownerName}</Table.Cell>
                                <Table.Cell>{o.email}</Table.Cell>
                                <Table.Cell>{o.ownerPhone}</Table.Cell>
                                <Table.Cell className="left-auto">
                                    <img src={ICON_EDIT} className='owners-row__edit' onClick={() => navigate(`/owners/${o.id}`)} />
                                </Table.Cell>
                            </tr>
                        )
                    })}
                </Table>
            </div>
        </PrivateTemplate>
    )
};

export default Owners;