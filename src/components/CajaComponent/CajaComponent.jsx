import {  useSelector,useDispatch } from 'react-redux';
import "./CajaComponent.css";
import DialogCaja from '../DialogCaja/DialogCaja';
import React, { useState,useEffect } from 'react';
import { getCash,getCashAdmin } from '../../../redux/actions';
 
const CajaComponent = () => {
  const cashData = useSelector((state) => state.cashAdmin);
  const cash = useSelector((state) => state.cash);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showExtractionModal, setShowExtractionModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCash());
    dispatch(getCashAdmin());
    }, [dispatch]);

  const handleDepositClick = () => {
    setShowDepositModal(true);
    setSelectedAction('deposito'); 
  };

  const handleExtractionClick = () => {
    setShowExtractionModal(true);
    setSelectedAction('retiro'); 
  };

  const handleTransferClick = () => {
    setShowTransferModal(true);
    setSelectedAction('transferencia'); 
  };

  const saldoCajaValue = cashData.data?.balance ?? 0;
  const todayTotalTransIn = cashData.data?.todayTotalQuantityIn ?? 0;
  const todayTotalTransOut = cashData.data?.todayTotalQuantityOut ?? 0;

  const vta = cash.data?.todayTotalQuantity ?? 0;
  const comissionVta = cash.data?.todayTotalSalesCommission ?? 0;
  const comissionPay = cash.data?.todayTotalPaymentCommission ?? 0;

  return (
    <>
      <div className='buttonRow'>
      <button onClick={handleDepositClick}>Depósito</button>
      <button onClick={handleTransferClick}>Transferencia</button>
      <button onClick={handleExtractionClick}>Retiro</button>
    </div>

    {showDepositModal && (
        <DialogCaja
          open3={showDepositModal}
          onClose3={() => setShowDepositModal(false)}
          action={selectedAction} 
          total={Math.round(saldoCajaValue+todayTotalTransIn+todayTotalTransOut)}
        />
      )}

      {showExtractionModal && (
        <DialogCaja
          open3={showExtractionModal}
          onClose3={() => setShowExtractionModal(false)}
          action={selectedAction} 
          total={Math.round(saldoCajaValue+todayTotalTransIn+todayTotalTransOut)}
        />
      )}

      {showTransferModal && (
        <DialogCaja
          open3={showTransferModal}
          onClose3={() => setShowTransferModal(false)}
          action={selectedAction} 
          total={Math.round(saldoCajaValue+todayTotalTransIn+todayTotalTransOut)}
        />
      )}


    <div className='centerCajaCont'>
      <div className='caja'>
        <h2 className='tituloCaja'>Control de Caja Diario</h2>
          <hr className='dashedHr'/>
        <div className='contenidoCaja'>
          <div>
            <h1 className='saldoCaja'>Caja Inicial: S/{Math.round(saldoCajaValue)}</h1>
            <h1 className='titleCaja'>Tranferencias</h1>  
            <h1 className='saldoCaja'>Entrante: S/{Math.round(todayTotalTransIn)}</h1>  
            <h1 className='saldoCaja'>Saliente: S/{Math.round(todayTotalTransOut)}</h1>            
          </div>
          <div>
            <h1 className='saldoCaja'>Ventas: S/{Math.round(vta)}</h1>
            <h1 className='titleCaja'>Comisiones </h1>
            <h1 className='saldoCaja'>Venta: S/{Math.round(comissionVta)}</h1>
            <h1 className='saldoCaja'>Pago: S/{Math.round(comissionPay)}</h1>
          </div>

        </div>
          <hr className='dashedHr'/>
        <h1 className='saldoCaja'>Generado: S/ {Math.round(vta-comissionVta-comissionPay)}</h1>
        <h1 className='saldoCaja'>Caja Global: S/ {Math.round(saldoCajaValue+todayTotalTransIn+todayTotalTransOut)}</h1>
        <div className='Tbutton'>

        </div>
      </div>
    </div>
    </>
  );
};

export default CajaComponent;
