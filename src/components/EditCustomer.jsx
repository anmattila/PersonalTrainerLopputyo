import { useState } from 'react';
import { updateCustomer } from '../customerapi';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function EditCustomer(props) {

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
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city,
            email: props.data.email,
            phone: props.data.phone
        })
    }

    const handleChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }
    
    const handleSave = () => {
        updateCustomer(props.data._links.self.href, customer)
        .then(() => props.handleFetch())
        .catch(error => console.error("Error in saving customer ", error))
    }
    
    const handleClose = () => {
        setOpen(false);
    }


    return (
        <>
        <Button color="black" onClick={handleClickOpen} startIcon={<EditIcon />}></Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New customer info</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="First name"
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Last name"
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Street address"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        className="half-width-field"
                        margin="dense"
                        variant="outlined"
                        label="Postcode"
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        className="half-width-field"
                        margin="dense"
                        variant="outlined"
                        label="City"
                        name="city"
                        value={customer.city}
                        onChange={handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={customer.email}
                        onChange={handleChange}
                    />
                    <TextField
                        required
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

export default EditCustomer;