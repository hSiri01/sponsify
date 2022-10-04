import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';



interface Props {
}

const HowItWorksContents = (props: Props) => {

    return (
        <ThemeProvider theme={theme}>

            <Grid container>
               
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        How It Works
                    </Typography>
                </Grid>


                
                <Grid item xs={12} sx={{margin: theme.spacing(6) }}>
                    <ol>
                        <li style={{paddingLeft:theme.spacing(5)}}>Select an <b style={{ color: "#4baa89" }}> event</b></li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}>Click the <b style={{ color: "#4baa89" }}>drop down button</b> to get more information</li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}>Have questions? Hover over the <b style={{ color: "#4baa89" }}> info button</b> to get this information at anytime.</li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4)  }}><b style={{ color: "#4baa89" }}>Add the events </b> that interest you.</li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}>Click <b style={{ color: "#4baa89" }}>checkout</b></li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}>Fill out some <b style={{ color: "#4baa89" }}>basic information</b> and <b style={{ color: "#4baa89" }}>submit your request</b>.</li>
                        <li style={{ paddingLeft: theme.spacing(5), marginTop: theme.spacing(4) }}><b style={{ color: "#4baa89" }}>Check your inbox </b> for an invoice and next steps.</li>
                        
                    </ol>
                </Grid>

               

            </Grid>
            
        </ThemeProvider>    


    )
}

export default HowItWorksContents