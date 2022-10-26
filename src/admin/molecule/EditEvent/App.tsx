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

    const [nameInput, setNameInput] = React.useState(props.name);
    const [descInput, setDescInput] = React.useState(props.long_description);
    const [briefDescInput, setBriefDescInput] = React.useState(props.short_description);
    const [priceInput, setPriceInput] = React.useState(props.price);
    const [totalSpotsInput, setTotalSpotsInput] = React.useState(props.occurances);
    const [spotsTakenInput, setSpotsTakenInput] = React.useState(props.num_sponsored);
    const [avgAttendanceInput, setAvgAttendanceInput] = React.useState(props.avg_attendance);

    const updateEvent = () => {
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
                totalSpots: totalSpotsInput,
                spotsTaken: spotsTakenInput,
                avgAttendance: avgAttendanceInput,
                visible: checked
            })
        })

        handleCloseEvent()  // close the modal
        window.location.reload()  // reload the page
    };

    const deleteEvent = () => {
        console.log('calling deleteEvent on ' + id)

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

        // window.location.reload()  // reload the page
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
                                <IconButton color="secondary" aria-label="Edit" onClick={deleteEvent} sx={{ ml: theme.spacing(2), mb: theme.spacing(2) }}>
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
                                occurances ? (
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

                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>

                                    <Grid item xs={3}>
                                        <TextField
                                            id="date"
                                            label="Date Start"
                                            type="date"
                                            defaultValue={date_start_format}
                                            value={dateInput} 
                                            onChange={ev => setDateInput(ev.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            sx={{ maxWidth: theme.spacing(40) }} />

                                        {(date_end) ?
                                            (

                                                <TextField
                                                    id="date"
                                                    label="Date End"
                                                    type="date"
                                                    defaultValue={date_end_format}
                                                    value={endDateInput} 
                                                    onChange={ev => setEndDateInput(ev.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    sx={{ maxWidth: theme.spacing(40), mt:theme.spacing(4) }} />

                                            ) : (
                                                <></>
                                            )
                                        }

                                    </Grid>

                                   
                                    <Grid item xs={5}>
                                        <TextField 
                                            sx={{ minWidth: theme.spacing(80), mb: theme.spacing(4)}} 
                                            id="outlined-basic" 
                                            label="Name" 
                                            variant="outlined" 
                                            defaultValue={name} 
                                            value={nameInput} 
                                            onChange={ev => setNameInput(ev.target.value)}
                                        />
                                        <TextField 
                                            sx={{ minWidth: theme.spacing(100), mb: theme.spacing(2) }} 
                                            id="outlined-basic" 
                                            label="Short Description" 
                                            variant="outlined" 
                                            defaultValue={short_description} 
                                            value={briefDescInput} 
                                            onChange={ev => setBriefDescInput(ev.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                                        <TextField 
                                            sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                            id="outlined-basic" 
                                            label="Price" 
                                            variant="outlined" 
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            defaultValue={price}
                                            value={priceInput}
                                            onChange={ev => setPriceInput(+ev.target.value)}
                                        />
                                        <TextField 
                                            sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                            id="outlined-basic"
                                            label="Occurances"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            defaultValue={occurances}
                                            value={totalSpotsInput}
                                            onChange={ev => setTotalSpotsInput(+ev.target.value)}
                                        />
                                        <TextField 
                                            sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                            id="outlined-basic"
                                            label="Sponsored"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            defaultValue={num_sponsored}
                                            value={spotsTakenInput}
                                            onChange={ev => setSpotsTakenInput(+ev.target.value)}
                                        />
                                        <TextField
                                            sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                            id="outlined-basic"
                                            label="Avg Attendance"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            defaultValue={avg_attendance}
                                            value={avgAttendanceInput}
                                            onChange={ev => setAvgAttendanceInput(+ev.target.value)}
                                        />
                                    </Grid>



                                </Grid>
                            </Paper>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item xs={10}>
                                    <TextareaAutosize
                                        aria-label="empty textarea"
                                        placeholder="Empty"
                                        defaultValue={long_description}
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
                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default EditEvent