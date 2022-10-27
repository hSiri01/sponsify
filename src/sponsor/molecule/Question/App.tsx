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
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6">
                        {question}
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(4), mr: theme.spacing(35), ml: theme.spacing(35)}}>
                    <Typography variant="body1" sx={{textAlign:"center"}} dangerouslySetInnerHTML={{ __html: answer}} />
                </Grid>

            </Grid>

        </ThemeProvider>


    )
}

export default Question