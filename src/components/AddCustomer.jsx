import { useState } from 'react';
import { saveCustomer } from '../customerapi';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function AddCustomer(props) {

    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    });

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    };
    
    const handleSave = () => {
        saveCustomer(customer)
        .then(() => {
            props.handleFetch();
            handleClose();
        })
        .catch(error => console.log(error))
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Button variant="outlined" color="black" onClick={handleClickOpen}>Add new customer</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New customer info</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="First name"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Last name"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Street address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleChange}
                    />
                    <TextField
                        className="half-width-field"
                        margin="dense"
                        variant="outlined"
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleChange}
                    />
                    <TextField
                        className="half-width-field"
                        margin="dense"
                        variant="outlined"
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                    />
                    <TextField
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Phone number"
                        name="phone"
                        value={customer.phone}
                        onChange={handleChange}
                        //only numbers?
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

export default AddCustomer;