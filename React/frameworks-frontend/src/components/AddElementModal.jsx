import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddElementModal() {

    const [openState, setOpenState] = useState(false);

    function toggleOpenState() {
        setOpenState(!openState);
    }

    return (
        <div>
            <Button onClick={toggleOpenState}>Add Element</Button>
            <Dialog open={openState} close={toggleOpenState}>
                <DialogTitle id="form-dialog-title">Add Element</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        label="Name"
                        fullWidth
                    />
                    <TextField
                        required
                        margin="dense"
                        id="description"
                        label="Description"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={toggleOpenState} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={toggleOpenState} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
