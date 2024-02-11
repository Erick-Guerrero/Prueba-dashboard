import { useEffect, useState } from 'react';
import { Label, Modal, Select } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { patchUserEnable } from '../../../redux/actions';
import './PatchUserEnable.css';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PatchUserEnable({ open, onClose, id }) {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const navigate = useNavigate();

  useEffect(() => {
    // Actualizar el estado formData cuando la prop open cambie
    if (open && id) {
      const selectedUser = usuarios.data.find((c) => c.id === id);

      if (selectedUser) {
        // Establecer la información del cliente en el estado formData
        setFormData({
          id: id,
          enable: selectedUser.enable,
          name: selectedUser.name,
        });
      }
    }
  }, [open, id, usuarios.data]);

  const [formData, setFormData] = useState({
    enable: '',
  });

  // console.log(id);
  // console.log(formData);
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    console.log('Formulario enviado:', formData);
    await dispatch(patchUserEnable(id, formData)).then(() => {
      navigate(`/usuarios`);
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
              Desactivar un usuario
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
                <Label htmlFor="role">¿Está seguro que quiere desactivar a {formData.name}?</Label>
              </div>

              <Select
                style={{
                  marginLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="enable"
                value={formData.enable}
                onChange={(event) => handleInputChange('enable', event.target.value === 'true')}
              >
                <option value="true">Activado</option>
                <option value="false">Desactivado</option>
              </Select>
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
                <span className="label">Actualizar</span>
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PatchUserEnable;
