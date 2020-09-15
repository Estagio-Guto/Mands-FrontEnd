import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: 40,
            padding: '0px 2rem',
        },
        departments: {
            marginTop: '1.2rem',
        },
    })
);

export default useStyles;