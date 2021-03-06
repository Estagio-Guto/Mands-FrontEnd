import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: ' 1rem 2rem 0',
            padding: '2rem',

            [theme.breakpoints.only('xs')]: {
                margin: '0.5rem',
            },
        },

        title: {
            marginBottom: '2rem',
            color: theme.palette.primary.main,
            fontSize: '2rem',
            fontWeight: 600,
            textAlign: 'center',

            [theme.breakpoints.down('md')]: {
                fontSize: '1.75rem',
            },
        },

        formContainer: {
            [theme.breakpoints.down('sm')]: {
                marginTop: '1rem',
                justifyContent: 'center',
            },
        },

        cropImage: {
            marginTop: 0,
            '& label': {
                marginTop: 0,
            },
        },

        descriptionContainer: {
            marginTop: '1rem',
            [theme.breakpoints.up('md')]: {
                padding: '0 5.2rem 0 1rem',
            },
        },

        assignsContainer: {
            marginTop: '3rem',
        },

        textFieldGrid: {
            margin: theme.spacing(1, 0),
        },

        projectAssignGridItem: {
            [theme.breakpoints.down('sm')]: {
                marginTop: '2rem',
            },
        },

        submitButtonContainer: {
            marginTop: '6rem',
        },
        ErrorMessage: {
            marginTop: 7,
            fontSize: '.8rem',
            color: theme.palette.primary.main,
            '&:before': { content: "'⚠ '" },
        },
        animationContainer: {
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
    })
);

export default useStyles;
