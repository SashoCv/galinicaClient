import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// templates
import PrivateTemplate from "comp/templates/PrivateTemplate";
// widgets
import Table from "comp/widgets/Table";
// services
import { random } from "services/strings";
import DrugstoresRest from "services/rest/drugstores";
// ui comps
import Input from "comp/ui/Input";
import Button from "comp/ui/Button";
import Switch from "comp/ui/Switch";
// icons
import ICON_LIST from "assets/icons/ico-list.svg";
import ICON_FUNNEL from "assets/icons/ico-funnel.svg";
import ICON_EDIT from "assets/icons/ico-edit.svg";
// animations
import ANIMATION_LOADER from "assets/animations/loader.gif";
// styles
import "./style.css";

const Drugstores = () => {
    const navigate = useNavigate();
    const filtersInit = {
        name: "",
        city: "",
        owner: "",
    };

    const [drugstores, setDrugstores] = useState([]);
    const [filters, setFilters] = useState(filtersInit);    
    const [loading, setLoading] = useState(false);
    const [clearFilters, setClearFilters] = useState(false);

    const fetchDrugstores = async () => {
        setLoading(true);
        let d = await DrugstoresRest.getAll();
        setDrugstores(d);
        setLoading(false);
    };

    useEffect(() => {
        fetchDrugstores();
    }, []);

    const drugstoreColumns = [
        {name: 'Name'},
        {name: 'City'},
        {name: 'Address'},
        {name: 'Owner'},
        {name: 'Edit', className: 'left-auto__header'}
    ];
    
    const handleOnChange = (e) => {   
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleOnFiltersSubmit = () => {
        
        const filteredDrugstores = drugstores.filter(d => {
            return (!filters.name || d.nameDrugstore.trim().toLowerCase().includes(filters.name.toLowerCase())) &&
            (!filters.city || d.city.cityName?.toLowerCase().includes(filters.city.toLowerCase())) &&
            (!filters.owner || d.owner.ownerName?.toLowerCase().includes(filters.owner.toLowerCase()))
        });
        setDrugstores(filteredDrugstores);
    };

    const handleOnFiltersClear = () => {
        setFilters(filtersInit);  
        fetchDrugstores();
        setDrugstores(drugstores);
    };

    const handleOnClickEdit = (id) => {
        navigate(`/drugstores/${id}`);
    };

    console.log('filters', drugstores.filter(d => d.id === 1))
    console.log('filters', drugstores.filter(d => d.nameDrugstore.trim().toLowerCase().includes('meto')))
    // console.log(drugstores[drugstores.length - 1])
    // console.log('drugstores', drugstores)


    return (
        <PrivateTemplate>
            <PrivateTemplate.AppSidebar label="Filters" icon={ICON_FUNNEL}>
                <div className="products-filters">
                    <Input type="text" label="Drugstore name" height="medium" name="name" value={filters.name} onChange={handleOnChange}/>
                    <Input type="text" label="Drugstore city" height="medium" name="city" value={filters.city} onChange={handleOnChange}/>
                    <Input type="text" label="Drugstore owner" height="medium" name="owner" value={filters.owner} onChange={handleOnChange}/>
                </div>
                <div className='products-filters__actions'>
                    <Button label="Филтрирај" onClick={handleOnFiltersSubmit}/>
                    <Button label="Избриши филтри" type="ghost" onClick={handleOnFiltersClear}/>
                </div>
            </PrivateTemplate.AppSidebar>
            <div className="products-list">
                <div className='products-list__header'>
                    <div className='products-list__header-left'>
                        <img src={ICON_LIST}/>
                        <span>Drugstores</span>
                    </div>
                    <Button type="warning" label="Add Drugstore" onClick={() => navigate('/drugstores/add')} />
                </div>
                <Table columns={drugstoreColumns} >
                    {drugstores.map((d, i) => (
                        <tr className="products-row" key={i}>
                            <Table.Cell>{d.nameDrugstore}</Table.Cell>
                            <Table.Cell>{d.city.cityName}</Table.Cell>
                            <Table.Cell>{d.address}</Table.Cell>
                            <Table.Cell>{d.owner.ownerName}</Table.Cell>
                            <Table.Cell className="left-auto" ><img src={ICON_EDIT} className='products-row__edit' onClick={() => handleOnClickEdit(d.id)}/></Table.Cell>
                        </tr>
                    ))}
                </Table>
            </div>
        </PrivateTemplate>
    )
};

export default Drugstores;