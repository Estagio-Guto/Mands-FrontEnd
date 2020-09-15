import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

import AppLayout from '../../layout/appLayout';
import Header from './components/header';
import ManageCompanyButton from './components/manageCompanyButton';
import Departments from './components/departments';

import useStyles from './styles';

const Admnistrator: React.FC = () => {
    const classes = useStyles();

    useEffect(() => {
        // Nome da empresa dinamico
        document.title = 'Dashboard - IT';
    }, []);

    return (
        <AppLayout>
            {/* Dinamico */}
            <Header name="Ana" jobTitle="Gerente" />
            <Grid container className={classes.container}>
                <Grid item xs={12} md={6}>
                    {/* Esconder obotão baseado no tipo de usuário */}
                    <ManageCompanyButton />
                    <Departments containerStyles={classes.departments} />
                </Grid>
            </Grid>
        </AppLayout>
    );
};

export default Admnistrator;