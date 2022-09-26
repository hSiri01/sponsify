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


export const theme = responsiveFontSizes(createTheme({
    spacing,
    palette: {
        mode: 'light',
        primary: mediumGreen,
        secondary: lightGreen,
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif'
        ].join(','),
        
    }
}));