import React, { memo } from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import { Times as TimesIcon } from '@styled-icons/fa-solid';
import { MailSend as MailIcon } from '@styled-icons/boxicons-regular';

import { authApi } from '../../../../services';
import MandsLogo from '../../../../assets/logo/mands.png';
import useStyles from './styles';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';

type Props = {
    isOpen: boolean;
    handleClose: () => void;
    credential: string | undefined;
};

const ConfirmRegisterModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, handleClose, credential } = props;

    const handleSubmit = async () => {
        try {
            await authApi.resendConfirmEmail(credential!);
            snackbarUtils.success('Email reenviado com sucesso');
        } catch (error) {
            snackbarUtils.error('Não foi possível reenviar o email');
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            style={{ paddingTop: '2rem' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                <Grid
                    container
                    component={Paper}
                    className={classes.paper}
                    spacing={3}
                >
                    <Grid container alignItems="center" component="header">
                        <Grid item xs={2} />
                        <Grid
                            container
                            item
                            xs={8}
                            justify="center"
                            alignItems="center"
                        >
                            <MailIcon size={32} color="#B03E9F" />
                            <img src={MandsLogo} alt="logo do mands" />
                        </Grid>
                        <Grid container item xs={2} justify="flex-end">
                            <IconButton onClick={handleClose}>
                                <TimesIcon size={20} />
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid container component={Typography} variant="h1">
                        Sua conta está quase pronta...
                    </Grid>

                    <Grid container component={Typography}>
                        Enviamos um email para você confirmar a criação da
                        conta.
                    </Grid>

                    <Grid container component={Typography}>
                        Caso não tenha recebido, verifique a caixa de spam ou
                        clique abaixo:
                    </Grid>

                    <Grid
                        id="resend-email-container"
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Button color="primary" onClick={handleSubmit}>
                            Reenviar email
                        </Button>
                    </Grid>
                </Grid>
            </Slide>
        </Modal>
    );
};

export default memo(ConfirmRegisterModal);
