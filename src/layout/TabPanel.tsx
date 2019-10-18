import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { createStyles, Theme, Container, Grid } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import TabArticle from '../components/article/TabArticle';
import SwipeableViews from 'react-swipeable-views';
import { iconsRender } from '../components/Icons';
import TabContact from '../components/contact/TabContact';
import { AuthContext } from '../context/AuthContext';
import AuthToolbar from './AuthToolbar';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleSharp';
import color from '@material-ui/core/colors/amber';
import { ContentContext } from '../context/ContentContext';


const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-prevent-tabpanel-${index}`}
            aria-labelledby={`scrollable-prevent-tab-${index}`}
            {...other}
        >
            <Box style={{ padding: 0 }} p={3}>{children}</Box>
        </Typography>
    );
}



const a11yProps = (index: number) => {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}


const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,

    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    tabTitle: {
        margin: theme.spacing(2),
    },
    articleContainer: {
        overflow: 'hidden',
        padding: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            margin: 0,
        },
    },
    addIcon: {
        fontSize: 80,
        '&:hover': {
            color: theme.palette.secondary.main
        }
    }

});

interface Props extends WithStyles<typeof styles> {
    classes: {
        root: string,
        tabs: string,
        articleContainer: string,
        tabTitle: string,
        addIcon: string
    },
    panel: Panel,
}

const ScrollableTabsBar: React.FC<Props> = ({ classes, panel }) => {
    const [value, setValue] = React.useState(0);
    const { tabs } = panel
    const { isAuthenticated } = useContext(AuthContext)
    const { addArticle } = useContext(ContentContext)

    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {

        setValue(newValue);
    };
    const handleChangeIndex = (index: number) => {
        setValue(index);
    };
    const renderTab = (tab: PanelTab) => {
        switch (tab.tabType) {
            case 'articles': return (<TabArticle articles={tab.articles} />)
            case 'contact': return (<TabContact contact={tab.contact} />)
        }
    }
    return (
        <div className={classes.root}>

            <AppBar className={classes.tabs} position="sticky">
                <AuthToolbar />
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    aria-label="tabs"
                >
                    {tabs.map((tab, i) => {
                        return (
                            <Tab key={tab.tabName} icon={iconsRender(tab.icon)} label={tab.tabName} {...a11yProps(i)} />
                        )
                    })
                    }
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis='x'
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {tabs.map((tab, i) => (
                    <Container className={classes.articleContainer} key={tab.tabName} maxWidth="lg">
                        <TabPanel value={value} index={i}>
                            {tab.tabTitle &&
                                <Typography className={classes.tabTitle} variant="h2" color="textSecondary">
                                    {tab.tabTitle}
                                </Typography>}
                            {renderTab(tab)}


                        </TabPanel>
                        {isAuthenticated && <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <AddCircleOutlineIcon
                                    onClick={() => addArticle(tab)}
                                    className={classes.addIcon}
                                    fontSize="large"
                                    color="primary" />
                                <Typography className={classes.tabTitle} variant="h5" color="primary">
                                    {tab.tabType}
                                </Typography>

                            </Grid>

                        </Grid>}
                    </Container>
                ))
                }

            </SwipeableViews>
        </div>
    );

}
export default withStyles(styles)(ScrollableTabsBar)