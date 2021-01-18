import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import useCompany from '../../../../hooks/useCompany';
import handleEditURL from '../../utils/handleURL';

import AppLayout from '../../../../layout/appLayout';
import CropImageInput from '../../../../components/cropImage/cropImageInput';
import AdminLayout from '../../components/layout/layout';
import useStyles from './styles';
import FabButton from '../../../../components/fabButton';

const CompanyDetails: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const { company, loading } = useCompany();

    useEffect(() => {
        document.title = `admin/${company?.username}`;
    }, [company]);

    return (
        <AppLayout loading={loading}>
            <AdminLayout title="Empresa">
                <Grid item xs={12} lg={10}>
                    <Paper elevation={3} className={classes.paper}>
                        <Grid
                            container
                            component={Typography}
                            variant="h1"
                            color="primary"
                            justify="center"
                        >
                            Empresa - {company?.name}
                        </Grid>
                        <Grid container spacing={3} component="form">
                            <Grid container spacing={3}>
                                <Grid container item xs={12} md={3}>
                                    <CropImageInput
                                        preview={company?.imagePath}
                                        image={undefined}
                                        disabled
                                    />
                                </Grid>
                                <Grid
                                    container
                                    item
                                    spacing={3}
                                    xs={12}
                                    md={9}
                                    component="aside"
                                >
                                    <Grid container item spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                defaultValue={company?.name}
                                                label="Nome"
                                                disabled
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Nome de Usuário"
                                                defaultValue={company?.username}
                                                disabled
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container item spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="Email"
                                                defaultValue={company?.email}
                                                disabled
                                            />
                                        </Grid>
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            component={TextField}
                                            label="Telefone"
                                            defaultValue={company?.phone}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid container item spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                label="CNPJ"
                                                defaultValue={company?.cnpj}
                                                disabled
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </AdminLayout>
            <FabButton
                title="Configurar"
                icon="settings"
                onClick={() =>
                    history.push(
                        handleEditURL(location.pathname, '/detalhes', '/edicao')
                    )
                }
            />
        </AppLayout>
    );
};

export default CompanyDetails;