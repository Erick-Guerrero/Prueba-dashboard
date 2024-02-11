import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ClientForm from './components/Form/Form';
import Clientes from './components/Clientes/Clientes';
import Caja from './components/Caja/Caja';
import GetUsers from './components/GetUsers/GetUsers'
import AuthGuard from './components/AuthGuard/AuthGuard';
import TicketView from './components/TicketsView/TicketView'

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login/>}/>

        <Route element={<AuthGuard />}>
          <Route exact path="*" element={<>NOT FOUND</>}/>
          <Route exact path="/clientes" element={<Clientes/>}/>
          <Route exact path="/usuarios" element={<GetUsers/>}/>
          <Route exact path="/home" element={<Home />}/>
          <Route exact path="/form" element={<ClientForm />}/>
          <Route exact path="/ticketView" element={<TicketView />} />
          <Route exact path="/caja" element={<Caja/>}/>
        </Route>


      </Routes>
    </>
  );
}

export default App;
