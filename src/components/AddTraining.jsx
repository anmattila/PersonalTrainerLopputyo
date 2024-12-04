import { useState, useEffect } from 'react';
import { saveTrainingToCustomer } from '../trainingapi';
import { getTrainingsWithCustomers } from '../trainingapi';
import { getCustomers } from '../customerapi';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import PostAddIcon from '@mui/icons-material/PostAdd';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import dayjs from "dayjs";



function AddTraining(props) {

    const [training, setTraining] = useState({
        date: null,
        duration: "",
        activity: "",
    });

    const [customer, setCustomer] = useState(null);
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };


    

    const handleChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    };

    const handleSave = () => {
        saveTrainingToCustomer(props.data._links.customer.href, training)
            .then(() => handleClose())
            .catch(error => console.log(error))
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button size="large" color="black" onClick={handleClickOpen} startIcon={<MoreTimeIcon />}></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training to

                </DialogTitle>
                {/* {console.log(props.data._links.customer.href)} */}
                {/* {props.data._links.customer.href.params.firstname} */}
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            required
                            margin="dense"
                            //label="Date and time"
                            name="date"
                            format="DD.MM.YYYY HH:mm"
                            ampm={false}
                            value={training.date}
                            onChange={(date) => setTraining({ ...training, date: date })}
                        />
                    </LocalizationProvider>
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Duration"
                        name="duration"
                        value={training.duration}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Activity"
                        name="activity"
                        value={training.activity}
                        onChange={handleChange}
                    />

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default AddTraining;

