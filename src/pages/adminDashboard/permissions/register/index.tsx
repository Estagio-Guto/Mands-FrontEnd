import React, { useState, memo, useCallback, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slide from '@material-ui/core/Slide';
import { Times as TimesIcon } from '@styled-icons/fa-solid';

import { AxiosError, departmentPermApi } from '../../../../services';
import useCompany from '../../../../hooks/useCompany';
import useDepartment from '../../../../hooks/useDepartment';
import snackbarUtils from '../../../../utils/functions/snackbarUtils';

import FingerprintIcon from '../../../../assets/icons/fingerprint.svg';
import Backdrop from '../../../../components/backdrop';
import SubmitButton from '../../../../components/mainButton';
import useStyles from './styles';

const permissionsModel = [
    {
        label: 'Gerenciar Departamento',
        checked: false,
    },
    {
        label: 'Gerenciar Projetos',
        checked: false,
    },
    {
        label: 'Gerenciar Usuários',
        checked: false,
    },
];

type PermissionModel = {
    name: string;
};

type Props = {
    isOpen: boolean;
    handleClose: () => void;
};

const RegisterPermission: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { company } = useCompany();
    const { department, updateDepartment } = useDepartment();
    const { register, errors, handleSubmit, formState } = useForm<
        PermissionModel
    >();
    const { isOpen, handleClose } = props;

    const [permissions, setPermissions] = useState(permissionsModel);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const auxPermissions = [...permissions];
        auxPermissions[index].checked = event.target.checked;
        setPermissions(auxPermissions);
    };

    const onSubmit = useCallback(
        async (data: PermissionModel) => {
            const auxData = {
                name: data.name,
                editDepartment: permissions[0].checked,
                deleteDepartment: permissions[0].checked,
                inviteUser: permissions[2].checked,
                deleteUser: permissions[2].checked,
                project: permissions[1].checked,
                permission: permissions[2].checked,
            };
            try {
                await departmentPermApi.create(
                    company!.companyId,
                    department!.departmentId,
                    auxData
                );
                updateDepartment({ ...department! }); // Forçar a re-renderização dos cargos
                snackbarUtils.success('Permissão criada com sucesso');
                handleClose();
            } catch (err) {
                const error: AxiosError = err;
                switch (error.response?.status) {
                    case 400:
                        snackbarUtils.error('Este nome de permissão já existe');
                        break;
                    default:
                        snackbarUtils.error(error.response?.data);
                        break;
                }
            }
        },
        [company, department, permissions, handleClose, updateDepartment]
    );

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            style={{ paddingTop: '2rem' }}
            aria-labelledby="Modal de cadastro de permissão"
            aria-describedby="Realiza o cadastro de uma permissão"
        >
            <Fragment>
                <Backdrop loading={formState.isSubmitting} />
                <Slide direction="up" in={isOpen} mountOnEnter unmountOnExit>
                    <Grid
                        container
                        component={Paper}
                        className={classes.paper}
                        spacing={3}
                    >
                        <IconButton
                            onClick={handleClose}
                            className={classes.closeModalButton}
                        >
                            <TimesIcon size={20} />
                        </IconButton>
                        <Grid container item justify="center">
                            <img
                                src={FingerprintIcon}
                                alt="ícone de uma digital de um dedo"
                            />
                        </Grid>
                        <Grid container item justify="center">
                            <Typography variant="h1">
                                Cadastre uma permissão
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            component="form"
                            spacing={3}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <Grid container item>
                                <TextField
                                    data-cy="role-name-textfield"
                                    name="name"
                                    label="Nome"
                                    error={errors.name !== undefined}
                                    helperText={
                                        errors.name
                                            ? '⚠' + errors?.name?.message
                                            : ''
                                    }
                                    inputRef={register({
                                        required: 'Esse campo é obrigatório',
                                        minLength: {
                                            value: 2,
                                            message:
                                                'Digite um nome com pelo menos 2 caracteres',
                                        },
                                    })}
                                />
                            </Grid>
                            <Grid container item>
                                <FormControl component="fieldset" required>
                                    <FormGroup style={{ maxHeight: '60%' }}>
                                        {permissions.map(
                                            (permission, index) => (
                                                <FormControlLabel
                                                    data-cy="role-checkbox-label"
                                                    key={permission.label}
                                                    label={permission.label}
                                                    control={
                                                        <Checkbox
                                                            data-cy="role-checkbox"
                                                            color="primary"
                                                            checked={
                                                                permission.checked
                                                            }
                                                            onChange={event =>
                                                                handleChange(
                                                                    event,
                                                                    index
                                                                )
                                                            }
                                                            inputProps={{
                                                                'aria-label':
                                                                    permission.label,
                                                            }}
                                                        />
                                                    }
                                                />
                                            )
                                        )}
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid container justify="center">
                                <SubmitButton
                                    dataCy="submit-permission-button"
                                    text="Cadastrar"
                                    disabled={!formState.isDirty}
                                    mt={20}
                                    hg={40}
                                    mw={200}
                                    mwt={250}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Slide>
            </Fragment>
        </Modal>
    );
};

export default memo(RegisterPermission);
