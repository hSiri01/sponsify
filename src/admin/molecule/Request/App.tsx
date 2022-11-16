import * as React from 'react';
import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';
import Date from '../../../sponsor/atom/Date/App'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check'; 
import ClearIcon from '@mui/icons-material/Clear';




interface Props {
    _id: string
    org_name: string,
    org_email: string, 
    date: Date,
    purpose: string, 
}

const Request = (props: Props) => {

    const {_id, org_name, org_email, date, purpose} = props

    const grantAccess = () => {
        fetch('/request-to-org', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: org_email,
                name: org_name,
                id: _id
            })
        })
        
        console.log("Access granted")
        
    }

    const denyAccess = () => {
        fetch('/delete-request', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: org_email,
                id: _id
            })
        })
        
        console.log("Access denied")
    }
   
    
    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper variant="outlined" sx={{ borderWidth: theme.spacing(.5), borderRadius: 0, borderColor:"#c2c2c2", maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(20), mt:theme.spacing(2), mb: theme.spacing(2) }} >
                        <Grid container sx={{ display: 'flex'}}>
                            

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(2) }}>
                                <Date date_1={date} />
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(4) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="body1">{org_name}</Typography>
                                <Typography sx={{ color: "#979797" }} variant="body2">{org_email}</Typography>
                            </Grid>

                            <Grid item xs={5} sx={{ marginTop: theme.spacing(2), pr: theme.spacing(3), ml: theme.spacing(5), mt:theme.spacing(4) }}>
                                <Typography sx={{ fontWeight: "400" }} variant="body2">{purpose}</Typography>
                                
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(5) }}>
                                <IconButton onClick={grantAccess} color="primary" aria-label="Enable" sx={{ ml: theme.spacing(10), mb: theme.spacing(2), }}>
                                    <CheckIcon />
                                </IconButton>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(5) }}>
                                <IconButton onClick={denyAccess} color="secondary" aria-label="Deny" sx={{ mb: theme.spacing(2),  color: "#ef5350" }}>
                                    <ClearIcon />
                                </IconButton>
                            </Grid>


                        </Grid>

                   </Paper>

                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default Request