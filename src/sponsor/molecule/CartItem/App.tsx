import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Date from '../../atom/Date/App'



interface Props {
    name: string,
    short_description: string, 
    price:number, 
    quantity: number,
    date_start: Date,
    date_end?: Date, 
}

const Event = (props: Props) => {

    const {name, short_description, price, quantity, date_start, date_end} = props

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper variant="outlined" sx={{ borderStyle:"none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor:"#c2c2c2", maxWidth: theme.spacing(180), minWidth: theme.spacing(180), minHeight: theme.spacing(20), mt:theme.spacing(4) }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>
                            

                            <Grid item xs={3} sx={{pr:theme.spacing(15)}}>
                                <Date date_1={date_start} date_2={date_end}/>
                            </Grid>

                            <Grid item xs={5}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">{name}</Typography>
                                <Typography sx={{ color:"#979797"}}variant="body1">{short_description}</Typography>
                            </Grid>

                            <Grid item xs={4} sx={{textAlign:"right"}}>
                                <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="body1">${price}</Typography>
                                <Typography sx={{ fontWeight: "600" }} variant="body1">Qt:{quantity}</Typography>
                                <Typography sx={{ color:"#979797" }} variant="body2">Remove</Typography>
                            </Grid>

                          

                            

                        </Grid>
                        
                   </Paper>
                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default Event