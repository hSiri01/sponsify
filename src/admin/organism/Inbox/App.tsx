import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import ThankYou from '../../../assets/images/graphics/thank_you.svg';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import React from 'react';

interface Props {
}

const Inbox = (props: Props) => {

    return (
        <ThemeProvider theme={theme}>

            <Grid container>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>

                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                    <Typography variant="h4">
                        Please Check your Inbox
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(6) }}>
                        <Typography variant="h6" sx={{ fontFamily: "Oxygen"}}>
                            Confirmation of request has <b style={{ color: "#4baa89"}}> been emailed</b>
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(0) }}>
                        <Typography variant="h6" sx={{ fontFamily: "Oxygen"}}>
                            If it's not in your inbox, try checking your spam
                    </Typography>
                </Grid>

               
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <img style={{ maxHeight: theme.spacing(60), marginTop: theme.spacing(15) }} src={ThankYou} alt="Giving money" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button href="/admin-login" 
                            variant="contained" 
                            size="large" 
                            color="secondary" 
                        sx={{
                            color: 'white',
                            backgroundColor: '#434343',
                            borderRadius: 0,
                            fontFamily: 'Oxygen',
                            pt: theme.spacing(3),
                            pb: theme.spacing(3),
                            pl: theme.spacing(8),
                            pr: theme.spacing(8),
                            "&:hover": {
                                color: 'white',
                                backgroundColor: '#367c63',
                            }
                            }}>Return Home</Button>
                </Grid>

            </Grid>
            
        </ThemeProvider>    


    )
}

export default Inbox