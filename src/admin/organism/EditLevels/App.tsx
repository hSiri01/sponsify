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
import { Buffer } from 'buffer';
window.Buffer = Buffer;

interface Props {
    student_org_logo: string,
    student_org_short_name: string, 
    student_org_name: string
  
}

const EditLevels = (props: Props) => {
    
    const { student_org_logo, student_org_short_name, student_org_name } = props
    const [openNewLevel, setOpenNewLevel] = React.useState(false);
    const [levels, setLevels] = React.useState([{}])
    const [org, setOrg] = React.useState('')
    const [levelName, setLevelName] = React.useState('')
    const [minAmount, setMinAmount] = React.useState('')
    const [maxAmount, setMaxAmount] = React.useState('')
    const [des, setDes] = React.useState('')
    const [color, setColor] = React.useState('')
    const [logo, setLogo] = React.useState('')

    const resetInputs = () => {
        setLevelName('')
        setMinAmount('')
        setMaxAmount('')
        setDes('')
        setColor('')
    }

    const handleOpenNewLevel = () => setOpenNewLevel(true);

    const handleCloseNewLevel = () => {
        resetInputs()
        setOpenNewLevel(false);
    }

    React.useEffect(() => {
        const fetchData = async() => {
            // const student_org_name = JSON.parse(localStorage.getItem('org') || '{}');
            const data = await fetch("/get-all-levels/" + student_org_name)
                .then((res) => res.json()) 
                .then((data) => setLevels(data))
                .then(() => setOrg(student_org_name))
        }
        fetchData()

    }, [levels])

    React.useEffect(() => {
        
        const fetchLogo = async() => {fetch("/get-logo/" + student_org_name)
        .then((res) => res.json()) 
        .then((data) => {
          
            console.log("this is the data" + data)
            setLogo(`data:${data.contentType};base64, ${Buffer.from(data.data).toString('base64')}`);
        })
        .then(() => setOrg(student_org_name))
        }
        
        fetchLogo() 
        
      },[])

    const handleNameChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLevelName(event.target.value )
    }

    const handleMinChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinAmount(event.target.value )
    }

    const handleMaxChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxAmount(event.target.value )
    }

    const handleColorChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value )
    }

    const handleDesChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setDes(event.target.value )
    }

    const handleCreateLevel = async () => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                minAmount: minAmount,
                maxAmount: maxAmount,
                name: levelName,
                color: color,
                description: des,
                organization: org
            })
        }

        await fetch("/create-level", requestOptions)
            .then((res) => console.log(res)) 

        handleCloseNewLevel()
     
    }

    return (
        <ThemeProvider theme={theme}>
            
            <MenuBar student_org_short_name={'swe'}/>

            <Grid container sx={{ backgroundColor:"#f3f3f3", height: '100vh'}}>
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
                   { logo && <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={logo} alt="Organization Logo" />}
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', maxHeight: theme.spacing(13), mr: theme.spacing(10)}}>
                    <Button onClick={handleOpenNewLevel} variant="contained" size="large" color="primary" sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}>Add Level</Button>

                </Grid>

                <>
                    {levels.map((level: any) =>   
                    <>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', }}>

                                <EditLevel id={level._id}
                                        student_org_name={org} 
                                        level={level.name}
                                        description={level.description}                              
                                        lowerbound = {level.minAmount}
                                        upperbound = {level.maxAmount}
                                        
                                        hexcode = {level.color}/>

                            </Grid>
                    </>
                    )}
                </>

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
                            <TextField sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Level Name" 
                            value={levelName} onChange={handleNameChange()} variant="outlined" />
                        </Grid>
                        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'left', mt: theme.spacing(5)}}>
                            <TextField sx={{ minWidth: theme.spacing(15), mr: theme.spacing(5) }} id="outlined-basic" label="Lower bound cost of level" 
                            value={minAmount} onChange={handleMinChange()} variant="outlined" />
                            <TextField sx={{ minWidth: theme.spacing(15), }} id="outlined-basic" label="Upper bound cost of level" 
                            value={maxAmount} onChange={handleMaxChange()} variant="outlined" />
                        </Grid>

                        <Grid item xs={3} sx={{
                            display: 'flex', justifyContent: 'left', mt: theme.spacing(5)
                        }}>
                            <TextField
                                aria-label="empty textarea"
                                // label="Description"
                                label="Description of level benefits, details, etc."
                                minRows={3}
                                multiline={true}
                                value={des} onChange={handleDesChange()}
                                style={{ minWidth: theme.spacing(150), fontFamily: "Poppins", fontSize: theme.spacing(4) }}
                            />
                        </Grid>
                        <Grid item xs={2 }>
                        <TextField sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Hexcode of level" 
                        value={color} onChange={handleColorChange()} variant="outlined" />

                        </Grid>

                        <Grid item xs={12} sx={{
                            display: 'flex', justifyContent: 'right', mt: theme.spacing(10)
                        }}>
                            <Button 
                            // href="/"  
                            onClick={handleCreateLevel}
                            variant="contained" size="large" color="primary" sx={{
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