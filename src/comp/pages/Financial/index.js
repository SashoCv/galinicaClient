import React, { useState, useEffect } from 'react';
// templates
import PrivateTemplate from 'comp/templates/PrivateTemplate';
// services 
import Pharmacies from 'services/rest/pharmacies';
import Owners from 'services/rest/owners';
import Drugstores from 'services/rest/drugstores';
import Products from 'services/rest/products';
import FinancialRest from 'services/rest/financial';
import Cities from 'services/rest/cities';
// ui comps 
import Input from 'comp/ui/Input';
import Select from 'comp/ui/Select';
import MultiSelect from 'comp/ui/MultiSelect';
import Button from 'comp/ui/Button';
import Switch from 'comp/ui/Switch';
// icons
import ICON_FUNNEL from 'assets/icons/ico-funnel.svg';
// styles
import './style.css';

const Financial = () => {

    const [pharmacies, setPharmacies] = useState([]);
    const [owners, setOwners] = useState([]);
    const [drugstores, setDrugstores] = useState([]);
    const [filters, setFilters] = useState({pharmacies: [], owners: [], drugstores: [], products: [], cities: [], date_from: '', date_to: ''});
    const [products, setProducts] = useState([]);
    const [cities, setCities] = useState([]);
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [totalSum, setTotalSum] = useState(0);
    const [disableDrugstores, setDisableDrugstores] = useState(false);
    const [disableOwners, setDisableOwners] = useState(false);
    const [financialData, setFinancialData] = useState('');

    useEffect(() => {
        console.time('fetch-with-promises');
        (async () => {
            let promises = [Pharmacies.getAll(), Owners.getAll(), Drugstores.getAll(), Products.getAll(), Cities.getAll()];
            let [ph, ow, dr, p, c] = await Promise.all(promises);
            // Veledrogerija
            setPharmacies(ph.map(p => {
                return {
                    value: p.id,
                    label: p.drugstoreName
                }
            }));
            // Sopstvenik
            setOwners(ow.map(o => {
                return {
                    value: o.id,
                    label: o.ownerName
                }
            }));
            // Apteki
            setDrugstores(dr.map(d => {
                return {
                    value: d.id,
                    label: d.nameDrugstore
                }
            }));
            // Produkti
            setProducts(p.map(p => {
                return {
                    value: p.id,
                    label: p.nameOfProduct
                }
            }));
            // Gradovi
            
            setCities(c.map(c => {
                console.log('c', c)
                return {
                    value: c.id,
                    label: c.cityName
                }
            }));
            // setCities([...new Set(dr.map((d, i) => {
            //     return {
            //         value: d.city,
            //         label: d.city
            //     }
            // }))]);
            // let cities = [...new Set(dr.map((d, i) =>  d.city ))];
            
            // console.log('cities', cities)
            // const uniqueCities = [...new Set(drugstores.map(d => d.city))];
        })();
        console.timeEnd('fetch-with-promises');
    },[]);

    useEffect(() => {
        // console.log('data', data)
        let totalSum = data.reduce((sum, drugstore) => {
            return sum + drugstore.products.reduce((sum, product) => sum + product.totalSum, 0)
        }, 0);
        setTotalSum(totalSum);
    }, [data]);

    const handleOnChange = (payload, e) => {
        // console.log('e', e)
        // setFilters({
        //     // [e.target.name]: [...filters[e.target.name], {value: e.target.value, label: e.target.}]
        // })
        setFilters({
            ...filters,
            [e.name]: [...payload]
        });
        // console.log('e.target.value', payload)
    };

    const handleOnChangeDates = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleOnFiltersSubmit = async () => {
        // console.log('filters', filters);
        // if (validation()) return;
        let filterPayload = {};
        // console.log('filters.pharmacies ? true : false', filters.pharmacies ? true : false)
        if (filters.pharmacies.length) filterPayload.pharmaciesIds = filters.pharmacies.map(d => d.value);
        if (filters.owners.length) filterPayload.ownersIds = filters.owners.map(o => o.value);
        if (filters.products.length) filterPayload.productIds = filters.products.map(p => p.value);
        if (filters.drugstores.length) filterPayload.drugstoreIds = filters.drugstores.map(d => d.value);
        if (filters.cities.length) filterPayload.citiesIds = filters.cities.map(c => c.value);

        try {
            let res =  await fetch('https://galenika.cloud/api/financial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem('token')}`
                },
                body: JSON.stringify(filterPayload),
            });
            console.log("here", filterPayload);
    
            const data = await res.json();
            if (filterPayload)
            console.log('data from filters', data)
            setData(Object.values(data.data));   
        } catch (error) {
            console.log('error', error);     
        }
    };

    const validation = () => {
        let out = false;
        if (filters.date_from === '' || filters.date_to === '') {
            out = true;
            // set err here
        }
        return out;
    };

    const handleOnFiltersClear = () => {};

    const toggleTab = (e, id) => {
        // e.stopPropagation();
        if (e.target.classList.contains('financial-table__header')) {
            setActiveTab(id === activeTab ? 0 : id);
        }
        // setActiveTab(id === activeTab ? 0 : id);
    }
    // console.log('filters', filters);
    console.log('data', data)
    return (
        <PrivateTemplate>
            <PrivateTemplate.AppSidebar label="Filters" icon={ICON_FUNNEL}>
                <div className='financial-filters'>
                    <MultiSelect options={pharmacies} isMulti={true} label="Веледрогерија" name="pharmacies" onChange={handleOnChange}/>
                    <MultiSelect options={owners} isMulti={true} label="Сопственик" name="owners" onChange={handleOnChange} disabled={filters.drugstores.length > 0 && true}/>
                    <MultiSelect options={drugstores} isMulti={true} label="Аптека" name="drugstores" onChange={handleOnChange} disabled={filters.owners.length > 0 && true}/>
                    <MultiSelect options={products} isMulti={true} label="Продукт" name="products" onChange={handleOnChange}/>
                    <MultiSelect options={cities} isMulti={true} label="Град" name="cities" onChange={handleOnChange} disabled={false}/>
                    {/* <Select label="Веледрогерија" options={pharmacies} name="drugstores" onChange={handleOnChange}/>
                    <Select label="Сопственик" options={owners}/>
                    <Select label="Град" options={[]}/>
                <Select label="Продукт" options={[]}/> */}
                    {/* <Input label="Месец" type="month" name="date_from" onChange={handleOnChangeDates} value={filters.date_from} disabled={true}/> */}
                    <Input label="Search by month" type="month" name="date_to" onChange={handleOnChangeDates} value={filters.date_to} disabled={true}/>
                    <div className='financial-filters__switch-group'>
                        <Switch label="List 1"/>
                        <Switch label="List 2"/>
                        <Switch label="List 3"/>
                    </div>
                    <Switch label="Select to seatch by quantity" customClassName="full"/>
                </div>
                <div className='financial-filters__actions'>
                    <Button label="Филтрирај" onClick={handleOnFiltersSubmit}/>
                    <Button label="Избриши филтри" type="ghost" onClick={handleOnFiltersClear}/>
                </div>
            </PrivateTemplate.AppSidebar>
            <div className='financial-wrapper'>
                <div className='financial'>
                    <div className='financial-left'>
                        <div> 
                            <h1 className='financial-table-title'>{filters.owners.length > 0 ? "Owners" : "Drugstores"}</h1>
                            <div className='financial-table__header__main'>
                                <span className='financial-table__header__main-product'>Product</span>
                                {activeTab !== 0 && <>
                                    <span className='financial-table__header__main-qty'>Qty</span>
                                    <span className='financial-table__header__main-price'>Price</span>
                                </>
                                }
                            </div>
                            {data.length > 0 &&  data.map(t => {
                                let totalSum = t.products.reduce((sum, product) => sum + product.totalSum, 0);
                                if (t.owner_id) {
                                    return (
                                        <div className='financial-table' key={t.owner_id} onClick={(e) => toggleTab(e, t.owner_id)}>
                                            
                                            <div className='financial-table__header'>
                                                <span>{t.ownerName}</span>
                                                <span>Total: {totalSum.toFixed(2)}</span>
                                            </div>
                                            {activeTab === t.owner_id  &&
                                                <div className='financial-table__content'>
                                                    <div className='financial-table__content-header'>
                                                        <span className='content-header__product'>Product</span>
                                                        <span className='content-header__price'>Price</span>
                                                        <span className='content-header__qty'>Qty</span>
                                                        <span className='content-header__total'>Total</span>
                                                    </div>
                                                    {t.products.map(p => {
                                                        return (
                                                            <div className='financial-table__content-product'>
                                                                <span className='content-product__name'>{p.nameOfProduct}</span>
                                                                <span className='content-product__price'>{p.priceOfProduct}</span>
                                                                <span className='content-product__qty'>{p.totalQuantity}</span>
                                                                {/* <span className='content-product__total'>{p.totalSum.toFixed(2)}</span> */}
                                                                <span className='content-product__total'></span>
                                                                {/* <span className='financial-table__content-product-price'>
                                                                    <span>Price:</span>
                                                                    <span>{p.totalSum.toFixed(2)}</span>
                                                                </span> */}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            }
                                    </div>
                                    )
                                } else {
                                    return (
                                        <div className='financial-table' key={t.drugstore_id} onClick={(e) => toggleTab(e, t.drugstore_id)}> 
                                        
                                        <div className={`financial-table__header ${activeTab === t.drugstore_id && 'active'}`}>
                                            <span>{t.nameDrugstore}</span>
                                            <span>Total: {totalSum.toFixed(2)}</span>
                                        </div>
                                        {activeTab === t.drugstore_id  &&
                                            <div className='financial-table__content'>
                                                <div className='financial-table__content-header'>
                                                    <span className='content-header__product'>Product</span>
                                                    <span className='content-header__price'>Price</span>
                                                    <span className='content-header__qty'>Qty</span>
                                                    <span className='content-header__total'>Total</span>
                                                </div>
                                                {t.products.map(p => {
                                                    return (
                                                        <div className='financial-table__content-product'>
                                                            <span className='content-product__name'>{p.nameOfProduct}</span>
                                                            <span className='content-product__price'>{p.priceOfProduct}</span>
                                                            <span className='content-product__qty'>{p.totalQuantity}</span>
                                                            {/* <span className='content-product__total'>{p.totalSum.toFixed(2)}</span> */}
                                                            <span className='content-product__total'></span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        }
                                    </div>
                                    )
                                }
                            })
                        // : data.length > 0 && filters.owners.length > 0 && data.map(t => {
                        //     let totalSum = t.products.reduce((sum, product) => sum + product.totalSum, 0);
                        //     return (
                        //         <div className='financial-table' key={t.ownwer_id} onClick={() => toggleTab(t.owner_id)}>
                        //             <div className='financial-table__header'>
                        //                 <span>{t.ownerName || "Drugstore name not found"}</span>
                        //                 <span>Total: {totalSum.toFixed(2)}</span>
                        //             </div>
                        //             {activeTab === t.owner_id &&
                        //                     <div className='financial-table__content'>
                        //                         {t.products.map(p => {
                        //                             console.log('p', p)
                        //                             return (
                        //                                 <div className='financial-table__content-product'>
                        //                                     <span>{p.nameOfProduct}</span>
                        //                                     <span className='financial-table__content-product-price'>
                        //                                         <span>Price:</span>
                        //                                         <span>{p.totalSum.toFixed(2)}</span>
                        //                                     </span>
                        //                                 </div>
                        //                             )
                        //                         })}
                        //                     </div>
                        //                 }
                        //         </div>
                        //     )
                        // })
                        }
                        </div>
                        {/* {filters.drugstores && 
                            <div>
                                <h1>Drugstores</h1>
                                {pharmacies.map(d => {
                                    const exist = filters.drugstores.some(fd => fd.id === d.id)
                                    console.log('exist', exist)
                                    if (filters.drugstores.some(fd => fd.id === d.id)) {

                                        return (
                                            <div>{d.label}</div>
                                            )
                                        }
                                })}

                                {pharmacies.filter(p )}
                            </div>
                        } */}
                    </div>
                    <div className='financial-right'>
                        <h1>Total: <span>{totalSum.toFixed(2)}</span></h1>
                    </div>
                </div>
            </div>
        </PrivateTemplate>
    )
}

export default Financial