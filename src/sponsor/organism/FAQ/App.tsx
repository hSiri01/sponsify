import React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Question from '../../molecule/Question/App';
import Button from '@mui/material/Button';
import { GetAllFaq } from '../../../utils/api-types';

interface Props {
}

const FAQ = (props: Props) => {

    const [faq, setFAQ] = React.useState<GetAllFaq>([{question: '', answer: ''}])
    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '""');
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || '""');
    const [logo, setLogo] = React.useState("")

    React.useEffect(() => {

        const fetchData = async() => {
            await fetch("/get-all-FAQ/" + student_org_name)
                .then((res) => res.json())
                .then((data: GetAllFaq) => setFAQ(data))
        }

        fetchData()
    }, [student_org_name])

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

      },[student_org_name])

    return (
        <ThemeProvider theme={theme}>

            <Grid container>
                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
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

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        {student_org_short_name} FAQ
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <Typography variant="h6" sx={{ fontFamily: "Oxygen" }}>
                        Common questions we <b style={{ color: "#4baa89" }}>get asked</b>
                    </Typography>
                </Grid>

                <>
                    {faq.map((one) =>
                        <React.Fragment key={one.question}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(8) }}>
                            <Question question= {one.question}
                                answer={one.answer}/>
                        
                            </Grid>
                        </React.Fragment>
                    )}
                </>


            </Grid>
            <Grid container >
                <Grid item  sx={{   margin: theme.spacing(6) }}>
                    <Button 
                            href="/how-it-works" 
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
                            }}>Back</Button>
                </Grid>
                <Grid item xs sx={{  margin: theme.spacing(6) }}>
                    <Grid container direction="row-reverse">
                        <Grid>
                            <Button 
                            href="/levels" 
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
                   
                </Grid>
                
            </Grid>

        </ThemeProvider>


    )
}

export default FAQ