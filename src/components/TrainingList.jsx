import { useState, useEffect } from "react";
//import { getTrainings } from '../trainingapi';
import { getTrainingsWithCustomers } from '../trainingapi';
import { AgGridReact } from 'ag-grid-react';
import dayjs from "dayjs";

function Traininglist() {

    const [trainingsWC, setTrainingsWC] = useState([]);

    const [colDelfs, setColDefs] = useState([
        { field: 'date', filter: true, 
            cellRenderer: (params) => dayjs(params.value).format('DD.MM.YYYY HH.mm')
        },
        { field: 'duration', filter: true, width: 150 },
        { field: 'activity', filter: true },
        { field: 'customer', filter: true },
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


    return (
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

    )
}

export default Traininglist;