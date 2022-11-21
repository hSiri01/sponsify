import {Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';
import Date from '../../atom/Date/App'
import MediaQuery from 'react-responsive'

import {useCart} from '../../../contexts/Cart'


export type CartItemType = {
    name: string,
    short_description: string, 
    price: number, 
    quantity: number,
    date_start: Date,
    date_end?: Date, 
    id: string
}

const CartItem = (props: CartItemType) => {

    const {name, short_description, price, quantity, date_start, date_end} = props

    const { removeFromCart } = useCart()

    return (
        <ThemeProvider theme={theme}>
            
            
            <MediaQuery minWidth={1350}>
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(180), minWidth: theme.spacing(180), minHeight: theme.spacing(20), mt: theme.spacing(4) }} >
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(3) }}>


                                <Grid item xs={3} sx={{ pr: theme.spacing(15) }}>
                                    <Date date_1={date_start} date_2={date_end} />
                                </Grid>

                                <Grid item xs={5}>
                                    <Typography sx={{ fontWeight: "600" }} variant="h6">{name}</Typography>
                                    <Typography sx={{ color: "#979797" }} variant="body1">{short_description}</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{ textAlign: "right" }}>
                                    <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                    <Typography sx={{ fontWeight: "600" }} variant="body1">Qt:{quantity}</Typography>
                                    <Typography onClick={() => removeFromCart(props.id)} sx={{ color: "#979797", cursor: 'pointer' }} variant="body2">Remove</Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            </MediaQuery>

            <MediaQuery minWidth={645} maxWidth={1349}>
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(140), minWidth: theme.spacing(140), minHeight: theme.spacing(20), mt: theme.spacing(4) }} >
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(3) }}>


                                <Grid item xs={3} sx={{ pr: theme.spacing(15) }}>
                                    <Date date_1={date_start} date_2={date_end} />
                                </Grid>

                                <Grid item xs={5}>
                                    <Typography sx={{ fontWeight: "600" }} variant="h6">{name}</Typography>
                                    <Typography sx={{ color: "#979797" }} variant="body1">{short_description}</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{ textAlign: "right" }}>
                                    <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                    <Typography sx={{ fontWeight: "600" }} variant="body1">Qt:{quantity}</Typography>
                                    <Typography onClick={() => removeFromCart(props.id)} sx={{ color: "#979797", cursor: 'pointer' }} variant="body2">Remove</Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            </MediaQuery> 

            <MediaQuery maxWidth={644}>
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(75), minWidth: theme.spacing(75), minHeight: theme.spacing(20), mt: theme.spacing(4) }} >
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(3) }}>

                               
                                <Grid item xs={8} sx={{ pr: theme.spacing(15) }}>
                                    <Date date_1={date_start} date_2={date_end} />
                                </Grid>
                                <Grid item xs={4}>
                                </Grid>

                                <Grid item xs={8} sx={{mt:theme.spacing(5)}}>
                                    <Typography sx={{ fontWeight: "600" }} variant="h6">{name}</Typography>
                                    <Typography sx={{ color: "#979797" }} variant="body1">{short_description}</Typography>
                                </Grid>

                                <Grid item xs={4} sx={{ textAlign: "right", mt: theme.spacing(5) }}>
                                    <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                    <Typography sx={{ fontWeight: "600" }} variant="body1">Qt:{quantity}</Typography>
                                    <Typography onClick={() => removeFromCart(props.id)} sx={{ color: "#979797", cursor: 'pointer' }} variant="body2">Remove</Typography>
                                </Grid>
                            </Grid>

                        </Paper>
                    </Grid>
                </Grid>
            </MediaQuery> 


        </ThemeProvider>


    )
}

export default CartItem