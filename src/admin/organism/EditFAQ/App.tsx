import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import EditQuestion from '../../molecule/EditQuestion/App'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuBar from '../../molecule/MenuBar/App'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { GetAllFaq } from '../../../utils/api-types';


interface Props {
}

const EditFAQ = (props: Props) => {

    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '{}');
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || '{}');
    const [openNewQuestion, setOpenNewQuestion] = React.useState(false);
    const [org, setOrg] = React.useState('')
    const [FAQ, setFAQ] = React.useState<GetAllFaq>([])
    const [question, setQuestion] = React.useState('')
    const [answer, setAnswer] = React.useState('')
    const handleOpenNewQuestion = () => setOpenNewQuestion(true);
    const handleCloseNewQuestion = () => setOpenNewQuestion(false);

    const [logo, setLogo] = React.useState("")
    React.useEffect(() => {
        const fetchLogo = async() => {
           try{
            //console.log("Org ", student_org_name)
             await fetch("/get-logo/" + student_org_name)
                .then((res) => res.json()) 
                .then((data1) => setLogo(data1.logoImage))
           }
           catch(e){
            console.log("Error found with logo ",(e))
           }
               
        }
        
        fetchLogo() 
    },[student_org_name])

    // const handleCloseNewQuestion = () => {
    //     setOpenNewQuestion(false);
    // }


    React.useEffect(() => {
        const fetchData = async() => {
            // const student_org_name = JSON.parse(localStorage.getItem('org') || '{}');
            await fetch("/get-all-FAQ/" + student_org_name)
                .then((res) => res.json()) 
                .then((data: GetAllFaq) => setFAQ(data))
                .then(() => setOrg(student_org_name))
            
        }
        fetchData()

    }, [student_org_name, FAQ])

    const handleQuestionChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value )
    }

    const handleAnswerChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value )
    }

    const handleCreateQuestion = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                organization: org, 
                question: question,
                answer: answer
            })
        }

        await fetch("/create-FAQ", requestOptions)
            .then((res) => console.log(res)) 

        handleCloseNewQuestion()
     
        console.log(FAQ)
    }

     

    return (
        <ThemeProvider theme={theme}>

            <MenuBar />

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
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', m: theme.spacing(6),}}>
                    <Button onClick={handleOpenNewQuestion} variant="contained" size="large" color="primary" sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}>Add Q&A</Button>

                </Grid>




                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        {student_org_short_name} FAQ
                    </Typography>
                </Grid>

                <>
                    {FAQ.map((questions: any) =>   
                    <>
                            <Grid key={questions._id} item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: theme.spacing(3) }}>

                                <EditQuestion 
                                        id={questions._id}
                                        student_org_name={student_org_name} 
                                        ques={questions.question}
                                        ans={questions.answer} />

                            </Grid>
                    </>
                    )}
                </>
                
                
                {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(8) }}>
                    <EditQuestion ques="I want to send company swag to distribute at the event I'm sponsoring. Where do I sent it?"
                    ans="This address you can send you package at is: <br> Society of Women Engineers <br> TAMU <br> 3127 TAMU <br> College Station, TX 77843-3127" student_org_name={''}/>
                    
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(8) }}>
                    <EditQuestion ques="How many people can I expect at the event I’m sponsoring?"
                    ans="Our General Meetings generally have higher attendance than most other events. Our Lunch & Learns and Dinner & Develops are smaller and more personable events. Additionally, this is because our members are busy with other events on campus, exams, homework and classes and so conflicts with our events are sometimes inevitable. For more information on current registration for your sponsored event, contact <b>CorporateVP@swetamu.org</b>. Please note, SWE-TAMU does not guarantee attendance for any event." student_org_name={''} />
                </Grid> */}

            </Grid>


            <Modal
                open={openNewQuestion}
                onClose={handleCloseNewQuestion}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: theme.spacing(200),
                    minWidth: theme.spacing(200),
                    maxHeight: theme.spacing(100),
                    minHeight: theme.spacing(100),
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    overflow: 'scroll',
                }}>
                    <Grid container>
                        <Grid item xs={1} sx={{ mt: theme.spacing(2) }}>
                                <IconButton color="secondary" aria-label="Edit" onClick={handleCloseNewQuestion} sx={{  }}>
                                    <CloseIcon />
                                </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{
                                display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                            }} >
                                Add Question
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                        }}>
                            <TextField sx={{ minWidth: theme.spacing(150), mt: theme.spacing(5) }} id="outlined-basic" label="Question" variant="outlined" 
                            defaultValue={''} onChange={handleQuestionChange()} />
                        </Grid>

                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                        }}>
                            <TextField
                                aria-label="empty textarea"
                                placeholder="Answer"
                                minRows={8}
                                style={{ minWidth: theme.spacing(150), fontFamily: "Poppins", fontSize: theme.spacing(4) }}
                                defaultValue={''} 
                                onChange={handleAnswerChange()} 
                            />
                        </Grid>

                        

                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'right', mt: theme.spacing(10)
                        }}>
                            <Button onClick={handleCreateQuestion} variant="contained" size="large" color="primary" sx={{
                                borderRadius: 0,
                                pt: theme.spacing(3),
                                pb: theme.spacing(3),
                                pl: theme.spacing(8),
                                pr: theme.spacing(8),
                                ml: theme.spacing(5),
                            }}>Add</Button>

                        </Grid>

                    </Grid>


                </Box>
            </Modal>

        </ThemeProvider>


    )
}


export default EditFAQ