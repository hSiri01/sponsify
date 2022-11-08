import React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import Bug from '../../../assets/images/graphics/bug.svg';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';

interface Props {
    
}

const CheckBackLater = (props: Props) => {
    
    // console.log(organization)

    return (
        <ThemeProvider theme={theme}>

           
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop:theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                    <Typography variant="h4">
                        Somethings Seems to have Gone Wrong...
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(6) }}>
                        <Typography variant="h6" sx={{ fontFamily: "Oxygen"}}>
                            Check back later...<b style={{ color: "#4baa89"}}> we are looking into it</b>
                    </Typography>
                </Grid>

               

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <img style={{ maxHeight: theme.spacing(60), marginTop: theme.spacing(4) }} src={Bug} alt="Bug" />
                </Grid>

                

            </Grid>
            
        </ThemeProvider>    


    )
}

export default CheckBackLater