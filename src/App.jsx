import './App.css'
import { Link, Outlet } from 'react-router-dom';


function App() {

  return (
    <>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/customers"}>Customers</Link>
        <Link to={"/trainings"}>Trainings</Link>
      </nav>
      <Outlet/> 
    </>
  )
}

export default App

// kaikki mikä näkyy jokaisella sivulla
// outlet mikä komponentti näytetään, renderöidään valittu