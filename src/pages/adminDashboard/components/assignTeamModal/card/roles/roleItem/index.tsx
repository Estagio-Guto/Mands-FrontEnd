import React, { Fragment, memo } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';
import Radio, { RadioProps } from '@material-ui/core/Radio';

import { TypeCompanyPermission } from '../../../../../../../services';
import useStyles from '../../../styles';

function StyledRadio(props: RadioProps) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={
                <span
                    className={clsx(classes.radioIcon, classes.checkedIcon)}
                />
            }
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}

type Props = {
    role: TypeCompanyPermission;
};

const Roles: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { role } = props;

    return (
        <Fragment>
            <Divider variant="fullWidth" className={classes.divider} />
            <Grid container style={{ paddingLeft: '2rem' }}>
                <Grid item xs={12}>
                    <FormControlLabel
                        value={role.compPermissionId}
                        control={<StyledRadio />}
                        label={role.name}
                    />
                </Grid>
                <Grid
                    item
                    xs={12}
                    component={Typography}
                    className={clsx(classes.roleDescription)}
                >
                    Cargo simples sem permissões de alterações
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default memo(Roles);
