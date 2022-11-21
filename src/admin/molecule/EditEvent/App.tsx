import * as React from 'react';
import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Date from '../../../sponsor/atom/Date/App'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CloseIcon from '@mui/icons-material/Close';

// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import dayjs, { Dayjs } from 'dayjs';



interface Props {
    name: string,
    id: string,
    short_description: string, 
    long_description: string, 
    price:number, 
    avg_attendance?: number,
    num_sponsored: number,
    occurances: number,
    date_start: Date,
    date_end?: Date, 
    visible: boolean,
}

const EditEvent = (props: Props) => {

    const {name, id, short_description, long_description, price, avg_attendance, num_sponsored, occurances, date_start, date_end, visible} = props

    const [openEvent, setOpenEvent] = React.useState(false);
    const handleOpenEvent = () => setOpenEvent(true);
    const handleCloseEvent = () => setOpenEvent(false);

    const [checked, setChecked] = React.useState(visible);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const [openConfirmation, setOpenConfirmation] = React.useState(false)
    const handleOpenConfirmation = () => setOpenConfirmation(true)
    const handleCloseConfirmation = () => setOpenConfirmation(false)

    const [nameInput, setNameInput] = React.useState(props.name);
    const [descInput, setDescInput] = React.useState(props.long_description);
    const [briefDescInput, setBriefDescInput] = React.useState(props.short_description);
    const [priceInput, setPriceInput] = React.useState(props.price);
    const [totalSpotsInput, setTotalSpotsInput] = React.useState(props.occurances);
    const [totalSpotsError, setTotalSpotsError] = React.useState(false);
    const [avgAttendanceInput, setAvgAttendanceInput] = React.useState(props.avg_attendance);
    const [generalDonation, setGeneralDonation] = React.useState(props.name === 'General Donation');

    const updateEvent = () => {
        if (totalSpotsInput >= num_sponsored) {
            fetch('/update-event', {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput,
                    id: id,
                    price: priceInput,
                    date: dateInput,
                    endDate: endDateInput,
                    desc: descInput,
                    briefDesc: briefDescInput,
                    totalSpots: generalDonation ? -1 : totalSpotsInput,
                    avgAttendance: avgAttendanceInput,
                    visible: checked
                })
            })
                .then(() => {
                    handleCloseEvent()
                    window.location.reload()})
        }
        else {
            setTotalSpotsError(true)
        }
    };

    const deleteEvent = () => {
        fetch('/delete-event', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(() => window.location.reload())
    };
    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
           setPriceInput(Number(event.target.value))
        }
    };
    const handleTotalSpotsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
           setTotalSpotsInput(Number(event.target.value))
        }
    };
    const handleAvgAttendanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
           setAvgAttendanceInput(Number(event.target.value))
        }
    };
   

    const startmonth = (date_start.getMonth()+1 < 10) ? ("0" + (date_start.getMonth()+1).toString()) : date_start.getMonth()+1
    const startdate = (date_start.getDate() < 10) ? ("0" + date_start.getDate().toString()) : date_start.getDate() 
    const date_start_format = date_start.getFullYear() +"-" +  startmonth + "-" + startdate

    let date_end_format = date_start_format

    if(date_end)
    {
        const endmonth = (date_end.getMonth()+1 < 10) ? ("0" + (date_end.getMonth()+1).toString()) : date_end.getMonth()+1
        const enddate = (date_end.getDate() < 10) ? ("0" + date_end.getDate().toString()) : date_end.getDate() 
        date_end_format = date_end.getFullYear() + "-" + endmonth + "-" + enddate
    }

    const [dateInput, setDateInput] = React.useState(date_start_format)
    const [endDateInput, setEndDateInput] = React.useState(date_end_format)

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper variant="outlined" sx={{ borderWidth: theme.spacing(.5), borderRadius: 0, borderColor:"#c2c2c2", maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(20), mt:theme.spacing(2), mb: theme.spacing(2) }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>
                            
                            <Grid item xs={1} sx={{ mt: theme.spacing(2) }}>
                                <IconButton color="secondary" aria-label="Edit" onClick={handleOpenConfirmation} sx={{ ml: theme.spacing(2), mb: theme.spacing(2) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>

                            <Grid item xs={2} sx={{pr:theme.spacing(15)}}>
                                <Date date_1={date_start} date_2={date_end}/>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">{name}</Typography>
                                <Typography sx={{ color:"#979797"}}variant="body1">{short_description}</Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                            {
                                occurances > -1 ? (
                                    occurances === num_sponsored ? (
                                        <Typography sx={{ fontWeight: "600", color:"#4baa89" }} variant="h6">{num_sponsored}/{occurances}</Typography>

                                    ):(
                                        <Typography sx={{ fontWeight: "600", color:"#ef5350" }} variant="h6">{num_sponsored}/{occurances}</Typography>
                                    )
                                ) : (
                                    num_sponsored > 0 ? (
                                        <Typography sx={{ fontWeight: "600", color:"#4baa89" }} variant="h6">{num_sponsored}</Typography>
                                    ) : (
                                        <Typography sx={{ fontWeight: "600", color:"#ef5350" }} variant="h6">{num_sponsored}</Typography>
                                    )
                                )
                            }
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ color:"#367c63", fontWeight: "600",ml: theme.spacing(8) }} variant="h6">{price > 0 ? '$' + price : '-'}</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(2) }}>
                                <Checkbox checked={checked}
                                    onChange={handleChange} />
                            </Grid>

                            <Grid item xs={1} sx={{ pl: theme.spacing(9)}}>
                                <IconButton onClick={handleOpenEvent} color="secondary" aria-label="Edit" sx={{ mr: theme.spacing(4), mt: theme.spacing(2)}}>
                                    <EditIcon />
                                </IconButton>
                            </Grid>

                        </Grid>
                        
                   </Paper>

                    <Modal
                        open={openEvent}
                        onClose={handleCloseEvent}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        disableScrollLock
                    >
                        <Box sx={{
                            position: 'absolute' as 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            maxWidth: theme.spacing(250),
                            minWidth: theme.spacing(250),
                            maxHeight: theme.spacing(100),
                            minHeight: theme.spacing(100),
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            overflow: 'scroll',
                        }}>
                            <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(250), minWidth: theme.spacing(200), minHeight: theme.spacing(20), m:theme.spacing(6)}} >

                                <Grid container sx={{mb: theme.spacing(6), mt:theme.spacing(4)}}>
                                <Grid item xs={12} sx={{  }}>
                                        <IconButton color="secondary" aria-label="Edit" onClick={handleCloseEvent} sx={{  }}>
                                         <CloseIcon />
                                     </IconButton>
                                     </Grid>
                                </Grid>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    
                                    <Grid item xs={3}>
                                        <TextField
                                            id="date"
                                            label="Date Start"
                                            type="date"
                                            value={dateInput} 
                                            onChange={ev => setDateInput(ev.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{ maxWidth: theme.spacing(40) }} />

                                        <TextField
                                            id="date"
                                            label="Date End"
                                            type="date"
                                            value={endDateInput !== dateInput ? endDateInput : ''} 
                                            onChange={ev => setEndDateInput(ev.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{ maxWidth: theme.spacing(40), mt:theme.spacing(4) }} />

                                    </Grid>

                                   
                                    <Grid item xs={5}>
                                        <TextField 
                                            disabled={generalDonation}
                                            sx={{ minWidth: theme.spacing(80), mb: theme.spacing(4)}} 
                                            id="outlined-basic" 
                                            label="Name" 
                                            variant="outlined" 
                                            value={nameInput} 
                                            onChange={ev => setNameInput(ev.target.value)}
                                        />
                                        <TextField 
                                            sx={{ minWidth: theme.spacing(100), mb: theme.spacing(2) }} 
                                            id="outlined-basic" 
                                            label="Short Description" 
                                            variant="outlined" 
                                            value={briefDescInput} 
                                            onChange={ev => setBriefDescInput(ev.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                                        <TextField
                                            disabled={generalDonation}
                                            sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                            id="outlined-basic" 
                                            label="Price" 
                                            variant="outlined" 
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            value={generalDonation ? '-' : priceInput}
                                            onChange={handlePriceChange /*ev => setPriceInput(+ev.target.value)*/}
                                        />
                                        <TextField
                                            disabled={generalDonation}
                                            error={totalSpotsError}
                                            helperText={totalSpotsError ? "Cannot be less than " + num_sponsored : ""}
                                            sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                            id={totalSpotsError ? "outlined-error-helper-text" : "outlined-basic"}
                                            label="Occurances"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            value={generalDonation ? '-' : totalSpotsInput  }
                                            onChange={ handleTotalSpotsChange}
                                        />
                                        <TextField
                                            disabled
                                            sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                            id="outlined-basic"
                                            label="Sponsored"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            value={num_sponsored}
                                        />
                                        <TextField
                                            disabled={generalDonation}
                                            sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                            id="outlined-basic"
                                            label="Avg Attendance"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            value={generalDonation ? '-' : avgAttendanceInput}
                                            onChange={handleAvgAttendanceChange}
                                        />
                                    </Grid>



                                </Grid>
                            </Paper>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item xs={10}>
                                    <TextareaAutosize
                                        aria-label="empty textarea"
                                        placeholder="Empty"
                                        value={descInput}
                                        onChange={ev => {setDescInput(ev.target.value)}}
                                        minRows={8}
                                        style={{ minWidth: theme.spacing(200), fontFamily: "Poppins", fontSize: theme.spacing(4) }}
                                    />
                                    </Grid>
                                </Grid>

                                
                                <Grid container sx = {{ display: 'flex', justifyContent: 'right', mt: theme.spacing(8) }}>
                                

                                <Grid item xs={1}>
                                    <Typography sx={{ pt: theme.spacing(5) }} variant="body1">VISIBLE</Typography>
                                </Grid>
                                <Grid item sx={{ pt: theme.spacing(3) }} xs={1}>
                                    <Checkbox checked={checked}
                                        onChange={handleChange} />
                                </Grid>

                                <Grid item sx={{ pt: theme.spacing(3) }} xs={2}>
                                    <Button /*href="/"*/ onClick={updateEvent} variant="contained" size="large" color="primary" sx={{
                                        borderRadius: 0,
                                        pt: theme.spacing(3),
                                        pb: theme.spacing(3),
                                        pl: theme.spacing(8),
                                        pr: theme.spacing(8),
                                        ml: theme.spacing(5),
                                    }}>Update</Button>
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
                                    display: 'flex', justifyContent: 'center', m: theme.spacing(5)
                                }} > 
                                Are you sure you want to delete {nameInput}?
                                </Typography>
                                
                            </Grid>

                            <Grid sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(5) }}>
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
                                        onClick={deleteEvent} 
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
                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default EditEvent