import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import HowItWorksContents from '../../molecule/HowItWorksContents/App'
import CartItem from '../../molecule/CartItem/App'
import TextField from '@mui/material/TextField'
import { useCart } from '../../../contexts/Cart';
import {useNavigate} from "react-router-dom"
import { GetLevelByAmount } from '../../../utils/api-types';
import { Organization } from '../../../utils/mongodb-types';


interface Props {
}

const Checkout = (props: Props) => {

    const navigate = useNavigate();
    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '{}');
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || '{}');

    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () => setOpenInfo(false);

    const [logo, setLogo] = React.useState("")
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
  
    const [firstNameInput, setFirstNameInput] = React.useState('');
    const [lastNameInput, setLastNameInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [companyInput, setCompanyInput] = React.useState('');
    const checkoutReady = firstNameInput && lastNameInput && emailInput && companyInput;
    
    const [levelName, setLevelName] = React.useState('');
    const [levelColor, setLevelColor] = React.useState('');

    const { cart } = useCart();
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    var cartMessage : string = ""
    const [orgAddress, setOrgAddress] = React.useState('');
    const [subject,setSubject] = React.useState('')
    
    React.useEffect(() => {
        fetch('/get-level-by-amount/' + student_org_name + '/' + total)
            .then((response) => response.json())
            .then((data: GetLevelByAmount) => {
                console.log(data)
                setLevelName(data.name)
                setLevelColor(data.color)
            })
    }, [student_org_name, total, cart])

    React.useEffect(() => {
        fetch('/get-org-info/' + student_org_name )
            .then((response) => response.json())
            .then((data: Organization) => {
                
               setOrgAddress(`${data.address.streetAddress} /n ${data.address.city}, ${data.address.state} ${data.address.zip}` )
               console.log(orgAddress) // FIXME: State changes are not immediate
            })
    }, [orgAddress, student_org_name])

    const submitCheckout = () => {
        if (cart.at(0) && checkoutReady ) {
            fetch('/checkout-events', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstNameInput,
                    lastName: lastNameInput,
                    company: companyInput,
                    email: emailInput,
                    sponsorLevel: levelName,
                    events: cart.map(item => item.id),
                    totalAmount: total,
                    org: student_org_name
                })
            })
            navigate("/inbox")
        }
    };
    const sendEmail = ()=>{
        
       
        
        setSubject( student_org_name + ' Sponsorship Information')
        fetch("/send-checkout-email",{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
        },
        body:JSON.stringify({
            firstNameInput,
            lastNameInput,
            emailInput,
            subject,
            cartMessage,
            student_org_name,
            student_org_short_name,
            orgAddress,
            total,
        })
        }).catch(err=>{
            console.log("Error found",err)
        })
    }
    return (
        <ThemeProvider theme={theme}>

            <Modal
                open={openInfo}
                onClose={handleCloseInfo}
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
                    <HowItWorksContents />
                </Box>
            </Modal>

            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <IconButton onClick={handleOpenInfo} color="secondary" aria-label="Info" >
                        <InfoIcon />
                    </IconButton>
                </Grid>

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

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        Selected Events
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <TextField 
                        sx={{ minWidth: theme.spacing(80), mr: theme.spacing(10) }} 
                        id="outlined-basic" 
                        label="First Name" 
                        variant="outlined"
                        value={firstNameInput} 
                        onChange={ev => setFirstNameInput(ev.target.value)} />
                    <TextField 
                        sx={{ minWidth: theme.spacing(80) }}
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        value={lastNameInput} 
                        onChange={ev => setLastNameInput(ev.target.value)} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10), mb: theme.spacing(5) }}>
                    <TextField 
                        sx={{ minWidth: theme.spacing(80), mr: theme.spacing(10) }} 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined"
                        value={emailInput} 
                        onChange={ev => setEmailInput(ev.target.value)} />
                    <TextField 
                        sx={{ minWidth: theme.spacing(80) }}
                        id="outlined-basic"
                        label="Company"
                        variant="outlined"
                        value={companyInput}
                        onChange={ev => setCompanyInput(ev.target.value)} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2) }}>
                    <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(180), minWidth: theme.spacing(180), minHeight: theme.spacing(10), mt: theme.spacing(4) }} >
                        <Typography variant="body1" sx={{ pl: theme.spacing(5) }}>
                            SPONSORED ITEMS
                        </Typography>
                    </Paper>
                </Grid>

                {cart.map(item => {
                    cartMessage += "Item:" + item.name +  "    Price: $" + item.price +   "    Quanitity:" +  item.quantity + "\n"
                    return (
                        <Grid key={item.id} item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2) }}>
                            <CartItem name={item.name} short_description={item.short_description} price={item.price} quantity={item.quantity} date_start={item.date_start} date_end={item.date_end} id={item.id} />
                        </Grid>
                    )
                })}
                <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(4), mb: theme.spacing(4), }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center', color: "#367c63" }}>Total:     ${total}</Typography>
                </Grid>


                <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'right', }}>
                    <Paper sx={{ borderRadius: 0, background: `${levelColor}`, maxWidth: theme.spacing(40), minWidth: theme.spacing(40), minHeight: theme.spacing(10) }} elevation={0}>
                        <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center' }}>{levelName} {levelName ? 'Sponsor' : ''}</Typography>
                    </Paper>
                </Grid>


                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button onClick={(event) => { submitCheckout(); sendEmail();}} variant="contained" size="large" color="primary" sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}>Submit</Button>
                </Grid>


            </Grid>

        </ThemeProvider>
    )
}

export default Checkout