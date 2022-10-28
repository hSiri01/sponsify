import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import MenuBar from '../../molecule/MenuBar/App'
import FormData from 'form-data'
import axios from "axios";
import * as dotenv from 'dotenv'
import { isCompositeComponent } from 'react-dom/test-utils';
import { convertRoutesToDataRoutes } from '@remix-run/router/dist/utils';
import { AnyAaaaRecord } from 'dns';
var sha1 = require('sha1')

// const axios = require('axios').default;

const preset = 'your Upload presets';
interface Props {
    student_org_logo: string,
    student_org_short_name: string,
    student_org_name: string, 
    street_address: string, 
    street_address_2?: string, 
    city: string, 
    state: string, 
    zipcode: number, 
}


const BasicInfo = (props: Props) => {
    const [image, setImage] = React.useState<any|null>(null);
    const [imageFile, setFile] = React.useState();
    const { student_org_logo, student_org_short_name, student_org_name, street_address, street_address_2, city, state, zipcode} = props
    const [org, setOrg] = React.useState('')
    const [url, setUrl] = React.useState('')
    const [logo, setLogo] = React.useState('')
    const [selectedFile, setSelectedFile] = React.useState<any|null>(null);
    
    const uploadPreset = 'db6q2mz0'
    const cloudName = "dmkykmach"
      
    
    React.useEffect(() => {
        const fetchLogo = async() => {
           try{
             const data1 = await fetch("/get-logo/" + student_org_name)
                .then((res) => res.json()) 
                .then((data1) => setLogo(data1.logoImage))
           }
           catch(e){
            console.log("errror found",(e))
           }
               
        }
        
        fetchLogo() 

      },[])
    const handleCreateLogoUrl = async () => {

        if(url){
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                logoImage : url,
                organization : student_org_name
            })
        }
        await fetch("/create-logo", requestOptions)
            .then((res) => console.log("Finished " + res)) 
    }
     
    }
    const uploadImage = () => {
       
        if(image){
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
        setUrl(data.url)
        })
        .catch(err => console.log(err))
        
        }
       
        handleCreateLogoUrl()
        
    }


    return (
        <ThemeProvider theme={theme}>

            <MenuBar student_org_short_name='swe' />

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
                        {student_org_short_name} Basic Information
                    </Typography>
                </Grid>



                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>
                    <TextField sx={{ minWidth: theme.spacing(100), mb: theme.spacing(4) }} id="outlined-basic" label="Organization" variant="outlined" defaultValue={student_org_name} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(2) }}>
                    <TextField sx={{ minWidth: theme.spacing(100) }} id="outlined-basic" label="Street Address" variant="outlined" defaultValue={street_address} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField sx={{ minWidth: theme.spacing(100)}} id="outlined-basic" label="Street Address 2" variant="outlined" defaultValue={street_address_2} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField sx={{ minWidth: theme.spacing(100)}} id="outlined-basic" label="City" variant="outlined" defaultValue={city} />

                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(6) }}>

                    <TextField sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2)}} id="outlined-basic" label="State" variant="outlined" defaultValue={state} />

                    <TextField sx={{ minWidth: theme.spacing(10), margin: theme.spacing(2), mb: theme.spacing(4) }} id="outlined-basic" label="Zipcode" variant="outlined" defaultValue={zipcode} />

                </Grid>
                <Grid item xs={12} > 
                    
                        <iframe name="dummyframe" id="dummyframe" height="0%" width="0%"></iframe>
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
                                    <Button type="submit" value="Upload" variant="contained" size="large" color="primary" sx={{
                                        borderRadius: 0,
                                        pt: theme.spacing(3),
                                        pb: theme.spacing(3),
                                        pl: theme.spacing(8),
                                        pr: theme.spacing(8),
                                        ml: theme.spacing(5),
                                    }} 
                                
                                    >Save</Button>

                            </Grid>
                            
                       </form>
                    
                    
                    

                </Grid> 


                


            </Grid>


            

        </ThemeProvider>


    )
}

export default BasicInfo