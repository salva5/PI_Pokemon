import './App.css';
import { Routes, Route, useLocation} from 'react-router-dom';
import axios from 'axios';
import { getAllPokemon } from './redux/actions';

//components
import Landing from './views/landingPage/landin';
import Home from './views/homePage/home';
import Detail from './views/detailPage/detail';
import Form from './views/formPage/form';
import NavBar from "./components/navbar/navbar"
//hooks
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";


function App() {
  const [types, setTypes] = useState([])
  const { pathname } = useLocation()
  const dispatch = useDispatch()

  useEffect( () => {
    dispatch(getAllPokemon())
    axios("http://localhost:3001/types")
    .then(({data})=> {
         
      if(!data) throw Error("hubo un error en get types")
      setTypes(data)
    })
    .catch((error)=> console.log(error.message))
  },[])
  return (
    <div className="App">
      {/* <NavLink to="/home">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/269px-International_Pok%C3%A9mon_logo.svg.png" alt="pokemon" />
      </NavLink> */}
      <div className="Pages">

        {pathname !== "/" && <NavBar/>}
        <Routes>
          <Route path="/" element= {<Landing/>}/>
          <Route path="/home"  element= {<Home types={types}/>}/>
          <Route path="/detail/:id"  element= {<Detail/>}/>
          <Route path="/create" element= {<Form types={types}/>}/>

        </Routes>

      </div>
    </div>
  );
}

export default App;
