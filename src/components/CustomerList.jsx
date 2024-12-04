import { useState, useEffect, useCallback } from "react";
import AddCustomer from './AddCustomer';
import UpdateCustomer from './EditCustomer';
import AddTraining from "./AddTraining";
import { getCustomers, deleteCustomer } from '../customerapi'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { Container, Typography, Box, CssBaseline } from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


function CustomerList() {

    const [customers, setCustomers] = useState([]);

    const [colDelfs, setColDefs] = useState([
        {
            field: "add training",
            cellRenderer: params => <AddTraining data={params.data} handleFetch={handleFetch} />, width: 80
        },
        { field: "firstname", headerName: "First name", filter: true, width: 140 },
        { field: "lastname", headerName: "Last name", filter: true, width: 140 },
        { field: "streetaddress", headerName: "Address", filter: true, width: 150 },
        { field: "postcode", filter: true, width: 110 },
        { field: "city", filter: true, width: 140 },
        { field: "email", filter: true, width: 150 },
        { field: "phone", filter: true, width: 130 },
        {
            cellRenderer: params => <UpdateCustomer data={params.data} handleFetch={handleFetch} />, width: 70
        },
        {
            cellRenderer: params => <Button color="black" onClick={() => handleDelete(params.data)}><DeleteIcon />
            </Button>, width: 70
        },
    ])

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log("Error in fecthing ", error))
    }

    const handleDelete = (params) => {
        if (window.confirm("Are you sure you want to delete this customer and all their trainings?")) {
            deleteCustomer(params._links.self.href)
                .then(() => handleFetch())
                .catch(error => console.log("Error in deleting ", error))
        }
    }

    const [gridApi, setGridApi] = useState(null);

    const onGridReady = useCallback((event) => {
        setGridApi(event.api)
    }, []);

    const exportCsv = () => {
        if (gridApi) {
            gridApi.exportDataAsCsv({
                columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"]
            });
        } else {
            console.log("Error in exporting")
        }
    }


    return (
        <>
            <Container maxWidth="xl">
                <CssBaseline />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "20px" }}>
                    <Typography variant="h5" >Customers</Typography>
                    <AddCustomer handleFetch={handleFetch} />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <div className='ag-theme-material' style={{ height: 500, width: 1100 }}>
                        <AgGridReact
                            rowData={customers}
                            columnDefs={colDelfs}
                            pagination={true}
                            paginationAutoPageSize={true}
                            suppressCellFocus={true}
                            rowSelection="single"
                            onGridReady={onGridReady}
                        />
                    </div>
                </Box>
                <Box  sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="outlined" size="small" color="black" onClick={exportCsv}>Download csv-file</Button>
                </Box>
            </Container>
        </>
    )

}

export default CustomerList;