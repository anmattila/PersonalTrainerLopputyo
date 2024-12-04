import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline } from '@mui/material';
import { green, blueGrey } from '@mui/material/colors';


function App() {

  return (
    <>
      <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position='static' sx={{ backgroundColor: green[500], marginTop: 2 }}>
          <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1 }}> Personal Trainer</Typography>
            <Box sx={{ display: 'flex', gap: 5, '& a': { color: 'white', textDecoration: 'none' } }}>
              <Link to={"/"}>Home</Link>
              <Link to={"/customers"}>Customers</Link>
              <Link to={"/trainings"}>Trainings</Link>
              <Link to={"/calendar"}>Calendar</Link>
            </Box>
          </Toolbar>
        </AppBar>
        <Outlet />
      </Container>
    </>
  )
}

export default App

// kaikki mikä näkyy jokaisella sivulla
// outlet mikä komponentti näytetään, renderöidään valittu