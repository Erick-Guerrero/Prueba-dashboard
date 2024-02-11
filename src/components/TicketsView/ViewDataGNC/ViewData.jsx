import React from "react";
import { useSelector } from 'react-redux';
import "./ViewData.css";

function ViewData() {

  const ticketGNC = useSelector((state) => state.ticketGNC);

  return (
    <>
      <div className="containerHome">
        <div className="contenerdorColumn">
          <div className="contenedorRow">
            <h1 className="titulos">Cantidad</h1>
            <div className="containerDays">
              <p className="days3"> {ticketGNC?.data?.totalTickets} </p>
            </div>
          </div>
          <div className="contenedorRow">
            <h1 className="titulos">Monto</h1>
            <div className="containerDays">
              <p className="days3"> {ticketGNC?.data?.totalAmount} </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewData;
