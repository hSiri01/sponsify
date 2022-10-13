import React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import Support from '../../../assets/images/graphics/support.svg';
import { theme, darkGreen } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HowItWorks from '../HowItWorks/App';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';



interface Props {
}

const SponsorHome = (props: Props) => {
    const [input, setInput] = React.useState('');
    const [org, setOrg] = React.useState('');
    const [buttonClick, setButtonClick] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);

    const handleCloseAlert = () => {
        // TO DO: Ask if they would prefer to clear after closing alert
        setInput('')
        setOpenAlert(false)
    }

    const handleOrgChange = async () => {
        if (input === '') {

            setOpenAlert(true)

        } else {

            let response = await fetch("/get-org/" + input)
            .then((res) => res.json())
            .then((data) => {
              if (data.name === undefined) {
                  console.log("invalid")
                  setOpenAlert(true)
              } else {
                  setOrg(data.name)
                  setButtonClick(true)
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
            { buttonClick ? 
            <HowItWorks organization={org} /> : 
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
                    // href="/how-it-works"
                    variant="contained" size="large" color="secondary" onClick={handleOrgChange}>Get Started</Button>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <img style={{ maxHeight: theme.spacing(60), marginTop: theme.spacing(10) }} src={Support} alt="Giving money" />
                </Grid>
            </Grid>
        }
            
        </ThemeProvider>    


    )
}

export default SponsorHome