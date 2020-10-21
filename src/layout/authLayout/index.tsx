import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import BackButton from '../../components/backButton';
import useStyles from './styles';

import logo from '../../assets/logo/logo.svg';

interface AuthLayoutProps {
    backButtonMessage?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = props => {
    const { backButtonMessage, /*message*/ children } = props;
    const classes = useStyles();

    return (
        <Box component="main" className={classes.layout}>
            <Grid container justify="space-between" spacing={3}>
                <Grid item xs={12} sm="auto">
                    <img
                        src={logo}
                        alt="Logo do Mands"
                        className={classes.logo}
                    />
                </Grid>
                {backButtonMessage && (
                    <Grid item>
                        <BackButton message={backButtonMessage} />
                    </Grid>
                )}
            </Grid>
            {children}
        </Box>
    );
};

export default AuthLayout;