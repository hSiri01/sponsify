import * as React from 'react';
import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Date from '../../atom/Date/App'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useCart } from '../../../contexts/Cart';




export type OrgEvent = {
    name: string,
    short_description: string, 
    long_description: string, 
    price: number, 
    avg_attendance?: number,
    occurances: number,
    date_start: Date,
    date_end?: Date, 
    id: number, 
}

const Event = (props: OrgEvent) => {

    const {name, short_description, long_description, price, avg_attendance, occurances, date_start, date_end} = props

    const [openEvent, setOpenEvent] = React.useState(false);
    const handleOpenEvent = () => setOpenEvent(true);
    const handleCloseEvent = () => setOpenEvent(false);

    const [checked, setChecked] = React.useState(false);

    const { addToCart, removeFromCart, cart } = useCart();
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        if (event.target.checked)
        {
            addToCart({
                name: name,
                short_description: short_description,
                price: price,
                quantity: 1,
                date_start: date_start,
                date_end: date_end,
                id: props.id
            })
        }
        else
        {
            removeFromCart(props.id)
        }
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value)
        {
            let parsedValue = +event.target.value
            if (parsedValue > 0)
            {
                if (parsedValue > occurances){
                    parsedValue = occurances
                }
                setChecked(true);
                addToCart({
                    name: name,
                    short_description: short_description,
                    price: price,
                    quantity: parsedValue,
                    date_start: date_start,
                    date_end: date_end,
                    id: props.id
                })
                return;
            }
        }
        setChecked(false);
        removeFromCart(props.id)
    };


    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper variant="outlined" sx={{ borderWidth: theme.spacing(.5), borderRadius: 0, borderColor:"#c2c2c2", maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(20), mt:theme.spacing(4) }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>
                            <Grid item xs={1} sx={{marginTop: theme.spacing(2)}}>
                                <Checkbox checked={checked}
                                    onChange={handleChange} />
                            </Grid>

                            <Grid item xs={2} sx={{pr:theme.spacing(15)}}>
                                <Date date_1={date_start} date_2={date_end}/>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">{name}</Typography>
                                <Typography sx={{ color:"#979797"}}variant="body1">{short_description}</Typography>
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">{avg_attendance}</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">{occurances}</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ color:"#367c63", fontWeight: "600" }} variant="h6">${price}</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(1.5), pl: theme.spacing(9)}}>
                                <Typography onClick={handleOpenEvent} sx={{ cursor: "pointer", color: "#666666", fontSize:theme.spacing(8)}} variant="body1">
                                    {'>'}
                                </Typography>
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
                            maxWidth: theme.spacing(200),
                            minWidth: theme.spacing(200),
                            maxHeight: theme.spacing(100),
                            minHeight: theme.spacing(100),
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            overflow: 'scroll',
                        }}>
                            <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(180), minWidth: theme.spacing(180), minHeight: theme.spacing(20), m:theme.spacing(6)}} >

                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>


                                    <Grid item xs={3} sx={{ pr: theme.spacing(15) }}>
                                        <Date date_1={date_start} date_2={date_end} />
                                    </Grid>

                                    <Grid item xs={5}>
                                        <Typography sx={{ fontWeight: "600" }} variant="h6">{name}</Typography>
                                        <Typography sx={{ color: "#979797" }} variant="body1">{short_description}</Typography>
                                    </Grid>

                                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                                        <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                        <Typography sx={{}} variant="body1">Occurances: {occurances}</Typography>
                                    </Grid>



                                </Grid>
                            </Paper>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item xs={10}>
                                        <Typography variant="body1">{long_description}</Typography>
                                    </Grid>
                                </Grid>

                                { occurances > 1 ?
                                (
                                    <Grid container sx = {{ display: 'flex', justifyContent: 'right', mt: theme.spacing(8) }}>
                                        <Grid item xs={3}>
                                            <TextField onChange={handleQuantityChange} sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(5) }} id="outlined-basic" label="Quantity" variant="outlined" defaultValue={cart.filter(e => e.id === props.id)[0]?.quantity} />
                                        </Grid>

                                        <Grid item xs={1}>
                                            <Typography sx={{ pt: theme.spacing(5) }} variant="body1">SELECT</Typography>
                                        </Grid>
                                        <Grid item sx={{ pt: theme.spacing(3) }} xs={1}>
                                            <Checkbox checked={checked}
                                                onChange={handleChange} />
                                        </Grid>
                                    </Grid>
                                ):(
                                    <Grid container sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(8) }}>

                                        <Grid item xs={1}>
                                            <Typography sx={{ pt: theme.spacing(5) }} variant="body1">SELECT</Typography>
                                        </Grid>
                                        <Grid item sx={{ pt: theme.spacing(3) }} xs={1}>
                                            <Checkbox checked={checked}
                                                onChange={handleChange} />
                                        </Grid>
                                    </Grid>
                                )}

                                

                            
                        </Box>
                    </Modal>
                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default Event