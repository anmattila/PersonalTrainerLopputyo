import { useState, useEffect } from "react";
//import { getTrainings } from '../trainingapi';
import { getTrainingsWithCustomers } from '../trainingapi';
import { AgGridReact } from 'ag-grid-react';

function Traininglist() {

    const [trainingsWC, setTrainingsWC] = useState([]);

    const [colDelfs, setColDefs] = useState([
        { field: 'date', filter: true },
        { field: 'duration', filter: true },
        { field: 'activity', filter: true },
        { field: 'customer', filter: true },
    ])

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getTrainingsWithCustomers()
            .then(data => {
                const trainingsWC = data.map(training => ({
                        ...training,
                        customer: training.customer.firstname + " " + training.customer.lastname
                    }));
                setTrainingsWC(trainingsWC)
            })
            .catch(error => console.log(error))
    }


    return (
        <div className='ag-theme-material' style={{ height: 700, width: 1000 }}>
            <AgGridReact
                rowData={trainingsWC}
                columnDefs={colDelfs}
                pagination={true}
                paginationAutoPageSize={true}
                suppressCellFocus={true}
            />
        </div>

    )
}

export default Traininglist;