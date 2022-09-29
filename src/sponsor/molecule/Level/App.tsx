import { Grid } from '@mui/material';
import { theme, darkGreen } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';




interface Props {
    name: string,
    lower_bound: number, 
    upper_bound?: number, 
    description: string, 
    color_level: string, 
}

const Level = (props: Props) => {

    const {name, lower_bound, upper_bound, description, color_level} = props

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper sx={{ borderRadius: 0, background: `#${color_level}`, maxWidth: theme.spacing(200), minWidth: theme.spacing(200), minHeight: theme.spacing(20) }} elevation={0}>
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(4) }}>
                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "900" }} variant="h6">{name}</Typography>

            {upper_bound ?
            (
                                <Typography variant="body1">${lower_bound} - ${upper_bound}</Typography>               
            ) : (
                                        <Typography variant="body1">${lower_bound}+</Typography>
            )
            }  
                            </Grid>
                            <Grid item xs={7}>
                                <Typography variant="body1">{description}</Typography>
                            </Grid>
                        </Grid>
                    </Paper >
                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default Level