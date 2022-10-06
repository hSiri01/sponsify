import * as React from 'react';
import { Grid } from '@mui/material';
import { theme, darkGreen } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';


interface Props {
    question: string,
    answer: string,
}

const EditQuestion = (props: Props) => {

    const {question, answer} = props

    const [openQuestion, setOpenQuestion] = React.useState(false);
    const handleOpenQuestion = () => setOpenQuestion(true);
    const handleCloseQuestion = () => setOpenQuestion(false);

    return (
        <ThemeProvider theme={theme}>

           
            <Grid container sx={{backgroundColor:"white", border:1, maxWidth:theme.spacing(300)}}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right' }}>
                    <IconButton onClick={handleOpenQuestion} color="secondary" aria-label="Edit" sx={{ mr: theme.spacing(4), mt:theme.spacing(5) }}>
                        <EditIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6">
                        {question}
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4), mr: theme.spacing(35), ml: theme.spacing(35)}}>
                    <Typography variant="body1" sx={{textAlign:"center"}} dangerouslySetInnerHTML={{ __html: answer}} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left' }}>
                    <IconButton color="secondary" aria-label="Edit" sx={{ ml: theme.spacing(2), mb: theme.spacing(2) }}>
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
                        <Grid item xs={12}>
                            <Typography variant="h5" sx={{
                                display: 'flex', justifyContent: 'center', mt: theme.spacing(5)}} >
                                Edit Question
                            </Typography>
                        </Grid>

                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                        }}>
                            <TextField sx={{ minWidth: theme.spacing(150), mt: theme.spacing(5) }} id="outlined-basic" label="Question" variant="outlined" defaultValue={question} />
                        </Grid>
                        
                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                        }}>
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Empty"
                                defaultValue={answer} 
                                minRows={8}
                                style={{ minWidth: theme.spacing(150), fontFamily: "Poppins", fontSize: theme.spacing(4)}}
                            />
                        </Grid>

                        <Grid item xs={6} sx={{
                            display: 'flex', justifyContent: 'left', mt: theme.spacing(10)
                        }}>
                            <IconButton color="secondary" aria-label="Edit" sx={{ ml: theme.spacing(2), mb: theme.spacing(2) }}>
                                <DeleteIcon />
                            </IconButton>
                        </Grid>

                        <Grid item xs={6} sx={{
                            display: 'flex', justifyContent: 'right', mt: theme.spacing(10)
                        }}>
                            <Button href="/" variant="contained" size="large" color="primary" sx={{
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


        </ThemeProvider>


    )
}

export default EditQuestion