import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        paper: {
            margin: '2rem',
            padding: '2rem',

            [theme.breakpoints.only('xs')]: {
                margin: '0.5rem',
                padding: '1rem',
            },

            '& form': {
                paddingBottom: '1rem',
            },
        },

        header: {
            alignItems: 'center',

            '& div:first-child': {
                [theme.breakpoints.only('xs')]: {
                    display: 'flex',
                    justifyContent: 'center',
                },
            },

            '& h1': {
                fontSize: '1.8rem',
                fontWeight: 700,

                [theme.breakpoints.only('xs')]: {
                    fontSize: '1.6rem',
                },
            },
        },

        formContent: {
            [theme.breakpoints.down('md')]: {
                flexWrap: 'wrap-reverse',
            },
        },

        rightSide: {
            display: 'flex',
            justifyContent: 'center',
        },

        input: {
            marginTop: 20,
        },

        ErrorMessage: {
            marginTop: 7,
            fontSize: '.8rem',
            color: theme.palette.primary.main,
            '&:before': { content: "'⚠ '" },
        },

        forgotPasswordButton: {
            color: '#515151',
            fontFamily: 'Roboto',
            fontSize: 16,
            fontWeight: 300,

            transition: 'all .1s',

            '&:hover': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
            },
        },
        signUpText: {
            font: 'italic 300 16px Roboto',
            color: '#8A8A8A',
        },

        signUpButton: {
            marginLeft: 5,

            color: '#555',
            font: '16px Roboto Slab',

            '&:hover': {
                color: theme.palette.primary.main,
                textDecoration: 'underline',
            },
        },

        avatarContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',

            '&.active': {
                transition: 'all .2s',
                '&:hover': {},
            },
        },

        avatarInputLabel: {
            width: '100%',
            maxWidth: '200px',
            height: '200px',
            marginTop: 10,

            border: '2px dashed #A2A2A2',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            position: 'relative',
            cursor: 'pointer',
            transition: 'all .2s',

            '& #avatar-blur': {
                width: '100%',
                height: '100%',
                position: 'absolute',
                backgroundColor: 'rgba(0,0,0,.2)',
                opacity: 0,
            },

            '& svg': {
                color: theme.palette.primary.main,
            },

            '&.active': {
                background: 'center no-repeat',
                backgroundSize: 'contain',

                '& svg': {
                    color: 'white',
                    transition: 'opacity .2s ease-in-out',
                    opacity: 0,
                    position: 'absolute',
                    zIndex: 5,
                },
                '&:hover': {
                    '& svg': {
                        opacity: 1,
                    },
                    '& #avatar-blur': {
                        opacity: 1,
                    },
                },
            },

            '&:hover': {
                borderRadius: 10,
                backgroundColor: 'rgba(0,0,0,0.1)',

                //     '&:before' {
                //         animation: 'spin 10s linear infinite;'
                //       },
                //       '@keyframes spin' {
                //         100% {
                //           transform: rotateZ(360deg);
                //         }
                //       }
            },
        },
    })
);

export const inputStyle = {
    paddingLeft: 5,
    fontFamily: 'Roboto',
};

export default useStyles;