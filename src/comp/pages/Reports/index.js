import React, { useState, useEffect } from 'react';
import PrivateTemplate from 'comp/templates/PrivateTemplate';
import ReportsRest from 'services/rest/reports';
import ICON_LIST from 'assets/icons/ico-list.svg';
import ICON_EXCEL from 'assets/icons/excel.png';
import './style.css';

const Reports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        (async() => {
            let r = await ReportsRest.getAll();
            setReports(r);
        })();
    }, []);

    const handleOnClickDownload = async (id, rf) => {
        await ReportsRest.download(id, rf);
    };

    return (
        <PrivateTemplate>
            <PrivateTemplate.AppSidebar>
                asd
            </PrivateTemplate.AppSidebar>
            <div className='reports-list'>
                <div className='reports-list__header'>
                    <img src={ICON_LIST} />
                    <span>Reports</span>
                </div>
                <div className='reports-list__main'>
                    {reports?.map((r, i) => {
                        return (
                            <div key={i} className='reports-list__main-item'>
                                <span className='reports-list__main-header'>
                                    {r.drugstoreName}
                                </span>
                                <div className='reports-list__main-item__files'>
                                    <ul className='reports-list__main-item__files-header'>
                                        <li>File name</li>
                                        <li>Month</li>
                                        <li>Attached by</li>
                                        <li className='left-auto'>Download</li>
                                    </ul>
                                    {r.files?.map((rf, i) => {
                                        return (
                                            <ul className='reports-list__main-item__files-list'>
                                                <li>{rf.fileName}</li>
                                                <li>{rf.created_at.slice(0, 7)}</li>
                                                <li>Name</li>
                                                <li className='left-auto'>
                                                    <img className="icon-excel" src={ICON_EXCEL} onClick={() => handleOnClickDownload(rf.id, rf)}/>
                                                </li>
                                            </ul>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </PrivateTemplate>
    )
}

export default Reports