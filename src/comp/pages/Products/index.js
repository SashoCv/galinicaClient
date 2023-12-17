import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// templates
import PrivateTemplate from 'comp/templates/PrivateTemplate';
// widgets
import Table from 'comp/widgets/Table';
// services
import { random } from 'services/strings';
import ProductsRest from 'services/rest/products';
// ui comps
import Input from 'comp/ui/Input';
import Button from 'comp/ui/Button';
import Switch from 'comp/ui/Switch';
// icons
import ICON_LIST from 'assets/icons/ico-list.svg';
import ICON_FUNNEL from 'assets/icons/ico-funnel.svg';
import ICON_EDIT from 'assets/icons/ico-edit.svg';
// animations
import ANIMATION_LOADER from 'assets/animations/loader.gif';
// styles
import './style.css';
// fake data
import { products as fakeProducts} from 'data/fake';
import MultiSelect from 'comp/ui/MultiSelect';

const Products = () => {

    const navigate = useNavigate();

    const filtersInit = {
        name: '',
        typeOfProduct: '',
        list_one: false,
        list_two: false,
        list_three: false,
    };

    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState(filtersInit);
    const [loading, setLoading] = useState(false);
    const [clearFilters, setClearFilters] = useState(false);

    useEffect(() => {
        // (async() => {
        //     setLoading(true);
        //     let p = await ProductsRest.getAll();
        //     // console.log(p);
        //     setProducts(p);
        //     setLoading(false);
        // })();
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        let p = await ProductsRest.getAll();
        setProducts(p);
        setLoading(false);
    };

    const handleOnChange = (e) => {   
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleOnChangeType = (e, s) => {
        setFilters({
            ...filters,
            [s.name]: e.value
        });
    };

    const handleOnChangeSwitch = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.checked
        });
    }

    const handleOnFiltersSubmit = () => {
        const filteredProducts = products.filter(p => {
            return (!filters.name || p.nameOfProduct.trim().toLowerCase().includes(filters.name.toLowerCase())) &&
            (!filters.typeOfProduct || p.typeOfProduct?.toLowerCase().includes(filters.typeOfProduct.toLowerCase())) &&
            (!filters.list_one || p.list_one === filters.list_one) &&
            (!filters.list_two || p.list_two === filters.list_two) &&
            (!filters.list_three || p.list_three === filters.list_three)
        });
        setProducts(filteredProducts);
    };

    const handleOnFiltersClear = () => {
        setFilters(filtersInit);  
        fetchProducts();

        // setProducts(products);
    };

    const handleOnClickEdit = (id) => {
        navigate(`/products/${id}`);
    };

    const onClickAddProduct = () => {
        navigate(`/products/add`);
    }

    const productTypes = [
        {
            value: 'RX',
            label: 'RX'
        },
        {
            value: 'OTC',
            label: 'OTC'
        },
        {
            value: 'TENDER',
            label: 'TENDER'
        }
    ];



    const productsColumns = [
        // {
        //     name: 'ID'
        // },
        {
            name: 'Name'
        },
        {
            name: 'Type of product'
        },
        {
            name: 'List of product'
        },
        {
            name: 'Price',
            className: 'price__header'
        },
        {
            name: 'Edit',
            className: 'left-auto__header'
        }
    ];

    console.log('filters', filters);
    // console.log(products);

    return (
        <PrivateTemplate>
            <PrivateTemplate.AppSidebar label="Filters" icon={ICON_FUNNEL}>
                <div className='products-filters'>
                    <Input type="text" label="Product name" height="medium" name="name" value={filters.name} onChange={handleOnChange} />
                    <MultiSelect label="Product Type" isMulti={false} name="product_type" value={filters.product_type} options={productTypes} onChange={handleOnChangeType}/>
                    <div className='financial-filters__switch-group'>
                        <Switch label="List 1" onChange={handleOnChangeSwitch} name="list_one" value={filters.list_one}/>
                        <Switch label="List 2" onChange={handleOnChangeSwitch} name="list_two" value={filters.list_two} />
                        <Switch label="List 3" onChange={handleOnChangeSwitch} name="list_three" value={filters.list_three} />
                    </div>
                    {/* <Input type="text" label="Choose Drugstore" height="medium" name="pharmacy" value={filters.pharmacy} onChange={handleOnChange} /> */}
                </div>
                <div className='products-filters__actions'>
                    <Button label="Филтрирај" onClick={handleOnFiltersSubmit}/>
                    <Button label="Избриши филтри" type="ghost" onClick={handleOnFiltersClear}/>
                </div>
            </PrivateTemplate.AppSidebar>
            <div className='products-list'>
                <div className='products-list__header'>
                    <div className='products-list__header-left'>
                        <img src={ICON_LIST}/>
                        <span>Products</span>
                    </div>
                    <Button type="warning" label="Add Product" onClick={onClickAddProduct} />
                </div>
                {loading ? 
                <img src={ANIMATION_LOADER} className='loader'/>
                :
                <Table columns={productsColumns}>
                    {products.map((p, i) => (
                        <tr className='products-row' key={i}>
                            {/* <Table.Cell>{p.id}</Table.Cell> */}
                            <Table.Cell>{p.nameOfProduct}</Table.Cell>
                            <Table.Cell>{p.typeOfProduct}</Table.Cell>
                            <Table.Cell>{p.listOfProduct}</Table.Cell>
                            <Table.Cell>{p.priceOfProduct}</Table.Cell>
                            <Table.Cell className="left-auto"><img src={ICON_EDIT} className='products-row__edit' onClick={() => handleOnClickEdit(p.id)}/></Table.Cell>
                        </tr>
                    ))}
                </Table>
                }
            </div>
        </PrivateTemplate>
    )
};

export default Products;