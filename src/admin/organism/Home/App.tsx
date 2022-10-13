import { Grid, Link } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import Support from '../../../assets/images/graphics/support.svg';
import Admin from '../../../assets/images/graphics/admin_login.svg';
import { theme, darkGreen } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Auth0Provider } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";


interface Props {
}

    
  
 
const AdminLogin = (props: Props) => {
    const { loginWithRedirect } = useAuth0();
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
                            Login below to <b style={{ color: "#4baa89"}}>gain access</b>
                    </Typography>
                </Grid>

                

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <Button onClick={() => loginWithRedirect()} variant="contained" size="large" color="secondary" >Login</Button>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <img style={{ maxHeight: theme.spacing(80), marginTop: theme.spacing(10) }} src={Admin} alt="Setting up webpage" />
                </Grid>
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <Link href="/" color = "inherit">Sponsor? </Link>
                </Grid>

            </Grid>
            
        </ThemeProvider>    


    )
}

export default AdminLogin