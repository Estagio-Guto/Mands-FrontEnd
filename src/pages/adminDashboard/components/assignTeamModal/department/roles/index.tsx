import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import { Add as AddIcon } from '@styled-icons/ionicons-outline';

import { TypeDepartmentPermission } from '../../../../../../services';
import RoleItem from './roleItem';
import useStyles from './styles';

type Props = {
    roles: TypeDepartmentPermission[];
    roleValue: number;
    handleChangeRole: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOpen: () => void;
};

const ChooseRole: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { roles, roleValue, handleChangeRole, handleOpen } = props;

    return (
        <Fragment>
            <Grid container>
                <FormLabel
                    component="legend"
                    style={{ paddingLeft: '21px', padding: '1rem 0rem' }}
                >
                    Cargos
                </FormLabel>
            </Grid>
            {roles.length === 0 && (
                <Grid container component={Typography} justify="center">
                    Este departamento não possui cargos
                </Grid>
            )}
            <Grid container>
                <RadioGroup
                    value={roleValue}
                    aria-label="cargos"
                    name="cargos"
                    onChange={handleChangeRole}
                    style={{ width: '100%' }}
                >
                    {roles.map(role => (
                        <RoleItem key={role.depPermissionId} role={role} />
                    ))}
                    <Divider variant="fullWidth" className={classes.divider} />
                    <Grid
                        data-cy="add-role-button"
                        container
                        component={Button}
                        onClick={handleOpen}
                        className={classes.addRole}
                    >
                        <Grid item xs={1} component={AddIcon} size={20} />
                        <Grid item xs={11} component={Typography}>
                            Adicionar cargo personalizado
                        </Grid>
                    </Grid>
                    <Divider variant="fullWidth" className={classes.divider} />
                </RadioGroup>
            </Grid>
        </Fragment>
    );
};
export default ChooseRole;
