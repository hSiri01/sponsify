import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import ThankYou from '../../../assets/images/graphics/thank_you.svg';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import React from 'react';
import MediaQuery from 'react-responsive'


interface Props {
}

const Inbox = (props: Props) => {

    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '""');
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || '""');

    const [logo, setLogo] = React.useState("") 
    React.useEffect(() => {
        const fetchLogo = async() => {
           try{
            //console.log(student_org_name)
             await fetch("/get-logo/" + student_org_name)
                .then((res) => res.json()) 
                .then((data1) => setLogo(data1.logoImage))
           }
           catch(e){
            console.log("Error fetching logo ",(e))
           }
               
        }
        
        fetchLogo() 
   

      },[student_org_name])
    return (
        <ThemeProvider theme={theme}>

            <Grid container>
                <MediaQuery minWidth={1200}>
                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', }}>
                    </Grid>

                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{
                            maxHeight: theme.spacing(30),
                            marginTop: theme.spacing(10),
                        }}
                            src={Logo} alt="Sponsify logo" />
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(18) }}>
                        <Typography variant="h4" sx={{ fontFamily: "Oxygen" }}>
                            <div>{'\u00D7'}</div>
                        </Typography>
                    </Grid>

                    <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {logo ? <img style={{ maxHeight: theme.spacing(30), height: 120, width: 240, objectFit: 'contain', marginTop: theme.spacing(10) }} 
                        src={logo} alt={"Org Logo"} /> : <Typography variant="h3">{student_org_short_name}</Typography>}
                    </Grid>

                    <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                    </Grid>
                </MediaQuery>

                <MediaQuery minWidth={500} maxWidth={1199}>
                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{
                            maxHeight: theme.spacing(20),
                            marginTop: theme.spacing(10),
                        }}
                            src={Logo} alt="Sponsify logo" />
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(18) }}>
                        <Typography variant="h4" sx={{ fontFamily: "Oxygen" }}>
                            x
                        </Typography>
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ maxHeight: theme.spacing(20), marginTop: theme.spacing(10) }} src={logo} alt="Sponsify logo" />
                    </Grid>

                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    </Grid>
                </MediaQuery>

                <MediaQuery maxWidth={499}>
                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', ml: "8%" }}>
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{
                            maxHeight: theme.spacing(15),
                            marginTop: theme.spacing(10),
                        }}
                            src={Logo} alt="Sponsify logo" />
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(18) }}>
                        <Typography variant="h4" sx={{ fontFamily: "Oxygen" }}>
                            x
                        </Typography>
                    </Grid>

                    <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ maxHeight: theme.spacing(15), marginTop: theme.spacing(10) }} src={logo} alt="Sponsify logo" />
                    </Grid>

                    <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                    </Grid>
                </MediaQuery>
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                    <Typography variant="h4">
                        Please Check your Inbox
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(6) }}>
                        <Typography variant="h6" sx={{ fontFamily: "Oxygen"}}>
                            Confirmation and payment options have<b style={{ color: "#4baa89"}}> been emailed</b>
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
                    <Button href="/" 
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