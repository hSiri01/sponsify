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
import MenuBar from '../../molecule/MenuBar/App'
import InputAdornment from '@mui/material/InputAdornment';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { GetAllLevels } from '../../../utils/api-types';
import { useAuth0 } from "@auth0/auth0-react";

interface Props {  
}

const EditLevels = (props: Props) => {
    
    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '""')
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || '""')
    const [openNewLevel, setOpenNewLevel] = React.useState(false);
    const [levels, setLevels] = React.useState<GetAllLevels>([])
    const [levelName, setLevelName] = React.useState('')
    const [minAmount, setMinAmount] = React.useState('')
    const [maxAmount, setMaxAmount] = React.useState('')
    const [des, setDes] = React.useState('')
    
    const [logo, setLogo] = React.useState("")
    const [color, setColor] = React.useState('#909090')

<<<<<<< HEAD
    const [descriptionError, setDescriptionError] = React.useState(false)
    const [levelNameError, setLevelNameError] = React.useState(false)
    const [minAmountError, setMinAmountError] = React.useState(false)
    const [colorError,setColorError] = React.useState(false)
    const [maxAmountError, setMaxAmountError] = React.useState(false)

    const handleOpenNewLevel = () => setOpenNewLevel(true);

    const handleCloseNewLevel = () => {
        setOpenNewLevel(false);
        setLevelNameError(false)
        setDescriptionError(false)
        setMinAmountError( false )
        setMaxAmountError(false)
        setColorError(false)
    }
=======
    const handleOpenNewLevel = () => setOpenNewLevel(true)

    const handleCloseNewLevel = () => setOpenNewLevel(false)
>>>>>>> f43ed1388108f9ba82c407808848991827a8e8a3


    React.useEffect(() => {
        const fetchData = async() => {
            await fetch("/get-all-levels/" + student_org_name)
                .then((res) => res.json()) 
                .then((data: GetAllLevels) => {
                    data.sort((a, b) => (a.minAmount < b.minAmount) ? 1 : -1)
                    setLevels(data)
                })

        }
        fetchData()
        
    }, [student_org_name, levels])
   
    React.useEffect(() => {
        const fetchLogo = async() => {
           try{
            //console.log(student_org_name)
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
        if ((maxAmount ? (Number.isFinite(Number(maxAmount)) && (Number(maxAmount) > 0 ? true : false) && (Number(maxAmount) > Number(minAmount))): true) && Number.isFinite(Number(minAmount)) && levelName.length > 0 && des.length > 0 && Number(minAmount) >= 0 && color ) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    minAmount: minAmount,
                    maxAmount: maxAmount,
                    name: levelName,
                    color: color,
                    description: des,
                    organization: student_org_name
                })
            }
    
            await fetch("/create-level", requestOptions)
                .then((res) => console.log(res)) 
    
            handleCloseNewLevel()
        }
        else{
            setLevelNameError(!levelName)
            setDescriptionError(!des)                
            setMinAmountError((Number.isFinite(Number(minAmount)) ? (Number(minAmount) >= 0 ? false : true) : true ) )
            setMaxAmountError(maxAmount ?  (( Number.isFinite(Number(maxAmount)) && (Number(maxAmount) > 0) && (Number(maxAmount) > Number(minAmount)) ) ? false : true): false)
            setColorError(!color)
        }
     
    }

    return (
        <ThemeProvider theme={theme}>

            {isAuthenticated && student_org_name !== "" && (
            <>
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
                   { logo && <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10), }}  src= {logo} alt="Organization Logo" />}
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', maxHeight: theme.spacing(13), mb: theme.spacing(5), mr: theme.spacing(10)}}>
                    <Button onClick={handleOpenNewLevel} variant="contained" size="large" color="primary" sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}>Add Level</Button>

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        {student_org_short_name} Levels
                    </Typography>
                </Grid>

                <>
                    {levels.map((level: any) =>   
                    <>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', }}>

                                <EditLevel id={level._id}
                                        student_org_name={student_org_name} 
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
                        
                        <Grid item xs={1} sx={{ mt: theme.spacing(2) }}>
                                <IconButton color="secondary" aria-label="Edit" onClick={handleCloseNewLevel} sx={{  }}>
                                    <CloseIcon />
                                </IconButton>
                        </Grid>
                        
                        <Grid item xs={1}>
                            <Typography variant="h5" sx={{
                                display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                            }} >
                                Add Level
                            </Typography>
                        </Grid>

                        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'left', mt: theme.spacing(5)}}>
                            <TextField required error={levelNameError} sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Level Name" 
                            defaultValue={''} onChange={handleNameChange()} variant="outlined" />
                        </Grid>
                        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'left', mt: theme.spacing(5)}}>
                            <TextField required error={minAmountError}  sx={{ minWidth: theme.spacing(15), mr: theme.spacing(5) }} id="outlined-basic" label="Lower bound cost of level" 
                            defaultValue={''} onChange={handleMinChange()} variant="outlined" />
                            <TextField error={maxAmountError}  sx={{ minWidth: theme.spacing(15), }} id="outlined-basic" label="Upper bound cost of level" 
                            defaultValue={''} onChange={handleMaxChange()} variant="outlined" />
                        </Grid>

                        <Grid item xs={2} sx={{
                            display: 'flex', justifyContent: 'left', mt: theme.spacing(5)
                        }}>
                            <TextField
                                required 
                                error = {descriptionError}
                               
                                aria-label="empty textarea"
                                // label="Description"
                                label="Description of level benefits, details, etc."
                                minRows={3}
                                multiline={true}
                                defaultValue={''} onChange={handleDesChange()}
                                style={{ minWidth: theme.spacing(150), fontFamily: "Poppins", fontSize: theme.spacing(4) }}
                            />
                        </Grid>
                        <Grid item xs={2 }>
                            <TextField required error={colorError}  sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Hexcode of level" 
                            value={color} onChange={handleColorChange()} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <input style={{ height: '30px', width: '30px', border: '5px'}} type="color" value={color} onChange={e => setColor(e.target.value)} />
                                </InputAdornment>,
                              }}
                            variant="outlined" />
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
            </>
            )}

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

        </ThemeProvider>


    )
}

export default EditLevels