import { theme} from '../../../utils/theme';
import { ThemeProvider } from '@mui/system';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TuneIcon from '@mui/icons-material/Tune';
import HelpIcon from '@mui/icons-material/Help';
import HistoryIcon from '@mui/icons-material/History';

interface Props {
    
}

const MenuBar = (props: Props) => {

    return (
        <ThemeProvider theme={theme}>

            <Box sx={{ flexGrow: 1, justifyContent:'left' }}>
                <AppBar position="fixed" sx={{ width: theme.spacing(15), minHeight: "100%", left:0 }}>
                    <Toolbar sx={{ flexDirection: "column", ml: theme.spacing(5)}}>
                        <IconButton
                            href={'/dashboard'}
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2, color:"white" }}
                        >
                            <HomeIcon /> 
                        </IconButton>

                        <IconButton
                            href={'/events-edit'}
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2, color: "white" }}
                        >
                            <AddCircleIcon />
                        </IconButton>

                        <IconButton
                            href={'/basic-info'}
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2, color: "white" }}
                        >
                            <EditIcon />
                        </IconButton>
                        
                        <IconButton
                            href={'/levels-edit'}
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2, color: "white" }}
                        >
                            <TuneIcon />
                        </IconButton>
                        
                        <IconButton
                            href={'/faq-edit'}
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2, color: "white" }}
                        >
                            <HelpIcon />
                        </IconButton>
                        
                        <IconButton
                            href={'/summary'}
                            size="large"
                            edge="start"
                            aria-label="menu"
                            sx={{ mr: 2, color: "white" }}
                        >
                            <HistoryIcon />
                        </IconButton>
                        
                    </Toolbar>
                </AppBar>
            </Box>

           

        </ThemeProvider>


    )
}

export default MenuBar