import React from 'react';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Company from './components/company';
import AddButton from '../addButton';
import useStyles from './styles';

import ITLogo from '../../../../assets/companiesImages/IT.png';

interface ICompanySelection {
    companies: Array<{ name: string }> | null;
}

const CompanySelection: React.FC<ICompanySelection> = ({ companies }) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Typography
                variant="h6"
                color="textPrimary"
                className={classes.title}
            >
                Qual empresa você gostaria de acessar?
            </Typography>
            <Grid container spacing={3} className={classes.companiesContainer}>
                {companies?.map(company => (
                    <Grid
                        container
                        item
                        xs={12}
                        md={
                            companies.length > 1
                                ? companies.length > 2
                                    ? 4
                                    : 6
                                : 12
                        }
                        style={{ justifyContent: 'center' }}
                    >
                        <Company logo={ITLogo} name={company.name} />
                    </Grid>
                ))}
            </Grid>
            <AddButton />
        </Box>
    );
};

export default CompanySelection;