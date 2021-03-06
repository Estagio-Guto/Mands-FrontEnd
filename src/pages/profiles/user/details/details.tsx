import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import useAuth from '../../../../hooks/useAuth';

import AppLayout from '../../../../layout/appLayout';
import Paper from '@material-ui/core/Paper';
import BackButton from '../../../../components/backButton';
import UserInfo from './components/userInfo/userInfo';
import SocialMedia from './components/socialMedia/socialMedia';
import FabButton from '../../../../components/fabButton';
import useStyles from './styles';

const UserProfile: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { user } = useAuth();

    useEffect(() => {
        if (user) document.title = user.name;
        else document.title = 'Carregando...';
    }, [user]);

    return (
        <AppLayout>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={1} sm={4} />
                    <Grid container item xs={12} sm={4} justify="center">
                        <Typography variant="h1" color="primary">
                            Meu Perfil
                        </Typography>
                    </Grid>
                    <Hidden only="xs">
                        <Grid container item sm={4} justify="flex-end">
                            <BackButton message="Voltar" />
                        </Grid>
                    </Hidden>
                </Grid>

                <Grid container spacing={3} className={classes.gridUser}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={5}>
                            <UserInfo
                                name={`${user!.name} ${user!.surname}`}
                                username={user!.username}
                                email={user!.email}
                                phone={user!.phone}
                                imagePath={user!.image?.path}
                            />
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={12} md={2} />
                        </Hidden>
                        <Grid
                            item
                            xs={12}
                            md={5}
                            className={classes.gridUserItems}
                        >
                            <SocialMedia
                                linkedin={user!.linkedin}
                                github={user!.gitHub}
                            />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            md={5}
                            className={classes.gridUserItems}
                        >
                            <Typography variant="h6" color="primary">
                                Apresentação
                            </Typography>
                            <Typography>
                                {user!.biography
                                    ? user!.biography
                                    : 'Ainda não há apresentação'}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <FabButton
                    title="Editar"
                    icon="edit"
                    style={classes.fabButton}
                    onClick={() => history.replace('/editar-perfil')}
                />
            </Paper>
        </AppLayout>
    );
};

export default UserProfile;
