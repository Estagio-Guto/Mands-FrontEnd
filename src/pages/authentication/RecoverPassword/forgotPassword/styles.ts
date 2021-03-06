import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles<Theme>(theme =>
    createStyles({
        formGrid: {
            marginTop: '2rem',
            [theme.breakpoints.only('xs')]: {
                marginTop: 0,
            },

            '& form': {
                padding: '40px 0px',
                paddingRight: '15%',
                [theme.breakpoints.down('md')]: {
                    paddingRight: 0,
                },
            },
        },

        title: {
            fontSize: '2.5rem',
            fontWeight: 700,
            [theme.breakpoints.down('md')]: {
                fontSize: '1.9rem',
            },
        },

        description: {
            marginTop: 10,
            paddingRight: '15%',
            color: '#505050',
            fontSize: '1.1rem',
            [theme.breakpoints.down('md')]: {
                fontSize: '1rem',
            },
        },

        rightSide: {
            marginTop: '4%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        ErrorMessage: {
            marginTop: 7,
            color: theme.palette.primary.main,
            '&:before': { content: "'⚠ '" },
        },
    })
);

export const inputStyle = {
    paddingLeft: 10,
    fontFamily: 'Roboto',
};

export default useStyles;
