import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import Question from '../../../assets/images/graphics/question.svg';
import { theme, darkGreen } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import FAQPage from '../FAQ/App';

interface Props {
    organization: string
}

const HowItWorks = (props: Props) => {
    
    const { organization }  = props
    const [buttonClick, setButtonClick] = React.useState(false)

    // console.log(organization)

    return (
        <ThemeProvider theme={theme}>

            { buttonClick ? <FAQPage student_org_logo='' student_org_name={organization} /> : 

            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop:theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                    <Typography variant="h4">
                        How It Works
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(6) }}>
                        <Typography variant="h6" sx={{ fontFamily: "Oxygen"}}>
                            Follow the steps to<b style={{ color: "#4baa89"}}> understand the process</b>
                    </Typography>
                </Grid>

                <Grid item xs={1} sx={{margin: theme.spacing(6) }}>
                </Grid>

                
                <Grid item xs={5} sx={{margin: theme.spacing(6) }}>
                    <ol>
                        <li style={{paddingLeft:theme.spacing(5)}}>Select an <b style={{ color: "#4baa89" }}> event</b></li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}>Click the <b style={{ color: "#4baa89" }}>drop down button</b> to get more information</li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}>Have questions? Hover over the <b style={{ color: "#4baa89" }}> info button</b> to get this information at anytime.</li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4)  }}><b style={{ color: "#4baa89" }}>Add the events </b> that interest you.</li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}>Click <b style={{ color: "#4baa89" }}>checkout</b></li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}>Fill out some <b style={{ color: "#4baa89" }}>basic information</b> and <b style={{ color: "#4baa89" }}>submit your request</b>.</li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}><b style={{ color: "#4baa89" }}>Check your inbox </b> for an invoice and next steps.</li>
                        
                    </ol>
                </Grid>

                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <img style={{ maxHeight: theme.spacing(60), marginTop: theme.spacing(10) }} src={Question} alt="Giving money" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button 
                    href="/faq-swe" 
                            variant="contained" 
                            size="large" 
                            color="secondary" 
                            onClick={() => setButtonClick(!buttonClick)}
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
            }
        </ThemeProvider>    


    )
}

export default HowItWorks