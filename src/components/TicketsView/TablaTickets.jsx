import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTicketDate, ticketAdmin,patchTicketGNC } from "../../../redux/actions";
import { DataGrid } from '@mui/x-data-grid';
import styles from "./TablaTickets.module.css";
import DateFilter2 from '../DateFilter2/DateFilter2';
import ViewData from './ViewData/ViewData';
import sandClock from "../../assets/sand.png";
import { lotteriesDictionary } from "../../../helpers/lotteriesDictionary";
import excelIcon from "../../assets/excel.png";
import { exportToExcel, formatFecha, formatHora } from '../../../helpers/helpers';

import { useTable, useSortBy, useFilters } from 'react-table';

export default function Table() {
  const isMobile = window.innerWidth <= 768;

  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets);
  const filtertickets = useSelector((state) => state.filterTicket);
  const [selectedState, setSelectedState] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [disabledTickets, setDisabledTickets] = useState([]);

  const renderCellValue = (value) => {
    return value !== null ? value.toFixed(1) : '-';
  };

  const handleStartDateChange = (dateString) => {
    const formattedDate = dateString ? new Date(`${dateString}T23:59:59`) : null;
    if (formattedDate) {
      const utcDate = new Date(Date.UTC(formattedDate.getFullYear(), formattedDate.getMonth(), formattedDate.getDate(), 23, 59, 59));
      setStartDate(utcDate);
    } else {
      setStartDate(null);
    }
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

  
  const columns = [
    { field: 'id', headerName: 'Id', width: 120 },
    { field: 'userId', headerName: 'Local', width: 120 },
    { field: 'lotteryName', headerName: 'Loteria', width: 120 },
    { field: 'createdAt', headerName: 'Creado', width: 120 },
    { field: 'lotteryHr', headerName: 'Hora', width: 120 },
    { field: 'state', headerName: 'Estado', width: 120 },
    { field: 'stateAdmin', headerName: 'GNC', width: 120 },
    { field: 'numbers', headerName: 'Números', width: 120 },
    { field: 'bets', headerName: 'Apuestas', width: 150 },
    { field: 'total', headerName: 'Total', width: 120 },
    // Agregar más columnas según necesites
  ];
  
  let dataToRender = filtertickets?.data?.data?.length > 0 ? filtertickets?.data?.data : tickets.data;
  console.log(dataToRender);

  if (startDate && endDate) {
    const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
    const endDateTime = new Date(endDate).setHours(23, 59, 59, 999);

    dataToRender = dataToRender?.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      const lotteryName = item.lotteryName ? String(item.lotteryName) : '';

      return (
        itemDate >= startDateTime &&
        itemDate <= endDateTime &&
        (selectedState ? lotteryName === selectedState : true)
      );
    });
  }
  const rows = dataToRender?.length > 0
    ? dataToRender.map((c) => ({
      id: c.idTicket,
      userId: c.userId,
      lotteryName: `${c.lotteryName} ${c.lotteryHr}`,
      createdAt: formatFecha(c.createdAt),
      lotteryHr: formatHora(c.createdAt),
      state: c.state !== 'Pendiente' ? c.state : (
        <button
          onClick={() => handleChangeTicketState(c.idTicket)}
          title="Pendiente"
          style={{
            marginLeft: '10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            opacity: c.state === 'Pendiente' ? 1 : 0.5,
          }}
          disabled={c.state !== 'Pendiente'}
        >
          <img style={{ width: '20px', height: '20px' }} src={sandClock} alt="Filter" />
        </button>
      ),
      stateAdmin: c.stateAdmin,
      numbers: c.TicketNumbers.map((numberInfo, index) => (
        numberInfo.number === 100 ? "00" : numberInfo.number.toString().padStart(2, '0')
      )).join(', '),
      bets: c.TicketNumbers.map((numberInfo, index) => (
        `S/${numberInfo.bet}`
      )).join(', '),
      total: `S/ ${c.total}`,
    }))
    : [{
      id: 1,
      userId: '',
      lotteryName: '',
      createdAt: '',
      lotteryHr: '',
      state: 'No se encontraron tickets',
      stateAdmin: '',
      numbers: '',
      bets: '',
      total: '',
    }];

  const handleChangeTicketState = (ticketId) => {
    swal({
      title: '¿Estás seguro?',
      text: '¿Quieres anular el ticket en pendiente?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willChange) => {
      if (willChange) {
        dispatch(ticketAdmin(ticketId));
        swal('¡El ticket ha sido cambiado a Anulado!', {
          icon: 'success',
        });
      } else {
        swal('Operación cancelada', '', 'info');
      }
    }).then(() => {
      window.location.reload();
    })
  };

  useEffect(() => {
    dispatch(getTicketDate());
  }, [dispatch]);

  const handleExportToExcel = () => {
    const ticketsData = dataToRender.map((c) => {
      return {
        idTicket: c.idTicket,
        userId: c.userId,
        lotteryName: c.lotteryName,
        lotteryHr: c.lotteryHr,
        createdAt: formatFecha(c.createdAt),
        state: c.state,
        GNC: c.stateAdmin,
        total: c.total,
      };
    });
    const csvData = [...ticketsData];
    exportToExcel(csvData, 'tickets');
  };

  const handleTicketGNC = () => {
    dispatch(patchTicketGNC()).then(() => {
      // Recargar la página después de cerrar SweetAlert
      window.location.reload();
    })
    
  };

  return (
    <>
      <br></br>
      <div className={styles.titleContainer}>
        <h1>LISTADO DE TICKETS</h1>
      </div>
      <br></br>

      <div className='buttonRow'>
        <button onClick={handleTicketGNC}>Ticket GNC</button>
      </div>

      <div className='selectContainer'>
        <div className='buttonRowExcel'>
          <button onClick={handleExportToExcel}>
            <img src={excelIcon} alt="Exportar a Excel" title="Exportar a Excel" style={{ width: "30px", height: "30px", }} />
          </button>
        </div>

        <DateFilter2
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />

      </div>
      {dataToRender && dataToRender.length > 0 ? (
        <div className={styles.contenedorTable}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div style={{ width: "90%", backgroundColor: "white", marginBottom: "20px" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                // checkboxSelection
                disableSelectionOnClick
              />
            </div>
          </div>
        </div>
      ) : (

        <div className="mt-10 text-white">
          <p style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>Seleccione las fechas</p>
        </div>
      )}
    </>
  )
}