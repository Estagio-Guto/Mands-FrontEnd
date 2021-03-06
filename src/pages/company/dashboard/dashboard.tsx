import React, { useEffect, Fragment, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import SnackbarUtils from '../../../utils/functions/snackbarUtils';

import { TypeCompany, TypeDepartment, departmentApi } from '../../../services';
import useAuth from '../../../hooks/useAuth';
import useCompany from '../../../hooks/useCompany';

import AppLayout from '../../../layout/appLayout';
import ManageCompanyButton from './components/manageCompanyButton/manageCompanyButton';
import Departments from './components/departments';
import CompanyDetails from './components/companyDetails/companyDetails';
import useStyles from './styles';

const CompanyDashboard: React.FC = () => {
    const classes = useStyles();
    const { user } = useAuth();
    const { company, updateCompany, loading, setLoading } = useCompany();
    const [departments, setDepartments] = useState<TypeDepartment[]>([]);

    useEffect(() => {
        const getDepartmentData = async (company: TypeCompany) => {
            try {
                setLoading(true);
                const response = await departmentApi.listByUser(
                    company.companyId
                );
                setDepartments(response.data);
            } catch (error) {
                SnackbarUtils.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        if (!company) return;

        document.title = `Dashboard - ${company.username}`;
        getDepartmentData(company);
    }, [company, updateCompany, setLoading]);

    return (
        <AppLayout loading={[loading]}>
            <Box className={classes.container}>
                <Grid container component="section">
                    <Grid item xs={12}>
                        <Typography className={classes.name}>
                            Seja bem-vindo ao Mands, {user?.name}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={3}
                    className={classes.contentContainer}
                >
                    {company ? (
                        <Fragment>
                            <Grid item xs={12} md={6}>
                                {(company.userPermission?.editCompany ||
                                    company.userPermission?.acceptUser ||
                                    company.userPermission?.department) && (
                                    <ManageCompanyButton company={company} />
                                )}
                                <Departments
                                    departments={departments}
                                    containerStyles={
                                        company.userPermission?.editCompany ||
                                        company.userPermission?.acceptUser ||
                                        company.userPermission?.department
                                            ? classes.departments
                                            : undefined
                                    }
                                    breakpoints={{ xs: 12, sm: 6, md: 6 }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CompanyDetails data={company} />
                            </Grid>
                        </Fragment>
                    ) : (
                        <CircularProgress color="primary" />
                    )}
                </Grid>
            </Box>
        </AppLayout>
    );
};

export default CompanyDashboard;
