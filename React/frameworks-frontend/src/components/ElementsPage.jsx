import { useEffect, useState } from 'react';
import Element from "./Element";
import { Grid, makeStyles } from '@material-ui/core';
import EditMenu from './EditMenu';
import ElementModal from './ElementModal';

export default function ElementsPage() {

    const [loadingState, setloadingState] = useState(true)

    const [elements, setElements] = useState([]);
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
                setElements(elements);
            }
            else {
                setElements(undefined);
            }
            setloadingState(false);
        })
    }, [])

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
