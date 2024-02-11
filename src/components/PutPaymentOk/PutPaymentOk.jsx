import { useEffect, useState } from 'react';
import { Label, Modal } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { putPaymentOk } from '../../../redux/actions';
import './PutPaymentOk.css';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PutPaymentOk({ open, onClose, id }) {
  const dispatch = useDispatch();
  const cashAdmin = useSelector((state) => state.cashAdmin);
  const navigate = useNavigate();
console.log(cashAdmin);
  useEffect(() => {
    // Actualizar el estado formData cuando la prop open cambie
    if (open && id) {
      const payment = cashAdmin.data.cash.find((c) => c.id === id);

      if (payment) {
        // Establecer la información del cliente en el estado formData
        setFormData({
          id: id,
          // name: payment.name,
        });
      }
    }
  }, [open, id, cashAdmin.data]);

  const [formData, setFormData] = useState({
    id: '',
  });

  // console.log(id);
  // console.log(formData);
  // const handleInputChange = (field, value) => {
  //   setFormData({
  //     ...formData,
  //     [field]: value,
  //   });
  // };

  const handleSubmit = async (id) => {
    console.log('Formulario enviado:', formData);
    await dispatch(putPaymentOk(id, formData)).then(() => {
      navigate(`/caja`);
    });
    
    onClose();
  };
  return (
    <>
      <Modal show={open} isopen={open.toString()} size="md" onClose={onClose} popup>
        <Modal.Header />
        <Modal.Body>
          <div
            className="space-y-6 mx-auto text-center"
            style={{ width: '200px' }}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Cambiar estado de la transferencia
            </h3>
          

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2  block">
                <Label htmlFor="role">¿Está seguro que quiere marcar como RESUELTO el estado esta transferencia?</Label>
              </div>

              {/* <Select
                style={{
                  marginLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="enable"
                value={formData.enable}
                onChange={(event) => handleInputChange(event.target.value)}
              >
                <option value="PENDIENTE">Pendiente</option>
                <option value="RESUELTO">Resuelto</option>
              </Select> */}
            </div>


            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                color: 'black',
              }}
            >
              <button className="botonAct" onClick={handleSubmit}>
                <span className="transition"></span>
                <span className="gradient"></span>
                <span className="label">RESUELTO</span>
              </button>
              <button className="botonAct" onClick={onClose}>
                <span className="transition"></span>
                <span className="label">CANCELAR</span>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PutPaymentOk;
