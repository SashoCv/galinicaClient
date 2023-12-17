import React, { useState} from 'react';
import PrivateTemplate from 'comp/templates/PrivateTemplate';
// widgets
import DashboardCharts from 'comp/widgets/DashboardCharts';
// ui comps
import Input from 'comp/ui/Input';
import Select from 'comp/ui/Select';
import Button from 'comp/ui/Button';
import ProgressBar from 'comp/ui/ProgressBar';
import MultiSelect from 'comp/ui/MultiSelect';
// icons
import ICON_FUNNEL from 'assets/icons/ico-funnel.svg';
// styles
import './style.css';

const Dashboard = () => {

    const filtersInit = {
        traffic: '',
        month: '',
        from: '',
        to: ''
    };

    const [filters, setFilters] = useState(filtersInit);

    const trafficSources = [
        {
            label: 'Select traffic source',
            value: '',
            hidden: true
        },
        {
            value: 'rx',
            label: 'RX'
        },
        {
            value: 'otd',
            label: 'OTD'
        },
        {
            value: 'tender',
            label: 'Tender'
        }
    ];

    const handleOnChangeFilters = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    };

    const onApplyFilters = () => {
        // console.log(filters);
    };

    const onClearFilters = () => {
        setFilters({
            ...filtersInit,
            traffic: {
                label: 'Select traffic source',
                value: ''
            }
        });
    };

    return (
        <PrivateTemplate>
            <PrivateTemplate.AppSidebar label="Filters" icon={ICON_FUNNEL}>
                <div className="dashboard-filters">
                    {/* <Select label="Traffic Sources" options={trafficSources} name="traffic" onChange={handleOnChangeFilters} value={filters.traffic}/> */}
                    <MultiSelect isMulti={false} label="Traffic Sources" options={trafficSources} name="traffic" value={filters.traffic}/>
                    {/* <Input type="" label="Traffic Sources" name="traffic" onChange={handleOnChangeFilters} value={filters.traffic}/> */}
                    <Input type="date" label="Пребарувај по месец" name="month" onChange={handleOnChangeFilters} value={filters.month} height="medium"/>
                    <div className='dashboard-filters__group'>
                        <span>Search in range</span>
                        <Input type="date" label="From" name="from" onChange={handleOnChangeFilters} value={filters.from} height="medium"/>
                        <Input type="date" label="To" name="to" onChange={handleOnChangeFilters} value={filters.to} height="medium"/>
                    </div>
                </div>
                <div className='dashboard-sidebar__actions'>
                    <Button label="Филтрирај"/>
                    <Button label="Избриши филтри" type="ghost" onClick={onClearFilters}/>
                </div>
            </PrivateTemplate.AppSidebar>
            <div className='dashboard'>
                <div className='dashboard-top'>
                    <div className='dashboard-top__card'>
                        <div className='circle one'></div>
                        <div className='circle two'></div>
                        <div className='total-earning'>
                            <span className='total-earning__value'>500$</span>
                            <span className='total-earning__label'>Total earning</span>
                        </div>
                    </div>
                    <div className='dashboard-top__card'>
                        <div className='dashboard-top__card-header'>
                            <h2>Profit Target</h2>
                            <select>
                                {trafficSources.map((ts, i) => {
                                    if (i !== 0) {
                                        return (
                                            <option key={i} value={ts.value}>{ts.label}</option>
                                        )
                                    }
                                })}
                            </select>
                        </div>
                        {/* <h2 className='dashboard-top__card-title'>Profit Target</h2> */}
                        <div className='dashboard-top__card-main'>
                            <span>89.79%</span>
                            <ProgressBar />
                            <div className="dashboard-top__card-main__group">
                                <div>
                                    <span>Current</span>
                                    <span>101.23</span>
                                </div>
                                <div>
                                    <span>Target</span>
                                    <span>101.23</span>
                                </div>
                                <div>
                                    <span>Left</span>
                                    <span>101.23</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='dashboard-top__card'>
                        <h2 className='dashboard-top__card-title'>Traffic Sources</h2>
                        <div className='dashboard-top__card-main'>
                            <ProgressBar label="RX" value="50%" type="blue"/>
                            <ProgressBar label="OTD" value="20%" type="blue"/>
                            <ProgressBar label="Tender" value="80%" type="blue"/>
                        </div>
                    </div>
                </div>
                <div className='dashboard-chart'>
                    <h1 className='dashboart-chart__header'>Wholesale earnings</h1>
                    <DashboardCharts />
                </div>
            </div>
        </PrivateTemplate>
    )
}

export default Dashboard