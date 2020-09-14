import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import AddButton from '../addButton';
import useStyles from './styles';

const EmptyCompanies = () => {
    const classes = useStyles();

    return (
        <Box className={classes.container}>
            <Box>
                <Typography
                    color={'textPrimary'}
                    style={{ fontSize: '1.1rem', fontWeight: 300 }}
                >
                    Você não possui nenhuma empresa{' '}
                    <Typography
                        component="span"
                        role="img"
                        aria-label="Crying Face"
                    >
                        😢
                    </Typography>
                </Typography>
                <Typography
                    color="textPrimary"
                    style={{
                        marginTop: 10,
                        fontSize: '1.1rem',
                        fontWeight: 500,
                    }}
                >
                    Seja convidado para uma empresa ou crie a sua própria.
                </Typography>
            </Box>
            <AddButton />
        </Box>
    );
};

export default EmptyCompanies;