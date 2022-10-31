import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuBar from '../../molecule/MenuBar/App'
import EditEvent from '../../molecule/EditEvent/App';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';


interface Props {
}

const EditEvents = (props: Props) => {

    const [openNewQuestion, setOpenNewQuestion] = React.useState(false);
    const handleOpenNewQuestion = () => setOpenNewQuestion(true);
    const handleCloseNewQuestion = () => setOpenNewQuestion(false);

    const [checked, setChecked] = React.useState(true);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const [nameInput, setNameInput] = React.useState('');
    const [descInput, setDescInput] = React.useState('');
    const [briefDescInput, setBriefDescInput] = React.useState('');
    const [priceInput, setPriceInput] = React.useState(-1);
    const [totalSpotsInput, setTotalSpotsInput] = React.useState(-1);
    const [spotsTakenInput, setSpotsTakenInput] = React.useState(-1);
    const [avgAttendanceInput, setAvgAttendanceInput] = React.useState(-1);
    const [dateInput, setDateInput] = React.useState('');
    const [endDateInput, setEndDateInput] = React.useState('');

    const [events, setEvents] = React.useState([{}]);
    const [logo, setLogo] = React.useState("")
    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '{}');
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || '{}');

    React.useEffect(() => {
        const fetchLogo = async() => {
            try{
            console.log(student_org_name)
            const data1 = await fetch("/get-logo/" + student_org_name)
                .then((res) => res.json()) 
                .then((data1) => setLogo(data1.logoImage))
            }
            catch(e){
                console.log("Error fetching logo",(e))
            }
               
        }
        
        fetchLogo() 
    },[])

    React.useEffect(() => {
        const fetchData = async() => {
            const data = await fetch("/get-all-events/" + student_org_name)
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data)
                    data.sort(
                        (objA: any, objB: any) => {
                            if (objA.name === "General Donation") {
                                return -1
                            }
                            else if (objB.name === "General Donation") {
                                return 1
                            }
                            else {
                                return objA.name.toLowerCase().localeCompare(objB.name.toLowerCase())
                            }
                        }
                    )
                    setEvents(data)
                }
            )
        }

        fetchData()
    }, [])

    const createEvent = () => {
        if (nameInput && dateInput && priceInput > -1 && totalSpotsInput > -1) {
            fetch('/create-event', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput,
                    price: priceInput,
                    date: dateInput ? dateInput : undefined,
                    endDate: endDateInput ? endDateInput : undefined,
                    desc: descInput,
                    briefDesc: briefDescInput,
                    totalSpots: totalSpotsInput,
                    spotsTaken: spotsTakenInput > -1 ? spotsTakenInput : 0,
                    avgAttendance: avgAttendanceInput,
                    visible: checked,
                    org: student_org_name
                })
            })
                .then(() => {
                    handleCloseNewQuestion()
                    window.location.reload()
                })
        }
        else {
            handleOpenNewQuestion()  // keep modal open
            // TODO: error handling
        }
    };

    return (

        <ThemeProvider theme={theme}>


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
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', m: theme.spacing(6),}}>
                    <Button onClick={handleOpenNewQuestion} variant="contained" size="large" color="primary" sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}>Create Event</Button>

                </Grid>



                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        {student_org_short_name} Events
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10) }}>
                    <Paper variant="outlined" sx={{ backgroundColor: 'transparent', borderWidth: theme.spacing(0), maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(10) }} >
                        <Grid container>
                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(3), mt: theme.spacing(5) }}>
                                    DELETE
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(16), mt: theme.spacing(5) }}>
                                    DATE
                                </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(26), mt: theme.spacing(5) }}>
                                    EVENT NAME
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(20) }}>
                                    SPONSORED
                                </Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(14) }}>
                                    PRICE
                                </Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(28) }}>
                                    VISIBLE
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <>
                    {
                    events.map((event: any) =>
                    <>
                        <Grid key={event._id} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

                            <EditEvent 
                                name={event.name}
                                id={event._id}
                                short_description={event.briefDesc}
                                long_description={event.desc}
                                avg_attendance={event.avgAttendance}
                                num_sponsored={event.spotsTaken}
                                occurances={event.totalSpots > -1 ? event.totalSpots : undefined}
                                price={event.price}
                                date_start={new Date(event.date)}
                                date_end={event.endDate ? new Date(event.endDate) : undefined}
                                visible={event.visible}
                            />

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
                    maxWidth: theme.spacing(250),
                    minWidth: theme.spacing(250),
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
                                display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                            }} >
                                Add Event
                            </Typography>
                        </Grid>
                    </Grid>

                    <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(250), minWidth: theme.spacing(200), minHeight: theme.spacing(20), m: theme.spacing(6) }} >

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
                                    value={endDateInput}
                                    onChange={ev => setEndDateInput(ev.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    sx={{ maxWidth: theme.spacing(40), mt: theme.spacing(4) }} />

                            </Grid>


                            <Grid item xs={5}>
                                <TextField 
                                    sx={{ minWidth: theme.spacing(80), mb: theme.spacing(4) }}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    value={nameInput}
                                    onChange={ev => setNameInput(ev.target.value)}  />
                                <TextField 
                                    sx={{ minWidth: theme.spacing(100), mb: theme.spacing(2) }}
                                    id="outlined-basic"
                                    label="Short Description"
                                    variant="outlined"
                                    value={briefDescInput}
                                    onChange={ev => setBriefDescInput(ev.target.value)} />
                            </Grid>

                            <Grid item xs={4} sx={{ textAlign: "right" }}>
                                <TextField
                                    sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                    id="outlined-basic"
                                    label="Price"
                                    variant="outlined"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    value={priceInput > -1 ? priceInput : ''}
                                    onChange={ev => setPriceInput(+ev.target.value)} />
                                <TextField
                                    sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                    id="outlined-basic"
                                    label="Occurances"
                                    variant="outlined"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    value={totalSpotsInput > -1 ? totalSpotsInput : ''}
                                    onChange={ev => setTotalSpotsInput(+ev.target.value)} />
                                <TextField
                                    sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                    id="outlined-basic"
                                    label="Sponsored"
                                    variant="outlined"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    value={spotsTakenInput > -1 ? spotsTakenInput : ''}
                                    onChange={ev => setSpotsTakenInput(+ev.target.value)} />
                                <TextField
                                    sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(2) }}
                                    id="outlined-basic"
                                    label="Avg Attendance"
                                    variant="outlined"
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    value={avgAttendanceInput > -1 ? avgAttendanceInput : ''}
                                    onChange={ev => setAvgAttendanceInput(+ev.target.value)} />
                            </Grid>


                        </Grid>
                    </Paper>

                    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item xs={10}>
                            <TextareaAutosize
                                aria-label="empty textarea"
                                placeholder='Long Description'
                                value={descInput}
                                onChange={ev => setDescInput(ev.target.value)}
                                minRows={8}
                                style={{ minWidth: theme.spacing(200), fontFamily: "Poppins", fontSize: theme.spacing(4) }}
                            />
                        </Grid>
                    </Grid>


                    <Grid container sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(8) }}>

                        <Grid item xs={1}>
                            <Typography sx={{ pt: theme.spacing(5) }} variant="body1">VISIBLE</Typography>
                        </Grid>

                        <Grid item sx={{ pt: theme.spacing(3) }} xs={1}>
                            <Checkbox checked={checked}
                                onChange={handleChange} />
                        </Grid>

                        <Grid item sx={{ pt: theme.spacing(3) }} xs={2}>
                            <Button /*href="/"*/ onClick={createEvent} variant="contained" size="large" color="primary" sx={{
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

export default EditEvents