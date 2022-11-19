import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';
import Date from '../../../sponsor/atom/Date/App'
import MediaQuery from 'react-responsive'



interface Props {
    company_name: string,
    rep_name: string,
    rep_email: string, 
    date_start: Date,
    date_end?: Date,
    event_name: string, 
    short_description: string, 
    purchase_date: Date, 
    price: number, 
}

const Transaction = (props: Props) => {

    const {company_name, rep_name, rep_email, date_start, date_end, event_name, short_description, purchase_date, price} = props

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>


                    <MediaQuery minWidth={1350}>
                    <Paper variant="outlined" 
                    sx={{ 
                        borderWidth: theme.spacing(.5), 
                        borderRadius: 0, 
                        borderColor:"#c2c2c2", 
                        maxWidth: theme.spacing(320),
                        minWidth: theme.spacing(320), 
                        minHeight: theme.spacing(20), 
                        mt:theme.spacing(2), 
                        mb: theme.spacing(2),
                          }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>

                            <Grid item xs={2}>
                                <Typography sx={{ fontWeight: "600", mt: theme.spacing(3)}} variant="h6">{company_name}</Typography>    
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(3)}}>
                                <Typography sx={{ fontWeight: "600" }} variant="body1">{rep_name}</Typography>
                                <Typography sx={{ color: "#979797" }} variant="body2">{rep_email}</Typography>
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(2), ml:theme.spacing(10), pr: theme.spacing(23) }}>
                                <Date date_1={date_start} date_2={date_end} />
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(2), pr: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="body1">{event_name}</Typography>
                                <Typography sx={{ color: "#979797" }} variant="body2">{short_description}</Typography>
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(5), ml: theme.spacing(8) }}>
                                <Typography sx={{ color: "#979797" }} variant="h6">{purchase_date.getMonth()}/{purchase_date.getDate()}/{purchase_date.getFullYear()}</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(5) }}>
                                <Typography sx={{ color:"#367c63", fontWeight: "600" }} variant="h6">${price}</Typography>
                            </Grid>

                        </Grid>
                        
                   </Paper>
                </MediaQuery>

                <MediaQuery minWidth={750} maxWidth={1349}>
                    <Paper variant="outlined"
                        sx={{
                            borderWidth: theme.spacing(.5),
                            borderRadius: 0,
                            borderColor: "#c2c2c2",
                            maxWidth: theme.spacing(170),
                            minWidth: theme.spacing(170),
                            minHeight: theme.spacing(20),
                            mt: theme.spacing(2),
                            mb: theme.spacing(2),
                            ml: "8%"
                        }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2)}}>

                            <Grid item xs={2} >
                                <Typography sx={{ fontWeight: "600", mt: theme.spacing(3) }} variant="body1">{company_name}</Typography>
                            </Grid>

                            <Grid item xs={4} sx={{ marginTop: theme.spacing(3),  }}>
                                <Typography sx={{ fontWeight: "600" }} variant="body1">{rep_name}</Typography>
                                <Typography sx={{ color: "#979797" }} variant="body2">{rep_email}</Typography>
                            </Grid>

                            <Grid item xs={3} sx={{ marginTop: theme.spacing(2), pr: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="body1">{event_name}</Typography>
                                <Typography sx={{ color: "#979797" }} variant="body2">{short_description}</Typography>
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(5), }}>
                                <Typography sx={{ color: "#979797" }} variant="body2">{purchase_date.getMonth()}/{purchase_date.getDate()}/{purchase_date.getFullYear()}</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(5) }}>
                                <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body2">${price}</Typography>
                            </Grid>

                        </Grid>

                    </Paper>
                </MediaQuery>

                <MediaQuery maxWidth={749}>
                    <Paper variant="outlined"
                        sx={{
                            borderWidth: theme.spacing(.5),
                            borderRadius: 0,
                            borderColor: "#c2c2c2",
                            maxWidth: theme.spacing(80),
                            minWidth: theme.spacing(80),
                            minHeight: theme.spacing(20),
                            mt: theme.spacing(2),
                            mb: theme.spacing(2),
                            ml: "15%"
                        }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2) }}>

                            

                            <Grid item xs={8} sx={{ marginTop: theme.spacing(3), pl: theme.spacing(1) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="body2">{rep_name}</Typography>
                                <Typography sx={{ color: "#979797" }} variant="body2">{rep_email}</Typography>
                            </Grid>

                            <Grid item xs={4} sx={{ marginTop: theme.spacing(3), pl: theme.spacing(5) }}>
                                <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body2">${price}</Typography>
                                <Typography sx={{ color: "#979797" }} variant="body2">{purchase_date.getMonth()}/{purchase_date.getDate()}/{purchase_date.getFullYear()}</Typography>
                            </Grid>

                            <Grid item xs={12} sx={{ marginTop: theme.spacing(5), pr: theme.spacing(3), textAlign:'center' }}>
                                <Typography sx={{ fontWeight: "600" }} variant="body1">{event_name}</Typography>
                                <Typography sx={{ color: "#979797" }} variant="body2">{short_description}</Typography>
                            </Grid>

                        </Grid>

                    </Paper>
                </MediaQuery>

                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default Transaction