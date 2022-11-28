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
import MediaQuery from 'react-responsive'

import {useLayoutEffect, useRef, useState} from 'react';


export type OrgEvent = {
    name: string,
    id: string,
    short_description: string, 
    long_description: string, 
    price: number, 
    avg_attendance?: number,
    occurrences: number,
    date_start: Date,
    date_end?: Date,
    total_spots: number,
    spots_taken: number
}

const Event = (props: OrgEvent) => {

    const {name, short_description, long_description, price, avg_attendance, occurrences, date_start, date_end, total_spots, spots_taken} = props

    const [openEvent, setOpenEvent] = React.useState(false);
    const handleOpenEvent = () => setOpenEvent(true);
    const handleCloseEvent = () => setOpenEvent(false);
    const { addToCart, removeFromCart, cart } = useCart();
    const [checked, setChecked] = React.useState(cart.find(e => e.id == props.id)? true : false);
    const [medQuery, setmedQuery] = React.useState(0)
    
   

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
                if (parsedValue > occurrences){
                    parsedValue = occurrences
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
    const ref = React.useRef<HTMLDivElement>(null)
    const refMid = React.useRef<HTMLDivElement>(null)
    const refSmall = React.useRef<HTMLDivElement>(null)

   
    const [height, setHeight] = React.useState(0);
    const [width,setWidth] = React.useState(0)
   
    useLayoutEffect(() => {
        
        if (ref.current) {
            const height = ref.current.clientHeight;
            const width = ref.current.clientWidth;
            setHeight(height);
            setWidth(width);
        }
        window.addEventListener('resize', updateSize);
        function updateSize () {
            console.log("update size")
            if (ref.current) {
                const changeHeight = ref.current.clientHeight;
                console.log("height: ", height)
                
                const changeWidth = ref.current.clientWidth;
                console.log("width: ", width)
                setHeight(changeHeight);
                setWidth(changeWidth);
            }
        }
        
        
    }, [ref]);
    useLayoutEffect(() => {
        
        if (refMid.current) {
            const height = refMid.current.clientHeight;
            const width = refMid.current.clientWidth;
            setHeight(height);
            setWidth(width);
        }
        window.addEventListener('resize', updateSizeMid);
        function updateSizeMid () {
            console.log("update Mid Ref size")
            if (refMid.current) {
                const changeHeight = refMid.current.clientHeight;
                const changeWidth = refMid.current.clientWidth;
                console.log("Mid height: ", height)
                console.log("Mid width: ", width)
                setHeight(changeHeight);
                setWidth(changeWidth);
            }
        }
        
        
    }, [refMid]);
    useLayoutEffect(() => {
        
        if (refSmall.current) {
            const height = refSmall.current.clientHeight;
            const width = refSmall.current.clientWidth;
            setHeight(height);
            setWidth(width);
        }
        window.addEventListener('resize', updateSizeMid);
        function updateSizeMid () {
            console.log("update Small Ref size")
            if (refSmall.current) {
                const changeHeight = refSmall.current.clientHeight;
                const changeWidth = refSmall.current.clientWidth;
                console.log("Small height: ", height)
                console.log("Small width: ", width)
                setHeight(changeHeight);
                setWidth(changeWidth);
            }
        }
        
        
    }, [refSmall]);
        
     
       
    
    return (
        <ThemeProvider theme={theme}>
            
            {(total_spots <= spots_taken) ? (
              
              <Grid container >
               <MediaQuery minWidth={1350}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper ref = {ref} variant="outlined" sx={{ borderWidth: theme.spacing(.5), borderRadius: 0, borderColor:"#c2c2c2", maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(20), mt:theme.spacing(4) }} >
     
                            <Grid  container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>
                                <Grid item xs={1} sx={{margin:"auto"}}>
                                    <Checkbox disabled />
                                </Grid>

                                <Grid item xs={2} sx={{pr:theme.spacing(15)}}>
                                    <Date date_1={date_start} date_2={date_end}/>
                                </Grid>

                                <Grid item xs={4}>
                                    <Typography sx={{ fontWeight: "600" }} variant="h6">{name}</Typography>
                                    <Typography sx={{ color: "#979797" }} variant="body1" dangerouslySetInnerHTML={{ __html: short_description }}/>
                                </Grid>

                                <Grid item xs={2} sx={{ marginTop: theme.spacing(3) }}>
                                    <Typography sx={{ fontWeight: "600" }} variant="h6">{avg_attendance}</Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                    <Typography sx={{ fontWeight: "600" }} variant="h6">{occurrences}</Typography>
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
                        
                        
                        <Paper variant="outlined"  sx={{ 
                         mt: theme.spacing(4),
                         alignItems: "center",
                         display: 'flex',
                         position: "absolute",
                         borderWidth: theme.spacing(.5), 
                         borderRadius: 0, 
                         borderColor:'rgba(52, 52, 52, 0.8)', 
                         maxWidth: theme.spacing(300), 
                         minWidth: theme.spacing(300), 
                         minHeight: theme.spacing(20), 
                         height: height,
                         width: width,
                         backgroundColor: 'rgba(52, 52, 52, 0.8)',}} >
                                <Grid container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center',  }}>
                                        <Typography sx={{ fontWeight: "600", color: "white" }} variant="h6">ALREADY SPONSORED</Typography>
                                    </Grid>
                                </Grid>
                        
                        </Paper>

                    </Grid>
                </MediaQuery>

                <MediaQuery minWidth={750} maxWidth={1349}>
                    <Grid item xs  ={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper ref={refMid} variant="outlined" sx={{ 
                            borderWidth: theme.spacing(.5), 
                            borderRadius: 0, 
                            borderColor: "#c2c2c2", 
                            maxWidth: theme.spacing(180), 
                            minWidth: theme.spacing(180), 
                            minHeight: theme.spacing(20), 
                            mt: theme.spacing(4) 
                            }} >
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(3) }}>
                                <Grid item xs={1} sx={{ marginTop: theme.spacing(2) }}>
                                    <Checkbox disabled />
                                </Grid>

                                <Grid item xs={2} sx={{  }}>
                                    <Date date_1={date_start} date_2={date_end} />
                                </Grid>

                                <Grid item xs={4} sx={{pl: theme.spacing(8), pr: theme.spacing(8)}}>
                                    <Typography sx={{ fontWeight: "600" }} variant="body1">{name}</Typography>
                                    <Typography sx={{ color: "#979797" }} variant="body2" dangerouslySetInnerHTML={{ __html: short_description }} />
                                </Grid>

                                <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                    <Typography sx={{ fontWeight: "600" }} variant="body1">{avg_attendance}</Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                    <Typography sx={{ fontWeight: "600" }} variant="body1">{occurrences}</Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                    <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ marginTop: theme.spacing(1.5), pl: theme.spacing(9) }}>
                                    <Typography onClick={handleOpenEvent} sx={{ cursor: "pointer", color: "#666666", fontSize: theme.spacing(8) }} variant="body1">
                                        {'>'}
                                    </Typography>
                                </Grid>

                            </Grid>
                        
                        </Paper>
                        
                        <Paper variant="outlined" sx={{ 
                            position: "absolute",
                            borderWidth: theme.spacing(.5), 
                            borderRadius: 0, 
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                            borderColor:'rgba(52, 52, 52, 0.8)',
                            alignItems:"center",
                            maxWidth: theme.spacing(180), 
                            minWidth: theme.spacing(180), 
                            minHeight: theme.spacing(20), 
                            mt: theme.spacing(4) ,
                            height: height,
                            width: width,
                            ml: "auto",
                            mr: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                            display:"flex"
                        
                            }} >
                                <Grid container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center',   }}>
                                        <Typography sx={{ fontWeight: "600", color: "white" }} variant="h6">ALREADY SPONSORED</Typography>
                                    </Grid>
                                </Grid>
                        
                        </Paper>
                        

                    </Grid>
                    
                </MediaQuery>

                <MediaQuery maxWidth={749} >
                    <Grid item xs  ={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper ref={refSmall} variant="outlined" sx={{ 
                            borderWidth: theme.spacing(.5), 
                            borderRadius: 0, 
                            borderColor: "#c2c2c2", 
                            maxWidth: theme.spacing(80), 
                            minWidth: theme.spacing(80), 
                            minHeight: theme.spacing(20), 
                            mt: theme.spacing(4) 
                            }} >
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', }}>
                                <Grid item xs={1} sx={{ pr: theme.spacing(5) }}>
                                    <Checkbox disabled />
                                </Grid>
                                <Grid item xs={12} sx={{}}>
                                </Grid>

                                <Grid item xs={3} sx={{}}>
                                </Grid>

                                <Grid item xs={5} sx={{ }}>
                                    <Date date_1={date_start} date_2={date_end} />
                                </Grid>

                                <Grid item xs={3} sx={{}}>
                                </Grid>

                                <Grid item xs={12} sx={{pl: theme.spacing(8), pr: theme.spacing(8), mt: theme.spacing(5)}}>
                                    <Typography sx={{ 
                                        fontWeight: "600",
                                        textAlign: 'center'
                                        }} variant="body1">{name}</Typography>
                                    <Typography sx={{ color: "#979797" }} variant="body2" dangerouslySetInnerHTML={{ __html: short_description }} />
                                </Grid>

                                <Grid item xs={12} sx={{ marginTop: theme.spacing(5) }}>
                                    <Typography sx={{ 
                                        fontWeight: "600",
                                        textAlign: 'center'
                                         }} variant="body1">Attendance: {avg_attendance}</Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ }}>
                                    <Typography sx={{ fontWeight: "600", textAlign: 'center' }} variant="body1">Occurrences: {occurrences}</Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ }}>
                                    <Typography sx={{ color: "#367c63", fontWeight: "600", textAlign: 'center' }} variant="body1">${price}</Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ marginTop: theme.spacing(1.5), display:'flex', justifyContent:'center'}}>
                                    <Typography onClick={handleOpenEvent} sx={{ cursor: "pointer", color: "#666666", fontSize: theme.spacing(8) }} variant="body1">
                                        {'>'}
                                    </Typography>
                                </Grid>

                            </Grid>
                        
                        </Paper>
                        
                        <Paper variant="outlined" sx={{ 
                            position: "absolute",
                            borderWidth: theme.spacing(.5), 
                            borderRadius: 0, 
                            maxWidth: theme.spacing(80), 
                            minWidth: theme.spacing(80), 
                            minHeight: theme.spacing(20), 
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                            borderColor:'rgba(52, 52, 52, 0.8)', 
                            mt: theme.spacing(4) ,
                            height: height,
                            width: width,
                            ml: "auto",
                            mr: "auto",
                            left: 0,
                            right: 0,
                            textAlign: "center",
                           
                        
                            }} >
                                <Grid container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', }}>
                                        <Typography sx={{ fontWeight: "600", color: "white" }} variant="h6">ALREADY SPONSORED</Typography>
                                    </Grid>
                                </Grid>
                        
                        </Paper>
                        

                    </Grid>
                  
                    
                </MediaQuery>

               
                
                
              </Grid>
             
                          
                           
                           ) : (
                                
                           
            <Grid container>
                <MediaQuery minWidth={1350}>
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
                                <Typography sx={{ color: "#979797" }} variant="body1" dangerouslySetInnerHTML={{ __html: short_description }}/>
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">{avg_attendance}</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">{occurrences}</Typography>
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
                                        <Typography sx={{ color: "#979797" }} variant="body1" dangerouslySetInnerHTML={{ __html: short_description }}/>
                                    </Grid>

                                    <Grid item xs={4} sx={{ textAlign: "right" }}>
                                        <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                        <Typography sx={{}} variant="body1">Occurrences: {occurrences}</Typography>
                                    </Grid>



                                </Grid>
                            </Paper>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item xs={10}>
                                        <Typography dangerouslySetInnerHTML={{__html: long_description}} variant="body1" />
                                    </Grid>
                                </Grid>

                                { occurrences > 1 ?
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
                </MediaQuery>

                <MediaQuery minWidth={750} maxWidth={1349}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper variant="outlined" sx={{ 
                            borderWidth: theme.spacing(.5), 
                            borderRadius: 0, 
                            borderColor: "#c2c2c2", 
                            maxWidth: theme.spacing(180), 
                            minWidth: theme.spacing(180), 
                            minHeight: theme.spacing(20), 
                            mt: theme.spacing(4) 
                            }} >
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(3) }}>
                                <Grid item xs={1} sx={{ marginTop: theme.spacing(2) }}>
                                    <Checkbox checked={checked}
                                        onChange={handleChange} />
                                </Grid>

                                <Grid item xs={2} sx={{  }}>
                                    <Date date_1={date_start} date_2={date_end} />
                                </Grid>

                                <Grid item xs={4} sx={{pl: theme.spacing(8), pr: theme.spacing(8)}}>
                                    <Typography sx={{ fontWeight: "600" }} variant="body1">{name}</Typography>
                                    <Typography sx={{ color: "#979797" }} variant="body2" dangerouslySetInnerHTML={{ __html: short_description }} />
                                </Grid>

                                <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                    <Typography sx={{ fontWeight: "600" }} variant="body1">{avg_attendance}</Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                    <Typography sx={{ fontWeight: "600" }} variant="body1">{occurrences}</Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                    <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                </Grid>

                                <Grid item xs={1} sx={{ marginTop: theme.spacing(1.5), pl: theme.spacing(9) }}>
                                    <Typography onClick={handleOpenEvent} sx={{ cursor: "pointer", color: "#666666", fontSize: theme.spacing(8) }} variant="body1">
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
                                maxWidth: theme.spacing(178),
                                minWidth: theme.spacing(178),
                                maxHeight: theme.spacing(100),
                                minHeight: theme.spacing(100),
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                overflow: 'scroll',
                            }}>
                                <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(170), minWidth: theme.spacing(170), minHeight: theme.spacing(20), m: theme.spacing(6) }} >

                                    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>


                                        <Grid item xs={3} sx={{ pr: theme.spacing(15) }}>
                                            <Date date_1={date_start} date_2={date_end} />
                                        </Grid>

                                        <Grid item xs={5}>
                                            <Typography sx={{ fontWeight: "600" }} variant="h6">{name}</Typography>
                                            <Typography sx={{ color: "#979797" }} variant="body1" dangerouslySetInnerHTML={{ __html: short_description }} />
                                        </Grid>

                                        <Grid item xs={4} sx={{ textAlign: "right" }}>
                                            <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                            <Typography sx={{}} variant="body1">Occurrences: {occurrences}</Typography>
                                        </Grid>



                                    </Grid>
                                </Paper>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item xs={10}>
                                        <Typography dangerouslySetInnerHTML={{ __html: long_description }} variant="body1" />
                                    </Grid>
                                </Grid>

                                {occurrences > 1 ?
                                    (
                                        <Grid container sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(8) }}>
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
                                    ) : (
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
                </MediaQuery>
           
                <MediaQuery maxWidth={749}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Paper variant="outlined" sx={{ 
                            borderWidth: theme.spacing(.5), 
                            borderRadius: 0, 
                            borderColor: "#c2c2c2", 
                            maxWidth: theme.spacing(80), 
                            minWidth: theme.spacing(80), 
                            minHeight: theme.spacing(20), 
                            mt: theme.spacing(4) 
                            }} >
                            <Grid container sx={{ display: 'flex', justifyContent: 'center', }}>
                                <Grid item xs={1} sx={{ pr: theme.spacing(5) }}>
                                    <Checkbox checked={checked}
                                        onChange={handleChange} />
                                </Grid>
                                <Grid item xs={12} sx={{}}>
                                </Grid>

                                <Grid item xs={3} sx={{}}>
                                </Grid>

                                <Grid item xs={5} sx={{ }}>
                                    <Date date_1={date_start} date_2={date_end} />
                                </Grid>

                                <Grid item xs={3} sx={{}}>
                                </Grid>

                                <Grid item xs={12} sx={{pl: theme.spacing(8), pr: theme.spacing(8), mt: theme.spacing(5)}}>
                                    <Typography sx={{ 
                                        fontWeight: "600",
                                        textAlign: 'center'
                                        }} variant="body1">{name}</Typography>
                                    <Typography sx={{ color: "#979797" }} variant="body2" dangerouslySetInnerHTML={{ __html: short_description }} />
                                </Grid>

                                <Grid item xs={12} sx={{ marginTop: theme.spacing(5) }}>
                                    <Typography sx={{ 
                                        fontWeight: "600",
                                        textAlign: 'center'
                                         }} variant="body1">Attendance: {avg_attendance}</Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ }}>
                                    <Typography sx={{ fontWeight: "600", textAlign: 'center' }} variant="body1">Occurrences: {occurrences}</Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ }}>
                                    <Typography sx={{ color: "#367c63", fontWeight: "600", textAlign: 'center' }} variant="body1">${price}</Typography>
                                </Grid>

                                <Grid item xs={12} sx={{ marginTop: theme.spacing(1.5), display:'flex', justifyContent:'center'}}>
                                    <Typography onClick={handleOpenEvent} sx={{ cursor: "pointer", color: "#666666", fontSize: theme.spacing(8) }} variant="body1">
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
                                maxWidth: theme.spacing(80),
                                minWidth: theme.spacing(80),
                                maxHeight: theme.spacing(100),
                                minHeight: theme.spacing(100),
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                                overflow: 'scroll',
                            }}>
                                <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(70), minWidth: theme.spacing(70), minHeight: theme.spacing(20), m: theme.spacing(6) }} >

                                    <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>

                                        <Grid item xs={4}>
                                        </Grid>
                                        <Grid item xs={5} sx={{}}>
                                            <Date date_1={date_start} date_2={date_end} />
                                        </Grid>
                                        <Grid item xs={3}>
                                        </Grid>

                                        <Grid item xs={12} sx={{mt: theme.spacing(5)}}>
                                            <Typography sx={{ fontWeight: "600", textAlign:'center' }} variant="h6">{name}</Typography>
                                            <Typography sx={{ color: "#979797", textAlign:'center' }} variant="body1" dangerouslySetInnerHTML={{ __html: short_description }} />
                                        </Grid>

                                        <Grid item xs={12} sx={{ textAlign: "center" }}>
                                            <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                            <Typography sx={{}} variant="body1">Occurrences: {occurrences}</Typography>
                                        </Grid>



                                    </Grid>
                                </Paper>

                                <Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Grid item xs={11}>
                                        <Typography dangerouslySetInnerHTML={{ __html: long_description }} variant="body1" />
                                    </Grid>
                                </Grid>

                                {occurrences > 1 ?
                                    (
                                        <Grid container sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(8) }}>
                                            <Grid item xs={4}>
                                                <TextField onChange={handleQuantityChange} sx={{ maxWidth: theme.spacing(40), mb: theme.spacing(5) }} id="outlined-basic" label="Quantity" variant="outlined" defaultValue={cart.filter(e => e.id === props.id)[0]?.quantity} />
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography sx={{ pt: theme.spacing(5), textAlign:'center' }} variant="body1">SELECT</Typography>
                                            </Grid>
                                            <Grid item sx={{ pt: theme.spacing(3) }} xs={2}>
                                                <Checkbox checked={checked}
                                                    onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                    ) : (
                                        <Grid container sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(8) }}>

                                            <Grid item xs={3}>
                                                <Typography sx={{ pt: theme.spacing(5) }} variant="body1">SELECT</Typography>
                                            </Grid>
                                            <Grid item sx={{ pt: theme.spacing(3) }} xs={2}>
                                                <Checkbox checked={checked}
                                                    onChange={handleChange} />
                                            </Grid>
                                        </Grid>
                                    )}




                            </Box>
                        </Modal>
                    </Grid>
                </MediaQuery>
           
           
            </Grid> 
                           )}
        </ThemeProvider>


    )
}

export default Event