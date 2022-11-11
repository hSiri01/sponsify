import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import MenuBar from '../../molecule/MenuBar/App'
import Transaction from '../../molecule/Transaction/App';
import { Paper } from '@mui/material';
import LevelSponsors from '../../molecule/LevelSponsors/App';
import { Event, Sponsor } from '../../../utils/mongodb-types';
import { GetAllLevels, GetAllPurchasedEvents, GetAllSponsors } from '../../../utils/api-types';



interface Props {
}

const PurchaseHistory = (props: Props) => {

    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '{}');
    const [logo, setLogo] = React.useState("")
    
    React.useEffect(() => {
        const fetchLogo = async() => {
           try{
             await fetch("/get-logo/" + student_org_name)
                .then((res) => res.json()) 
                .then((data1) => setLogo(data1.logoImage))
           }
           catch(e){
            console.log("Error fetching logo ",(e))
           }
               
        }
        
        fetchLogo() 

    },[])

    const [purchases, setPurchases] = React.useState<GetAllPurchasedEvents>([]);
    const [sponsors, setSponsors] = React.useState<GetAllSponsors>([]);
    const [levels, setLevels] = React.useState<GetAllLevels>([]);
    const [total, setTotal] = React.useState(0);

    React.useEffect(() => {
        const fetchData = async () => {
            await fetch("/get-all-purchased-events/" + student_org_name)
                .then((res) => res.json())
                .then((data: GetAllPurchasedEvents) => {
                    // console.log(data)
                    // FIXME: typing inconsistent?
                    data.sort(
                        (objA, objB) => {
                            const date1 = new Date(objA.dateSponsored)
                            const date2 = new Date(objB.dateSponsored)
                            return date1.getTime() - date2.getTime()
                        }
                    )
                    setPurchases(data)
                }
            )

            await fetch("/get-all-sponsors/" + student_org_name)
                .then((res) => res.json())
                .then((data2: GetAllSponsors) => {
                    // console.log(data2)
                    setSponsors(data2)

                    let total_sponsored = data2.reduce((accumulator, current) => accumulator + current.totalAmount, 0)
                    
                    setTotal(total_sponsored)

                }
            )

            await fetch("/get-all-levels/" + student_org_name)
                .then((res) => res.json())
                .then((data3: GetAllLevels) => {
                    // console.log(data3)
                    setLevels(data3)
                }
            )
        }

        fetchData()
    }, [student_org_name])

    // console.log(purchases)
    
    return (

        <ThemeProvider theme={theme}>


            <MenuBar />

            <Grid container sx={{ backgroundColor: "#f3f3f3" }}>
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
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>


                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        Purchase History
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="body1">
                        TOTAL SPONSORED
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(2), }}>
                    <Typography variant="h5" sx={{ color: '#4baa89', fontWeight: 600, }}>
                        ${total}
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ textAlign: 'center', justifyContent: 'center', ml: theme.spacing(15) }}>

                    <Grid container sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(5) }}>

                        {levels.map((level: any) => (
                            (<Grid item xs={2}>
                                <LevelSponsors sponsors={sponsors.filter((sponsor:any) => sponsor.sponsorLevel === level.name)} name={level.name} color_level={level.color} />
                            </Grid>)


                        )
                        )

                        }
                        
                      

                    </Grid>

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10) }}>
                    <Paper variant="outlined" sx={{ backgroundColor: 'transparent', borderWidth: theme.spacing(0), maxWidth: theme.spacing(350), minWidth: theme.spacing(340), minHeight: theme.spacing(10) }} >
                        <Grid container>
                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(3) }}>
                                    DELETE
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", textAlign: 'left', mt: theme.spacing(5), ml: theme.spacing(7) }}>
                                    COMPANY NAME
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(10), mt: theme.spacing(5) }}>
                                    COMPANY REP
                                </Typography>
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant="body2" sx={{ color: "#979797", ml: theme.spacing(23), mt: theme.spacing(5) }}>
                                    DATE
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5) }}>
                                    EVENT
                                </Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(3) }}>
                                    DATE
                                </Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <Typography variant="body2" sx={{ color: "#979797", mt: theme.spacing(5), ml: theme.spacing(8) }}>
                                    PRICE
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>




                {/* <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>

                    <Transaction company_name="Capital One"
                        rep_name="Lauren Kotke"
                        rep_email='lauren.raleigh@capitalone.com'
                        event_name='General Donation'
                        short_description='Provide a General Donation'
                        purchase_date={new Date(2022,9,10)}
                        price={750}
                        date_start={new Date(2022, 10, 14)}
                        />
                    
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>

                    <Transaction company_name="Capital One"
                        rep_name="Lauren Kotke"
                        rep_email='lauren.raleigh@capitalone.com'
                        event_name='Leadership Conference'
                        short_description='Present at Conference'
                        purchase_date={new Date(2022,9,11)}
                        price={2500}
                        date_start={new Date(2022, 10, 14)}
                        date_end={new Date(2022, 10, 16)}
                        />
                    
                </Grid> */}

               
                <>
                    {purchases.map((purchase) => {
                        // FIXME: Change keying for outer purchase fragment
                        let sponsor = purchase.sponsorID as Sponsor
                        // console.log(purchase)
                        return <React.Fragment key={purchase._id}>
                        {purchase.events && 
                            purchase.events.map((e) => {
                                let event = e as Event
                                return (
                               
                                <React.Fragment key={event._id}>
                                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>

                                        <Transaction 
                                            totalAmount={purchase.totalAmount}
                                            purchaseId={purchase._id}
                                            eventId={event._id}
                                            sponsorId={sponsor._id}
                                            company_name={sponsor.company}
                                            rep_name={sponsor.firstName + " " + sponsor.lastName}
                                            rep_email={sponsor.email}
                                            event_name={event.name}
                                            short_description={event.briefDesc}
                                            purchase_date={new Date(purchase.dateSponsored)}
                                            price={event.price}
                                            date_start={new Date(event.date)}
                                            date_end={event.endDate ? new Date(event.endDate) : undefined}
                                        />

                                    </Grid>
                                </React.Fragment>
                           
                            )
                                }
                            )
                        }
                        </React.Fragment>
                    }

                    )} 
                </>


            </Grid>



        </ThemeProvider>


    )
}

export default PurchaseHistory