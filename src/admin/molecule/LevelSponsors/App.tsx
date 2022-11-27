import * as React from 'react';
import { Grid } from '@mui/material';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';




interface Props {
    name: string,
    color_level: string,
    sponsors: any,
}

const LevelSponsors = (props: Props) => {

    const { name, color_level, sponsors} = props
    console.log(sponsors)

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                    <Typography variant="h6">{name} Sponsor</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                    <Paper variant="outlined" sx={{ 
                        borderRadius: 0, 
                        borderWidth: 1, 
                        borderColor: 'black', 
                        background: `${color_level}`, 
                        maxWidth: theme.spacing(80), 
                        minWidth: theme.spacing(80), 
                        minHeight: theme.spacing(30),
                        maxHeight: theme.spacing(30),
                        overflow: 'scroll',
                        }} 
                        elevation={0}>
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4), mb: theme.spacing(4) }}>

                            {sponsors.map((sponsor: any) => (                                
                                (
                                <React.Fragment key={sponsor._id}>
                                    <Grid item xs={1}>
                                        
                                    </Grid>

                                    <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'left', pl: theme.spacing(3) }}>
                                        <Typography variant="body2">{sponsor.company}</Typography>
                                    </Grid>

                                    <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'right', pr: theme.spacing(3) }}>
                                        <Typography variant="body2">{sponsor.totalAmount}</Typography>
                                    </Grid>

                                    <Grid item xs={1}>

                                    </Grid>

                                </React.Fragment>
                                )


                            )
                            )

                            }


                           


                        </Grid>
                    </Paper >
                </Grid>
            </Grid>

        </ThemeProvider>


    )
}

export default LevelSponsors