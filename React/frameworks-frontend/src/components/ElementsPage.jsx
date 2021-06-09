import { useEffect, useState } from 'react';
import Element from "./Element";
import { Grid, makeStyles } from '@material-ui/core';
import EditMenu from './EditMenu';
import ElementModal from './ElementModal';
import { useStoreState, useStoreActions } from 'easy-peasy';
export default function ElementsPage() {

    const [loadingState, setloadingState] = useState(true)
    const elements = useStoreState(state => state.elements);
    const setElements = useStoreActions(actions => actions.setElements);
    async function getElements() {
        const axios = require('axios').default;
        try {
            const response = await axios.get('https://localhost:44317/elements/get-elements/')
            return response.data
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {

        // async solution:
        // async function example() {
        // setElements(await getElements());
        // }
        // example();

        getElements().then(elements => {
            if (elements !== null && elements !== undefined) {
                setElements(sortElements(elements));
            }
            else {
                setElements(undefined);
            }
            setloadingState(false);
        })

        function sortElements(elements) {
            elements = elements.sort(function (element1, element2) {
                if (element1.name < element2.name) { return -1; }
                if (element1.name > element2.name) { return 1; }
                return 0;
            });
            return elements;
        }
    }, [elements])

    const gridItemxl = 2;
    const gridItemlg = 3;
    const gridItemmd = 4;
    const gridItemsm = 5;
    const gridItemxs = 12;

    const useStyle = makeStyles({
        root: {
            flexGrow: 1,
            padding: '5%' //Fixes page overflow
        },
        containerGrid: {
            paddingLeft: '20px',
            paddingRight: '20px',
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
        }
    })
    const classes = useStyle();

    /*
    Example elements
    let exampleElements = [];
    let response = getElements();
    console.log(response);
    for (let i = 1; i <= 100; i++) {
        exampleElements.push({ name: "Test" + i, description: "This is test" + i })
    }
    */

    let displayedElements;
    if (elements !== null && elements !== undefined) {
        displayedElements = elements.map((exampleElement, index) => (
            <Grid item key={index} xs={gridItemxs} xl={gridItemxl} lg={gridItemlg} sm={gridItemsm} md={gridItemmd}>
                <Element element={exampleElement} />
            </Grid>
        ))
    }
    else {
        console.log("No elements were loaded.");
    }

    return (
        <div className={classes.root}>
            <ElementModal />
            <EditMenu />
            <Grid container spacing={6} className={classes.containerGrid}>
                {loadingState ? "Loading menu..." : displayedElements}
            </Grid>
        </div>
    )
}
