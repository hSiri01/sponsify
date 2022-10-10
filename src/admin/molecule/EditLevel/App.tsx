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
import internal from 'stream';


interface Props {
    level: string,
    hexcode: string,
    lowerbound: string, 
    upperbound?: string,
    description: string,
}

const EditLevel = (props: Props) => {

    const {level, lowerbound, upperbound, description, hexcode} = props
    const [openLevel, setOpenLevel] = React.useState(false);
    const handleOpenLevel = () => setOpenLevel(true);
    const handleCloseLevel = () => setOpenLevel(false);
    
    return (
        <ThemeProvider theme={theme}>
            <Grid container sx={{maxWidth:theme.spacing(275), backgroundColor: props.hexcode,  mr: theme.spacing(8), ml: theme.spacing(8), mt: theme.spacing(4), mb: theme.spacing(4), }}>
            
                    <Grid item  xs = {1} sx={{ display: 'flex', justifyContent: 'left', borderTop: 1, borderBottom: 1,borderLeft: 1 }}>
                       
                        <IconButton color="secondary" aria-label="Edit" sx={{ ml: theme.spacing(2) }}>
                            <DeleteIcon />
                        </IconButton>

                    </Grid>

                <Grid container  item xs={2} direction = "column" sx={{ borderTop: 1, borderBottom: 1, maxWidth:theme.spacing(200), }}>
                    
                    <Grid item sx={{ display: 'flex', justifyContent: 'center',  mt: theme.spacing(4)}}>
                        <Typography variant="h6">
                            {level}
                        </Typography>
                        
                    </Grid>     
                    
                    <Grid item sx={{display: 'flex', justifyContent:'center',  margin: (2)}}>
                       
                        <Typography >
                            {lowerbound} 
                        </Typography>
                        {props.upperbound && 
                        <Typography>
                            -
                        </Typography>
                        }
                        {!props.upperbound && 
                        <Typography>
                            +
                        </Typography>
                        }
                        
                        
                        <Typography >
                            {upperbound}
                        </Typography>
                    </Grid>
                    
                </Grid>  

                    <Grid item  xs ={8} sx={{ display: 'flex', justifyContent: 'left',  borderTop: 1, borderBottom: 1,}}>
                        <Typography variant="body1" sx={{textAlign:"left",  mt: theme.spacing(6)}} dangerouslySetInnerHTML={{ __html: description}} />
                    </Grid>

                <Grid item xs={1} sx={{ borderRight: 1, borderTop: 1, borderBottom: 1,  }}>
                    <Grid item sx={{ display: 'flex', justifyContent: 'right' }}>
                        <IconButton onClick={handleOpenLevel} color="secondary" aria-label="Edit" sx={{  mr: theme.spacing(8), ml: theme.spacing(8), mt: theme.spacing(8), mb: theme.spacing(4), }}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
            

            <Modal
                open={openLevel}
                onClose={handleCloseLevel}
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
                    
                    <Grid container direction = "column" sx={{ml: theme.spacing(2)}}>
                        <Grid item xs={1}>
                            <Typography variant="h5" sx={{
                                display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                            }} >
                                Edit Level
                            </Typography>
                        </Grid>

                        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'left', mt: theme.spacing(5)}}>
                            <TextField sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Level Name" defaultValue={level} variant="outlined" />
                        </Grid>
                        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'left', mt: theme.spacing(5)}}>
                            <TextField sx={{ minWidth: theme.spacing(15), mr: theme.spacing(5) }} id="outlined-basic" label="Lower bound cost of level" defaultValue={lowerbound} variant="outlined" />
                            <TextField sx={{ minWidth: theme.spacing(15), }} id="outlined-basic" label="Upper bound cost of level" variant="outlined" defaultValue={upperbound} />
                        </Grid>

                        <Grid item xs={3} sx={{
                            display: 'flex', justifyContent: 'left', mt: theme.spacing(5)
                        }}>
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Description of level benefits, details, etc."
                                minRows={3}
                                defaultValue={description}
                                style={{ minWidth: theme.spacing(150), fontFamily: "Poppins", fontSize: theme.spacing(4) }}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Hexcode of level" variant="outlined" defaultValue={hexcode} />
                        </Grid>
                        
                    </Grid>
                    <Grid container >
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left', mt: theme.spacing(20),  }}>
                                <IconButton color="secondary" aria-label="Edit" size = "large">
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>

                            <Grid item  xs={6} sx={{
                                display: 'flex', justifyContent: 'right',  mt: theme.spacing(20) }}>
                                <Button  href="/" variant="contained" size="large" color="primary" sx={{
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

export default EditLevel