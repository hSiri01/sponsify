import React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import Support from '../../../assets/images/graphics/support.svg';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import {useNavigate} from "react-router-dom"
import { VerifySponsorCode } from '../../../utils/api-types';


interface Props {
}

const SponsorHome = (props: Props) => {
    const [input, setInput] = React.useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const navigate = useNavigate();

    const handleCloseAlert = () => {
        setInput('')
        setOpenAlert(false)
    }

    const handleVerifyCode = async () => {
        if (input === '') {

            setOpenAlert(true)

        } else {

            await fetch("/verify-sponsor-code/" + input)
            .then((res) => res.json())
            .then((data: VerifySponsorCode) => {
                if (!('name' in data)) {
                    console.log("invalid")
                    setOpenAlert(true)
                } else {
                    // TODO: Add logo to localstorage or decide if we want to call everytime
                    localStorage.setItem('org-name', JSON.stringify(data.name))
                    localStorage.setItem('org-short-name', JSON.stringify(data.shortName))
                    navigate("/how-it-works")
                }
          });

        }
    }

    const handleChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpenAlert(false)
        setInput(event.target.value )
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop:theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>
                
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop:theme.spacing(10) }}>
                    <Typography variant="h4">
                        Welcome to Sponsify
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(6) }}>
                        <Typography variant="h6" sx={{ fontFamily: "Oxygen"}}>
                            Insert your Sponsor code to <b style={{ color: "#4baa89"}}>get started</b>
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(0) }}>
                    <Collapse in={openAlert}>
                        <Alert
                        action={
                            <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseAlert}
                            >
                            <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                        severity="error"
                        >
                        Invalid code. Try again!
                        </Alert>
                    </Collapse>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <TextField id="outlined-basic" label="Sponsor Code" variant="filled" sx={{width:theme.spacing(70)}} value={input} onChange={handleChange()}/>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <Button 
                    variant="contained" size="large" color="secondary" onClick={handleVerifyCode}>Get Started</Button>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <img style={{ maxHeight: theme.spacing(60), marginTop: theme.spacing(10) }} src={Support} alt="Giving money" />
                </Grid>
            </Grid>
            
        </ThemeProvider>    


    )
}

export default SponsorHome