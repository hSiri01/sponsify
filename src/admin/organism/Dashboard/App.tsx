import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TuneIcon from '@mui/icons-material/Tune';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';
import PaidIcon from '@mui/icons-material/Paid';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LockIcon from '@mui/icons-material/Lock';
import PageviewIcon from '@mui/icons-material/Pageview';
import EmailIcon from '@mui/icons-material/Email';
import MenuBar from '../../molecule/MenuBar/App'
import { Paper } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import Link from '@mui/material/Link';
import * as React from 'react';
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

//import Logout from '@mui/icons-material/Logout';

interface Props {
}

const Dashboard = (props: Props) => {

    const { isAuthenticated, isLoading, user } = useAuth0()
    const [validAdmin, setValidAdmin] = React.useState(false)
    const [notRegistered, setNotRegistered] = React.useState(false)

    const [logo, setLogo] = React.useState("")
    const [orgName, setOrgName] = React.useState("")
    const [orgShortName, setOrgShortName] = React.useState("")
    const [sponsorCode, setSponsorCode] = React.useState("")
    const [fundName, setFundName] = React.useState("")
    const [streetAddress, setStreetAddress] = React.useState("")
    const [streetAddress2, setStreetAddress2] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")
    const [zipcode, setZipcode] = React.useState(0)
    const [admin, setAdmin] = React.useState(false)
    const logoutRoute = window.location.hostname === "localhost" ? 
    "http://localhost:3000/admin-login" : "https://sponsify-app.herokuapp.com/admin-login" 
    const { logout } = useAuth0();
    const navigate = useNavigate();

    const [generateGenerateCodePopup, setGenerateCodePopup] = React.useState(false)
    const handlePopupOpen = () => {setGenerateCodePopup(true);}; 
    const handlePopupClose = () => {setGenerateCodePopup(false);}; //TODO : generate new code + set setGenerateCodePopup false there
        
    const updateSponsorCode = () => {
        fetch('/update-sponsor-code', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                org: orgName,
            })
        })
            .then(() => {
                handlePopupClose()
                window.location.reload()})
    }
    
    if (isAuthenticated) {
        const getOrg = async() => { 
            if (user) {
                await fetch("/get-org-from-email/" + user.email)
                    .then((res) => res.json()) 
                    .then((data) => {
                        // console.log(data)

                        if (data.name === "new") {
                            localStorage.setItem('org-name', JSON.stringify(data.name))
                            localStorage.setItem('org-short-name', JSON.stringify(data.shortName))
                            localStorage.setItem('email', JSON.stringify(user.email))
                            navigate("/basic-info")
                        }

                        else if (data.name !== "") 
                        {
                            console.log("got valid org!")    
                            setValidAdmin(true)
                            setOrgName(data.name)
                            setOrgShortName(data.shortName)
                            setLogo(data.logo)
                            setSponsorCode(data.sponsorCode)
                            setFundName(data.fundName)
                            setStreetAddress(data.address.streetAddress)
                            setStreetAddress2(data.address.streetAddress2)
                            setCity(data.address.city)
                            setState(data.address.state)
                            setZipcode(data.address.zip)
                            setAdmin(data.admin)

                            localStorage.setItem('org-name', JSON.stringify(orgName))
                            localStorage.setItem('org-short-name', JSON.stringify(orgShortName))
                            localStorage.setItem('email', JSON.stringify(user.email))

                        }
                        else {
                            console.log("not associated")
                            setNotRegistered(true)
                            // TODO: graceful retry process
                            // logout({ returnTo: process.env.NODE_ENV === "production" ? 
                            // "https://sponsify-app.herokuapp.com/dashboard" : "http://localhost:3000/dashboard" })
                            
                            //if logout and go back to admin page
                            //logout({ returnTo: logoutRoute })
                        }

                    })
            }
        }
        
        getOrg()
    }
    
    return (
        <ThemeProvider theme={theme}>

            <Grid container sx={{ backgroundColor:"#f3f3f3"}}>
                {validAdmin && ( <>
                <MenuBar />

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



                <Grid item xs={1} sx={{ justifyContent: 'center', }}>
                </Grid>

                <Grid item xs={3} sx={{ justifyContent: 'left', mt: theme.spacing(5), }}>
                    <Link href={'/events-edit'} underline='none'>
                        <Paper variant="outlined" sx={{ border: 'none', borderRadius: 0, maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(40), mt: theme.spacing(4), boxShadow: "3px 3px 3px #c7c7c7" }} >
                            <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(10), mt: theme.spacing(1), mb: theme.spacing(1) }} >
                                <Grid container>
                                    <Grid item xs={2}>
                                        <IconButton
                                            size="large"
                                            aria-label="menu"
                                            sx={{ mr: 2, color: 'black' }}
                                        >
                                            <AddCircleIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h6" sx={{ mt: theme.spacing(2) }}>
                                            Create/Edit Events
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h5" sx={{ ml: theme.spacing(5), mt: theme.spacing(2) }}>
                                            {'>'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Grid container>
                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Create Events
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Delete Events
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Edit Events
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Link>


                    <Link href={'/levels-edit'} underline='none'>
                        <Paper variant="outlined" sx={{ border: 'none', borderRadius: 0, maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(40), mt: theme.spacing(5), boxShadow: "3px 3px 3px #c7c7c7" }} >
                            <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(10), mt: theme.spacing(1), mb: theme.spacing(1) }} >
                                <Grid container>
                                    <Grid item xs={2}>
                                        <IconButton
                                            size="large"
                                            aria-label="menu"
                                            sx={{ mr: 2, color: 'black' }}
                                        >
                                            <TuneIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h6" sx={{ mt: theme.spacing(2) }}>
                                            Edit Sponsorship Levels
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h5" sx={{ ml: theme.spacing(5), mt: theme.spacing(2) }}>
                                            {'>'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Grid container>
                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Add Levels
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <PaidIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Add Ranges
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <InvertColorsIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Format Colors
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Link>

                    <Paper variant="outlined" sx={{ border: 'none', borderRadius: 0, maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(40), mt: theme.spacing(5), mb: theme.spacing(5), boxShadow: "3px 3px 3px #c7c7c7" }} >
                        <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(10), mt: theme.spacing(1), mb: theme.spacing(1) }} >
                            <Grid container>
                                <Grid item xs={2}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        sx={{ mr: 2, color: 'black' }}
                                    >
                                        <LockIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h6" sx={{ mt: theme.spacing(2) }}>
                                        Sponsor Code
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Paper>

                        <Grid container>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(2) }}>

                                <Typography variant="h6" sx={{ border: 1, borderColor: '#367c63', borderWidth: theme.spacing(1), p: theme.spacing(3), mt: theme.spacing(5) }}>
                                    {sponsorCode}
                                </Typography>

                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

                                <Typography variant="body1" sx={{ fontWeight: 700, mt: theme.spacing(2), mb: theme.spacing(3) }}>
                                    Share this with Companies
                                </Typography>

                            </Grid>
                            
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: "auto" }}>
                                    <Button 
                                    onClick={handlePopupOpen}
                                    variant="contained" 
                                    size="large" 
                                    color="secondary" 
                                sx={{
                                    
                                    color: 'white',
                                    mb: theme.spacing(2),
                                    backgroundColor: '#434343',
                                    borderRadius: 0,
                                    fontFamily: 'Oxygen',
                                    pt: theme.spacing(3),
                                    pb: theme.spacing(3),
                                    pl: theme.spacing(8),
                                    pr: theme.spacing(8),
                                    "&:hover": {
                                        color: 'white',
                                        backgroundColor: '#367c63',
                                    }
                                    }}>Generate New Code</Button>
                            </Grid>
                            <Dialog
                                open={generateGenerateCodePopup}
                                keepMounted
                                onClose={handlePopupClose}
                                aria-describedby="alert-dialog-slide-description"
                            >
                                <DialogTitle>{"Are you sure you want to generate a new code?"}</DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Generating a new code will delete the current code. Click yes below if you wish to do this, and make sure to send the new code to your sponsors! If not, click no. 
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={updateSponsorCode}>Yes</Button> 
                                <Button onClick={handlePopupClose}>No</Button>
                                
                                </DialogActions>
                            </Dialog>

                        </Grid>
                    </Paper>

                </Grid>



                <Grid item xs={3} sx={{ mt: theme.spacing(5), ml: theme.spacing(15), mr: theme.spacing(15) }}>
                    <Link href={'/basic-info'} underline='none'>
                        <Paper variant="outlined" sx={{ border: 'none', borderRadius: 0, maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(40), mt: theme.spacing(4), boxShadow: "3px 3px 3px #c7c7c7" }} >
                            <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(10), mt: theme.spacing(1), mb: theme.spacing(1) }} >
                                <Grid container>
                                    <Grid item xs={2}>
                                        <IconButton
                                            size="large"
                                            aria-label="menu"
                                            sx={{ mr: 2, color: 'black' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h6" sx={{ mt: theme.spacing(2) }}>
                                            Basic Info
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h5" sx={{ ml: theme.spacing(5), mt: theme.spacing(2) }}>
                                            {'>'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Grid container>
                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Add Address
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <UploadIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Upload Logo
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Edit Name
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Link>

                    <Link href={'/faq-edit'} underline='none'>
                        <Paper variant="outlined" sx={{ border: 'none', borderRadius: 0, maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(40), mt: theme.spacing(5), boxShadow: "3px 3px 3px #c7c7c7" }} >
                            <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(10), mt: theme.spacing(1), mb: theme.spacing(1) }} >
                                <Grid container>
                                    <Grid item xs={2}>
                                        <IconButton
                                            size="large"
                                            aria-label="menu"
                                            sx={{ mr: 2, color: 'black' }}
                                        >
                                            <HelpIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h6" sx={{ mt: theme.spacing(2) }}>
                                            Create/Edit FAQs
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h5" sx={{ ml: theme.spacing(5), mt: theme.spacing(2) }}>
                                            {'>'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Grid container>
                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Add questions/answers
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Delete questions/answers
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        Edit questions/answers
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Paper>
                    </Link>

                    <Link href={'/summary'} underline='none'>
                        <Paper variant="outlined" sx={{ border: 'none', borderRadius: 0, maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(40), mt: theme.spacing(5), mb: theme.spacing(5), boxShadow: "3px 3px 3px #c7c7c7" }} >
                            <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(10), mt: theme.spacing(1), mb: theme.spacing(1) }} >
                                <Grid container>
                                    <Grid item xs={2}>
                                        <IconButton
                                            size="large"
                                            aria-label="menu"
                                            sx={{ mr: 2, color: 'black' }}
                                        >
                                            <HistoryIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="h6" sx={{ mt: theme.spacing(2) }}>
                                            Purchase History
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h5" sx={{ ml: theme.spacing(5), mt: theme.spacing(2) }}>
                                            {'>'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>

                            <Grid container>
                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <PaidIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        View all transactions
                                    </Typography>
                                </Grid>

                                <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        color="secondary"
                                        sx={{ mr: 2, ml: theme.spacing(2) }}
                                    >
                                        <PageviewIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                    <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                        View all sponsors
                                    </Typography>
                                </Grid>



                            </Grid>
                        </Paper>
                    </Link>
                    {admin ? (
                        <Link href={'/account-requests'} underline='none'>
                            <Paper variant="outlined" sx={{ border: 'none', borderRadius: 0, maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(40), mt: theme.spacing(5), mb: theme.spacing(5), boxShadow: "3px 3px 3px #c7c7c7" }} >
                                <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(10), mt: theme.spacing(1), mb: theme.spacing(1) }} >
                                    <Grid container>
                                        <Grid item xs={2}>
                                            <IconButton
                                                size="large"
                                                aria-label="menu"
                                                sx={{ mr: 2, color: 'black' }}
                                            >
                                                <GppMaybeIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography variant="h6" sx={{ mt: theme.spacing(2) }}>
                                                Account Requests
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h5" sx={{ ml: theme.spacing(5), mt: theme.spacing(2) }}>
                                                {'>'}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>

                                <Grid container>
                                    <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                        <IconButton
                                            size="large"
                                            aria-label="menu"
                                            color="secondary"
                                            sx={{ mr: 2, ml: theme.spacing(2) }}
                                        >
                                            <ManageAccountsIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                        <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                            View all account requests
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={2} sx={{ mt: theme.spacing(2) }}>
                                        <IconButton
                                            size="large"
                                            aria-label="menu"
                                            color="secondary"
                                            sx={{ mr: 2, ml: theme.spacing(2) }}
                                        >
                                            <GroupAddIcon/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={10} sx={{ mt: theme.spacing(2) }}>
                                        <Typography variant="body1" sx={{ mt: theme.spacing(3) }}>
                                            Grant/Deny Access
                                        </Typography>
                                    </Grid>



                                </Grid>
                            </Paper>
                        </Link>
                    ) : <></>} 

                </Grid>

                <Grid item xs={3} sx={{ mt: theme.spacing(5) }}>
                    <Paper variant="outlined" sx={{ border: 'none', borderRadius: 0, maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(40), mt: theme.spacing(4), boxShadow: "3px 3px 3px #c7c7c7" }} >
                        <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(100), minWidth: theme.spacing(100), minHeight: theme.spacing(10), mt: theme.spacing(1), mb: theme.spacing(1) }} >
                            <Grid container>
                                <Grid item xs={2}>
                                    <IconButton
                                        size="large"
                                        aria-label="menu"
                                        sx={{ mr: 2, color: 'black' }}
                                    >
                                        <EmailIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h6" sx={{ mt: theme.spacing(2) }}>
                                        Email Preview
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Paper>

                        <Grid container>
                            <Grid item xs={12} sx={{ mt: theme.spacing(2) }}>

                                {streetAddress2?

                                    (
                                        <Typography variant="body2" sx={{ fontSize: theme.spacing(3), mt: theme.spacing(2), ml: theme.spacing(4), mr: theme.spacing(4) }}>
                                        Thank you for sponsoring a {orgName} event at Texas A&M. Attached to this email is the invoice. Below are some payment options.<br /> <br />
                                        <u><b>To pay with check:</b></u><br />
                                        - Must be made out to "{orgName}"<br />
                                        - Mail to:<br /><br />
                                        <b>{orgName}<br />
                                            {streetAddress}<br />
                                            {streetAddress2}<br />
                                            {city}, {state} {zipcode}<br /></b> <br />
                                        <u><b>To pay with a credit card:</b></u><br />
                                            - Go to the <a target="_blank" rel="noreferrer" href="https://www.aggienetwork.com/giving/">Texas A&M Foundation website</a> <br />
                                        - Click on the maroon box on the top right side that reads “give now”<br /><br />
                                        - This will bring up a three-page sequence for you to enter information.  When you get to "I would like to give to" on the first page, select "An Unlisted Account (Enter Manually)"<br />
                                        - It'll show a box that says "enter name or number of fund" - type in <b>{fundName}</b> for that box<br />
                                        - The rest of the process consists of entering payment and other information<br /><br />

                                        Additionally, we ask that you only pay using the above methods. If you must pay us through a different platform, we request that you let us know so we can update our records. Payments made on other platforms do not give {orgName} payee and payment details and we will not be able to recognize your sponsorship unless we receive a notification.<br /><br />

                                            Let us know if you have any questions! <br /><br />

                                        <b>{orgName} Officer Team</b>

                                        </Typography>
                                    ) : (
                                        <Typography variant="body2" sx={{ fontSize: theme.spacing(3), mt: theme.spacing(2), ml: theme.spacing(4), mr: theme.spacing(4), mb: theme.spacing(3) }}>
                                            Thank you for sponsoring a {orgName} event at Texas A&M. Attached to this email is the invoice. Below are some payment options.<br /> <br />
                                            <u><b>To pay with check:</b></u><br />
                                            - Must be made out to "{orgName}"<br />
                                            - Mail to:<br /><br />
                                            <b>{orgName}<br />
                                                {streetAddress}<br />
                                                {city}, {state} {zipcode}<br /></b> <br />
                                            <u><b>To pay with a credit card:</b></u><br />
                                            - Go to the <a target="_blank" rel="noreferrer" href="https://www.aggienetwork.com/giving/">Texas A&M Foundation website</a> <br />
                                            - Click on the maroon box on the top right side that reads “give now”<br /><br />
                                            - This will bring up a three-page sequence for you to enter information.  When you get to "I would like to give to" on the first page, select "An Unlisted Account (Enter Manually)"<br />
                                            - It'll show a box that says "enter name or number of fund" - type in <b>{fundName}</b> for that box<br />
                                            - The rest of the process consists of entering payment and other information<br /><br />

                                            Additionally, we ask that you only pay using the above methods. If you must pay us through a different platform, we request that you let us know so we can update our records. Payments made on other platforms do not give {orgName} payee and payment details and we will not be able to recognize your sponsorship unless we receive a notification.<br /><br />

                                            Let us know if you have any questions! <br /><br />

                                            <b>{orgName} Officer Team</b>

                                        </Typography>
                                    )}
                            </Grid>
                        </Grid>
                    </Paper>



                </Grid>

                </> )}

                {notRegistered && (
                    <Grid container sx={{ backgroundColor:"#fff"}}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img style={{ maxHeight: theme.spacing(30), marginTop:theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                        </Grid>
                        
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                            <Typography variant="h5">
                                Your email is not associated with any student organization.
                                Logout below and try again!
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                            <Button onClick={() => logout({ returnTo: logoutRoute })} variant="contained" size="large" color="primary" sx={{
                                    borderRadius: 0,
                                    pt: theme.spacing(3),
                                    pb: theme.spacing(3),
                                    pl: theme.spacing(8),
                                    pr: theme.spacing(8),
                                    ml: theme.spacing(5),
                                }}>Logout</Button>
                        </Grid>
                    </Grid>
                )}

                {isLoading && (
                    <Grid container sx={{ backgroundColor:"#fff" }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                            <img style={{ maxHeight: theme.spacing(30), marginTop:theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                        </Grid>
                        
                        <Grid item xs={12} sx={{ maxHeight: theme.spacing(60), display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                            <Typography variant="h4">
                                ...
                            </Typography>
                        </Grid>
                        
                    </Grid>
                )}
            </Grid>
            
            

        </ThemeProvider>


    )
}

export default Dashboard