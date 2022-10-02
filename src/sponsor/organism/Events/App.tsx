import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Event from '../../molecule/Event/App'
import GeneralDonation from '../../molecule/GeneralDonation/App'



interface Props {
    student_org_logo: string, 
}

const Events = (props: Props) => {

    const { student_org_logo } = props


    return (
        <ThemeProvider theme={theme}>

            <Grid container>
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
                        SWE Events
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <GeneralDonation/>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Event name="First General Meeting" 
                           short_description='Present at First General Meeting'
                           long_description='Blah'
                           avg_attendance={100}
                           occurances={1}
                           price={3500}
                           date_start= {new Date(2022, 9, 12)}
                           />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Event name="Leadership Conference"
                        short_description='Sponsor and Present at Conference'
                        long_description='Blah'
                        avg_attendance={50}
                        occurances={1}
                        price={2000}
                        date_start={new Date(2022, 10, 14)}
                        date_end={new Date(2022, 10, 16)}
                    />
                </Grid>

               

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button href="/" variant="contained" size="large" color="secondary" sx={{
                        borderRadius:0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8)}}>Checkout</Button>
                </Grid>


            </Grid>

        </ThemeProvider>


    )
}

export default Events