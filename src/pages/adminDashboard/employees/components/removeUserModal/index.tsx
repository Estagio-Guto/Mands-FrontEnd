import React, {
    useState,
    Dispatch,
    SetStateAction,
    memo,
    Fragment,
} from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Slide from '@material-ui/core/Slide';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Times as TimesIcon } from '@styled-icons/fa-solid';

import { TypeCompany, companyApi, TypeMember } from '../../../../../services';
import snackbarUtils from '../../../../../utils/functions/snackbarUtils';
import useStyles from './styles';

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    company: TypeCompany | undefined | null;
    member: TypeMember | undefined;
    onRemove(member: TypeMember): void;
};

const CompanyDeleteModal: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { isOpen, setIsOpen, company, onRemove, member } = props;

    const [loading, setLoading] = useState(false);

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleRemove = async () => {
        if (!company || !member) return;
        setLoading(true);
        try {
            await companyApi.removeEmployee(company!.companyId, member!.userId);

            console.log(
                `Funcionário ${member!.name} deletado (id: ${member!.userId})`
            );

            snackbarUtils.success(`Você removeu ${member?.name} da empresa`);
            onRemove(member!);
        } catch (err) {
            snackbarUtils.error(`Falha ao remover ${member?.name} da empresa`);
        } finally {
            setIsOpen(false);
            setLoading(false);
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleCloseModal}
            style={{ paddingTop: '2rem' }}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Fragment>
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                    <Grid
                        container
                        component={Paper}
                        className={classes.paper}
                        spacing={3}
                    >
                        <Grid container alignItems="center">
                            <Grid
                                container
                                item
                                xs={10}
                                component={Typography}
                                variant="h1"
                            >
                                Você tem certeza?
                            </Grid>
                            <Grid container item xs={2} justify="flex-end">
                                <IconButton onClick={handleCloseModal}>
                                    <TimesIcon size={20} />
                                </IconButton>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            component={Divider}
                            variant="fullWidth"
                            light
                        />

                        <Grid
                            container
                            className={classes.descriptionContainer}
                        >
                            <Typography>
                                Essa ação vai remover {member?.name}{' '}
                                permanentemente da empresa, os departamentos e
                                projetos contidos nela.
                            </Typography>
                        </Grid>
                        <Grid
                            data-cy="company-delete-button"
                            container
                            justify="center"
                            component={Button}
                            variant="outlined"
                            onClick={handleRemove}
                            className={classes.button}
                        >
                            Remover da Empresa
                        </Grid>
                    </Grid>
                </Slide>
            </Fragment>
        </Modal>
    );
};

export default memo(CompanyDeleteModal);
