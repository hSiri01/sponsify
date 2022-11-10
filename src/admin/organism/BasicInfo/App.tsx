import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuBar from '../../molecule/MenuBar/App'
import FormData from 'form-data'


interface Props {

}


const BasicInfo = (props: Props) => {

    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '{}');
    const student_org_short_name = JSON.parse(localStorage.getItem('org-short-name') || '{}');
    const user_email = JSON.parse(localStorage.getItem('email') || '{}');
    
    const [orgName, setOrgName] = React.useState(student_org_name)
    const [orgShortName, setOrgShortName] = React.useState(student_org_short_name)
    
    const [orgFundName, setOrgFundName] = React.useState("")
    const [streetAddress, setStreetAddress] = React.useState("")
    const [streetAddress2, setStreetAddress2] = React.useState("")
    const [city, setCity] = React.useState("")
    const [state, setState] = React.useState("")
    const [zipcode, setZipcode] = React.useState(-1)

    const [image, setImage] = React.useState<any|null>(null);
    const [logo, setLogo] = React.useState('')
    
    const uploadPreset = 'db6q2mz0'
    const cloudName = "dmkykmach"

    console.log(student_org_name)
    
    React.useEffect(() => {
        const fetchOrgInfo = async() => {
            try {
                await fetch("/get-org-info/" + student_org_name)
                    .then((res) => res.json()) 
                    .then((data) => {
                        setLogo(data.logoImage)
                        setStreetAddress(data.address.streetAddress)
                        setStreetAddress2(data.address.streetAddress2)
                        setCity(data.address.city)
                        setState(data.address.state)
                        setZipcode(data.address.zip)
                        setOrgFundName(data.fundName)
                        setOrgShortName(data.shortName)
                    })
            }
            catch (e) {
                console.log("Error fetching org info ", (e))
            }
        }
        fetchOrgInfo()
    },[])

    const updateInfo = () => {
        fetch('/update-org-info', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user_email,
                name: orgName,
                address: {
                    streetAddress: streetAddress,
                    streetAddress2: streetAddress2,
                    city: city,
                    state: state,
                    zip: zipcode
                },
                fundName : orgFundName,
                shortName : orgShortName,
            })
        })
            .then(() => {
                localStorage.setItem('org-name', JSON.stringify(orgName))
                localStorage.setItem('org-short-name', JSON.stringify(orgShortName))
                window.location.reload()})
    }

    const handleCreateLogoUrl =  (url : string) => {

        if (url) {
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                logoImage : url,
                organization : student_org_name
            })
        }
        fetch("/create-logo", requestOptions)
            .then((res) => console.log("Finished ", res)) 
            .then ((data) => setLogo(url))
            console.log("handdle create set logo ", logo)
            
        }
    }

    const uploadImage =  () => {
        if (image) {
            const data = new FormData()
            data.append("file", image[0])
            data.append('upload_preset', uploadPreset)
            data.append('cloud_name','dmkykmach' ) 
            fetch("https://api.cloudinary.com/v1_1/dmkykmach/image/upload",{
              method:"post",
              body: data as any
            })
        .then(resp => resp.json())
        .then(data => {
        handleCreateLogoUrl(data.url)
        //setLogo(data.url)
        })
        .catch(err => console.log(err))
        }
    }

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
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} key={Date.now()} src={logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>





                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        {student_org_short_name} Basic Information
                    </Typography>
                </Grid>



                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>
                    <TextField
                        sx={{ minWidth: theme.spacing(100), mb: theme.spacing(4) }}
                        required
                        id="outlined-basic"
                        label={student_org_name==="new" ? "Organization Name Required" : "Organization"}
                        variant="outlined"
                        value={orgName === "new" ? "" : orgName}
                        onChange={ev => setOrgName(ev.target.value)} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(2) }}>
                    <TextField
                        sx={{ minWidth: theme.spacing(100) }}
                        id="outlined-basic"
                        label="Street Address"
                        variant="outlined"
                        value={streetAddress}
                        onChange={ev => setStreetAddress(ev.target.value)} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField
                        sx={{ minWidth: theme.spacing(100)}}
                        id="outlined-basic"
                        label="Street Address 2"
                        variant="outlined"
                        value={streetAddress2}
                        onChange={ev => setStreetAddress2(ev.target.value)} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField
                        sx={{ minWidth: theme.spacing(100)}}
                        id="outlined-basic"
                        label="City"
                        variant="outlined"
                        value={city}
                        onChange={ev => setCity(ev.target.value)} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField
                        sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2)}}
                        id="outlined-basic"
                        label="State"
                        variant="outlined"
                        value={state}
                        onChange={ev => setState(ev.target.value)} />

                    <TextField
                        sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2), mb: theme.spacing(4) }}
                        id="outlined-basic"
                        label="Zipcode"
                        variant="outlined"
                        value={zipcode > -1 ? zipcode : ""}
                        onChange={ev => setZipcode(+ev.target.value)} />

                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center',  }}>

                    <TextField
                        sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2)}}
                        id="outlined-basic"
                        label="Fund Name"
                        variant="outlined"
                        value={orgFundName}
                        onChange={ev => setOrgFundName(ev.target.value)} />

                    <TextField
                        sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2), mb: theme.spacing(4) }}
                        id="outlined-basic"
                        label="Short Name"
                        variant="outlined"
                        value={orgShortName}
                        onChange={ev => setOrgShortName(ev.target.value)} />

                </Grid>
               
                <Grid item xs={12} > 
                    
                        <iframe title="dummyframe" name="dummyframe" id="dummyframe" height="0%" width="0%"></iframe>
                        <form  onSubmit={uploadImage} action ="#" /*method="POST" action="/create-logo"*/ target = "dummyframe" encType="multipart/form-data">
                            <input type="hidden" name="organization" value={student_org_name} />
                            <Grid item xs = {12} sx ={{justifyContent: 'center',  display: 'flex',alignItems: 'center', margin:"auto", mt: theme.spacing(10)}}>
                            
                                <Button
                                variant="contained"
                                component="label"
                                size="large"
                                sx={{
                                    backgroundColor: '#434343', 
                                    borderRadius: 0,
                                    pt: theme.spacing(3),
                                    pb: theme.spacing(3),
                                    pl: theme.spacing(8),
                                    pr: theme.spacing(8),
                                    ml: theme.spacing(5),
                                    color:'white', 
                                }}
                            >
                                
                                Upload Logo
                                <input
                                    type="file"
                                    hidden
                                    name="image" 
                                    required
                                    onChange= {(e)=> setImage(e.target.files)}
                                />
                                </Button> 
                                </Grid>
                            
                            
                                
                                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', m: theme.spacing(6), }}>
                                    <Button type="submit" onClick={updateInfo} value="Upload" variant="contained" size="large" color="primary" sx={{
                                        borderRadius: 0,
                                        pt: theme.spacing(3),
                                        pb: theme.spacing(3),
                                        pl: theme.spacing(8),
                                        pr: theme.spacing(8),
                                        ml: theme.spacing(5),
                                    }} 
                                
                                    >SAVE</Button>

                            </Grid>
                            
                       </form>
                    
                    
                    

                </Grid> 


                


            </Grid>


            

        </ThemeProvider>


    )
}

export default BasicInfo