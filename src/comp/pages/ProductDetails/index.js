import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// templates
import PrivateTemplate from 'comp/templates/PrivateTemplate';
// services
import ProductsRest from 'services/rest/products';
// ui comps
import Input from 'comp/ui/Input';
import Button from 'comp/ui/Button';
import MultiSelect from 'comp/ui/MultiSelect';
// styles
import './style.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const productInit = {
        nameOfProduct: "",
        EurofarmCode: 0,
        EurolekCode: 0,
        MaklekCode: 0,
        PharmaprimaCode: 0,
        PharmavitaCode: 0,
        PhoenixCode: 0,
        ZeginCode: 0,
        totalVitaQuantity: 0,
        totalSumQuantities: 63,
        numberOfPackage: 0,
        priceOfProduct: null,
        typeOfProduct: "",
        listOfProduct: ""
    };

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

    const productLists = [
        {
            value: 'list_one',
            label: 'List one'
        },
        {
            value: 'list_two',
            label: 'List two'
        },
        {
            value: 'list_three',
            label: 'List three'
        }
    ]

    const [product, setProduct] = useState(productInit);
    const [isCodeEdit, setIsCodeEdit] = useState(false);

    useEffect(() => {
        if (id === 'add') return;
        (async() => {
            const p = await ProductsRest.getProductById(id);
            setProduct(p);
        })();
    }, []);

    const update = async() => {
        try {
            await ProductsRest.updateProductById(id, product);
        } catch (error) {
            console.log('error', error)
        }
    };

    const handleOnChange = (e) => {
        console.log('e.target', e.target)
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleOnChangeMulti = (e, s) => {
        console.log('e', e);
        console.log('s', s);

        setProduct({
            ...product,
            [s.name]: e.value
        });
    };

    const onClickEditCode = () => {
        setIsCodeEdit(!isCodeEdit);
    };

    const onClickCreateProduct = async () => {
        try {
            await ProductsRest.createProduct(product);
        } catch (error) {
            console.log('error', error);
        }
    };


    console.log('product', product)

    return (
        <PrivateTemplate>
            {/* <PrivateTemplate.AppSidebar>
                <div className='product-info'>
                    <span className='product-info__name'>{product.nameOfProduct}</span>
                    <span className='product-info__firm'>Фирма на која припаѓа</span>
                </div>
            </PrivateTemplate.AppSidebar> */}
            <div className='product-edit'>
                <div className='product-edit__top-header' onClick={() => navigate('/products')}>
                    <span>Back to product list</span>
                    <img />
                </div>
                <div className='product-edit__main'>
                    <h1 className='product-edit__main-header'>Product info</h1>
                    <div className='product-edit__main-inputs'>
                        <Input label="Name" value={product.nameOfProduct} customClassName="product-input" onChange={handleOnChange} name="nameOfProduct"/>
                        <Input label="Number of package" value={product.numberOfPackage} name="numberOfPackage" onChange={handleOnChange} customClassName="product-input"/>
                        <Input label="Price" value={product.priceOfProduct} customClassName="product-input" name="priceOfProduct" onChange={handleOnChange}/>
                        {/* <Input label="Placeholder 2" customClassName="product-input"/> */}
                        {/* <Input label="Placeholder 2" customClassName="product-input"/> */}
                        <MultiSelect label="Type" customClassName="product-multi" options={productTypes} name="typeOfProduct" value={productTypes.find(pt => pt.value === product.typeOfProduct)} onChange={handleOnChangeMulti}/>
                        <MultiSelect label="List of product" customClassName="product-multi" options={productLists} name="listOfProduct" value={productLists.find(pl => pl.value === product.listOfProduct)} onChange={handleOnChangeMulti}/>
                    </div>
                    <div className='product-edit__main-pharmacy-header'>
                        <h1 className='product-edit__main-pharmacy'>Pharmacy code</h1>
                        <Button type="warning" label={`${id === 'add' ? 'Add code': 'Edit code'}`} customClassName="product-pharmacy" onClick={onClickEditCode}/>
                    </div>
                    <div className='product-codes__list'>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>EurofarmCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="EurofarmCode" onChange={handleOnChange} value={product.EurofarmCode} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{product.EurofarmCode}</span> }
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>EurolekCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="EurolekCode" onChange={handleOnChange} value={product.EurolekCode} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{product.EurolekCode}</span> }
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>MaklekCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="MaklekCode" onChange={handleOnChange} value={product.MaklekCode} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{product.MaklekCode}</span>}
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>PharmaprimaCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="PharmaprimaCode" onChange={handleOnChange} value={product.PharmaprimaCode} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{product.PharmaprimaCode}</span>}
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>PharmavitaCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="PharmavitaCode" onChange={handleOnChange} value={product.PharmavitaCode} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{product.PharmavitaCode}</span>}
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>PhoenixCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="PhoenixCode" onChange={handleOnChange} value={product.PhoenixCode} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{product.PhoenixCode}</span>}
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>ZeginCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="ZeginCode" onChange={handleOnChange} value={product.ZeginCode} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{product.ZeginCode}</span>}
                        </div>
                    </div>
                    <div className='product-edit-actions'>
                        <Button label={id === 'add' ? 'Create product' : 'Save Changes'} customClassName="product-edit-save" onClick={id === 'add' ? onClickCreateProduct : update}/>
                    </div>
                </div>
                {/* <div className='product-edit__container'>
                    <div className='product-edit__top'>
                        <Input label="Value 1"/>
                        <Input label="Value 2"/>
                        <Input label="Value 3"/>
                        <Input label="Value 4"/>
                    </div>
                    <div className='product-edit__middle'>
                        <Input label="Name" value={product.nameOfProduct}/>
                        <Input label="Price" value={product.priceOfProduct}/>
                        <Input label="Placeholder 1"/>
                        <Input label="Placeholder 2"/>
                    </div>
                    <div className='product-edit__actions'>
                        <Button label="Зачувај"/>
                    </div>
                </div> */}
            </div>
        </PrivateTemplate>
    )
}

export default ProductDetails;