import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        name: {
            color: theme.palette.primary.contrastText,
            fontSize: '1.3rem',
            fontWeight: 'bold',
        },
    })
);

export default useStyles;
