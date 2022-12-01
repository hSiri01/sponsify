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
import MediaQuery from 'react-responsive'
import { useAuth0 } from "@auth0/auth0-react";


interface Props {
}

const EditFAQ = (props: Props) => {

    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '""');
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || '""');

    const [openNewQuestion, setOpenNewQuestion] = React.useState(false);
    const [org, setOrg] = React.useState('')
    const [FAQ, setFAQ] = React.useState<GetAllFaq>([])
    const [question, setQuestion] = React.useState('')
    const [answer, setAnswer] = React.useState('')
    
    const [questionError, setQuestionError] = React.useState(false)
    const [answerError, setAnswerError] = React.useState(false)
    
    const handleOpenNewQuestion = () => setOpenNewQuestion(true);
    const handleCloseNewQuestion = () => {
        setOpenNewQuestion(false);
        setQuestionError(false)
        setAnswerError(false)
    }

    

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

        if(question.length > 0 && answer.length > 0){
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
        } else {
            setQuestionError(!question)
            setAnswerError(!answer)
        }
     
        console.log(FAQ)
    }

     

    return (
        <ThemeProvider theme={theme}>

            {isAuthenticated && student_org_name !== "" && (
            <>
            <MenuBar />

            <div style={{
                backgroundColor: "#f3f3f3",
                minWidth: "100vw",
                minHeight: "100vh",
            }}>
                <Grid container >
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
                                <div>{'\u00D7'}</div>
                            </Typography>
                        </Grid>

                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {logo ? <img style={{ maxHeight: theme.spacing(30), height: 120, width: 240, objectFit: 'contain', marginTop: theme.spacing(10) }} 
                            src={logo} alt={"Org Logo"} /> : <Typography variant="h3">{student_org_short_name}</Typography>}
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
                                <div>{'\u00D7'}</div>
                            </Typography>
                        </Grid>

                        <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {logo ? <img style={{ maxHeight: theme.spacing(30), height: 120, width: 240, objectFit: 'contain', marginTop: theme.spacing(10) }} 
                            src={logo} alt={"Org Logo"} /> : <Typography variant="h3">{student_org_short_name}</Typography>}
                        </Grid>

                        <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                        </Grid>
                    </MediaQuery>

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




                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10), mb: theme.spacing(5)  }}>
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
                    [theme.breakpoints.down('md')]: {
                        maxWidth: theme.spacing(170),
                        minWidth: theme.spacing(170),
                    },
                    [theme.breakpoints.down('sm')]: {
                    maxWidth: theme.spacing(80),
                    minWidth: theme.spacing(80),
                    },
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
                            <TextField error={questionError} sx={{ 
                                minWidth: theme.spacing(150), 
                                mt: theme.spacing(5),
                                [theme.breakpoints.down('sm')]: {
                                    maxWidth: theme.spacing(70),
                                    minWidth: theme.spacing(70),
                                },
                            }} id="outlined-basic" label="Question" variant="outlined" 

                            defaultValue={''} onChange={handleQuestionChange()} />
                        </Grid>

                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                        }}>
                            <TextField
                                error = {answerError}
                                aria-label="empty textarea"
                                placeholder="Answer"
                                minRows={8}
                                multiline
                                sx={{ 
                                    minWidth: theme.spacing(150), 
                                    fontFamily: "Poppins", 
                                    fontSize: theme.spacing(4),
                                    [theme.breakpoints.down('sm')]: {
                                        maxWidth: theme.spacing(70),
                                        minWidth: theme.spacing(70),
                                    },
                                 }}
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
            
            {(!isLoading && !isAuthenticated) && (
            <Grid container sx={{ backgroundColor:"#fff"}}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop:theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                    <Typography variant="h5">
                        Login below to access Sponsify
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                    <Button onClick={() => loginWithRedirect()} variant="contained" size="large" color="primary" sx={{
                            borderRadius: 0,
                            pt: theme.spacing(3),
                            pb: theme.spacing(3),
                            pl: theme.spacing(8),
                            pr: theme.spacing(8),
                            ml: theme.spacing(5),
                        }}>Login</Button>
                </Grid>
            </Grid> 
            )}

            </div>
            </>
            )}

            {(!isLoading && !isAuthenticated) && (
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                        <Typography variant="h5">
                            Login below to access Sponsify
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                        <Button onClick={() => loginWithRedirect()} variant="contained" size="large" color="primary" sx={{
                            borderRadius: 0,
                            pt: theme.spacing(3),
                            pb: theme.spacing(3),
                            pl: theme.spacing(8),
                            pr: theme.spacing(8),
                            ml: theme.spacing(5),
                        }}>Login</Button>
                    </Grid>
                </Grid>
            )}

        </ThemeProvider>


    )
}


export default EditFAQ