import * as React from 'react';
import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';


interface Props {
    id: string,
    student_org_name: string,
    ques: string,
    ans: string,
}

const EditQuestion = (props: Props) => {

    const {id, student_org_name, ques, ans} = props

    const [openQuestion, setOpenQuestion] = React.useState(false);
    const [question, setQuestion] = React.useState(props.ques)
    const [answer, setAnswer] = React.useState(props.ans)

    const [questionError, setQuestionError] = React.useState(false)
    const [answerError, setAnswerError] = React.useState(false)


    const handleQuestionChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(event.target.value )
    }

    const handleAnswerChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(event.target.value )
    }
    // const handleOpenQuestion = () => setOpenQuestion(true);
    const handleOpenQuestion = () => {
        setQuestion(ques)
        setAnswer(ans)
        setOpenQuestion(true)
    };
    const handleCloseQuestion = () => {
        setOpenQuestion(false);
        setQuestionError(false)
        setAnswerError(false)
    }
    
    const [openConfirmation, setOpenConfirmation] = React.useState(false)
    const handleOpenConfirmation = () => setOpenConfirmation(true)
    const handleCloseConfirmation = () => setOpenConfirmation(false)

    const handleUpdateQuestion = async () => {
        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ 
        //         FAQId: id,
        //         question: question,
        //         answer: answer
        //     })
        // }
        if(question.length > 0 && answer.length > 0){
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    FAQId: id,
                    question: question,
                    answer: answer
                })
            }
            await fetch("/update-FAQ", requestOptions)
                .then((res) => console.log(res)) 
    
                handleCloseQuestion()
        } 
        else {
                handleCloseQuestion()
                setQuestionError(!question)
                setAnswerError(!answer)
        }

    }
    const handleDeleteQuestion = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                FAQId: id,
                organization: student_org_name
            })
        }

        await fetch("/delete-FAQ", requestOptions)
            .then((res) => console.log(res)) 

        handleCloseQuestion()
        handleCloseConfirmation()
    }

    return (
        <ThemeProvider theme={theme}>

            <Grid container sx={{
                backgroundColor:"white", 
                border:1, 
                maxWidth:theme.spacing(300),
                [theme.breakpoints.down('md')]: {
                    maxWidth: theme.spacing(150),
                    minWidth: theme.spacing(150),
                    ml: '8%',
                },
                [theme.breakpoints.down('sm')]: {
                    maxWidth: theme.spacing(80),
                    minWidth: theme.spacing(80),
                    ml: '15%',
                },
                }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                    <IconButton onClick={handleOpenQuestion} color="secondary" aria-label="Edit" sx={{ mr: theme.spacing(4), mt:theme.spacing(5) }}>
                        <EditIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={2}>
                </Grid>

                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h5" sx={{textAlign:'center', fontWeight: 500}}>
                        {question}
                    </Typography>
                </Grid>

                <Grid item xs={2}>
                </Grid>

                <Grid item xs={2}>
                </Grid>

                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4)}}>
                    <Typography variant="body1" dangerouslySetInnerHTML={{ __html: answer}} />
                </Grid>

                <Grid item xs={2}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left' }}>
                    <IconButton onClick={handleOpenConfirmation} color="secondary" aria-label="Edit" sx={{ ml: theme.spacing(2), mb: theme.spacing(2) }}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>

            </Grid>

            <Modal
                open={openQuestion}
                onClose={handleCloseQuestion}
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
                    <Grid item xs={12} sx={{ mt: theme.spacing(2) }}>
                                <IconButton color="secondary" aria-label="Edit" onClick={handleCloseQuestion} sx={{  }}>
                                    <CloseIcon />
                                </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{
                                display: 'flex', justifyContent: 'center', mt: theme.spacing(5)}} >
                                Edit Question
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                        }}>
                            <TextField error={questionError} sx={{ minWidth: theme.spacing(150), mt: theme.spacing(5) }} id="outlined-basic" label="Question" variant="outlined" value={question} onChange={handleQuestionChange()}/>
                        </Grid>
                        
                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                        }}>
                            <TextField
                                error={answerError}
                                aria-label="empty textarea"
                                placeholder="Empty"
                                minRows={8}
                                style={{ minWidth: theme.spacing(150), fontFamily: "Poppins", fontSize: theme.spacing(4)}}
                                value={answer} 
                                onChange={handleAnswerChange()}
                            />
                        </Grid>

                        <Grid item xs={6} sx={{
                            display: 'flex', justifyContent: 'left', mt: theme.spacing(10)
                        }}>
                            <IconButton onClick={handleOpenConfirmation} color="secondary" aria-label="Edit" sx={{ ml: theme.spacing(2), mb: theme.spacing(2) }}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={6} sx={{
                            display: 'flex', justifyContent: 'right', mt: theme.spacing(10)
                        }}>
                            <Button onClick={handleUpdateQuestion} variant="contained" size="large" color="primary" sx={{
                                borderRadius: 0,
                                pt: theme.spacing(3),
                                pb: theme.spacing(3),
                                pl: theme.spacing(8),
                                pr: theme.spacing(8),
                                ml: theme.spacing(5),
                            }}>Submit</Button>
                            
                        </Grid>

                    </Grid>
                    
                    
                    </Box>
                </Modal>

                <Modal
                    open={openConfirmation}
                    onClose={handleCloseConfirmation}
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
                        minWidth: theme.spacing(150),
                        maxHeight: theme.spacing(100),
                        minHeight: theme.spacing(55),
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4
                    }}>
                    
                        <Grid container direction = "column">
                            <Grid item xs={1} >
                                    <IconButton color="secondary" aria-label="Edit" onClick={handleCloseConfirmation}>
                                        <CloseIcon />
                                    </IconButton>
                            </Grid>

                            <Grid>
                                <Typography variant="h6" sx={{
                                    display: 'flex', justifyContent: 'center', mt: theme.spacing(3)
                                }} > 
                                Are you sure you want to delete this question?
                                </Typography>
                                
                            </Grid>

                            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10) }}>
                                    <Button  
                                        onClick={handleCloseConfirmation} 
                                        variant="outlined" size="large" color="primary" sx={{
                                        borderRadius: 0,
                                        pt: theme.spacing(3),
                                        pb: theme.spacing(3),
                                        pl: theme.spacing(8),
                                        pr: theme.spacing(8),
                                        ml: theme.spacing(5),

                                    }}>No</Button>
                                <Button  
                                        onClick={handleDeleteQuestion} 
                                        variant="contained" size="large" color="primary" sx={{
                                        borderRadius: 0,
                                        pt: theme.spacing(3),
                                        pb: theme.spacing(3),
                                        pl: theme.spacing(8),
                                        pr: theme.spacing(8),
                                        ml: theme.spacing(5),

                                    }}>Yes</Button>
                            </Grid>
                            
                        </Grid>
                    
                    </Box>
                </Modal>


        </ThemeProvider>


    )
}

export default EditQuestion