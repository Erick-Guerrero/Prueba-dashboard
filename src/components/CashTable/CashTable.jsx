import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsuarios, getCash } from "../../../redux/actions";
import PutUser from "../PutUser/PutUser";
import DateFilter3 from "../DateFilter3/DateFilter3";
import { DataGrid } from '@mui/x-data-grid';
import excelIcon from "../../assets/excel.png";
import { exportToExcel } from '../../../helpers/helpers';

export default function CashTable() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const cashData = useSelector((state) => state.cash);
  const filterCashData = useSelector((state) => state.filterCash);
  const [selectedState, setSelectedState] = useState('');
  const [selectedLocal, setSelectedLocal] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch(getAllUsuarios());
    dispatch(getCash());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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

  const handleLocalChange = (e) => {
    setSelectedLocal(e.target.value);
  };

  let dataToRender = filterCashData?.data?.cash.length > 0 ? filterCashData?.data?.cash : cashData?.data?.cash;

  if (startDate && endDate) {
    const startDateTime = new Date(startDate).setHours(0, 0, 0, 0);
    const endDateTime = new Date(endDate).setHours(23, 59, 59, 999);
  
    dataToRender = dataToRender.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return (
        itemDate >= startDateTime &&
        itemDate <= endDateTime &&
        (selectedState ? item.type === selectedState : true) &&
        (selectedLocal ? item.userId === parseInt(selectedLocal, 10) : true)
      );
    });
  }

  const handleExportToExcel = () => {
    const ticketsData = dataToRender.map((item) => {
      return {
        "ID Ticket": item.idTicket,
        "ID Local": item.userId,
        Tipo: item.type,
        Monto: item.quantity,
        Detalle: item.detail,
        Pago: item.paymentMethod,
        Estado: item.state,
        "Comisión de Ventas": item.salesCommissionPercentage,
        "Comisión de Pago": item.paymentCommissionPercentage,
        "Premio Total": (
          (parseInt(item.firstPrize) || 0) +
          (parseInt(item.SecondPrize) || 0) +
          (parseInt(item.ThirdPrize) || 0)
        ).toString() || '-',
        Creado: formatDate(item.createdAt),
        EstadoTicket: item.Ticket.state,
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
      <br />

      <div className='titleContainer'>
        <h1>CAJAS LOCALES</h1>
      </div>

      <div className='selectContainer'>
        <br/>
        <div className='buttonRowExcel'>
          <button onClick={handleExportToExcel}>
            <img src={excelIcon} alt="Exportar a Excel" title="Exportar a Excel" style={{ width: "30px", height: "30px", }} />
          </button>
        </div>
        {/* <label className='filtroClientes' htmlFor="state-select">Filtrar por Tipo</label>
        <select
          id="state-select"
          value={selectedState}
          onChange={handleStateChange}
          className='letrasSelect'
        >
          <option value="">Filtrar por Tipo</option>
          <option value="INGRESO">Ingreso</option>
          <option value="EGRESO">Egreso</option>
        </select>

        <label className='filtroClientes' htmlFor="local-select">Filtrar por local</label>
        <select
          id="local-select"
          value={selectedLocal}
          onChange={handleLocalChange}
          className='letrasSelect'
        >
          <option value="">Filtrar por local</option>
          {usuarios.data ? (
            usuarios.data.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.id}
              </option>
            ))
          ) : (
            <option value="">Cargando Información...</option>
          )}
        </select> */}

        <DateFilter3
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
        />
      </div>

      {dataToRender?.length > 0 ? (
   <div style={{ display: "flex", justifyContent: "center", alignItems: "center",}}>
   <div style={{ width: "80%", backgroundColor: "white", marginBottom:"20px"  }}>
        <DataGrid
          rows={dataToRender.map((row) => ({
            ...row,
            createdAt: formatDate(row.createdAt), // Formatear la fecha
          }))}
          columns={[
            { field: 'idTicket', headerName: 'ID Ticket', width: 120 },
            { field: 'userId', headerName: 'ID Local', width: 120 },
            { field: 'type', headerName: 'Tipo', width: 120 },
            { field: 'quantity', headerName: 'Monto', width: 120 },
            { field: 'detail', headerName: 'Detalle', width: 120 },
            { field: 'paymentMethod', headerName: 'Pago', width: 120 },
            { field: 'state', headerName: 'Estado', width: 120 },
            { field: 'salesCommissionPercentage', headerName: 'Comisión de Ventas', width: 160,renderCell: (params) => (
              <span>{params.value ? (Math.floor(parseFloat(params.value) * 10) / 10).toFixed(1) : null}</span>),},
          { field: 'paymentCommissionPercentage', headerName: 'Comisión de Pago', width: 160, renderCell: (params) => (
              <span>{params.value ? (Math.floor(parseFloat(params.value) * 10) / 10).toFixed(1) : null}</span>),},
            { field: 'totalPrize', headerName: 'Premio Total', width: 140 },
            { field: 'createdAt', headerName: 'Creado', width: 120 },
            { field: 'Ticket.state', headerName: 'Estado Ticket', width: 160 },
          ]}
          pageSize={10}
        />
      </div>
      </div>
      ) : (
        <p>No hay datos para mostrar.</p>
      )}
    </>
  );
}
