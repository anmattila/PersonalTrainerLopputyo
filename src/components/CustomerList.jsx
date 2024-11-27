import { useState, useEffect } from "react";
import { getCustomers } from '../customerapi'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const [colDelfs, setColDefs] = useState([
        { field: "firstname", filter: true, width: 150 },
        { field: "lastname", filter: true, width: 150 },
        { field: "streetaddress", filter: true },
        { field: "postcode", filter: true, width: 120 },
        { field: "city", filter: true, width: 150 },
        { field: "email", filter: true },
        { field: "phone", filter: true, width: 140 },
    ])

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log(error))
    }

    return (
        <div className = 'ag-theme-material' style={{height: 500, width: 1100}}>
            <AgGridReact 
                rowData={customers}
                columnDefs={colDelfs}
                pagination={true}
                paginationAutoPageSize={true}
                suppressCellFocus={true}
                rowSelection="single"
            />
        </div>
    )

}

export default CustomerList;