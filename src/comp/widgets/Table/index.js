import React from 'react';
// styles
import './style.css';

const Table = (props) => {
    return (
        <table className={`table ${props.customClassName}`} cellPadding="0" cellSpacing="0">
            <thead className='table-header'>
                <tr>
                    {props.columns.map((c, i) => (
                        <th className={c.className} key={i}>{c.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody className='table-body'>
                {props.children}
            </tbody>
        </table>
    )
};

const Cell = (props) => {
    return (
        <td className={props.className}>
            <div>
                {props.children}
            </div>
        </td>
    )
};

Table.Cell = Cell;

export default Table;