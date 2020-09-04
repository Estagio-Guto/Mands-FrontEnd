import React, { ButtonHTMLAttributes } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Box, Typography } from '@material-ui/core';
import { LogIn as LogInIcon } from '@styled-icons/feather';
import { Email as EmailIcon } from '@styled-icons/material-outlined';
// import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    mt?: number;
    mw?: number;
    mwt?: number;
    text: string;
    icon?: string;
}

interface ButtonIcon {
    icon: string | undefined;
}

const ButtonIcon: React.FC<ButtonIcon> = ({ icon }) => {
    switch (icon) {
        case 'email':
            return <EmailIcon size="28" color="white" />;
        default:
            return <LogInIcon size="25" color="white" />;
    }
};

const ButtonComponent: React.FC<ButtonProps> = (
    props,
    { type, onClick /*, ...rest*/ }
) => {
    const { text, icon } = props;
    const classes = useStyles(props);

    return (
        <Button
            type={type}
            className={classes.button}
            onClick={onClick} /*{...rest}*/
        >
            <Box className={classes.leftSide}>
                <ButtonIcon icon={icon} />
            </Box>
            <Box className={classes.rightSide}>
                <Typography className={classes.logInText}>{text}</Typography>
            </Box>
        </Button>
    );
};

const useStyles = makeStyles<Theme, ButtonProps>(theme =>
    createStyles({
        button: {
            width: '100%',
            maxWidth: props => (props.mw ? props.mw : 300),
            marginTop: props => props.mt,
            padding: '0px',

            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',

            transition: 'all .3s',
            '&:hover': {
                maxWidth: props => (props.mwt ? props.mwt : 360),
            },
        },
        leftSide: {
            width: 70,
            height: 60,

            borderRadius: '12px 0px 0px 12px',
            backgroundColor: theme.palette.primary.main,

            display: 'inherit',
            alignItems: 'inherit',
            justifyContent: 'center',
        },

        rightSide: {
            height: 60,

            color: 'white',
            textAlign: 'center',

            borderRadius: '0px 12px 12px 0px',
            backgroundColor: theme.palette.primary.light,

            flex: 1,
            display: 'inherit',
            alignItems: 'inherit',
            justifyContent: 'center',

            transition: 'all .3s',

            '&:hover': {
                backgroundColor: theme.palette.primary.main,
            },
        },
        logInText: {
            // fontFamily: 'Roboto',
            fontSize: 16,
            letterSpacing: 2.5,
            // fontWeight: 500,
        },
    })
);

export default ButtonComponent;
