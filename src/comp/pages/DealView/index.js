import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PrivateTemplate from 'comp/templates/PrivateTemplate';
import Button from 'comp/ui/Button';
import Modal from 'comp/widgets/Modal';
// import Select from 'comp/ui/Select';
import ProductsRest from 'services/rest/products';
import SalesDealsRest from 'services/rest/sales-deals';
import InputTag from 'comp/ui/InputTag';
import Select from 'react-select';
import Input from 'comp/ui/Input';
import ICON_REMOVE from 'assets/icons/ico-remove.svg';
// styles
import './style.css';

const DealView = () => {

    const params = useParams();
    const navigate = useNavigate();
    // console.log(params.deal);
    // console.log(params.deal);
    // console.log(params.deal);
    // console.log(params.deal);
    // console.log(params.deal);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [payload, setPayload] = useState({
        deal_id: params.id,
        products: []
    });
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [deal, setDeal] = useState({});
    const [dealProducts, setDealProducts] = useState([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleModalOpen = () =>  setIsModalOpen(true);
    const handleModalCancel = () =>  setIsModalOpen(false);
    const handleDeleteModalOpen = () =>  setIsDeleteModalOpen(true);

    const handleAddProduct = async () => {
        console.log('')
        const ids = selectedOptions.map(option => option.value)
        const payload = {
            deal_id: params.id,
            products: ids
        }

        console.log('payload', payload)

        await SalesDealsRest.addProducts(payload);
        let res = await SalesDealsRest.getProductsByDealId(params.id);
        setDealProducts(res);
        setIsModalOpen(false);
        // console.log('res', res)
    }

    const onClickCreateDeal = async () => {
        try {
            if (params.deal === 'quartaly-deals') {
                let res = await SalesDealsRest.createDealQ(deal)
                navigate(`/quartaly-deals/view/${res.data.id}`)
            } else {
                let res = await SalesDealsRest.createDeal(deal)
                // setSalesDeals([
                //     ...salesDeals,
                //     res.data
                // ]);
                // setIsModalOpen(false);
                console.log('res', res)
                navigate(`/sales-deals/view/${res.data.id}`)
            }
        } catch (error) {
            console.log('error', error);
        }  
    };

    console.log('deal', deal)
    
    useEffect(() => {
        (async() => {
            if (params.id === 'add') {
                let products = await ProductsRest.getAll()
                setProducts(products.map(p => {
                    return {
                        value: p.id,
                        label: p.nameOfProduct
                    }
                }));
            } else {
            let promises = [
                ProductsRest.getAll(),
                SalesDealsRest.getOneById(params.id),
                SalesDealsRest.getProductsByDealId(params.id)
            ];
            let [products, deal, dealProducts] = await Promise.all(promises);
            console.log('products.length', products.length)
            console.log('dealProducts.length', dealProducts.length)
            // filter products
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
        }
            // let dp = await SalesDealsRest.getProductsByDealId(id);
            // setDealProducts(dp);
        })();
    }, []);

    const footerActions = [
        { label: 'Cancel', action: handleModalCancel, theme: 'ghost' },
        { label: 'Add products', action: handleAddProduct},
    ];

    const handleSelectedOptions = (payload) => {
        setSelectedOptions(payload)
    };

    const handleDeleteProduct = async (id) => {
        let res = await SalesDealsRest.deleteProductById(id);
        if (res.status === 200) {
            setDealProducts(dealProducts.filter(dp => dp.id !== id));
        }
    };

    const handleOnChangeDeal = (e) => {
        setDeal({
            ...deal, 
            [e.target.name]: e.target.value
        });
    };

    // useEffect(() => {
    //     (async() => {
    //         let products = await ProductsRest.getAll();
    //         console.log('products', products)
    //         // filter products 
    //         let fp = products.filter(p => {
    //             let exist = dealProducts.length > 0 && dealProducts.find(dp => dp.product_id === p.id);
    //             if (!exist) {
    //                 return p;
    //             }
    //             // if (exist) {
    //                 // return null;
    //             // } else {
    //                 // return p;
    //             // }
            
    //         })
    //         console.log('fp.length', fp.length)
    //         setProducts(fp.map(p => {
    //             // let exist = dealProducts.find(dp => dp.products.id === p.id);
    //             // console.log('exist', exist)
    //             // if (exist) {
    //                 return {
    //                     value: p.id,
    //                     label: p.nameOfProduct
    //                 }
    //             // } else {
    //                 // return null;
    //             // }
    //         }));
    //     })(); 
    // }, []);

    const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#498a49',
      isFocused: '#498a49', // Change the border color here
      '&:hover': {
        borderColor: 'red', // Change the hover border color here
      },
    }),
  };

    // console.log('selectedOptions', selectedOptions)
    console.log('dealProducts', dealProducts);
    // console.log('selectedProducts', selectedProducts)
    // console.log('d', deal);
    return (
        <PrivateTemplate>
            {/* <PrivateTemplate.AppSidebar>
                Deal name
            </PrivateTemplate.AppSidebar> */}
            {/* <div className='deal-view'>
                <div className='deal-view__header'>
                    <div className='deal-view__header-info'>
                        SOMETHING HERE
                      
                    </div>        
                    <Button label="Add products" onClick={handleModalOpen} />
                </div>
                <div className='deal-view__body'>
                </div>
                {isModalOpen && 
                    <Modal title="Add product" footerActions={footerActions}>
                        <div className='add-product-modal'>
                            <span>Search for products</span>
                            <Select options={products} isMulti={true} onChange={handleSelectedOptions} className='tag-select'/>
                        </div>
                    </Modal>
                }
            </div> */}
            <div className='product-edit'>
                {
                    params.deal === 'quartaly-deals'
                    ? <div className='product-edit__top-header' onClick={() => navigate('/quartaly-deals')}>
                    <span>Back to quarterly deals list</span>
                    <img />
                </div>
                    :<div className='product-edit__top-header' onClick={() => navigate('/sales-deals')}>
                    <span>Back to sales deals list</span>
                    <img />
                </div>
                }
                
                
                <div className='product-edit__main'>
                    <h1 className='product-edit__main-header'>Deal info</h1>
                    <div className='product-edit__main-inputs'>
                        {params.deal === 'quartaly-deals' 
                        ? 
                        <Input label="Action name" customClassName="product-input" name="quarterlyName" onChange={handleOnChangeDeal} value={deal.quarterlyName
                            }/>
                        :<Input label="Action name" customClassName="product-input" name="nameOfDeal" onChange={handleOnChangeDeal} value={deal.nameOfDeal}/>
                        }
                        <Input label="Percentage" type="number" customClassName="product-input" name="percentage" onChange={handleOnChangeDeal} value={deal.percentage}/>
                        <Input label="Sum from" type="number" customClassName="product-input" name="sumFrom" onChange={handleOnChangeDeal} value={deal.sumFrom}/>
                        <Input label="Sum to" type="number" customClassName="product-input" name="sumTo" onChange={handleOnChangeDeal} value={deal.sumTo}/>
                        <Input label="Date from" type="month" customClassName="product-input" name="dateFrom" onChange={handleOnChangeDeal} value={deal.dateFrom}/>
                        <Input label="Date to" type="month" customClassName="product-input" name="dateTo" onChange={handleOnChangeDeal} value={deal.dateTo}/>
                    </div>
                    {params.id != 'add' && 
                    <>
                    {/* <div className='product-edit__main-pharmacy-header'>
                        <h1 className='product-edit__main-pharmacy'>Deal products</h1>
                        <Button type="warning" label="Add products" customClassName="product-pharmacy" onClick={handleModalOpen}/>
                    </div>
                    <div className='product-codes__list'>
                        {dealProducts.map((dp, i) => {
                            return (
                                <div className='product-codes__list-item' key={i}>
                                    <span className='product-codes__list-item-name'>{dp.products.nameOfProduct}</span>
                                    <img src={ICON_REMOVE} onClick={() => handleDeleteProduct(dp.id)} />
                                </div>
                            );
                        })}
                    </div> */}
                    </>
                    }
                    {isModalOpen && 
                        <Modal title="Add product" footerActions={footerActions}>
                            <div className='add-product-modal'>
                                <span>Search for products</span>
                                <Select options={products} isMulti={true} onChange={handleSelectedOptions} className='tag-select'/>
                            </div>
                        </Modal>
                    }
                    {/* {isDeleteModalOpen &&


                    } */}
                    <div className='product-edit-actions'>
                            <Button label={params.id === 'add' ? 'Create deal' : 'Save Changes'} customClassName="product-edit-save" onClick={params.id === 'add' ? onClickCreateDeal : () => {}}/>
                    </div>
                </div>
            </div>
        </PrivateTemplate>
    )
};

export default DealView;