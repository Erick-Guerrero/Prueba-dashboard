import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsuarios, getCashAdmin } from "../../../redux/actions";
import PutUser from "../PutUser/PutUser";
import "./CashTableAdmin.css"
import DateFilter from "../DateFilter/DateFilter";
import "react-datepicker/dist/react-datepicker.css";
import PutPaymentOk from "../PutPaymentOk/PutPaymentOk";
import excelIcon from "../../assets/excel.png"
import { exportToExcel } from '../../../helpers/helpers';

export default function CashTable() {
  const dispatch = useDispatch();
  // const usuarios = useSelector((state) => state.usuarios);
  const cashData = useSelector((state) => state.cashAdmin);
  const filterCashData = useSelector((state) => state.filterCash);
  const postCashAdmin = useSelector((state) => state.postCashAdmin);
  const [selectedState, setSelectedState] = useState('');
  // const [selectedLocal, setSelectedLocal] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showDialogPayment, setShowDialogPayment] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(getAllUsuarios());
    dispatch(getCashAdmin()); 
  }, [dispatch, showDialogPayment]);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleStartDateChange = (dateString) => {
    // Parsear la cadena de fecha al formato de objeto Date
    const formattedDate = dateString ? new Date(`${dateString}T23:59:59`) : null;
  
    if (formattedDate) {
      // Ajustar la fecha para evitar diferencias horarias
      const utcDate = new Date(Date.UTC(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59));
      setStartDate(utcDate);
    } else {
      setStartDate(null);
    }
  };


  const handlePaymentState = (id) => {
    setSelectedUserId(id);
    setShowDialogPayment(true);
  };
  
  
  const handleEndDateChange = (dateString) => {
    const formattedDate = dateString ? new Date(`${dateString}T23:59:59.999`) : null;
  
    if (formattedDate) {
      const utcDate = new Date(Date.UTC(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59, 999));
      setEndDate(utcDate);
    } else {
      setEndDate(null);
    }
  };
  
  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  let dataToRender = postCashAdmin?.data?.cash?.length > 0 ? postCashAdmin.data.cash : cashData?.data?.cash;

  if (startDate && endDate) {
    const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
    const endDateTime = new Date(endDate).setHours(23, 59, 59, 999);
  
    dataToRender = dataToRender.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return (
        itemDate >= startDateTime &&
        itemDate <= endDateTime &&
        (selectedState ? item.type === selectedState : true) 
        // && (selectedLocal ? item.userId === parseInt(selectedLocal, 10) : true)
      );
    });
  }

  const handleExportToExcel = () => {
    const ticketsData = dataToRender.map((c) => {
      return {
        ID: c.id,
        ID_Local: c.userId,
        Tipo: c.type,
        Cantidad: c.quantity,
        Detalle: c.detail,
        Fecha: formatDate(c.createdAt),
        Estado: c.state
      };
    });
    const csvData = [...ticketsData];
    exportToExcel(csvData, 'tickets');
  };


  return (
    <>

      {showDialog && (
        <PutUser
          open={showDialog}
          id={selectedUserId}
          userId={selectedUserId}
          onClose={() => setShowDialog(false)}
        />
      )}
      {showDialogPayment && (
        <PutPaymentOk
          open={showDialogPayment}
          id={selectedUserId}
          userId={selectedUserId}
          onClose={() => setShowDialogPayment(false)}
        />
      )}
      <br />

      <div className='titleContainer'>
        <h1>CAJA</h1>
      </div>


      <div className='selectContainer'>
<br/>

      <div className='buttonRowExcel'>
        <button onClick={handleExportToExcel}>
          <img src={excelIcon} alt="Exportar a Excel" title="Exportar a Excel" style={{ width: "30px", height: "30px", }} />
          </button>
      </div>
        <label className='filtroClientes' htmlFor="state-select">Filtrar por estado</label>
        <select
          id="state-select"
          value={selectedState}
          onChange={handleStateChange}
          className='letrasSelect'
        >
          <option value="">Filtrar por estado</option>
          <option value="INGRESO">Ingreso</option>
          <option value="EGRESO">Egreso</option>
        </select>

        <DateFilter
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />
        
      </div>

      <div className='contenedorTable'>
        <table className='content-table tabla-cash'>
          <thead>
            <tr>
              <th>ID</th>
              <th>ID Local</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th className="columnaRenderCash">Detalle</th>
              <th>Creado El</th>
              <th className="columnaRenderCash">Estado</th>
            </tr>
          </thead>
          <tbody>
        {dataToRender?.length > 0 ? (
              dataToRender.map((item) => (
                <tr key={item.id} style={{backgroundColor:"white"}}>
                  <td>{item.id}</td>
                  <td>{item.userId}</td>
                  <td style={{ color: item.type === "INGRESO" ? '#81bd13' : item.type === "EGRESO" ? 'red' : 'inherit' }} >{item.type}</td>
                  <td style={{ color: item.quantity > 0 ? '#81bd13' : item.quantity < 0 ? 'red' : 'inherit' }}>{item.quantity}</td>
                  <td className="columnaRenderCash">{item.detail}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td className="columnaRenderCash">

                    {item.state === 'PENDIENTE' ? 
                    
                    <button onClick={() => handlePaymentState(item.id)} >
                    <span className="text-white font-semibold bg-red-600 px-2 border-2 border-black rounded-md">Pendiente</span> 
                    </button>
                    : <span className="text-white font-semibold bg-green-600 px-2 border-2 border-black rounded-md">Resuelto</span>}
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14">No hay resultados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
