import * as React from 'react';
import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import { Paper } from '@mui/material';
import Date from '../../../sponsor/atom/Date/App'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';




interface Props {
    totalAmount: number,
    eventId: string,
    purchaseId: string,
    sponsorId: string,
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
    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '""');
    const [openConfirmation, setOpenConfirmation] = React.useState(false)

    const handleOpenConfirmation = () => setOpenConfirmation(true)
    const handleCloseConfirmation = () => setOpenConfirmation(false)

    const handleDeletePurchase = async() => {
        console.log("Deleting...")

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: student_org_name,
                totalAmount: props.totalAmount,
                purchaseId: props.purchaseId,
                eventId: props.eventId,
                sponsorId: props.sponsorId,
                eventPrice: price
            })
        }

        fetch("/delete-event-from-purchase", requestOptions)
        window.location.reload()
        // handleCloseConfirmation()
    }

    return (
        <ThemeProvider theme={theme}>
            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Paper variant="outlined" sx={{ borderWidth: theme.spacing(.5), borderRadius: 0, borderColor:"#c2c2c2", maxWidth: theme.spacing(420), minWidth: theme.spacing(350), minHeight: theme.spacing(20), mt:theme.spacing(2), mb: theme.spacing(2) }} >
                        <Grid container sx={{ display: 'flex', justifyContent: 'center', margin:theme.spacing(3)}}>
                            <Grid item xs={1} sx={{ marginTop: theme.spacing(5) }}>
                                <IconButton color="secondary" aria-label="Edit" onClick={handleOpenConfirmation} sx={{ ml: theme.spacing(5), mb: theme.spacing(2), pt: theme.spacing(0) }}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography sx={{ fontWeight: "600", mt: theme.spacing(3), ml: theme.spacing(8)}} variant="h6">{company_name}</Typography>    
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

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(5), ml: theme.spacing(8) }}>
                                <Typography sx={{ color: "#979797" }} variant="h6">{purchase_date.getMonth()}/{purchase_date.getDate()}/{purchase_date.getFullYear()}</Typography>
                            </Grid>

                            <Grid item xs={1} sx={{ marginTop: theme.spacing(5), ml: theme.spacing(10) }}>
                                <Typography sx={{ color:"#367c63", fontWeight: "600" }} variant="h6">${price}</Typography>
                            </Grid>

                        </Grid>

                        <Modal
                            open={openConfirmation}
                            onClose={handleCloseConfirmation}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            disableScrollLock
                        >
                            <Box sx={{
                                position: 'absolute' as 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                maxWidth: theme.spacing(200),
                                minWidth: theme.spacing(150),
                                maxHeight: theme.spacing(100),
                                minHeight: theme.spacing(55),
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4
                            }}>
                            
                                <Grid container direction = "column">
                                    <Grid item xs={1} >
                                            <IconButton color="secondary" aria-label="Edit" onClick={handleCloseConfirmation}>
                                                <CloseIcon />
                                            </IconButton>
                                    </Grid>

                                    <Grid>
                                        <Typography variant="h6" sx={{
                                            display: 'flex', justifyContent: 'center', mt: theme.spacing(3)
                                        }} > 
                                        Are you sure you want to remove this purchase?
                                        </Typography>
                                        
                                    </Grid>

                                    <Grid sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(10) }}>
                                            <Button  
                                                onClick={handleCloseConfirmation} 
                                                variant="outlined" size="large" color="primary" sx={{
                                                borderRadius: 0,
                                                pt: theme.spacing(3),
                                                pb: theme.spacing(3),
                                                pl: theme.spacing(8),
                                                pr: theme.spacing(8),
                                                ml: theme.spacing(5),

                                            }}>No</Button>
                                        <Button  
                                                onClick={handleDeletePurchase} 
                                                variant="contained" size="large" color="primary" sx={{
                                                borderRadius: 0,
                                                pt: theme.spacing(3),
                                                pb: theme.spacing(3),
                                                pl: theme.spacing(8),
                                                pr: theme.spacing(8),
                                                ml: theme.spacing(5),

                                            }}>Yes</Button>
                                    </Grid>
                                    
                                </Grid>
                            
                            </Box>
                        </Modal>
                        
                   </Paper>

                </Grid>
            </Grid>    

        </ThemeProvider>


    )
}

export default Transaction