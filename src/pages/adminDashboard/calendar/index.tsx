import React, { useState } from 'react';
import CalendarGrid from './components/calendar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import useStyles from './styles';
import Layout from '../../../layout/appLayout';
import { state, menuItems } from './Data/state';
import Menu from './components/menu';
import moment from 'moment';

const Calendar: React.FC = () => {
    const classes = useStyles();

    const [date, setDate] = useState(moment());

    return (
        <Layout>
            <Box className={classes.container}>
                <Grid container spacing={3} style={{ height: '100%' }}>
                    <Grid item lg={2} md={3}>
                        <Menu
                            date={date}
                            departments={menuItems.departments}
                            projects={menuItems.projects}
                            company={menuItems.company}
                            onFilterChange={data => {}}
                            onDateChange={setDate}
                        />
                    </Grid>
                    <Grid item lg={10} md={9}>
                        <Paper className={classes.calendar}>
                            <CalendarGrid
                                date={date}
                                events={state.events}
                                days={state.days}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Layout>
    );
};

export default Calendar;
