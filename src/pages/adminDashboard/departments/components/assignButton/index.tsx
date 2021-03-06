import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { UserGroup as UserGroupIcon } from '@styled-icons/heroicons-solid';
import { Documents as DocumentsIcon } from '@styled-icons/ionicons-sharp';
import { Plus as PlusIcon } from '@styled-icons/entypo';
import { Settings as SettingsIcon } from '@styled-icons/material';

import Props from './assignButton';

import useStyles from './styles';

const AssignButton: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { icon, actionIcon, onClick } = props;

    const Icon = () => {
        switch (icon) {
            case 'team':
                return <UserGroupIcon color="#B03E9F" size={30} />;
            case 'document':
                return <DocumentsIcon color="#B03E9F" size={30} />;
            default:
                return <UserGroupIcon color="#B03E9F" size={30} />;
        }
    };

    const ActionIcon = () => {
        switch (actionIcon) {
            case 'add':
                return <PlusIcon color="#B03E9F" size={20} />;
            case 'manage':
                return <SettingsIcon color="#B03E9F" size={18} />;
            default:
                return <PlusIcon color="#B03E9F" style={{ width: 35 }} />;
        }
    };

    return (
        <Button
            data-cy="assign-button"
            onClick={onClick}
            className={classes.button}
        >
            <Icon />
            <Paper id="paper">
                <ActionIcon />
            </Paper>
        </Button>
    );
};

export default AssignButton;
