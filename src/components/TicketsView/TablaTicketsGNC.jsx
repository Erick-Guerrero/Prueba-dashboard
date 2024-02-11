import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTicketGNC, patchTicketGNC } from "../../../redux/actions";
import styles from "./TablaTickets.module.css"
import ViewData from './ViewDataGNC/ViewData'

export default function Table() {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.ticketGNC);

  const renderCellValue = (value) => {
    return value !== null ? value.toFixed(1) : '-';
  };

  function formatFecha(fecha) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(fecha).toLocaleDateString(undefined, options);
  }

  const handleTicketGNC = () => {
    dispatch(patchTicketGNC()).then(() => {
      // Recargar la página después de cerrar SweetAlert
      window.location.reload();
    })
    
  };

  useEffect(() => {
    dispatch(getTicketGNC());
  }, [dispatch]);

  console.log(tickets?.data?.tickets);

  return (
    <>
      <br></br>

      <div className='buttonRow'>
        <button onClick={handleTicketGNC}>Ticket GNC</button>
      </div>

      <div className={styles.titleContainer}>
        <h1>LISTADO DE TICKETS GNC</h1>
      </div>

      {/* <ViewData /> */}

      <div className={styles.contenedorTable}>
        <table className={`${styles["content-table"]} ${styles["tabla-tickets"]}`}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Local</th>
              <th>Loteria</th>
              <th className={styles.columnaRenderTicket}>Horario</th>
              <th>Creado</th>
              <th className={styles.columnaRenderTicket}>Estado</th>
              <th className={styles.columnaRenderTicket}>Números</th>
              <th className={styles.columnaRenderTicket}>Apuestas</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.data?.tickets?.length > 0 ? (
              tickets?.data?.tickets?.map((c, index) => (
                <tr key={c.idTicket} style={{ backgroundColor: 'white' }}>
                  <td>{c.idTicket}</td>
                  <td>{c.userId}</td>
                  <td>{c.lotteryName}</td>
                  <td className={styles.columnaRenderTicket}>{c.lotteryHr}</td>
                  <td>{formatFecha(c.createdAt)}</td>
                  <td className={styles.columnaRenderTicket}>{c.state}</td>
                  <td className={styles.columnaRenderTicket}>
                    <table style={{ display: "flex", justifyContent: "center" }}>
                      <tbody>
                        <tr>
                          {c.TicketNumbers.map((numberInfo, index) => (
                            <td className={styles.columnaRenderTicket} style={{ borderRight: "1px solid #0e8a7181", borderLeft: "1px solid #0e8a7181", borderTop: "1px solid #0e8a7181",width:"40px" }} key={index}>
                              {numberInfo.number === 100 ? "00" :  numberInfo.number.toString().padStart(2, '0')}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td className={styles.columnaRenderTicket}>
                    <table style={{ display: "flex", justifyContent: "center" }}>
                      <tbody>
                        <tr>
                          {c.TicketNumbers.map((numberInfo, index) => (
                            <td className={styles.columnaRenderTicket} style={{ borderRight: "1px solid #0e8a7181", borderLeft: "1px solid #0e8a7181", borderTop: "1px solid #0e8a7181",width:"70px" }} key={index}>
                              S/{numberInfo.bet}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td>S/ {c.winningPrize}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No se encontraron tickets para esta lotería y hora.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}