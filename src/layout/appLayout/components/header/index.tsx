import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { useAuth } from '../../../../contexts/auth';

import logo from '../../../../assets/logo/logo_branca.svg';
import avatar from '../../../../assets/fakeDataImages/employees/anaTartari.png';
import useStyles from './styles';

const Header: React.FC = () => {
    const classes = useStyles();
    const { logout } = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container component="header" className={classes.container}>
            <Grid item xs={4} />
            <Grid container item justify="center" xs={4}>
                <img src={logo} alt="Logo do Mands" className={classes.logo} />
            </Grid>
            <Grid container item xs={4} className={classes.rightSide}>
                <ButtonBase onClick={handleClick}>
                    <Avatar src={avatar} alt="Ana Tartari avatar" />
                    <Typography style={{ color: 'white', fontSize: '0.9rem' }}>
                        Ana Tartari
                    </Typography>
                </ButtonBase>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    className={classes.menu}
                >
                    {window.location.pathname !== '/perfil' &&
                        window.location.pathname !== '/editar-perfil' && (
                            <MenuItem
                                component={Link}
                                to={'/perfil'}
                                onClick={handleClose}
                            >
                                Perfil
                            </MenuItem>
                        )}
                    <MenuItem onClick={logout}>Sair</MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
};

export default memo(Header);
