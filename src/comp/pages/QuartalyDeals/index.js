import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// templates
import PrivateTemplate from 'comp/templates/PrivateTemplate';
// widgets
import Table from 'comp/widgets/Table';
// ui comp
import Button from "comp/ui/Button";
// icons
import ICON_LIST from 'assets/icons/ico-list.svg';
import salesDeals from "services/rest/sales-deals";

const QuartalyDeals = () => {

    const [deals, setDeals] = useState([]);
    const navigate = useNavigate();

    const dealsColumns = [
        { name: 'Name' },
        { name: 'Sum from' },
        { name: 'Sum to' },
        { name: 'Percentage' },
        { name: 'Date from' },
        { name: 'Date to' },
        { name: 'Actions' },
    ];

    useEffect(() =>{
        (async() => {
            let d = await salesDeals.getAllQ();
            setDeals(d);
        })();
    }, []);

    return (
        <PrivateTemplate>
            <PrivateTemplate.AppSidebar>
                Filters here
            </PrivateTemplate.AppSidebar>
            <div className="products-list">
                <div className='products-list__header'>
                    <div className='products-list__header-left'>
                        <img src={ICON_LIST}/>
                        <span>Quartaly deals</span>
                    </div>
                    <Button type="warning" label="Create new deal" onClick={() => navigate('/quartaly-deals/add')} />
                </div>
            <Table columns={dealsColumns}>
                {deals?.map((d, i) => {
                    return (
                        <tr className='products-row' key={i}>
                            <Table.Cell>{d.nameOfDeal}</Table.Cell>
                            <Table.Cell>{d.sumFrom}</Table.Cell>
                            <Table.Cell>{d.sumTo}</Table.Cell>
                            <Table.Cell>{d.percentage}%</Table.Cell>
                            <Table.Cell>{d.dateFrom}</Table.Cell>
                            <Table.Cell>{d.dateTo}</Table.Cell>
                            <Table.Cell><span className='deals-row__add' onClick={() => navigate(`${d.id}`)}>View Deal</span></Table.Cell>
                        </tr>
                    );
                })}
                </Table>
            </div>
        </PrivateTemplate>
    )
};

export default QuartalyDeals;