import React, { useState, useEffect } from "react";
import { Modal } from 'flowbite-react';
import { useDispatch, useSelector } from "react-redux";
import { getAllUsuarios, paymentDashboard, selfDeposit, selfExtraction } from "../../../redux/actions";
import styles from "./DialogCaja.module.css";
import swal from 'sweetalert';


function DialogCaja({ open3, onClose3, action, total }) {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const [quantity, setQuantity] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const isDeposit = action === 'deposito';
  const isExtraction = action === 'retiro';
  const isTransfer = action === 'transferencia';

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleUserSelect = (event) => {
    setSelectedUserId(event.target.value);
  };

  const handleTransaction = async () => {
    try {
      if (parseFloat(quantity) > parseFloat(total)) {
        // Verificar si la cantidad es mayor que el total
        swal({
          title: 'Error',
          text: 'La cantidad no puede ser mayor que el total.',
          icon: 'error',
          button: 'Aceptar',
        });
        return;
      }

      if (isDeposit) {
        await dispatch(selfDeposit({ quantity }));
      } else if (isExtraction) {
        await dispatch(selfExtraction({ quantity }));
      } else if (isTransfer) {
        await dispatch(paymentDashboard({ quantity, id: selectedUserId }));
      }

      setQuantity('');
      onClose3();

      let message = '';
      if (isDeposit) {
        message = 'Depósito realizado correctamente.';
      } else if (isExtraction) {
        message = 'Retiro realizado correctamente.';
      } else if (isTransfer) {
        message = 'Transferencia realizada correctamente.';
      }

      swal({
        title: '¡Operación realizada con éxito!',
        text: message,
        icon: 'success',
        button: 'Aceptar',
      }).then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Hubo un error al realizar la operación:', error.message);
    }
  };

  return (
    <div className={styles.centeredModal}>
      <Modal show={open3} onClose={onClose3} popup className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 " style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }}>
        <Modal.Header style={{ display: "flex", justifyContent: "center" }} />
        <Modal.Body style={{ width: "300px", margin: "auto", backgroundColor: "white" }}>
          <div className={styles.modalContent}>
            {isTransfer && (
              <div className={styles.userSelect}>
                <select value={selectedUserId} onChange={handleUserSelect} style={{ width: "200px", borderRadius: "10px", marginBottom: "10px" }}>
                  <option value="">Seleccionar usuario</option>
                  {usuarios.data?.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <input
              style={{ width: "200px", borderRadius: "10px", marginBottom: "10px" }}
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              placeholder="Cantidad"
            />
            <div className={styles.quantityInput}>
              <button
                className={`${isDeposit ? styles.depositButton : (isExtraction ? styles.extractionButton : styles.transferButton)} ${parseFloat(quantity) > parseFloat(total) ? styles.buttonDisabled : ''}`}
                onClick={handleTransaction}
                disabled={parseFloat(quantity) > parseFloat(total)} // Deshabilitar si la cantidad es mayor que el total
              >
                {isDeposit ? 'Depósito' : (isExtraction ? 'Retiro' : 'Transferencia')}
              </button>

            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DialogCaja;
