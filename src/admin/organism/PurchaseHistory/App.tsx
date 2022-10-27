import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import MenuBar from '../../molecule/MenuBar/App'
import Transaction from '../../molecule/Transaction/App';
import { Paper } from '@mui/material';
import LevelSponsors from '../../molecule/LevelSponsors/App';



interface Props {
    student_org_logo: string, 
    total_sponsored: number,
}

const PurchaseHistory = (props: Props) => {

    const { student_org_logo, total_sponsored } = props
    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '{}');
   
    return (

        <ThemeProvider theme={theme}>


            <MenuBar student_org_short_name="swe"/>

            <Grid container sx={{ backgroundColor:"#f3f3f3"}}>
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
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={student_org_logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

            
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        Purchase History
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="body1">
                        TOTAL SPONSORED
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(2),}}>
                    <Typography variant="h5" sx={{ color: '#4baa89', fontWeight: 600, }}>
                        ${total_sponsored}
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{textAlign: 'center', justifyContent:'center', ml: theme.spacing(15)}}>

                    <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(5)}}>
                        <Grid item xs={1}>
                            <LevelSponsors name="Diamond" color_level="efefef" />
                        </Grid>

                        <Grid item xs={1} sx={{ ml: theme.spacing(20)}}>
                            <LevelSponsors name="Platinum" color_level="ebeaea" />
                        </Grid>

                        <Grid item xs={1} sx={{ ml: theme.spacing(20) }}>
                            <LevelSponsors name="Gold" color_level="ffefbe" />
                        </Grid>

                        <Grid item xs={1} sx={{ ml: theme.spacing(20) }}>
                            <LevelSponsors name="Silver" color_level="b7b7b7" />
                        </Grid>

                        <Grid item xs={1} sx={{ ml: theme.spacing(20) }}>
                            <LevelSponsors name="Bronze" color_level="eb9770" />
                        </Grid>

                        <Grid item xs={1} sx={{ ml: theme.spacing(20) }}>
                            <LevelSponsors name="Maroon" color_level="ca7171" />
                        </Grid>

                        <Grid item xs={1} sx={{ ml: theme.spacing(20) }}>
                            <LevelSponsors name="Other" color_level="ffffff" />
                        </Grid>

                    </Grid>

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10) }}>
                    <Paper variant="outlined" sx={{ backgroundColor: 'transparent', borderWidth: theme.spacing(0), maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(10) }} >
                        <Grid container>
                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", textAlign:'left', mt: theme.spacing(5) }}>
                                    COMPANY NAME
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(16), mt: theme.spacing(5) }}>
                                    COMPANY REP
                                </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(23), mt: theme.spacing(5) }}>
                                    DATE
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5)}}>
                                    EVENT
                                </Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(12) }}>
                                    DATE
                                </Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(30) }}>
                                    PRICE
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

               
                
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>

                    <Transaction company_name="Capital One"
                        rep_name="Lauren Kotke"
                        rep_email='lauren.raleigh@capitalone.com'
                        event_name='General Donation'
                        short_description='Provide a General Donation'
                        purchase_date={new Date(2022,9,10)}
                        price={750}
                        date_start={new Date(2022, 10, 14)}
                        />
                    
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>

                    <Transaction company_name="Capital One"
                        rep_name="Lauren Kotke"
                        rep_email='lauren.raleigh@capitalone.com'
                        event_name='Leadership Conference'
                        short_description='Present at Conference'
                        purchase_date={new Date(2022,9,11)}
                        price={2500}
                        date_start={new Date(2022, 10, 14)}
                        date_end={new Date(2022, 10, 16)}
                        />
                    
                </Grid>


            </Grid>


            
        </ThemeProvider>


    )
}

export default PurchaseHistory