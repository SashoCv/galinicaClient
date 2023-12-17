import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// templates
import PrivateTemplate from 'comp/templates/PrivateTemplate';
// ui comps
import Input from 'comp/ui/Input';
import MultiSelect from 'comp/ui/MultiSelect';
import Button from 'comp/ui/Button';
// services
import OwnersRest from 'services/rest/owners';
import DrugstoresRest from 'services/rest/drugstores';
import CitiesRest from 'services/rest/cities';


const DrugstoreDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const drugstoreInit = {
        codeDrugstoreMaklek: null,
        codeDrugstoreEurolek: null,
        codeDrugstoreEurofarm: null,
        codeDrugstorePrimas: null,
        codeDrugstoreVitas: null,
        codeDrugstorePhoenix: null,
        codeDrugstoreZegin: null,
        nameDrugstore: "",
        address: "",
        owner_id: null,
        city_id: null,
    }

    const [owners, setOwners] = useState([]);
    const [drugstore, setDrugstore] = useState(drugstoreInit);
    const [cities, setCities] = useState([]);
    const [isCodeEdit, setIsCodeEdit] = useState(false);

    useEffect(() => {
        if (id !== 'add') {
            fetchDrugstore();
        }
        fetchOwners();
        fetchCities();
    }, []);

    const fetchOwners = async() => {
        let o = await OwnersRest.getAll();
        setOwners(o.map(o => {
            return {
                value: o.id,
                label: o.ownerName
            }
        }));
    };

    const fetchDrugstore = async() => {
        let d = await DrugstoresRest.getOneById(id);
        setDrugstore({...d, owner_name: d.owner.ownerName});
    };

    const fetchCities = async() => {
        let c = await CitiesRest.getAll();
        setCities(c.map(c => {
            return {
                value: c.id,
                label: c.cityName
            }
        }))  
    };

    const update = async () => {
        // console.log('drugstore', drugstore)
        await DrugstoresRest.updateById(id, drugstore);
    };

    // console.log('owners', owners)
    console.log('drugstore', drugstore)
    // const isCodeEdit = true;

    const handleOnChange = (e) => {
        setDrugstore({
            ...drugstore,
            [e.target.name]: e.target.value
        });
    };

    const hanldeOnChangeMulti = (e, s) => {
        setDrugstore({
            ...drugstore,
            [s.name]: e.value
        });
    };

    const handleOnClickEditCode = () => {
        setIsCodeEdit(!isCodeEdit);
    };

    const onClickCreateProduct = async () => {
        await DrugstoresRest.create(drugstore);
    }
    console.log('drugstore', drugstore)

    return (
        <PrivateTemplate>
            <div className='product-edit'>
                <div className='product-edit__top-header' onClick={() => navigate('/drugstores')}>
                    <span>Back to drugstore list</span>
                    <img />
                </div>
                <div className='product-edit__main'>
                    <h1 className='product-edit__main-header'>Drugstore Info</h1>
                    <div className='product-edit__main-inputs'>
                        <Input label="Name" customClassName="product-input" value={drugstore.nameDrugstore} onChange={handleOnChange} name="nameDrugstore"/>
                        {/* <Input label="Owner" customClassName="product-input"/> */}
                        <MultiSelect label="Owner" customClassName="product-input" options={owners} value={owners.find(o => o.value === drugstore.owner_id)} onChange={hanldeOnChangeMulti} name="owner_id"/>
                        <MultiSelect label="CitieY" customClassName="product-input" options={cities} value={cities.find(o => o.value === drugstore.city_id)} onChange={hanldeOnChangeMulti} name="city_id"/>
                        {/* <Input label="City" customClassName="product-input" value={drugstore.city?.cityName}/> */}
                        <Input label="Address" customClassName="product-input" value={drugstore.address}/>
                    </div>
                    <div className='product-edit__main-pharmacy-header'>
                        <h1 className='product-edit__main-pharmacy'>Pharmacy code</h1>
                        <Button type="warning" label={`${id === 'add' ? 'Add code': 'Edit code'}`} customClassName="product-pharmacy" onClick={handleOnClickEditCode}/>
                    </div>
                    <div className='product-codes__list'>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>EurofarmCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="codeDrugstoreEurofarm" onChange={handleOnChange} value={drugstore.codeDrugstoreEurofarm} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{drugstore.codeDrugstoreEurofarm}</span> }
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>EurolekCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="codeDrugstoreEurolek" onChange={handleOnChange} value={drugstore.codeDrugstoreEurolek} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{drugstore.codeDrugstoreEurolek}</span> }
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>MaklekCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="codeDrugstorePhoenix" onChange={handleOnChange} value={drugstore.codeDrugstorePhoenix} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{drugstore.codeDrugstorePhoenix}</span>}
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>PharmaprimaCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="codeDrugstorePrimas" onChange={handleOnChange} value={drugstore.codeDrugstorePrimas} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{drugstore.codeDrugstorePrimas}</span>}
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>PharmavitaCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="codeDrugstoreVitas" onChange={handleOnChange} value={drugstore.codeDrugstoreVitas} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{drugstore.codeDrugstoreVitas}</span>}
                        </div>
                        <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>PhoenixCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="codeDrugstoreZegin" onChange={handleOnChange} value={drugstore.codeDrugstoreZegin} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{drugstore.codeDrugstoreZegin}</span>}
                        </div>
                        {/* <div className='product-codes__list-item'>
                            <span className='product-codes__list-item-name'>ZeginCode</span>
                            {isCodeEdit
                            ? <Input type="number" name="ZeginCode" onChange={handleOnChange} value={drugstore.ZeginCode} customClassName="product-codes__list-item-input"/>
                            :  <span className='product-codes__list-item-code'>{drugstore.ZeginCode}</span>}
                        </div> */}
                    </div>
                    <div className='product-edit-actions'>
                        <Button label={id === 'add' ? 'Create product' : 'Save Changes'} customClassName="product-edit-save" onClick={id === 'add' ? onClickCreateProduct : update}/>
                    </div>
                </div>
            </div>
        </PrivateTemplate>
    )
};

export default DrugstoreDetails;