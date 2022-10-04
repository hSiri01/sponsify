import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
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


interface Props {
    student_org_logo: string, 
    level_name: string,
    level_color: string,
    total: number, 
}

const Events = (props: Props) => {

    const { student_org_logo, level_color,level_name, total } = props

    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () => setOpenInfo(false);

    const [openCart, setOpenCart] = React.useState(false);
    const handleOpenCart = () => setOpenCart(true);
    const handleCloseCart = () => setOpenCart(false);




    return (
        <ThemeProvider theme={theme}>

            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <IconButton onClick={handleOpenInfo} color="secondary" aria-label="Info" sx={{mr: theme.spacing(8)}}>
                        <InfoIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ mt: theme.spacing(2), color:"#979797" }}>
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
                        maxHeight:theme.spacing(100),
                        minHeight:theme.spacing(100),
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        overflow: 'scroll',
                    }}>
                       <HowItWorksContents/>
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
                        <Typography variant="h6" sx={{fontWeight:500, }}>
                            Sponsored Items
                        </Typography>

                        <Grid container>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m:theme.spacing(2) }}>
                                <CartItem name="First General Meeting" date_start={new Date(2022, 9, 12)} short_description="Present at First General Meeting" price={3500} quantity={1} /> 
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2) }}>
                                <CartItem name="Dinner and Develop" date_start={new Date(2022, 10, 24)} short_description="Sponsor a Design Workshop" price={750} quantity={1} />
                            </Grid>

                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', m: theme.spacing(5) }}>
                                <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center', color:"#367c63" }}>Total:     ${total}</Typography>

                            </Grid>


                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right',  }}>
                                <Paper sx={{ borderRadius: 0, background: `#${level_color}`, maxWidth: theme.spacing(40), minWidth: theme.spacing(40), minHeight: theme.spacing(10) }} elevation={0}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center' }}>{level_name} Sponsor</Typography>
                                </Paper>
                            </Grid>

                            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left', mt:theme.spacing(5) }}>
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
                                <Button href="/" variant="contained" size="large" color="primary" sx={{
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
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={student_org_logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        SWE Events
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <GeneralDonation/>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Event name="First General Meeting" 
                           short_description='Present at First General Meeting'
                           long_description='Blah'
                           avg_attendance={100}
                           occurances={1}
                           price={3500}
                           date_start= {new Date(2022, 9, 12)}
                           />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Event name="Leadership Conference"
                        short_description='Sponsor and Present at Conference'
                        long_description='Blah'
                        avg_attendance={50}
                        occurances={1}
                        price={2000}
                        date_start={new Date(2022, 10, 14)}
                        date_end={new Date(2022, 10, 16)}
                    />
                </Grid>

               

               

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    

                    <Paper sx={{ borderRadius: 0, background: `#${level_color}`, maxWidth: theme.spacing(40), minWidth: theme.spacing(50), minHeight: theme.spacing(15) }} elevation={0}>
                        <Typography variant="body1" sx={{fontWeight:600, pt: theme.spacing(4), textAlign:'center'}}>{level_name} Sponsor</Typography> 
                    </Paper>
                    
                    <Button href="/" variant="contained" size="large" color="primary" sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}>Checkout</Button>

                </Grid>


            </Grid>

        </ThemeProvider>


    )
}

export default Events