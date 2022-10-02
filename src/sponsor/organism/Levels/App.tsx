import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Level from '../../molecule/Level/App'

interface Props {
    student_org_logo: string, 
}

const Levels = (props: Props) => {

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
                        Sponsorship Levels
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <Typography variant="h6" sx={{ fontFamily: "Oxygen" }}>
                        Different levels come with <b style={{ color: "#4baa89" }}>different perks</b>
                    </Typography>
                </Grid>

                

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(8) }}>
                    <Level name="Diamond" lower_bound={5000} description="Be recognized and appreciated at our annual banquet along with everything included below" color_level="efefef"/>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4) }}>
                    <Level name="Platinum" lower_bound={3500} upper_bound={4999} description="Have the opportunity to be a title company at our first general meeting along with everything included below" color_level="ebeaea" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4) }}>
                    <Level name="Gold" lower_bound={2500} upper_bound={3499} description="Have the opportunity to present at some of our most widely attended events along with everything included below" color_level="ffefbe" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4) }}>
                    <Level name="Silver" lower_bound={1500} upper_bound={2499} description="Have the opportunity to advertise your company to our members along with everything included below" color_level="b7b7b7" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4) }}>
                    <Level name="Bronze" lower_bound={1000} upper_bound={1499} description="Have your company name on a T-Shirt if applicable to the event along with everything included below" color_level="eb9770" />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4) }}>
                    <Level name="Maroon" lower_bound={500} upper_bound={999} description="Display your company as a sponsor on our website and sponsor certain events" color_level="ca7171" />
                </Grid>


                

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button href="/events-swe"
                        variant="contained"
                        size="large"
                        color="secondary"
                        sx={{
                            color: 'white',
                            backgroundColor: '#434343',
                            borderRadius: 0,
                            fontFamily: 'Oxygen',
                            pt: theme.spacing(3),
                            pb: theme.spacing(3),
                            pl: theme.spacing(8),
                            pr: theme.spacing(8),
                            "&:hover": {
                                color: 'white',
                                backgroundColor: '#367c63',
                            }
                        }}>Next</Button>
                </Grid>


            </Grid>

        </ThemeProvider>


    )
}

export default Levels