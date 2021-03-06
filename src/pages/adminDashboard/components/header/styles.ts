import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            color: theme.palette.primary.contrastText,
        },
    })
);

export default useStyles;
