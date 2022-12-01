import React, { useState } from 'react';
import { Button, ButtonBase, Grid, IconButton, styled } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import Bug from '../../../assets/images/graphics/bug.svg';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import {useNavigate} from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';

interface Props {
    
}

const CheckBackLater = (props: Props) => {
    
    // console.log(organization)
    const navigate = useNavigate();

    const goHome = () => {
        //console.log("LOGO CLICKED");
        navigate("/")
    }

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
          width: '100% !important', // Overrides inline-style
          height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
          zIndex: 1,
        },
    }));      

    return (
        <ThemeProvider theme={theme}>

           
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="Go back to Home" placement="bottom"><ImageButton>
                        <img style={{ maxHeight: theme.spacing(30), marginTop:theme.spacing(10) }} 
                            src={Logo} 
                            alt="Sponsify logo" 
                            onClick={goHome} />
                    </ImageButton></Tooltip>
                </Grid>
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                    <Typography variant="h4">
                        Somethings Seems to have Gone Wrong...
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(6) }}>
                        <Typography variant="h6" sx={{ fontFamily: "Oxygen"}}>
                            Check back later...<b style={{ color: "#4baa89"}}> we are looking into it</b>
                    </Typography>
                </Grid>

               

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <img style={{ maxHeight: theme.spacing(60), marginTop: theme.spacing(4) }} src={Bug} alt="Bug" />
                </Grid>

                

            </Grid>
            
        </ThemeProvider>    


    )
}

export default CheckBackLater