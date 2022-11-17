import { Grid } from '@mui/material';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';



interface Props {
    question: string,
    answer: string,
}

const Question = (props: Props) => {

    const {question, answer} = props

    return (
        <ThemeProvider theme={theme}>

            <Grid container>
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', textAlign:'center' }}>
                    <Typography  variant="h5" sx={{fontWeight:500}}>
                        {question}
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                </Grid>

                <Grid item xs={2}>
                </Grid>

                <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4)}}>
                    <Typography align='left' variant="body1" dangerouslySetInnerHTML={{ __html: answer}} />
                </Grid>

                <Grid item xs={2}>
                </Grid>

            </Grid>

        </ThemeProvider>


    )
}

export default Question