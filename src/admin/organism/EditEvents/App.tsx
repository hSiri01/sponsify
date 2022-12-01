import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuBar from '../../molecule/MenuBar/App'
import EditEvent from '../../molecule/EditEvent/App';
import { Paper } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GetAllEvents } from '../../../utils/api-types';
import MediaQuery from 'react-responsive'

interface Props {
}

const EditEvents = (props: Props) => {

    const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    const [openNewQuestion, setOpenNewQuestion] = React.useState(false);
    const handleOpenNewQuestion = () => setOpenNewQuestion(true);
    const handleCloseNewQuestion = () => {
        setNameError(false)
        setPriceError(false)
        setDateError(false)
        setTotalSpotsError(false)
        setOpenNewQuestion(false)
    }

    const [resetEvents, setResetEvents] = React.useState(false);
    const handleOpenResetEvents = () => setResetEvents(true);
    const handleCloseResetEvents = () => setResetEvents(false);

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

    const [nameError, setNameError] = React.useState(false);
    const [priceError, setPriceError] = React.useState(false);
    const [dateError, setDateError] = React.useState(false);
    const [totalSpotsError, setTotalSpotsError] = React.useState(false);

    const [events, setEvents] = React.useState<GetAllEvents>([]);
    const [logo, setLogo] = React.useState("")

    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '""');
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || '""');

    React.useEffect(() => {
        const fetchLogo = async () => {
            try {
                // console.log(student_org_name)
                await fetch("/get-logo/" + student_org_name)
                    .then((res) => res.json())
                    .then((data1) => setLogo(data1.logoImage))
            }
            catch (e) {
                console.log("Error fetching logo", (e))
            }

        }

        fetchLogo()
    }, [student_org_name])

    React.useEffect(() => {
        const fetchData = async () => {
            await fetch("/get-all-events/" + student_org_name)
                .then((res) => res.json())
                .then((data: GetAllEvents) => {
                    // console.log(data)
                    data.sort(
                        (objA, objB) => {
                            if (objA.name === "General Donation") {
                                return -1
                            }
                            else if (objB.name === "General Donation") {
                                return 1
                            }
                            else {
                                return objA.name.toLocaleLowerCase().localeCompare(objB.name.toLocaleLowerCase())
                            }
                        }
                    )
                    setEvents(data)
                }
                )
        }

        fetchData()
    }, [student_org_name])

    const createEvent = () => {
        if (nameInput && dateInput && priceInput > -1 && totalSpotsInput > -1 && spotsTakenInput <= totalSpotsInput) {
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
                    endDate: (endDateInput && endDateInput !== dateInput) ? endDateInput : undefined,
                    desc: descInput,
                    briefDesc: briefDescInput,
                    totalSpots: totalSpotsInput,
                    spotsTaken: spotsTakenInput > -1 ? spotsTakenInput : 0,
                    avgAttendance: avgAttendanceInput > -1 ? avgAttendanceInput : undefined,
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

            setTotalSpotsError(totalSpotsInput === -1 || spotsTakenInput > totalSpotsInput)
            setNameError(!nameInput)
            setPriceError(priceInput === -1)
            setDateError(!dateInput)
        }
    };

    const handleReset = async () => {
        await fetch('/reset-events', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                org: student_org_name
            })
        })
            .then(() => {
                handleCloseResetEvents()
                window.location.reload()
            })
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
    const handleSpotsTakenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            setSpotsTakenInput(Number(event.target.value))
        }
    };

    console.log(isAuthenticated)

    return (

        <ThemeProvider theme={theme}>

            <div style={{
                backgroundColor: "#f3f3f3",
                minWidth: "100vw",
                minHeight: "100vh",
            }}>

            {isAuthenticated && student_org_name !== "" && (
                <>
                    <MenuBar />
                    
                    <Grid container>
                            <MediaQuery minWidth={1200}>
                                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', }}>
                                </Grid>

                                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <img style={{
                                        maxHeight: theme.spacing(30),
                                        marginTop: theme.spacing(10),
                                    }}
                                        src={Logo} alt="Sponsify logo" />
                                </Grid>

                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(18) }}>
                                    <Typography variant="h4" sx={{ fontFamily: "Oxygen" }}>
                                        <div>{'\u00D7'}</div>
                                    </Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {logo ? <img style={{ maxHeight: theme.spacing(30), height: 120, width: 240, objectFit: 'contain', marginTop: theme.spacing(10) }} 
                                    src={logo} alt={"Org Logo"} /> : <Typography variant="h3">{student_org_short_name}</Typography>}
                                </Grid>

                                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                                </Grid>
                            </MediaQuery>

                            <MediaQuery minWidth={500} maxWidth={1199}>
                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                </Grid>

                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <img style={{
                                        maxHeight: theme.spacing(20),
                                        marginTop: theme.spacing(10),
                                    }}
                                        src={Logo} alt="Sponsify logo" />
                                </Grid>

                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(18) }}>
                                    <Typography variant="h4" sx={{ fontFamily: "Oxygen" }}>
                                        <div>{'\u00D7'}</div>
                                    </Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {logo ? <img style={{ maxHeight: theme.spacing(30), height: 120, width: 240, objectFit: 'contain', marginTop: theme.spacing(10) }} 
                                    src={logo} alt={"Org Logo"} /> : <Typography variant="h3">{student_org_short_name}</Typography>}
                                </Grid>

                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                </Grid>
                            </MediaQuery>

                            <MediaQuery maxWidth={499}>
                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', ml: "8%" }}>
                                </Grid>

                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <img style={{
                                        maxHeight: theme.spacing(15),
                                        marginTop: theme.spacing(10),
                                    }}
                                        src={Logo} alt="Sponsify logo" />
                                </Grid>

                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(18) }}>
                                    <Typography variant="h4" sx={{ fontFamily: "Oxygen" }}>
                                        <div>{'\u00D7'}</div>
                                    </Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {logo ? <img style={{ maxHeight: theme.spacing(30), height: 120, width: 240, objectFit: 'contain', marginTop: theme.spacing(10) }} 
                                    src={logo} alt={"Org Logo"} /> : <Typography variant="h3">{student_org_short_name}</Typography>}
                                </Grid>

                                <Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                                </Grid>
                            </MediaQuery>

                        <Grid container xs={12} sx={{ display: 'flex', m: theme.spacing(6) }}>

                            <Grid item>
                                <Button onClick={handleOpenResetEvents} variant="contained" size="large" color="primary" sx={{
                                    borderRadius: 0,
                                    pt: theme.spacing(3),
                                    pb: theme.spacing(3),
                                    pl: theme.spacing(8),
                                    pr: theme.spacing(8),
                                    ml: theme.spacing(22),
                                }}>Reset</Button>
                            </Grid>

                            <Dialog
                                open={resetEvents}
                                keepMounted
                                onClose={handleCloseResetEvents}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Reset all events?"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-slide-description">
                                        This will set the number of spots that are sponsored to 0 for <b>all events</b>.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseResetEvents}>Cancel</Button>
                                    <Button onClick={handleReset}>Continue</Button>
                                </DialogActions>
                            </Dialog>

                            <Grid item xs>
                                <Grid container direction="row-reverse">
                                        <Grid item>
                                        <Button onClick={handleOpenNewQuestion} variant="contained" size="large" color="primary" sx={{
                                            borderRadius: 0,
                                            pt: theme.spacing(3),
                                            pb: theme.spacing(3),
                                            pl: theme.spacing(8),
                                            pr: theme.spacing(8),
                                            ml: theme.spacing(5),
                                        }}>Add Event</Button>
                                    </Grid>
                                </Grid>
                            </Grid>


                        </Grid>


                            <Grid item xs={12} sx={{
                                display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10),
                                [theme.breakpoints.down('sm')]: {
                                    ml: "15%"
                                }, }}>
                            <Typography variant="h4">
                                {student_org_short_name} Events
                            </Typography>
                        </Grid>

                        <MediaQuery minWidth={1350}>
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
                        </MediaQuery>

                            <MediaQuery minWidth={750} maxWidth={1349}>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10) }}>
                                    <Paper variant="outlined" sx={{ backgroundColor: 'transparent', borderWidth: theme.spacing(0), maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(10) }} >
                                        <Grid container>
                                            <Grid item xs={3}>

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


                                        </Grid>
                                    </Paper>
                                </Grid>
                            </MediaQuery>

                            <MediaQuery maxWidth={749}>
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10) }}>
                                    <Paper variant="outlined" sx={{
                                        backgroundColor: 'transparent',
                                        borderWidth: theme.spacing(0),
                                        maxWidth: theme.spacing(80),
                                        minWidth: theme.spacing(80),
                                        minHeight: theme.spacing(10)
                                    }} >
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Typography variant="body2" sx={{ color: "#979797", ml: "49%", mt: theme.spacing(5) }}>
                                                    EVENT NAME
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </MediaQuery>

                        <>
                            {events.map((event: any) =>
                            (<React.Fragment key={event._id}>
                                <Grid item /* key={event._id} */ xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

                                    <EditEvent
                                        name={event.name}
                                        id={event._id}
                                        short_description={event.briefDesc}
                                        long_description={event.desc}
                                        avg_attendance={event.avgAttendance}
                                        num_sponsored={event.spotsTaken}
                                        occurrences={event.totalSpots}
                                        price={event.price}
                                        date_start={new Date(event.date)}
                                        date_end={event.endDate && event.endDate !== event.date ? new Date(event.endDate) : undefined}
                                        visible={event.visible}
                                    />

                                </Grid>
                            </React.Fragment>)
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
                                [theme.breakpoints.down('md')]: {
                                    maxWidth: theme.spacing(120),
                                    minWidth: theme.spacing(120),
                                    maxHeight: theme.spacing(100),
                                    minHeight: theme.spacing(100),
                                },
                                [theme.breakpoints.down('sm')]: {
                                    left: '50%',
                                    top: '50%',
                                    maxWidth: theme.spacing(80),
                                    minWidth: theme.spacing(80),
                                    maxHeight: theme.spacing(100),
                                    minHeight: theme.spacing(100),
                                },
                        }}>
                            <Grid container>
                                <Grid item xs={12} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton color="secondary" aria-label="Edit" onClick={handleCloseNewQuestion} sx={{}}>
                                        <CloseIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" sx={{
                                        display: 'flex', justifyContent: 'center', mt: theme.spacing(5)
                                    }} >
                                        Add Event
                                    </Typography>
                                </Grid>
                            </Grid>

                                <Paper variant="outlined" sx={{
                                    borderStyle: "none none solid none",
                                    borderWidth: theme.spacing(.5),
                                    borderRadius: 0,
                                    borderColor: "#c2c2c2",
                                    maxWidth: theme.spacing(250),
                                    minWidth: theme.spacing(200),
                                    minHeight: theme.spacing(20),
                                    m: theme.spacing(6),
                                    [theme.breakpoints.down('md')]: {
                                        maxWidth: theme.spacing(110),
                                        minWidth: theme.spacing(110),
                                        maxHeight: theme.spacing(100),
                                        minHeight: theme.spacing(100),
                                    },
                                    [theme.breakpoints.down('sm')]: {

                                        maxWidth: theme.spacing(70),
                                        minWidth: theme.spacing(70),
                                        maxHeight: theme.spacing(140),
                                        minHeight: theme.spacing(140),
                                    },
                                }} >

                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>

                                        <Grid item sm={6} xs={12}>
                                        <TextField
                                            required
                                            error={dateError}
                                            id="date"
                                            label="Date Start"
                                            type="date"
                                            value={dateInput}
                                            onChange={ev => setDateInput(ev.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                                sx={{
                                                    maxWidth: theme.spacing(40),
                                                    ml: "60%",
                                                    mb: theme.spacing(4),
                                                    [theme.breakpoints.down('md')]: {
                                                        ml: "10%",
                                                    },
                                                    [theme.breakpoints.down('sm')]: {
                                                        ml: "15%",
                                                    },
                                                }} />
                                        </Grid>

                                        <Grid item sm={6} xs={12}>

                                        <TextField
                                            id="date"
                                            label="Date End"
                                            type="date"
                                            value={endDateInput}
                                            onChange={ev => setEndDateInput(ev.target.value)}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                                sx={{
                                                    maxWidth: theme.spacing(40),
                                                    mb: theme.spacing(4),
                                                    [theme.breakpoints.down('sm')]: {
                                                        ml: "15%",
                                                    },
                                                }} />

                                    </Grid>


                                        <Grid item xs={12}>
                                        <TextField
                                            required
                                            error={nameError}
                                                sx={{
                                                    minWidth: theme.spacing(80),
                                                    mb: theme.spacing(4),
                                                    ml: "32%",
                                                    [theme.breakpoints.down('md')]: {
                                                        ml: "10%",
                                                    },
                                                    [theme.breakpoints.down('sm')]: {
                                                        ml: "3%",
                                                        minWidth: theme.spacing(60)
                                                    },
                                                }}
                                            id="outlined-basic"
                                            label="Name"
                                            variant="outlined"
                                            value={nameInput}
                                            onChange={ev => setNameInput(ev.target.value)} />
                                        </Grid>

                                        <Grid item xs={12}>
                                        <TextField
                                                sx={{
                                                    minWidth: theme.spacing(100),
                                                    mb: theme.spacing(4),
                                                    ml: '28%',
                                                    [theme.breakpoints.down('md')]: {
                                                        ml: "2%",
                                                    },
                                                    [theme.breakpoints.down('sm')]: {
                                                        ml: "0%",
                                                        minWidth: theme.spacing(70)
                                                    },
                                                }}
                                            id="outlined-basic"
                                            label="Short Description"
                                            variant="outlined"
                                            value={briefDescInput}
                                            onChange={ev => setBriefDescInput(ev.target.value)} />
                                    </Grid>

                                        <Grid item md={2} sm={6} xs={12}>
                                        <TextField
                                            required
                                            error={priceError}
                                                sx={{
                                                    maxWidth: theme.spacing(40),
                                                    mb: theme.spacing(2),
                                                    mr: theme.spacing(2),
                                                    [theme.breakpoints.down('md')]: {
                                                        ml: "10%",
                                                    },
                                                    [theme.breakpoints.down('sm')]: {
                                                        ml: "15%",
                                                    },
                                                }}
                                            id="outlined-basic"
                                            label="Price"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            value={priceInput > -1 ? priceInput : ''}
                                            onChange={handlePriceChange} />
                                        </Grid>

                                        <Grid item md={2} sm={6} xs={12} sx={{
                                        }}>
                                        <TextField
                                            required
                                            error={totalSpotsError}
                                            helperText={totalSpotsError && spotsTakenInput > totalSpotsInput ? "Cannot be less than " + spotsTakenInput : ""}
                                                sx={{
                                                    maxWidth: theme.spacing(40),
                                                    mb: theme.spacing(2),
                                                    mr: theme.spacing(2),
                                                    [theme.breakpoints.down('sm')]: {
                                                        ml: "15%",
                                                    },
                                                }}
                                            id="outlined-basic"
                                            label="Occurrences"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                                value={totalSpotsInput > -1 ? totalSpotsInput : ''}
                                            onChange={handleTotalSpotsChange} />
                                        </Grid>

                                        <Grid item md={2} sm={6} xs={12} sx={{
                                        }}>
                                        <TextField
                                                sx={{
                                                    maxWidth: theme.spacing(40),
                                                    mb: theme.spacing(2),
                                                    mr: theme.spacing(2),
                                                    [theme.breakpoints.down('sm')]: {
                                                        ml: "15%",
                                                    },
                                                }}
                                            id="outlined-basic"
                                            label="Sponsored"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            value={spotsTakenInput > -1 ? spotsTakenInput : ''}
                                            onChange={handleSpotsTakenChange} />
                                        </Grid>


                                        <Grid item md={2} sm={6} xs={12} sx={{
                                        }}>
                                        <TextField
                                                sx={{
                                                    maxWidth: theme.spacing(40),
                                                    mb: theme.spacing(2),
                                                    [theme.breakpoints.down('sm')]: {
                                                        ml: "15%",
                                                    },
                                                }}
                                            id="outlined-basic"
                                            label="Avg Attendance"
                                            variant="outlined"
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            value={avgAttendanceInput > -1 ? avgAttendanceInput : ''}
                                            onChange={handleAvgAttendanceChange} />
                                    </Grid>


                                </Grid>
                            </Paper>

                            <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid item xs={10}>
                                    <TextField
                                        multiline
                                        aria-label="empty textarea"
                                        placeholder='Long Description'
                                        value={descInput}
                                        onChange={ev => setDescInput(ev.target.value)}
                                        minRows={8}
                                            sx={{
                                                minWidth: theme.spacing(200),
                                                fontFamily: "Poppins",
                                                fontSize: theme.spacing(4),
                                                [theme.breakpoints.down('md')]: {
                                                    minWidth: theme.spacing(100),
                                                },
                                                [theme.breakpoints.down('sm')]: {
                                                    minWidth: theme.spacing(70),
                                                },
                                            }}
                                    />
                                </Grid>
                            </Grid>


                            <Grid container sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(8) }}>

                                    <Grid item md={1} xs={2}>
                                    <Typography sx={{ pt: theme.spacing(5) }} variant="body1">VISIBLE</Typography>
                                </Grid>

                                <Grid item sx={{ pt: theme.spacing(3) }} xs={1}>
                                    <Checkbox checked={checked}
                                        onChange={handleChange} />
                                </Grid>

                                    <Grid item sx={{ pt: theme.spacing(3) }} md={2} xs={4}>
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
                </>
            )}

            {(!isLoading && !isAuthenticated) && (
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                    </Grid>

                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                        <Typography variant="h5">
                            Login below to access Sponsify
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
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

            </div>

        </ThemeProvider>
    )
}

export default EditEvents