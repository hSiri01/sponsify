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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuBar from '../../molecule/MenuBar/App'


interface Props {
    student_org_logo: string,
    student_org_short_name: string,
    street_address: string, 
    street_address_2?: string, 
    city: string, 
    state: string, 
    zipcode: number, 
}

const BasicInfo = (props: Props) => {

    const { student_org_logo, student_org_short_name, street_address, street_address_2, city, state, zipcode} = props
    const student_org_name = JSON.parse(localStorage.getItem('org') || '{}');


    return (
        <ThemeProvider theme={theme}>

            <MenuBar student_org_short_name='swe' />

            <Grid container sx={{ backgroundColor: "#f3f3f3" }}>
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
                        {student_org_name} Basic Information
                    </Typography>
                </Grid>



                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>
                    <TextField sx={{ minWidth: theme.spacing(100), mb: theme.spacing(4) }} id="outlined-basic" label="Organization" variant="outlined" defaultValue={student_org_name} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(2) }}>
                    <TextField sx={{ minWidth: theme.spacing(100) }} id="outlined-basic" label="Street Address" variant="outlined" defaultValue={street_address} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField sx={{ minWidth: theme.spacing(100)}} id="outlined-basic" label="Street Address 2" variant="outlined" defaultValue={street_address_2} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField sx={{ minWidth: theme.spacing(100)}} id="outlined-basic" label="City" variant="outlined" defaultValue={city} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2)}} id="outlined-basic" label="State" variant="outlined" defaultValue={state} />

                    <TextField sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2), mb: theme.spacing(4) }} id="outlined-basic" label="Zipcode" variant="outlined" defaultValue={zipcode} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(8) }}>

                    <Button
                        variant="contained"
                        component="label"
                        size="large"
                        sx={{
                            backgroundColor: '#434343', 
                            borderRadius: 0,
                            pt: theme.spacing(3),
                            pb: theme.spacing(3),
                            pl: theme.spacing(8),
                            pr: theme.spacing(8),
                            ml: theme.spacing(5),
                            color:'white'
}}
                
                    >
                        Upload Logo
                        <input
                            type="file"
                            hidden
                        />
                    </Button>

                </Grid>


                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', m: theme.spacing(6), }}>
                    <Button variant="contained" size="large" color="primary" sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}>Save</Button>

                </Grid>


            </Grid>


            

        </ThemeProvider>


    )
}

export default BasicInfo