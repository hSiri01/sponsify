import React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Approval from '../../../assets/images/graphics/approval.svg';



interface Props {
    
}

const NewUser = (props: Props) => {

    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [desc, setDesc] = React.useState("")

    const createOrgRequest = () => {
        fetch('/create-request', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                description: desc
            })
        })
            .then(() => {
                window.location.reload()})
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

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt:theme.spacing(6) }}>
                        <Typography variant="h6" sx={{ fontFamily: "Oxygen"}}>
                            Fill out some basic information and<b style={{ color: "#4baa89"}}> we will get back to you</b>
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mb: theme.spacing(5) }}>
                    <img style={{ maxHeight: theme.spacing(50), marginTop: theme.spacing(4) }} src={Approval} alt="Approval" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', }}>

                    <TextField
                        sx={{ minWidth: theme.spacing(80), maxWidth: theme.spacing(80), margin: theme.spacing(2) }}
                        id="outlined-basic"
                        label="Organization Name"
                        aria-label="empty textfield"
                        variant="outlined"
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                        />
                        
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', }}>

                    <TextField
                        sx={{ minWidth: theme.spacing(80), maxWidth: theme.spacing(80), margin: theme.spacing(2) }}
                        id="outlined-basic"
                        aria-label="empty textfield"
                        label="Organization Email"
                        variant="outlined"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    

                </Grid>

                <Grid item xs={3}>
                </Grid>

                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', }}>
                    <Typography variant="h6" sx={{ fontFamily: "Oxygen", fontWeight:700, mt: theme.spacing(10), textAlign: 'center' }}>
                        For what purposes will you be using our application? If you have a website please add the link in the description. 
                    </Typography>
                </Grid>

                <Grid item xs={3}>
                </Grid>


     
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(5)}}>
                    <TextareaAutosize
                        aria-label="empty textarea"
                        placeholder='Purpose of using our application'
                        minRows={8}
                        style={{ minWidth: theme.spacing(200), fontFamily: "Poppins", fontSize: theme.spacing(4) }}
                        onChange={(e)=> setDesc(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(6), }}>
                    <Button type="submit"  value="Upload" variant="contained" size="large" color="primary" 
                    onClick={createOrgRequest}
                    sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}

                    >SUBMIT</Button>

                </Grid>


               

                

            </Grid>
            
        </ThemeProvider>    


    )
}

export default NewUser