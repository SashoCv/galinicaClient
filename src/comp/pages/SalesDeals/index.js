import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// templates
import PrivateTemplate from 'comp/templates/PrivateTemplate';
// services
import SalesDealsRest from 'services/rest/sales-deals';
import ProductsRest from 'services/rest/products';
// widgets
import Table from 'comp/widgets/Table';
import Modal from 'comp/widgets/Modal';
// ui comps
import Button from 'comp/ui/Button';
import Input from 'comp/ui/Input';
import Select from 'comp/ui/Select';
// icons
import ICON_LIST from 'assets/icons/ico-list.svg';
// styles
import './style.css';

const SalesDeals = () => {

    const [salesDeals, setSalesDeals] = useState([]);
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRowModalOpen, setIsRowModalOpen] = useState(false);
    const [salesDeal, setSalesDeal] = useState({
        nameOfDeal: '',
        sumFrom: 0,
        sumTo: 0,
        percentage: 0,
        dateFrom: '',
        dateTo: ''
    });
    const navigate = useNavigate();
    const [filters, setFilters] = useState({ nameOfDeal: '' });


    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setFilters({...filters, [name]: value});
    };

    useEffect(() => {
        (async() => {
            let d = await SalesDealsRest.getAll();
            let p = await ProductsRest.getAll();
            setSalesDeals(d);
            setProducts(p);
        })();
    },[]);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);
    const handleRowModalOpen = () => setIsRowModalOpen(true);
    const handleRowModalClose = () => setIsRowModalOpen(false);

    const dealsColumns = [
        { name: 'Name' },
        { name: 'Sum from' },
        { name: 'Sum to' },
        { name: 'Percentage' },
        { name: 'Date from' },
        { name: 'Date to' },
        { name: 'Actions' },
    ];

    const onClickCreateDeal = async () => {
        try {
            let res = await SalesDealsRest.createDeal(salesDeal)
            setSalesDeals([
                ...salesDeals,
                res.data
            ]);
            setIsModalOpen(false);
        } catch (error) {
            console.log('error', error);
        }  
    };

    const footerActions = [
        { label: 'Cancel', action: handleModalClose, theme: 'ghost' },
        { label: 'Create', action: onClickCreateDeal},
    ];

    const handleOnClickAddProduct = (id) => {
        console.log('id', id);
        setIsRowModalOpen(true);
    };

    const rowFooterActions = [
        { label: 'Cancel', action: handleRowModalClose, theme: 'ghost' },
        { label: 'Create', action: handleOnClickAddProduct }
    ];

    const handleOnChangeDeal = (e) => {
        setSalesDeal({
            ...salesDeal, 
            [e.target.name]: e.target.value
        });
    };

    console.log('salesDeals', salesDeals)

    const onClickClearFilters = async () => {
        console.log('onClickClearFilters')
        setFilters({ nameOfDeal: '' });
        let d = await SalesDealsRest.getAll();
        setSalesDeals(d);
    };
    
    const onClickSearch = () => {
        console.log('onClickSearch')
        setSalesDeals(salesDeals.filter(o => o.nameOfDeal.trim().toLowerCase().includes(filters.nameOfDeal.toLowerCase())));
    };

    return (
        <PrivateTemplate>
            <PrivateTemplate.AppSidebar>
                <div className='owners-filters'>
                    <Input label="Име" name="nameOfDeal" value={filters.nameOfDeal} onChange={handleOnChange}/>
                    {/* <Input label="Град"/> */}
                    <div className='products-filters__actions'>
                        <Button label="Филтрирај" onClick={onClickSearch}/>
                        <Button label="Избриши филтри" type="ghost" onClick={onClickClearFilters}/>
                    </div>
                </div>
            </PrivateTemplate.AppSidebar>
            <div className='products-list'>   
                {/* <div className='deals-list__header'> */}
                <div className='products-list__header'>
                    <div className='products-list__header-left'>
                        <img src={ICON_LIST}/>
                        <span>Sales deals</span>
                    </div>
                    <Button type="warning" label="Create new deal" onClick={() => navigate('/sales-deals/add')} />
                </div>
                {/* </div>  */}
                <Table columns={dealsColumns}>
                        {salesDeals.map((d, i) => {
                            return (
                                <tr className='products-row' key={i}>
                                    <Table.Cell>{d.nameOfDeal}</Table.Cell>
                                    <Table.Cell>{d.sumFrom}</Table.Cell>
                                    <Table.Cell>{d.sumTo}</Table.Cell>
                                    <Table.Cell>{d.percentage}%</Table.Cell>
                                    <Table.Cell>{d.dateFrom}</Table.Cell>
                                    <Table.Cell>{d.dateTo}</Table.Cell>
                                    <Table.Cell><span className='deals-row__add' onClick={() => navigate(`view/${d.id}`)}>View Deal</span></Table.Cell>
                                </tr>
                            );
                        })}
                </Table>
                {isModalOpen && 
                    <Modal title="Create new deal" footerActions={footerActions}>
                        <div className='deals-modal'>
                            <Input name="nameOfDeal" value={salesDeal.nameOfDeal} onChange={handleOnChangeDeal} label="Deal name"  customClassName="deals-custom-input"/>
                            <Input name="sumFrom" value={salesDeal.sumFrom} onChange={handleOnChangeDeal} label="Sum from" customClassName="deals-custom-input"/>
                            <Input name="sumTo" value={salesDeal.sumTo} onChange={handleOnChangeDeal} label="Sum to" customClassName="deals-custom-input"/>
                            <Input name="percentage" value={salesDeal.percentage} onChange={handleOnChangeDeal} label="Percentage" customClassName="deals-custom-input"/>
                            <Input type="month" name="dateFrom" value={salesDeal.dateFrom} onChange={handleOnChangeDeal} label="Date from" customClassName="deals-custom-input"/>
                            <Input type="month" name="dateTo" value={salesDeal.dateTo} onChange={handleOnChangeDeal} label="Date to" customClassName="deals-custom-input"/>

                        </div>
                    </Modal>
                }
                {isRowModalOpen && 
                    <Modal title="Add new product" footerActions={rowFooterActions}>
                        <Select options={products}/>
                    </Modal>
                }
            </div>
        </PrivateTemplate>
    )
};

export default SalesDeals;