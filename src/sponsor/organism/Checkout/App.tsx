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
import emailjs from '@emailjs/browser';
import { useRef, useLayoutEffect } from 'react';

interface Props {
    student_org_logo: string,
    level_name: string,
    level_color: string,
    total: number,
}

export const ContactUs = () => {
 

    var templateParams = {
        name: 'James',
        message: 'Check this out!'
    };
     
    emailjs.send('service_6dyo66b', 'template_lws75v9', templateParams,'hp2wOIVitPvUf_BKX')
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
           console.log('FAILED...', error);
        });
        
      
    
}

const Checkout = (props: Props) => {

    const { student_org_logo, level_color, level_name, total } = props

    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () => setOpenInfo(false);

    const { addToCart, removeFromCart, cart } = useCart();

    console.log(cart)

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
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={student_org_logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        Selected Events
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <TextField sx={{ minWidth: theme.spacing(80), mr: theme.spacing(10) }} id="outlined-basic" label="First Name" variant="outlined" />
                    <TextField sx={{ minWidth: theme.spacing(80) }} id="outlined-basic" label="Last Name" variant="outlined" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10), mb: theme.spacing(5) }}>
                    <TextField sx={{ minWidth: theme.spacing(80), mr: theme.spacing(10) }} id="outlined-basic" label="Email" variant="outlined" />
                    <TextField sx={{ minWidth: theme.spacing(80) }} id="outlined-basic" label="Company" variant="outlined" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2) }}>
                    <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(180), minWidth: theme.spacing(180), minHeight: theme.spacing(10), mt: theme.spacing(4) }} >
                        <Typography variant="body1" sx={{ pl: theme.spacing(5) }}>
                            SPONSORED ITEMS
                        </Typography>
                    </Paper>
                </Grid>

                {cart.map(item => {
                    console.log(item)
                    return (
                        <Grid key={item.id} item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2) }}>
                            <CartItem name={item.name} short_description={item.short_description} price={item.price} quantity={item.quantity} date_start={item.date_start} date_end={item.date_end} id={item.id} />
                        </Grid>
                    )
                })}

                <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(4), mb: theme.spacing(4), }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center', color: "#367c63" }}>Total:     ${cart.reduce((total, item) => total + item.price, 0)}</Typography>
                </Grid>


                <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'right', }}>
                    <Paper sx={{ borderRadius: 0, background: `#${level_color}`, maxWidth: theme.spacing(40), minWidth: theme.spacing(40), minHeight: theme.spacing(10) }} elevation={0}>
                        <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center' }}>{level_name} Sponsor</Typography>
                    </Paper>
                </Grid>


                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button variant="contained" size="large" onClick={ContactUs} color="primary" sx={{
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