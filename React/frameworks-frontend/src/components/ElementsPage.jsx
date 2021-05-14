import Element from "./Element";
import { Grid, makeStyles } from '@material-ui/core';

export default function ElementsPage() {

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

    let exampleElements = [];
    for (let i = 1; i <= 100; i++) {
        exampleElements.push({ name: "Test" + i, description: "This is test " + i })
    }
    let example = exampleElements.map((exampleElement, index) => (
        <Grid item key={index} xs={gridItemxs} xl={gridItemxl} lg={gridItemlg} sm={gridItemsm} md={gridItemmd}>
            <Element element={exampleElement} />
        </Grid>
    ))

    return (
        <Grid container spacing={6} className={classes.containerGrid}>
            {example}
        </Grid>
    )
}
