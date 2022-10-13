import { Grid } from '@mui/material';
import { theme, darkGreen } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';




interface Props {
    name: string,  
    color_level: string, 
}

const LevelSponsors = (props: Props) => {

    const {name, color_level} = props

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ justifyContent: 'center',  }}>
                    <Typography variant="h6">{name} Sponsor</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper variant="outlined" sx={{ borderRadius: 0, borderWidth:1, borderColor:'black', background: `#${color_level}`, maxWidth: theme.spacing(45), minWidth: theme.spacing(45), minHeight: theme.spacing(20) }} elevation={0}>
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4) }}>
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left', pl: theme.spacing(3)}}>
                                <Typography variant="body2">Caterpillar</Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right', pr: theme.spacing(3) }}>
                                <Typography variant="body2">$5500</Typography>
                            </Grid>
                        </Grid>
                    </Paper >
                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default LevelSponsors