import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';



interface Props {

}

const GeneralDonation = (props: Props) => {


    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper variant="outlined" sx={{
                        borderColor:"#367c63",borderWidth: theme.spacing(.5), borderRadius: 0, maxWidth: theme.spacing(300), minWidth: theme.spacing(300), minHeight: theme.spacing(20), mt:theme.spacing(4) }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>
                            <Grid item xs={1} sx={{marginTop: theme.spacing(2)}}>
                                <Checkbox/>
                            </Grid>

                            <Grid item xs={2} sx={{pr:theme.spacing(15)}}>
                                <Typography sx={{ mt: theme.spacing(3), textAlign:'center', fontWeight: "600" }} variant="h6">-</Typography>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">General Donation</Typography>
                                <Typography sx={{ color:"#979797"}}variant="body1">Provide a General Donation</Typography>
                            </Grid>

                            <Grid item xs={2} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">-</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(3) }}>
                                <Typography sx={{ fontWeight: "600" }} variant="h6">1</Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Grid container sx={{ display: 'flex', justifyContent: 'center'}}>
                                    <Grid item xs={2} sx={{pt:theme.spacing(2) }}>
                                        <Typography sx={{ color: "#367c63", fontWeight: "600" }} variant="h6">$</Typography>
                                </Grid>
                                <Grid item xs={10}>
                                        <TextField sx={{ maxWidth: theme.spacing(20) }} id="outlined-basic" label="Price" variant="outlined" />
                                </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(1.5), pl: theme.spacing(9)}}>
                                <Typography sx={{ color: "#666666", fontSize:theme.spacing(8)}} variant="body1">
                                    {'>'}
                                </Typography>
                            </Grid>

                        </Grid>
                        
                   </Paper>
                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default GeneralDonation