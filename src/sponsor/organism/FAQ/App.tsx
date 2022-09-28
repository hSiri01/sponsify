import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Question from '../../molecule/Question/App';
import Button from '@mui/material/Button';


interface Props {
}

const FAQ = (props: Props) => {

    return (
        <ThemeProvider theme={theme}>

            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        SWE FAQ
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <Typography variant="h6" sx={{ fontFamily: "Oxygen" }}>
                        Common questions we <b style={{ color: "#4baa89" }}>get asked</b>
                    </Typography>
                </Grid>

                

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(8) }}>

                    <Question question="I want to send company swag to distribute at the event I’m sponsoring. Where do I sent it?" 
                              answer="This address you can send you package at is: <br> Society of Women Engineers <br> TAMU <br> 3127 TAMU <br> College Station, TX 77843-3127"/>
                    
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(8) }}>
                    <Question question={`How many people can I expect at the event I'm sponsoring?`}
                        answer="Our General Meetings generally have higher attendance than most other events. Our Lunch & Learns and Dinner & Develops are smaller and more personable events. Additionally, this is because our members are busy with other events on campus, exams, homework and classes and so conflicts with our events are sometimes inevitable. For more information on current registration for your sponsored event, contact <b>CorporateVP@swetamu.org.</b> Please note, SWE-TAMU does not guarantee attendance for any event." />
                   
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button href="/levels-swe"
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
                        }}>Next</Button>
                </Grid>


            </Grid>

        </ThemeProvider>


    )
}

export default FAQ