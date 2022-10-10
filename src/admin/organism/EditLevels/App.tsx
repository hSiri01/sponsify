import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import EditLevel from '../../molecule/EditLevel/App'
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuBar from '../../molecule/MenuBar/App'
import Level from '../../../sponsor/molecule/Level/App';


interface Props {
    student_org_logo: string,
    student_org_name: string, 
  
}

const EditLevels = (props: Props) => {
    
    const { student_org_logo, student_org_name } = props
    const [openNewLevel, setOpenNewLevel] = React.useState(false);
    const handleOpenNewLevel = () => setOpenNewLevel(true);
    const handleCloseNewLevel = () => setOpenNewLevel(false);


    return (
        <ThemeProvider theme={theme}>

            <MenuBar/>

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

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', m: theme.spacing(6),}}>
                    <Button onClick={handleOpenNewLevel} variant="contained" size="large" color="primary" sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}>Add Level</Button>

                </Grid>

                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mr: theme.spacing(8), ml: theme.spacing(8), mt: theme.spacing(4), mb: theme.spacing(4), }}>

                    <EditLevel level="Diamond" 
                              description="Be recognized and appreciated at our annual banquet along with everything included below"                              
                              lowerbound = "$5000"
                              
                              hexcode = "#ca7171"/>
                    
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mr: theme.spacing(8), ml: theme.spacing(8), mt: theme.spacing(4), mb: theme.spacing(4)  }}>

                <EditLevel level="Platinum" 
                              description="Have the opportunity to be a title company at our first general meeting along with everything included below"
                              lowerbound = "$5000"
                              hexcode = "#ebeaea"/>
               

                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mr: theme.spacing(8), ml: theme.spacing(8), mt: theme.spacing(4), mb: theme.spacing(4)  }}>
                 <EditLevel level="Gold" 
                              description="Have the opportunity to present at some of our most widely attended events along with everything included below
                              "
                              lowerbound = "$2500"
                              upperbound = "$3499"
                              hexcode = "#fff2c8"/>
                </Grid>
            </Grid>


            <Modal
                open={openNewLevel}
                onClose={handleCloseNewLevel}
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
                                Add Level
                            </Typography>
                        </Grid>

                        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'left', mt: theme.spacing(5)}}>
                            <TextField sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Level Name" variant="outlined" />
                        </Grid>
                        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'left', mt: theme.spacing(5)}}>
                            <TextField sx={{ minWidth: theme.spacing(15), mr: theme.spacing(5) }} id="outlined-basic" label="Lower bound cost of level" variant="outlined" />
                            <TextField sx={{ minWidth: theme.spacing(15), }} id="outlined-basic" label="Upper bound cost of level" variant="outlined" />
                        </Grid>

                        <Grid item xs={3} sx={{
                            display: 'flex', justifyContent: 'left', mt: theme.spacing(5)
                        }}>
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder="Description of level benefits, details, etc."
                                minRows={3}
                                style={{ minWidth: theme.spacing(150), fontFamily: "Poppins", fontSize: theme.spacing(4) }}
                            />
                        </Grid>
                        <Grid item xs={2 }>
                        <TextField sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Hexcode of level" variant="outlined" />

                        </Grid>

                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'right', mt: theme.spacing(10)
                        }}>
                            <Button href="/"  variant="contained" size="large" color="primary" sx={{
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

export default EditLevels