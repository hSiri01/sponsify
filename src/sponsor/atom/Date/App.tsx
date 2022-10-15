import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';




interface Props {
    date_1?: Date,
    date_2?: Date,
}

const Level = (props: Props) => {

    const {date_1, date_2} = props
    const monthNames = ["JAN", "FEB", "MAR", "APRIL", "MAY", "JUNE",
        "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"
    ];

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt:theme.spacing(0) }}>
                    {date_1 && date_2? 
                    (
                            <Grid container>
                                <Grid item xs={5}>
                                <Paper variant="outlined" sx={{ borderColor: "black", borderRadius: 0, maxWidth: theme.spacing(12), minWidth: theme.spacing(12), minHeight: theme.spacing(10) }} >
                                    <Paper elevation={0} sx={{ backgroundColor: "#4baa89", borderRadius: 0, maxWidth: theme.spacing(12), minWidth: theme.spacing(12), minHeight: theme.spacing(5) }} >
                                        <Typography sx={{ color: "white", textAlign: "center" }} variant="body1">{monthNames[date_1.getMonth() - 1]}</Typography>
                                    </Paper>
                                    <Typography sx={{ mt: theme.spacing(1), textAlign: "center" }} variant="body1">{date_1.getDate()}</Typography>
                                </Paper>  
                                </Grid>

                                <Grid item xs={2} sx={{mt:theme.spacing(4),}}>
                                    <Typography sx={{textAlign: "center" }} variant="body1">-</Typography>
                                </Grid>

                                <Grid item xs={5}>
                                    <Paper variant="outlined" sx={{ borderColor: "black", borderRadius: 0, maxWidth: theme.spacing(12), minWidth: theme.spacing(12), minHeight: theme.spacing(10) }} >
                                        <Paper elevation={0} sx={{ backgroundColor: "#4baa89", borderRadius: 0, maxWidth: theme.spacing(12), minWidth: theme.spacing(12), minHeight: theme.spacing(5) }} >
                                            <Typography sx={{ color: "white", textAlign: "center" }} variant="body1">{monthNames[date_2.getMonth() - 1]}</Typography>
                                        </Paper>
                                        <Typography sx={{ mt: theme.spacing(1), textAlign: "center" }} variant="body1">{date_2.getDate()}</Typography>
                                    </Paper>
                                </Grid>

                            </Grid>
                    ) : ( date_1?
                        (
                        <Paper variant = "outlined" sx = {{ borderColor: "black", borderRadius: 0, maxWidth: theme.spacing(15), minWidth: theme.spacing(15), minHeight: theme.spacing(15) }} >
                            <Paper elevation={0} sx={{ backgroundColor: "#4baa89", borderRadius: 0, maxWidth: theme.spacing(15), minWidth: theme.spacing(15), minHeight: theme.spacing(5) }} >
                                <Typography sx={{ color: "white", textAlign: "center" }} variant="body1">{monthNames[date_1.getMonth() - 1]}</Typography>
                            </Paper>
                        <Typography sx={{ mt: theme.spacing(1), textAlign: "center" }} variant="body1">{date_1.getDate()}</Typography>
                        </Paper> 
                        )
                        : (<></>)
                    )}    
                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default Level