import React, { Fragment, memo, useState, useEffect } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import { TypeDepartmentPermission } from '../../../../../../../../../services';
import useStyles from '../styles';

function StyledRadio(props: RadioProps) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={
                <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

type Props = {
    role: TypeDepartmentPermission;
};

const Roles: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { role } = props;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [permissions, setPermissions] = useState<string[]>([]);

    const onHoverIn = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const onHoverOut = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'transitions-popper' : undefined;

    useEffect(() => {
        let aux: string[] = [];
        if (role.editDepartment) aux.push('Gerenciar Departamento');
        if (role.inviteUser) aux.push('Gerenciar Usuários');
        if (role.project) aux.push('Gerenciar Projetos');

        if (aux.length === 0) aux.push('Não possui permissões');
        setPermissions(aux);
    }, [role]);

    return (
        <Fragment>
            <Divider variant="fullWidth" className={classes.divider} />
            <Grid container style={{ paddingLeft: '2rem' }}>
                <Grid item xs={12} className={classes.role}>
                    <FormControlLabel
                        data-cy="role-checkbox-label"
                        value={role.depPermissionId}
                        control={<StyledRadio />}
                        label={role.name}
                    />
                    <div>
                        <IconButton
                            aria-label="delete"
                            onMouseEnter={onHoverIn}
                            onMouseLeave={onHoverOut}
                        >
                            <InfoIcon fontSize="small" />
                        </IconButton>
                        <Popper
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            transition
                            className={classes.popper}
                            placement={'top-start'}
                        >
                            {({ TransitionProps }) => (
                                <Fade {...TransitionProps} timeout={350}>
                                    <div className={classes.paper}>
                                        {permissions.map(item => (
                                            <Typography>{item}</Typography>
                                        ))}
                                    </div>
                                </Fade>
                            )}
                        </Popper>
                    </div>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default memo(Roles);
