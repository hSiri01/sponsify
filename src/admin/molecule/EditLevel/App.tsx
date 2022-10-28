import * as React from 'react';
import { Grid } from '@mui/material';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';


interface Props {
    id: string,
    student_org_name: string,
    level: string,
    hexcode: string,
    lowerbound: string, 
    upperbound?: string,
    description: string,
}

const EditLevel = (props: Props) => {

    const {id, student_org_name, level, lowerbound, upperbound, description, hexcode} = props
    const [openLevel, setOpenLevel] = React.useState(false);
    const [levelName, setLevelName] = React.useState('')
    const [minAmount, setMinAmount] = React.useState('')
    const [maxAmount, setMaxAmount] = React.useState('')
    const [des, setDes] = React.useState('')
    const [color, setColor] = React.useState('')

    const handleNameChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setLevelName(event.target.value )
    }

    const handleMinAmountChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinAmount(event.target.value )
    }

    const handleMaxAmountChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxAmount(event.target.value )
    }

    const handleDescriptionChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setDes(event.target.value )
    }

    const handleColorChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value )
    }

    const handleOpenLevel = () => {
        setLevelName(level)
        setMinAmount(lowerbound)
        setDes(description)
        setColor(hexcode)
        setMaxAmount(upperbound ? upperbound : '')
        console.log(id)
    
        setOpenLevel(true)
    };

    const handleCloseLevel = () => setOpenLevel(false);

    const handleUpdateLevel = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                levelId: id,
                minAmount: minAmount,
                maxAmount: maxAmount,
                name: levelName,
                color: color,
                description: des
            })
        }

        await fetch("/update-level", requestOptions)
            .then((res) => console.log(res)) 

        handleCloseLevel()
    }

    const handleDeleteLevel = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                levelId: id,
                organization: student_org_name
            })
        }

        await fetch("/delete-level", requestOptions)
            .then((res) => console.log(res)) 

        handleCloseLevel()
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Grid container  spacing = {1} padding={5} wrap="nowrap"  sx={{maxWidth:theme.spacing(275), backgroundColor: props.hexcode,  margin: "auto" }}>
            
                    <Grid item  xs = {1} sx={{ display: 'flex', justifyContent: 'left', margin: "auto" }}>
                       
                        <IconButton onClick={handleDeleteLevel} color="secondary" aria-label="Edit" >
                            <DeleteIcon />
                        </IconButton>

                    </Grid>

                <Grid item direction = "column" sx={{margin: "auto", display: 'flex', justifyContent: 'center' }}>
                    
                    <Grid item xs ={1} >
                        <Typography variant="h6">
                            {level}
                        </Typography>
                        
                    </Grid>     
                    
                    <Grid item xs ={1}    sx={{display: 'flex', justifyContent:'center',margin: "auto" }}>
                       
                        <Typography >
                            ${lowerbound} 
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
                        {props.upperbound && 
                        <Typography >
                            ${upperbound}
                        </Typography>
                        }
                    </Grid>
                    
                </Grid>  

                    <Grid item  xs ={8} sx={{ margin: "auto" }}>
                        <Typography variant="body1" sx={{textAlign:"left", ml : "5%"}} dangerouslySetInnerHTML={{ __html: description}} />
                    </Grid>

             
                    
                    <Grid item xs ={1} sx={{ display: 'flex', justifyContent:'center', margin: "auto"}}>
                        <IconButton onClick={handleOpenLevel} color="secondary" aria-label="Edit">
                            <EditIcon />
                        </IconButton>
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
                            <TextField sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Level Name" 
                            value={levelName} onChange={handleNameChange()}  variant="outlined" />
                        </Grid>
                        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'left', mt: theme.spacing(5)}}>
                            <TextField sx={{ minWidth: theme.spacing(15), mr: theme.spacing(5) }} id="outlined-basic" label="Lower bound cost of level" 
                            value={minAmount} onChange={handleMinAmountChange()} variant="outlined" />
                            <TextField sx={{ minWidth: theme.spacing(15), }} id="outlined-basic" label="Upper bound cost of level" variant="outlined" 
                            value={maxAmount} onChange={handleMaxAmountChange()} />
                        </Grid>

                        <Grid item xs={3} sx={{
                            display: 'flex', justifyContent: 'left', mt: theme.spacing(5)
                        }}>
                            <TextField
                                aria-label="empty textarea"
                                label="Description of level benefits, details, etc."
                                minRows={3}
                                multiline={true}
                                value={des}
                                onChange={handleDescriptionChange()}
                                style={{ minWidth: theme.spacing(150), fontFamily: "Poppins", fontSize: theme.spacing(4) }}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <TextField sx={{ minWidth: theme.spacing(15), mt: theme.spacing(5) }} id="outlined-basic" label="Hexcode of level" variant="outlined" 
                            value={color} onChange={handleColorChange()} 
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <input style={{ height: '30px', width: '30px', border: '5px'}} type="color" value={color} onChange={e => setColor(e.target.value)} />
                                </InputAdornment>,
                              }} />
                        </Grid>
                        
                    </Grid>
                    <Grid container >
                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left', mt: theme.spacing(20),  }}>
                                <IconButton onClick={handleDeleteLevel} color="secondary" aria-label="Edit" size = "large">
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>

                            <Grid item  xs={6} sx={{
                                display: 'flex', justifyContent: 'right',  mt: theme.spacing(20) }}>
                                <Button  
                                // href="/"
                                    onClick={handleUpdateLevel} 
                                    variant="contained" size="large" color="primary" sx={{
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