import React, { useState, createContext } from 'react'
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { contentMaster } from '../content'

const { color } = contentMaster
const defaultTheme = createMuiTheme({})
const { breakpoints } = defaultTheme
let initTheme = createMuiTheme({
    ...defaultTheme,
    typography: {
        subtitle1: {
            fontSize: 12,
        },
        body1: {
            fontWeight: 500,
        },
        h1: {
            fontSize: "5rem",
            [breakpoints.down("md")]: {
                fontSize: "3rem"
            }
        }
    },
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#0066ff',
            // main: color.primary,
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        secondary: {
            //light: '#0066ff',
            main: color.secondary,
            // dark: will be calculated from palette.secondary.main,
        },
    },

    // overrides: {
    //     MuiInputLabel: { // Name of the component ⚛️ / style sheet
    //         root: { // Name of the rule
    //             color: color.secondary,
    //             "&$focused": { // increase the specificity for the pseudo class
    //                 color: color.secondary
    //             }
    //         },
    //         focused: {
    //             "&$focused": {
    //                 color: color.primary
    //             }
    //         }
    //     }
    // },
    direction: 'rtl'
    // overrides: {

    //     MuiTypography: {

    //         h1: {
    //             fontSize: "5rem",
    //             [breakpoints.down("xs")]: {
    //                 fontSize: "3rem"
    //             }
    //         },

    //     },
    // },
    // palette: {
    //     primary: {
    //         // light: will be calculated from palette.primary.main,
    //         main: '#669933',
    //         // dark: will be calculated from palette.primary.main,
    //         // contrastText: will be calculated to contrast with palette.primary.main
    //     },
    //     secondary: {
    //         //light: '#0066ff',
    //         main: '#00bcd4',
    //         // dark: will be calculated from palette.secondary.main,
    //         contrastText: '#ffcc00',
    //     },
    //     // error: will use the default color
    // },

});

export const ThemeContext = createContext<ThemeContextInterface>({
    theme: initTheme,
    setColors: () => {
        throw new Error('setColors() not implemented');
    },
});

const ThemeContextProvider = (props: { children: React.ReactNode; }) => {
    const [theme, setTheme] = useState(initTheme)

    const setColors = (hex: string) => {
        console.log('theme', theme)
        console.log('hex', hex)
        theme.palette.primary.main = hex

        setTheme({
            ...theme
        })

    }

    return (
        <ThemeContext.Provider value={{
            theme,
            setColors
        }}>
            {props.children}
        </ThemeContext.Provider>
    )

}

export default ThemeContextProvider


