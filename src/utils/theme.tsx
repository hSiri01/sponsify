import { createTheme, PaletteColorOptions, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
        spacing: (factor: number) => string
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        spacing?: (factor: number) => string
    }
}

const spacing = (factor: number) => `${0.25 * factor}rem`

export const lightGreen: PaletteColorOptions = {
    main: '#71c1a5',
}

export const mediumGreen: PaletteColorOptions = {
    main: '#4baa89',
}

export const darkGreen: PaletteColorOptions = {
    main: '#367c63',
}

export const grey: PaletteColorOptions = {
    main: '#434343',
}
export const darkGrey: PaletteColorOptions = {
    main: '#434343',
}


export const theme = responsiveFontSizes(createTheme({
    spacing,
    palette: {
        mode: 'light',
        primary: mediumGreen,
        secondary: darkGrey,
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
            },
        },
        MuiButton: {
            defaultProps:{
                disableElevation: true,
                sx:{
                    color:'white',
                    backgroundColor:'#4baa89',
                    borderRadius: 0,
                    fontFamily: 'Oxygen',
                    pt:spacing(3),
                    pb: spacing(3),
                    pl: spacing(8),
                    pr: spacing(8),
                    "&:hover":{
                        color:'white',
                        backgroundColor:'#367c63',
                    }
                }
            },
        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif'
        ].join(','),
        
    },
    
}));