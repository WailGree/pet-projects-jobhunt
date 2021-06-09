import React from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
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
