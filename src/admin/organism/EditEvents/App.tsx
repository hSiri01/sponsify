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
    student_org_logo: string,
    student_org_name: string, 
    student_org_short_name: string
}

const EditEvents = (props: Props) => {

    const { student_org_logo, student_org_name, student_org_short_name } = props
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

    React.useEffect(() => {
        console.log(student_org_name)
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
                            else {
                                return objA.name.localeCompare(objB.name)
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
        if (nameInput && priceInput > -1 && totalSpotsInput > -1) {
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
                    visible: checked,
                    org: student_org_name
                })
            })

            window.location.reload()  // reload the page
        }
        else {
            handleOpenNewQuestion()  // keep modal open
            // TODO: error handling
        }
    };

    return (

        <ThemeProvider theme={theme}>


            <MenuBar student_org_short_name={student_org_short_name}/>

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


                
                {/*<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>

                    <EditEvent name="Leadership Conference"
                        short_description='Sponsor and Present at Conference'
                        long_description={`The Leadership Conference will be held hybrid as a three day series. This will be the third ever Leadership Conference SWE-TAMU holds! Members will have an opportunity to explore leadership through lectures and interactive learning. The goal is to help members grow and develop their leadership skills to aid them in their personal and professional aspirations. The sponsoring company is invited to present a topic their company values, as part of the Leadership Conference. Some examples include: leadership styles, communication, organization and mental health awareness. The Conference is a multi-day event in Fall 2022.`}
                        avg_attendance={50}
                        num_sponsored={0}
                        occurances={1}
                        price={2000}
                        date_start={new Date(2022, 10, 14)}
                        date_end={new Date(2022, 10, 16)}
                        visible={true}
                        />
                    
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>

                    <EditEvent name="First General Meeting"
                        short_description='Present at First General Meeting'
                        long_description={`SWE-TAMU holds bi-weekly meetings throughout the school year to provide members insight about opportunities after college and allow companies to interact with students. At meetings, we encourage our speakers to discuss topics that will help members enter and excel in the industry in a 30-minute presentation. Past topics have included resume writing, interview skills, work-life balance, expectations as a new engineer and more. Technical presentations are discouraged due to the variety of engineering disciplines represented by our members. All meetings will be on a Tuesday, running from 7:30 p.m. until 8:30 p.m. with an in-person and hybrid option. The first general meeting will run from 8:30 p.m. to 9:30 p.m. Sponsors will receive a follow up email after the meeting, which includes access to our members resumes and stats for that meeting. The payment for food and beverage is included in the General Meeting fee.`}
                        avg_attendance={100}
                        num_sponsored={0}
                        occurances={1}
                        price={3500}
                        date_start={new Date(2022, 9, 12)}
                        visible={true}
                        
                    />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

                    <EditEvent name="Second General Meeting"
                        short_description='Present at First General Meeting'
                        long_description={`SWE-TAMU holds bi-weekly meetings throughout the school year to provide members insight about opportunities after college and allow companies to interact with students. At meetings, we encourage our speakers to discuss topics that will help members enter and excel in the industry in a 30-minute presentation. Past topics have included resume writing, interview skills, work-life balance, expectations as a new engineer and more. Technical presentations are discouraged due to the variety of engineering disciplines represented by our members. All meetings will be on a Tuesday, running from 7:30 p.m. until 8:30 p.m. with an in-person and hybrid option. The first general meeting will run from 8:30 p.m. to 9:30 p.m. Sponsors will receive a follow up email after the meeting, which includes access to our members resumes and stats for that meeting. The payment for food and beverage is included in the General Meeting fee.`}
                        avg_attendance={100}
                        num_sponsored={0}
                        occurances={1}
                        price={3500}
                        date_start={new Date(2022, 10, 12)}
                        visible={true}

                    />

                </Grid>*/}

                <>
                    {events.map((event: any) =>   
                    <>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

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