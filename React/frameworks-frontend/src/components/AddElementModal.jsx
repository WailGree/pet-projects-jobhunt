import { useState, useRef } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';

export default function AddElementModal() {

    const [openState, setOpenState] = useState(false);
    const [nameErrorState, setNameErrorState] = useState(false);
    const [descriptionErrorState, setDescriptionErrorState] = useState(false);

    const elementName = useRef("");
    const elementDescription = useRef("");

    function toggleOpenState() {
        setOpenState(!openState);
    }

    function handleCredentials() {
        if (checkFields()) {
            console.log("Success");
            sendNewElement();
            toggleOpenState();
        }
        else {
            handleFieldError();
            console.log("Failure");
        }
    }

    async function sendNewElement(){
        const axios = require('axios').default;
        const newElement = {"name" : elementName.current.value, "description" : elementDescription.current.value}
        console.log("newElement: " + newElement);
        const response = await axios.put("https://localhost:44317/elements/add-element/", newElement);
        console.log(response.data);
        // return response.data;
    }
    function checkFields() {
        return elementName.current.value !== "" && elementDescription.current.value !== "";
    }

    function handleFieldError() {
        if (elementName.current.value === "") {
            setNameErrorState(true);
        }
        else {
            setNameErrorState(false);
        }
        if (elementDescription.current.value === "") {
            setDescriptionErrorState(true);
        }
        else {
            setDescriptionErrorState(false);
        }
    }

    return (
        <div>
            <div onClick={toggleOpenState}>Add Element </div>
            <Dialog open={openState} close={toggleOpenState} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Element</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        error={nameErrorState}
                        margin="dense"
                        id="name"
                        label={nameErrorState ? "Required field" : "Name"}
                        inputRef={elementName}
                        fullWidth
                    />
                    <TextField
                        error={descriptionErrorState}
                        margin="dense"
                        id="description"
                        label={descriptionErrorState ? "Required field" : "Description"}
                        inputRef={elementDescription}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleOpenState} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCredentials} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
