import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import MenuBar from '../../molecule/MenuBar/App'
import { Paper } from '@mui/material';
import Request from '../../molecule/Request/App'



interface Props {
}

const AccountRequests = (props: Props) => {

    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '{}');
    const [logo, setLogo] = React.useState("")
    
    React.useEffect(() => {
        const fetchLogo = async() => {
           try{
             await fetch("/get-logo/" + student_org_name)
                .then((res) => res.json()) 
                .then((data1) => setLogo(data1.logoImage))
           }
           catch(e){
            console.log("Error fetching logo ",(e))
           }
               
        }
        
        fetchLogo() 

    },[])


    return (

        <ThemeProvider theme={theme}>
            <div style={{
                backgroundColor: "#f3f3f3",
                minWidth: "100vw",
                minHeight: "100vh",
            }}>


            <MenuBar />

            <Grid container>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(18) }}>
                    <Typography variant="h4" sx={{ fontFamily: "Oxygen" }}>
                        x
                    </Typography>
                </Grid>

                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>


                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        Account Requests
                    </Typography>
                </Grid>

                
                

                

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10) }}>
                    <Paper variant="outlined" sx={{ backgroundColor: 'transparent', borderWidth: theme.spacing(0), maxWidth: theme.spacing(350), minWidth: theme.spacing(340), minHeight: theme.spacing(10) }} >
                        <Grid container>
                            

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(40), mt: theme.spacing(5) }}>
                                    DATE
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", textAlign: 'left', mt: theme.spacing(5), ml: theme.spacing(15) }}>
                                    ORGANIZATION NAME
                                </Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="body2" sx={{ color: "#979797",  mt: theme.spacing(5),textAlign:'center', ml:theme.spacing(15) }}>
                                    PURPOSE OF USE
                                </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(5), textAlign:'center', mt: theme.spacing(5) }}>
                                    ACCESS
                                </Typography>
                            </Grid>

                            

                            
                        </Grid>
                    </Paper>
                </Grid>




                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Request 
                        org_name="TAMUHack"
                        org_email="president@tamuhack.com"
                        purpose='Use the system to track donations toward our student organization. We have been using a manual system so far and want to switch to an automated solution.'
                        date={new Date(2022, 11, 14)}
                        />  
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Request
                        org_name="MAES"
                        org_email="president@maes.com"
                        purpose='Use the system to track donations toward our student organization. We have been using a manual system so far and want to switch to an automated solution.'
                        date={new Date(2022, 11, 14)}
                    />
                </Grid>

               
                


            </Grid>
            </div>


        </ThemeProvider>


    )
}

export default AccountRequests