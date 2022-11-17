import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Event from '../../molecule/Event/App'
import GeneralDonation from '../../molecule/GeneralDonation/App'
import { Paper } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import HowItWorksContents from '../../molecule/HowItWorksContents/App'
import CartItem from '../../molecule/CartItem/App'
import { useNavigate } from "react-router-dom"
import { useCart } from '../../../contexts/Cart';
import { GetEnabledEvents, GetLevelByAmount } from '../../../utils/api-types';

interface Props {
}

const Events = (props: Props) => {
    
    const navigate = useNavigate();
    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '{}');
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || "' '");

    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () => setOpenInfo(false);

    const [openCart, setOpenCart] = React.useState(false);
    const handleOpenCart = () => setOpenCart(true);
    const handleCloseCart = () => setOpenCart(false);

    const { clearCart, cart } = useCart()

    const [levelName, setLevelName] = React.useState('');
    const [levelColor, setLevelColor] = React.useState('');
    const [events, setEvents] = React.useState<GetEnabledEvents>([]);
    const [total, setTotal] = React.useState(0);
    const [logo, setLogo] = React.useState("")

    React.useEffect(() => {
        const fetchData = async () => {
            let res = await fetch("/get-enabled-events/" + student_org_name)
            let data: GetEnabledEvents = await res.json()
            data.sort(
                (objA, objB) => {
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

        fetchData()
    }, [student_org_name])
    
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
    
    React.useEffect(() => {
        let localtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
        setTotal(localtotal)

        const fetchLevel = async () => {
            const response = await fetch('/get-level-by-amount/' + student_org_name + '/' + localtotal)
            const data: GetLevelByAmount = await response.json()
            setLevelName(data.name)
            setLevelColor(data.color)
        }
        
        fetchLevel()
    }, [cart, student_org_name])

    const checkout = () => {
        if (cart.at(0)) {
            navigate("/checkout")
        }
    }

    return (
        <ThemeProvider theme={theme}>

            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <IconButton onClick={handleOpenInfo} color="secondary" aria-label="Info" sx={{ mr: theme.spacing(8) }}>
                        <InfoIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ mt: theme.spacing(2), color: "#979797" }}>
                        VIEW ITEMS
                    </Typography>
                    <IconButton onClick={handleOpenCart} color="secondary" aria-label="add to shopping cart">
                        <ShoppingCartIcon />
                    </IconButton>
                </Grid>

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

                <Modal
                    open={openCart}
                    onClose={handleCloseCart}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    disableScrollLock
                >
                    <Box sx={{
                        position: 'absolute',
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
                        <Typography variant="h6" sx={{ fontWeight: 500, }}>
                            Sponsored Items
                        </Typography>

                        <Grid container>
                            {cart.map(item => (
                                <Grid item key={item.id} xs={12} sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2) }}>
                                    <CartItem name={item.name} date_start={item.date_start} short_description={item.short_description} price={item.price} quantity={item.quantity} id={item.id} />
                                </Grid>
                            ))}

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', m: theme.spacing(5) }}>
                                <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center', color: "#367c63" }}>Total:     ${total}</Typography>
                            </Grid>


                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', }}>
                                <Paper sx={{ borderRadius: 0, background: `${levelColor}`, maxWidth: theme.spacing(40), minWidth: theme.spacing(40), minHeight: theme.spacing(10) }} elevation={0}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center' }}>{levelName ? levelName + ' Sponsor' : 'Not yet qualified'}</Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left', mt: theme.spacing(5) }}>
                                <Button onClick={handleCloseCart} variant="contained" size="large" color="secondary" sx={{
                                    borderRadius: 0,
                                    pt: theme.spacing(3),
                                    pb: theme.spacing(3),
                                    pl: theme.spacing(8),
                                    pr: theme.spacing(8),
                                    ml: theme.spacing(5),
                                }}>Continue Looking</Button>
                            </Grid>

                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(5) }}>
                                <Button onClick={checkout} variant="contained" size="large" color="primary" sx={{
                                    borderRadius: 0,
                                    pt: theme.spacing(3),
                                    pb: theme.spacing(3),
                                    pl: theme.spacing(8),
                                    pr: theme.spacing(8),
                                    ml: theme.spacing(5),
                                }}>Checkout</Button>
                            </Grid>

                        </Grid>

                    </Box>
                    
                </Modal>

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
                        {student_org_short_name ? student_org_short_name + ' ' : ''}Events
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10) }}>
                    <Paper variant="outlined" sx={{ borderWidth: theme.spacing(0), maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(10) }} >
                        <Grid container>
                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(3), mt: theme.spacing(5) }}>
                                    SELECT
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(16), mt: theme.spacing(5) }}>
                                    DATE
                                </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(16), mt: theme.spacing(5) }}>
                                    EVENT NAME
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(16) }}>
                                    AVG ATTENDANCE
                                </Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(16) }}>
                                    OCCURANCES
                                </Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(30) }}>
                                    PRICE
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>

                <>
                    {events.map((event: any) =>   
                    <React.Fragment key={event._id}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                           {(event.name === 'General Donation') ? (
                                <GeneralDonation 
                                    id={event._id}
                                    short_description={event.briefDesc}
                                    long_description={event.desc}
                                />
                            ) : (
                                <Event 
                                    name={event.name}
                                    id={event._id}
                                    short_description={event.briefDesc}
                                    long_description={event.desc}
                                    avg_attendance={event.avgAttendance ? event.avgAttendance : '-'}
                                    occurances={event.totalSpots - event.spotsTaken}
                                    price={event.price}
                                    date_start={new Date(event.date)}
                                    date_end={event.endDate ? new Date(event.endDate) : undefined}
                                    total_spots = {event.totalSpots}
                                    spots_taken = {event.spotsTaken}
                                />
                            )}

                        </Grid>
                    </React.Fragment>
                    )}
                </>
              
                <Grid item  sx={{   margin: theme.spacing(6) }}>
                    <Button 
                            href="/levels" 
                            variant="contained" 
                            size="large" 
                            color="secondary" 
                        sx={{
                            color: 'white',
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
                            }}>Back</Button>
              
                </Grid>
                <Grid item xs sx={{ margin: theme.spacing(6) }}>

                    <Grid container direction="row-reverse">
                    <Grid item >
                            
                            <Button onClick={checkout} variant="contained" size="large" color="primary" sx={{
                                borderRadius: 0,
                                pt: theme.spacing(3),
                                pb: theme.spacing(3),
                                pl: theme.spacing(8),
                                pr: theme.spacing(8),
                                ml: theme.spacing(5),maxWidth: theme.spacing(40), minWidth: theme.spacing(50), minHeight: theme.spacing(15)
                            }}>Checkout</Button>
                        </Grid>
                        <Grid item>
                            <Paper sx={{ borderRadius: 0, background: `${levelColor}`, maxWidth: theme.spacing(50), minWidth: theme.spacing(40), minHeight: theme.spacing(15), alignItems:"center" }} elevation={0}>
                                <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(4), textAlign: 'center' }}>{levelName ? levelName + ' Sponsor' : 'Not yet qualified'}</Typography>
                            </Paper>

                        </Grid>
                        
                    </Grid>
                    
     

                </Grid>



            </Grid>
           

        </ThemeProvider >


    )
}

export default Events