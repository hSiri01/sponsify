import React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Question from '../../molecule/Question/App';
import Button from '@mui/material/Button';
import SWELogo from '../../../assets/images/graphics/SWE_logo.png';
import Levels from '../Levels/App'


interface Props {
    student_org_logo: string,
    student_org_name: string, 
}

const FAQ = (props: Props) => {

    const { student_org_logo, student_org_name } = props
    const [faq, setFAQ] = React.useState([{question: '', answer: ''}])
    const [buttonClick, setButtonClick] = React.useState(false)

    React.useEffect(() => {

        const fetchData = async() => {
            const data = await fetch("/get-all-FAQ/" + student_org_name)
                .then((res) => res.json())
                .then((data) => setFAQ(data))
        }

        fetchData()
    }, [])

    return (
        <ThemeProvider theme={theme}>

            {buttonClick ? (<Levels student_org_logo={SWELogo} student_org_name={student_org_name} />):(

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
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={student_org_logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        {student_org_name} FAQ
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <Typography variant="h6" sx={{ fontFamily: "Oxygen" }}>
                        Common questions we <b style={{ color: "#4baa89" }}>get asked</b>
                    </Typography>
                </Grid>

                

                {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(8) }}>

                    <Question question="I want to send company swag to distribute at the event I'm sponsoring. Where do I sent it?" 
                              answer="This address you can send you package at is: <br> Society of Women Engineers <br> TAMU <br> 3127 TAMU <br> College Station, TX 77843-3127"/>
                    
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(8) }}>
                    <Question question="How many people can I expect at the event I'm sponsoring?"
                        answer="Our General Meetings generally have higher attendance than most other events. Our Lunch & Learns and Dinner & Develops are smaller and more personable events. Additionally, this is because our members are busy with other events on campus, exams, homework and classes and so conflicts with our events are sometimes inevitable. For more information on current registration for your sponsored event, contact <b>CorporateVP@swetamu.org.</b> Please note, SWE-TAMU does not guarantee attendance for any event." />
                   
                </Grid> */}

                <>
                    {faq.map((one: any) =>   
                    <>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(8) }}>
                        <Question question= {one.question}
                            answer={one.answer}/>
                       
                        </Grid>
                    </>
                    )}
                </>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button 
                    // href="/levels-swe"
                        onClick={() => setButtonClick(true)}
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
            )}
        </ThemeProvider>


    )
}

export default FAQ