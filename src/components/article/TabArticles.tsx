import React, { useContext } from 'react'
import { Theme, createStyles, Typography, CardMedia, Grid, Tooltip, Fab, Button, Menu, MenuItem, TextField } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleSharp';
import { AuthContext } from '../../context/AuthContext';
import { ArticleContext } from '../../context/ArticleContext';
import AddEditArticle from './AddEditArticle';
import SaveIcon from '@material-ui/icons/Save';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import red from '@material-ui/core/colors/red';
import { whileStatement } from '@babel/types';


const styles = (theme: Theme) => createStyles({
    article: {
        position: 'relative',
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0
        },
    },
    text: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
        }
    },
    title: {
        paddingRight: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            paddingTop: theme.spacing(2),
        },

    },
    sideImg: {
        maxBlockSize: '50vh',
    },
    gridImg: {
        [theme.breakpoints.down('xs')]: {
            paddingBottom: 0,
            marginBottom: 0
        },
    },
    absoluteR: {
        position: 'absolute',
        top: theme.spacing(2),
        right: theme.spacing(2),

    },
    absoluteRTitle: {
        color: 'white',
        position: 'absolute',
        top: theme.spacing(0),
        right: theme.spacing(0),

    },
    absoluteL: {
        position: 'absolute',
        top: theme.spacing(2),
        left: theme.spacing(2),
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    addIcon: {
        fontSize: 80,
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    tabTitle: {
        padding: 0,
        margin: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            padding: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(2),
        },
        width: '100%',
        textAlign: 'center'
    },
    button: {
        margin: theme.spacing(1),
        color: "white"
    },
    buttonDel: {
        color: "white",
        backgroundColor: red[500],
        // margin: theme.spacing(1),
    },
    editTabTitle: {}

});

interface Props extends WithStyles<typeof styles> {
    classes: {
        article: string,
        text: string,
        title: string,
        sideImg: string,
        gridImg: string,
        absoluteL: string,
        absoluteR: string,
        addIcon: string,
        tabTitle: string,
        button: string,
        buttonDel: string,
        absoluteRTitle: string,
        editTabTitle: string

    },
    tab: PanelTab
}



const TabArticles: React.FC<Props> = ({ classes, tab }) => {
    const [editMode, toggleEditMode] = React.useState(true);
    const [addMode, toggleAddMode] = React.useState(false);
    const emptyArticle = {
        index: tab.articles.length + 1,
        title: '',
        text: '',
        img: '',
        sideImg: false

    }
    const { addEditDeleteArticle,
        article,
        setArticle,
        changeArticleOrder,
        editTabTitle,
        content
    } = useContext(ArticleContext)


    const { isAuthenticated } = useContext(AuthContext)

    const onEditClick = (article: Article) => {
        console.log('article', article)
        setArticle(article)
        toggleAddMode(true)
    }
    const onAddClick = () => {
        setArticle(emptyArticle)
        toggleAddMode(true)
    }
    const onEditCancel = () => {
        setArticle(emptyArticle)
        toggleAddMode(false)
    }
    const onClickDelete = (tab: PanelTab, article: Article) => {
        addEditDeleteArticle(tab, article, 'delete')
        setArticle(emptyArticle)

        toggleAddMode(false)
    }
    const onClickSave = (tab: PanelTab, article: Article) => {
        addEditDeleteArticle(tab, article, 'edit')
        onEditCancel()
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [tabTitle, setTabTitle] = React.useState<string>(tab.tabTitle)
    const [isEditTabTitle, setIsEditTabTitle] = React.useState<boolean>(false)


    const isMenuOpen = Boolean(anchorEl);

    const handleEtitTitle = (tab: PanelTab, tabTitle: string) => {
        editTabTitle(tab, tabTitle)
        setIsEditTabTitle(false)
    }
    const handleMoveUp = (tb: PanelTab, art: Article) => {
        setAnchorEl(null);
        console.log('article', art.index)
        changeArticleOrder(tb, art, 'moveUp')
    };
    const handleMoveDown = (tb: PanelTab, art: Article) => {
        console.log('article', art.index)

        setAnchorEl(null);
        changeArticleOrder(tb, art, 'moveDown')
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleCancelEditTitle = () => {
        setTabTitle(tab.tabTitle)
        setIsEditTabTitle(false)
    };

    const renderEditMenu = (tab: PanelTab, article: Article) => (<React.Fragment>
        <div className={classes.absoluteL} >
            <Tooltip
                onClick={() => handleMoveUp(tab, article)} title="moveUp" aria-label="moveDown">
                <Fab size="small" color="primary"
                // className={classes.absoluteL} 
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </Tooltip>
            <Tooltip
                onClick={() => handleMoveDown(tab, article)} title="moveDown" aria-label="move down">
                <Fab size="small" color="primary"
                // className={classes.absoluteL}
                >
                    <KeyboardArrowDownIcon />
                </Fab>
            </Tooltip>
        </div>
        <div className={classes.absoluteR} >
            <Tooltip
                onClick={() => onEditClick(article)}
                title="edit" aria-label="edit">
                <Fab size="small" color="primary" >
                    <EditIcon />
                </Fab>
            </Tooltip>
            <Tooltip
                onClick={() => onClickDelete(tab, article)}
                title="delete" aria-label="delete">
                <Fab size="small" color="primary"
                    className={classes.buttonDel}
                >
                    <DeleteIcon />
                </Fab>
            </Tooltip>
        </div>
    </React.Fragment>)

    const renderMenu = (tab: PanelTab, art: Article) => {
        let menuId = 'moveMenu' + art.index;
        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                // keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => handleMoveUp(tab, art)}>Move up</MenuItem>
                <MenuItem onClick={() => handleMoveDown(tab, art)}>Move down</MenuItem>
            </Menu>
        );
    }
    const renberTabTitle = () => {
        if (!isEditTabTitle) return (
            <Grid
                className={classes.gridImg}
                item xs={12}>
                {editMode &&
                    <Tooltip
                        className={classes.absoluteR}
                        onClick={() => setIsEditTabTitle(true)}
                        title="edit" aria-label="edit">
                        <Fab size="small" color="primary" >
                            <EditIcon />
                        </Fab>
                    </Tooltip>
                }
                {tab.tabTitle &&
                    <Typography className={classes.tabTitle} variant="h3" color="textSecondary">
                        {tabTitle}
                    </Typography>}
            </Grid>)
        else return (<Grid
            className={classes.editTabTitle}
            style={{ width: '100' }}

            item xs={12}>
            <div className={classes.absoluteRTitle} >
                <Tooltip
                    onClick={() => handleEtitTitle(tab, tabTitle)}
                    title="edit" aria-label="done">
                    <Fab size="small" color="primary" >
                        <DoneIcon />
                    </Fab>
                </Tooltip>
                <Tooltip
                    onClick={() => handleCancelEditTitle()}
                    title="delete" aria-label="cancel">
                    <Fab size="small" color="secondary"
                    // className={classes.button}
                    >
                        <CancelIcon />
                    </Fab>
                </Tooltip>
            </div>
            <TextField
                className={classes.editTabTitle}
                onChange={(e) => setTabTitle(e.target.value)}
                id="filled-required"
                label="Title"
                defaultValue={tabTitle}
                margin="normal"
                variant="filled"
                fullWidth={true}
            />
        </Grid>)
    }
    if (addMode) return (
        <React.Fragment>
            <AddEditArticle />
            <Grid container>
                <Grid item xs={6}>
                    <Button
                        onClick={() => onEditCancel()}
                        variant="contained"
                        color="secondary"
                        size="small"
                        className={classes.button}
                        startIcon={<CancelIcon />}
                    >Cancel</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button
                        onClick={() => onClickSave(tab, article)}
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                    >Save</Button>
                </Grid>
            </Grid>
        </React.Fragment>)

    else return (
        <Grid container spacing={2}
            className={classes.article}
        >
            <Grid container spacing={2} style={{ margin: 0 }}

            > {renberTabTitle()}
            </Grid>

            {
                tab.articles.map(article =>
                    (
                        <React.Fragment key={article.index}>

                            {article.sideImg ?
                                <Grid container spacing={2} className={classes.article} >
                                    <Grid className={classes.gridImg} item xs={12} md={6}>
                                        {editMode &&
                                            renderEditMenu(tab, article)
                                        }
                                        {article.img &&
                                            <CardMedia
                                                component="img"
                                                alt="img"
                                                className={classes.sideImg}
                                                image={article.img}
                                                title="img"
                                            />}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography className={classes.text} component="h3" variant="h5">
                                            {article.title}
                                        </Typography>
                                        <Typography className={classes.text} variant="body1" color="textSecondary">
                                            {article.text}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container spacing={2} className={classes.article}>
                                    {editMode &&
                                        renderEditMenu(tab, article)
                                    }
                                    <Grid item xs={12}>
                                        <Typography className={classes.title} component="h3" variant="h5">
                                            {article.title}
                                        </Typography>
                                        {article.img && <CardMedia
                                            component="img"
                                            alt="img"
                                            height="140"
                                            image={article.img}
                                            title="img"
                                        />}
                                        <Typography className={classes.text} variant="body1" color="textSecondary">
                                            {article.text}
                                        </Typography>
                                    </Grid>
                                </Grid>}
                            {renderMenu(tab, article)}
                        </React.Fragment>
                    ))
            }
            <Grid container spacing={2} >
                <Grid style={{ justifyItems: 'flex-start' }} item xs={2}>
                    <AddCircleOutlineIcon
                        onClick={() => onAddClick()}
                        className={classes.addIcon}
                        fontSize="large"
                        color="primary" />
                </Grid>
            </Grid>
        </Grid>
    )

}

export default withStyles(styles)(TabArticles)
