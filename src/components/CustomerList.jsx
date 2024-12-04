import { useState, useEffect, useRef, useCallback } from "react";
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
    //const [open, setOpen] = useState(false);

    const [colDelfs, setColDefs] = useState([
        {
            field: "add",
            cellRenderer: params => <AddTraining data={params.data} handleFetch={handleFetch} />, width: 80
        },
        { field: "firstname", filter: true, width: 140 },
        { field: "lastname", filter: true, width: 140 },
        { field: "streetaddress", filter: true, width: 150 },
        { field: "postcode", filter: true, width: 110 },
        { field: "city", filter: true, width: 140 },
        { field: "email", filter: true, width: 150 },
        { field: "phone", filter: true, width: 130 },
        {
            cellRenderer: params => <UpdateCustomer data={params.data} handleFetch={handleFetch} />, width: 70
        },
        {
            cellRenderer: params => <Button color="black" onClick={() => handleDelete(params.data)}>
                <DeleteIcon /></Button>, width: 70
        }
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
        if (window.confirm("Are you sure you want to delete this customer and all their trainings?")) {
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

    const [gridApi, setGridApi] = useState(null);

    const onGridReady = useCallback((event) => {
        setGridApi(event.api);
    }, []);

    const exportCsv = () => {
        if(gridApi) {
            gridApi.exportDataAsCsv({
                columnKeys: ["firstname", "lastname", "streetaddress", "postcode", "city", "email", "phone"]
            });
        } else {
            console.log("error");
        }
    };


    return (
        <>
            <Container maxWidth="xl">
            <CssBaseline />
                <Button variant="outlined" color="black" onClick={exportCsv}>Csv-file</Button>
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
            </Container>
        </>
    )

}

export default CustomerList;