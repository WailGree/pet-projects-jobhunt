import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStoreState, useStoreActions } from 'easy-peasy';

export default function ElementModal() {

    const elementData = useStoreState(state => state.elementModalData);
    const openState = useStoreState(state => state.elementModalIsOpen);
    const toggleOpenState = useStoreActions(actions => actions.toggleElementModalIsOpen)

    return (
        <div>
            <Dialog open={openState} onClose={toggleOpenState} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{elementData.name}</DialogTitle>
                <DialogContent>
                    Image goes here
                    <DialogContentText>
                        {elementData.description}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
