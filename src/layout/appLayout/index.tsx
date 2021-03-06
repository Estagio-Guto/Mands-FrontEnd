import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import useCompany from '../../hooks/useCompany';
import snackbarUtils from '../../utils/functions/snackbarUtils';
import TypeParams from '../../models/params';
import { AxiosError } from '../../services';

import Header from './components/header';
import Loading from '../../components/loading/loading';
import NotFound from '../../pages/404';
import useStyles from './styles';

type Props = {
    layoutStyles?: string;
    loading?: Array<boolean>;
    children: React.ReactNode;
};

const AppLayout: React.FC<Props> = (props: Props) => {
    const { layoutStyles, loading = [false], children } = props;
    const classes = useStyles();
    const params = useParams<TypeParams>();
    const {
        company,
        getCompanyData,
        loading: innerLoading,
        setLoading,
    } = useCompany();

    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const checkCompanyData = async () => {
            try {
                if (!params.company) return;
                if (!company) await getCompanyData(params.company);
            } catch (err) {
                const error: AxiosError = err;
                switch (error.response?.status) {
                    case 404:
                        setNotFound(true);
                        break;
                    default:
                        snackbarUtils.error(error.message);
                        break;
                }
            } finally {
                setLoading(false);
            }
        };
        checkCompanyData();
    }, [company, getCompanyData, params, setLoading]);

    if (notFound) return <NotFound />;

    return (
        <Box
            component="main"
            className={
                layoutStyles
                    ? ` ${layoutStyles} ${classes.layout}`
                    : classes.layout
            }
        >
            <Header />
            {innerLoading || loading.includes(true) ? <Loading /> : children}
        </Box>
    );
};

export default AppLayout;
