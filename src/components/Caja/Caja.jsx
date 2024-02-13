// import ViewsHome from "../ViewsHome/ViewsHome";
import Navbar from '../Navbar/Navbar.jsx';
import CashTable from '../CashTable/CashTable.jsx';
import CashTableAdmin from '../CashTableAdmin/CashTableAdmin.jsx';
import CajaComponent from '../CajaComponent/CajaComponent.jsx';

function Caja() {
  return (
    <>
      <Navbar />
      <br></br>

      <CajaComponent />

      <CashTableAdmin />
      <CashTable />
    </>
  );
}

export default Caja;
