import { useState, useEffect } from "react";
import { getTrainings } from '../trainingapi';
import { getTrainingsWithCustomers, deleteTraining } from '../trainingapi';
import { AgGridReact } from 'ag-grid-react';
import dayjs from "dayjs";

import { Box, Container, Typography, CssBaseline } from "@mui/material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function Traininglist() {

    const [trainingsWC, setTrainingsWC] = useState([]);

    const [colDelfs, setColDefs] = useState([
        {
            field: 'date', headerName: 'Date and time', filter: true,
            cellRenderer: (params) => dayjs(params.value).format('DD.MM.YYYY HH.mm')
        },
        { field: 'duration', filter: true, width: 120 },
        { field: 'activity', filter: true },
        { field: 'customer', filter: true },
        {
            cellRenderer: params => <Button color="black" onClick={() => handleDelete(params.data)}>
                <DeleteIcon /> </Button>, width: 80
        },
    ])

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getTrainingsWithCustomers()
            .then(data => {
                const trainingWC = data.map(training => {
                    if (training.customer) {
                        return {
                            ...training,
                            customer: training.customer.firstname + " " + training.customer.lastname
                        }
                    } else {
                        return {
                            ...training,
                            customer: "No customer"
                        }
                    };
                });
                setTrainingsWC(trainingWC)
            })
            .catch(error => console.log(error))
    }

    const handleDelete = (params) => {
        const training = getTrainings(params);
        if (window.confirm("Delete training?")) {
            deleteTraining(params.id)
                .then(() => handleFetch())
                .catch(error => console.log(error))
        }
    }


    return (
        <>
        <Container maxWidth="xl">
        <CssBaseline />
        <Typography variant="h5" marginTop="20px">Trainings</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <div className='ag-theme-material' style={{ height: 500, width: 800 }}>
                    <AgGridReact
                        rowData={trainingsWC}
                        columnDefs={colDelfs}
                        pagination={true}
                        paginationAutoPageSize={true}
                        suppressCellFocus={true}
                        rowSelection="single"
                        />
                </div>
            </Box>
        </Container>
        </>

    )
}

export default Traininglist;