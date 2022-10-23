import React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Level from '../../molecule/Level/App'

interface Props {
    student_org_name: string, 
    student_org_logo: string, 
}

const Levels = (props: Props) => {

    const { student_org_name, student_org_logo } = props

    const [levels, setLevels] = React.useState([{}])

    React.useEffect(() => {
        const fetchData = async() => {
            const data = await fetch("/get-all-levels/" + student_org_name)
                .then((res) => res.json()) 
                .then((data) => {
                    data.sort((a:any, b:any) => (a.minAmount < b.minAmount) ? 1 : -1)
                    setLevels(data)
                })

        }
        fetchData()

    }, [])


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

                <>
                    {levels.map((level: any) =>   
                    <>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(8) }}>
                                <Level name={level.name} lower_bound={level.minAmount} description={level.description} upper_bound={level.maxAmount} color_level={level.color} />
                            </Grid>
                    </>
                    )}
                </>            

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button 
                        href="/events-swe"
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