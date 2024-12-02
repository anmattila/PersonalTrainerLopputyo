import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { teal, blueGrey } from '@mui/material/colors';


function App() {

  return (
    <>
      <Container maxWidth="l">
        <AppBar position='static' sx={{ backgroundColor: teal[400] }}>
          <Toolbar>
            <Typography variant="h4" sx={{ flexGrow: 1 }}>
              Personal Trainer App
            </Typography>
            <Box sx={{ display: 'flex', gap: 4 }}>
              <Link to={"/"}>Home</Link>
              <Link to={"/customers"}>Customers</Link>
              <Link to={"/trainings"}>Trainings</Link>
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