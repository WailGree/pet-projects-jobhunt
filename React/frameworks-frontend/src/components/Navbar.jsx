import React from 'react';
import { Tabs, Tab, AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import HomePage from './HomePage';
import ElementsPage from './ElementsPage';

export default function Navbar(props) {

    const { match, history } = props;
    const { params } = match;
    const { page } = params;

    const tabNameToIndex = {
        0: "home",
        1: "elements"
    }

    const indexToTabName = {
        "home": 0,
        "elements": 1
    }
    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

    const handleChange = (event, newValue) => {
        history.push(`/${tabNameToIndex[newValue]}`);
        setSelectedTab(newValue);
    };

    const useStyles = makeStyles(() => ({
        appBarStyles: {
        },
        typographyStyles: {
            flex: 1,
        },
        tabsStyles: {
        }
    }));
    const classes = useStyles();
    
    return (
        <div>
            <AppBar position="static" className={classes.appBarStyles}>
                <Toolbar>
                    <Typography className={classes.typographyStyles}>
                        World of Elements
                    </Typography>
                    <div>
                        <Tabs className={classes.tabsStyles}
                            value={selectedTab} onChange={handleChange} centered>
                            <Tab label="Home" />
                            <Tab label="Elements" />
                        </Tabs>
                    </div>
                </Toolbar>
            </AppBar>
            {selectedTab === 0 && <HomePage />}
            {selectedTab === 1 && <ElementsPage />}
        </div>
    )
}
