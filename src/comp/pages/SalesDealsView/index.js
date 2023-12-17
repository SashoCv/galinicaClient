import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PrivateTemplate from 'comp/templates/PrivateTemplate';
import Button from 'comp/ui/Button';
import './style.css';
import { OwnerDetails } from '../OwnerDetails';
import Input from 'comp/ui/Input';
import ProductsRest from 'services/rest/products';
import SalesDealsRest from 'services/rest/sales-deals';
import Table from 'comp/widgets/Table';
import ICON_REMOVE from 'assets/icons/ico-remove.svg';
import Modal from 'comp/widgets/Modal';
import Select from 'react-select';



const SalesDealView = () => {

    const [activeTab, setActiveTab] = useState(1);
    const [deal, setDeal] = useState({});
    const [products, setProducts] = useState([]);
    const [dealProducts, setDealProducts] = useState([]);
    const { id } = useParams();
    const [isDealDone, setIsDealDone] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);



    const handleModalOpen = () =>  setIsModalOpen(true);
    const handleModalCancel = () =>  setIsModalOpen(false);

    const handleDeleteProduct = async (id) => {
        let res = await SalesDealsRest.deleteProductById(id);
        if (res.status === 200) {
            setDealProducts(dealProducts.filter(dp => dp.id !== id));
        }
    };
    
    useEffect(() => {
        (async() => {
            let promises = [
                ProductsRest.getAll(),
                SalesDealsRest.getOneById(id),
                SalesDealsRest.getProductsByDealId(id)
            ];
            
            let [products, deal, dealProducts] = await Promise.all(promises);
            let fp = products.filter(p => {
                let exist = dealProducts.length > 0 && dealProducts.find(dp => dp.product_id === p.id);
                if (!exist) {
                    return p;
                }
            });
            setDeal(deal);
            setProducts(fp.map(p => {
                return {
                    value: p.id,
                    label: p.nameOfProduct
                }
            }));
            setDealProducts(dealProducts);
        })()
    }, []);

    useEffect(() => {
        let now = new Date();
        let givenDate = new Date(deal.dateTo);
        if (givenDate < now) {
            setIsDealDone(true);
        }
    }, [deal.dateTo])


    const handleOnChangeDeal = (e) => {
        setDeal({
            ...deal, 
            [e.target.name]: e.target.value
        });
    };
    const handleTabChange = (e) => {
        if (!isDealDone) return;
        setActiveTab(parseInt(e.target.dataset.index)
    )};
    // console.log('activeTab', activeTab)
    console.log(dealProducts)

    const columns = [
        {
            name: 'Product name'
        },
        {
            name: 'Action',
            className: 'left-auto__header'
        }
    ];

    const handleSelectedOptions = (payload) => {
        setSelectedOptions(payload)
    };

    const handleAddProduct = async () => {
        console.log('')
        const ids = selectedOptions.map(option => option.value)
        const payload = {
            deal_id: id,
            products: ids
        }

        console.log('payload', payload)
        await SalesDealsRest.addProducts(payload);
        let res = await SalesDealsRest.getProductsByDealId(id);
        setDealProducts(res);
        setIsModalOpen(false);
        // console.log('res', res)
    }

    const footerActions = [
        { label: 'Cancel', action: handleModalCancel, theme: 'ghost' },
        { label: 'Add products', action: handleAddProduct},
    ];

    return (
        <PrivateTemplate>
            <div className='width-container'>
                <div className='sales-deal-view'>
                    <div className='sales-deal-view__header'>
                        <div className='sales-deal-view__header__bck-btn'>
                            <span>Back to sales deals view</span>
                            <img />
                        </div>  
                        <span>
                            Action name
                        </span>
                        <Button type="warning" label="Add Products" onClick={handleModalOpen}/>
                    </div>
                    <div className='sales-deal-view__main'>
                        <ul className='sales-deal-view__main-tabs'>
                            <li className={`${activeTab === 1 && 'active'}`} data-index={1} onClick={handleTabChange}>Deal info</li>
                            <li title={!isDealDone ? 'deal not done yet' : ''}className={`${!isDealDone && 'disabled' } ${activeTab === 2 && 'active'}`} data-index={2} onClick={handleTabChange}>Owners</li>
                            <Button type="warning" label="WHAT HERE ?"/>
                        </ul>
                        {activeTab === 1
                        ?
                        
                        <>
                        <div className='sales-deal-view__main-fields'>
                            {/* <h1 className='product-edit__main-header'>Deal info</h1> */}
                            {/* <div className='product-edit__main-inputs'> */}
                                <Input label="Action name" customClassName="product-input" name="nameOfDeal" onChange={handleOnChangeDeal} value={deal.nameOfDeal} disabled/>
                                <Input label="Percentage" type="number" customClassName="product-input" name="percentage" onChange={handleOnChangeDeal} value={deal.percentage} disabled/>
                                <Input label="Sum from" type="number" customClassName="product-input" name="sumFrom" onChange={handleOnChangeDeal} value={deal.sumFrom} disabled/>
                                <Input label="Sum to" type="number" customClassName="product-input" name="sumTo" onChange={handleOnChangeDeal} value={deal.sumTo} disabled/>
                                <Input label="Date from" type="month" customClassName="product-input" name="dateFrom" onChange={handleOnChangeDeal} value={deal.dateFrom} disabled/>
                                <Input label="Date to" type="month" customClassName="product-input" name="dateTo" onChange={handleOnChangeDeal} value={deal.dateTo} disabled/>
                            {/* </div> */}
                        </div>
                        <div className='sales-deal-view__main-products'>
                            <h1 className='product-edit__main-header sales-deal-view__main-products'>Deal Products</h1>
                            <Table columns={columns} customClassName="dark border-radius">
                                {dealProducts.map((dp, i) => (
                                    <tr className='owner-pharmacies-row' key={i}>
                                        <Table.Cell>{dp.products.nameOfProduct}</Table.Cell>
                                        <Table.Cell className="left-auto">
                                            <img src={ICON_REMOVE} onClick={() => handleDeleteProduct(dp.id)} />
                                        </Table.Cell>
                                    </tr>
                                ))}
                            </Table>
                        </div>
                        {isModalOpen && 
                        <Modal title="Add product" footerActions={footerActions}>
                            <div className='add-product-modal'>
                                <span>Search for products</span>
                                <Select options={products} isMulti={true} onChange={handleSelectedOptions} className='tag-select'/>
                            </div>
                        </Modal>
                    }
                        </>
                        : 
                        <div>Owners here</div>}
                    </div>
                </div>
            </div>
        </PrivateTemplate>
    )
};

export default SalesDealView;