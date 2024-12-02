import { useState } from 'react';
import { saveTrainingToCustomer } from '../trainingapi';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';


function AddTraining(props) {

    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    };

    const handleSave = () => {
        saveTrainingToCustomer(props.data._links.customer.href, training)
        .then(() => handleClose())
        .catch(error => console.log(error))
    };  

    return (
        <>
        <Button color="black" onClick={handleClickOpen}>Add training</Button>
        <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add training to</DialogTitle>
                <DialogContent>
                    <TextField
                    //date picker, ei text field
                    />
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

