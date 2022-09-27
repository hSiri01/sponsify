import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import Support from '../../../assets/images/graphics/support.svg';
import { theme, darkGreen } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



interface Props {
}

const SponsorHome = (props: Props) => {

    return (
        <ThemeProvider theme={theme}>

            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop:theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                    <Typography variant="h4">
                        Welcome to Sponsify
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(6) }}>
                        <Typography variant="h6" sx={{ fontFamily: "Oxygen"}}>
                            Insert your Sponsor code to <b style={{ color: "#4baa89"}}>get started</b>
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <TextField id="outlined-basic" label="Sponsor Code" variant="filled" sx={{width:theme.spacing(70)}} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <Button href="/how-it-works"variant="contained" size="large" color="secondary" >Get Started</Button>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <img style={{ maxHeight: theme.spacing(60), marginTop: theme.spacing(10) }} src={Support} alt="Giving money" />
                </Grid>

            </Grid>
            
        </ThemeProvider>    


    )
}

export default SponsorHome