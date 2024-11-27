import { useState, useEffect } from "react";
import { getCustomers } from '../customerapi'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const [colDelfs, setColDefs] = useState([
        { field: "firstname", filter: true },
        { field: "lastname", filter: true },
        { field: "streetaddress", filter: true },
        { field: "postcode", filter: true },
        { field: "city", filter: true },
        { field: "email", filter: true },
        { field: "phone", filter: true },
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
        <div className = 'ag-theme-material' style={{height: 700, width: 1000}}>
            <AgGridReact 
                rowData={customers}
                columnDefs={colDelfs}
                pagination={true}
                paginationAutoPageSize={true}
                suppressCellFocus={true}
            />
        </div>
    )

}

export default CustomerList;