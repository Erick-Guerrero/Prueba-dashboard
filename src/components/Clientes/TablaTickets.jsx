import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTickets } from "../../../redux/actions";
import SelectDate from "../SelectDate/SelectDate";

export default function Table() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const [selectedLottery, setSelectedLottery] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  
  
  function formatFecha(fecha) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  }
  
  function handleSelectChange(lottery, hour) {
    console.log("Lottery:", lottery);
    console.log("Hour:", hour);
    setSelectedLottery(lottery);
    setSelectedHour(hour);
    setIsFilterApplied(true);
  }
  const handleSelectAll = () => {
    setSelectedLottery('');
    setSelectedHour('');
    setIsFilterApplied(false);
  };
  
  const filteredTickets = isFilterApplied
  ? tickets.data.filter((ticket) => {
    return ticket.lotteryName === selectedLottery && ticket.lotteryHr === selectedHour;
  })
  : tickets.data || [];
  useEffect(() => {
    if (isFilterApplied) {
      dispatch(getTickets(selectedLottery, selectedHour));
    } else {
      dispatch(getTickets()); // Obtener todos los tickets si no hay filtro aplicado
    }
  }, [dispatch, selectedLottery, selectedHour, isFilterApplied]);
  
  return (

    <>
      <br></br>
      <div className='titleContainer'>
        <h1>LISTADO DE TICKETS</h1>
      </div>
      <br></br>

      <div className='selectContainer'>
      <SelectDate onSelect={handleSelectChange} onSelectAll={handleSelectAll}/>
      </div>

      <div className='contenedorTable'>
        <table className='content-table tabla-tickets'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Loteria</th>
              <th>Horario</th>
              <th>Creado</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.length > 0 ? (
              filteredTickets.map((c, index) => (
                <tr key={c.idTicket} className={index % 2 === 0 ? 'active-row' : ''}>
                  <td>{index + 1}</td>
                  <td>{c.lotteryName}</td>
                  <td>{c.lotteryHr}</td>
                  <td>{formatFecha(c.createdAt)}</td>
                  <td>{c.state}</td>
                  <td style={{display:"flex", justifyContent:"flex-end"}}>S/ {c.total}</td>
                  <td>X</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No se encontraron tickets para esta lotería y hora.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
