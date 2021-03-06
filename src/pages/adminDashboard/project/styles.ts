import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        departmentsContainer: {
            [theme.breakpoints.up('md')]: {
                marginTop: '2rem',
                marginLeft: '2rem',
            },
        },

        departmentsContentContainer: {
            height: '100%',
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
            },
        },
    })
);

export default useStyles;
