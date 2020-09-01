import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#B03E9F',
            main: '#8D297E',
            //   dark: '#002884',
            //   contrastText: '#fff',
        },
        // secondary: {
        //     //   light: '#ff7961',
        //     main: '#B03E9F',
        //     //   dark: '#ba000d',
        //     //   contrastText: '#000',
        // },
        background: {
            default: '#F5F5F5',
        },
    },
    typography: {
        fontFamily: ['Roboto Slab, Roboto'].join(','),
    },
});

export default theme;
