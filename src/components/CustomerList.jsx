import { useState, useEffect } from "react";
import AddCustomer from './AddCustomer';
import UpdateCustomer from './EditCustomer';
import AddTraining from "./AddTraining";
import { getCustomers, deleteCustomer } from '../customerapi'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function CustomerList() {

    const [customers, setCustomers] = useState([]);
    //const [open, setOpen] = useState(false);

    const [colDelfs, setColDefs] = useState([
        { field: "firstname", filter: true, width: 140 },
        { field: "lastname", filter: true, width: 140 },
        { field: "streetaddress", filter: true, width: 150 },
        { field: "postcode", filter: true, width: 110 },
        { field: "city", filter: true, width: 150 },
        { field: "email", filter: true },
        { field: "phone", filter: true, width: 130 },
        {
            cellRenderer: params => <AddTraining data={params.data} handleFetch={handleFetch}/>, width: 70
        },
        {
            cellRenderer: params => <UpdateCustomer data={params.data} handleFetch={handleFetch}/>, width: 70
        },
        {
            cellRenderer: params => <Button color="error" onClick={() => handleDelete(params.data)}>
                <DeleteIcon /> </Button>, width: 70
        },
    ])

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log(error))
    }

    const handleDelete = (params) => {
        if (window.confirm("Delete customer?")) {
           // setOpen(true);
            deleteCustomer(params._links.self.href)
                .then(() => handleFetch())
                .catch(error => console.log(error))
        }
    }
    // use ag-grid dialog to confirm 

    // const handleClose = () => {
    //     setOpen(false);
    //   }

    return (
        <>
            <AddCustomer handleFetch={handleFetch} />

            <div className='ag-theme-material' style={{ height: 500, width: 1100 }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDelfs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                    rowSelection="single"
                />
            </div>
        </>
    )

}

export default CustomerList;