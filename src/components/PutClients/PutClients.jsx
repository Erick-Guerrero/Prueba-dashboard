import { useEffect, useState } from 'react';
import { Label, Modal, TextInput, Select } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { putClient } from '../../../redux/actions';
import './PutClients.css';

// eslint-disable-next-line react/prop-types
function PutClients({ open, onClose, clientId }) {
  const dispatch = useDispatch();
  const clientes = useSelector((state) => state.clientes);

  useEffect(() => {
    // Actualizar el estado formData cuando la prop open cambie
    if (open && clientId) {
      const selectedClient = clientes.data.find((c) => c.clientId === clientId);

      if (selectedClient) {
        // Establecer la información del cliente en el estado formData
        setFormData({
          clientId: clientId,
          name: selectedClient.name,
          surname: selectedClient.surname,
          email: selectedClient.email,
          phone: selectedClient.phone,
          genre: selectedClient.genre,
          birthDate: selectedClient.birthDate,
        });
      }
    }
  }, [open, clientId]);

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    genre: 'M',
    birthDate: '1998-07-01',
  });

  console.log(clientId);
  console.log(formData);
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    console.log('Formulario enviado:', formData);
    await dispatch(putClient(clientId, formData));
    window.location.reload();
    onClose();
  };
  return (
    <>
      <Modal show={open} isOpen={open} size="md" onClose={onClose} popup style={{ display: "flex", justifyContent: "center", alignItems: "center", top: 0, left: 0, width: "100%", height: "100%", }}>
        <Modal.Header />
        <Modal.Body>
          <div
            className="space-y-6 mx-auto text-center"
            style={{ width: '300px' }}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Información del cliente
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                style={{
                  marginLeft: '0.5rem',
                  paddingLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="name"
                placeholder="John"
                value={formData.name}
                onChange={(event) =>
                  handleInputChange('name', event.target.value)
                }
                required
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2 block">
                <Label htmlFor="surname" value="Surname" />
              </div>
              <TextInput
                style={{
                  marginLeft: '0.5rem',
                  paddingLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="surname"
                placeholder="Doe"
                value={formData.surname}
                onChange={(event) =>
                  handleInputChange('surname', event.target.value)
                }
                required
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                style={{
                  marginLeft: '0.5rem',
                  paddingLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={(event) =>
                  handleInputChange('email', event.target.value)
                }
                required
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2 block">
                <Label htmlFor="phone" value="Phone" />
              </div>
              <TextInput
                style={{
                  marginLeft: '0.5rem',
                  paddingLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="phone"
                placeholder="123-456-7890"
                value={formData.phone}
                onChange={(event) =>
                  handleInputChange('phone', event.target.value)
                }
                required
              />
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2  block">
                <Label htmlFor="genre" value="Genre" />
              </div>
              <Select
                style={{
                  marginLeft: '0.5rem',
                  paddingLeft: '0.5rem',
                  width: '200px',
                  height: '40px',
                  borderRadius: '10px',
                }}
                id="genre"
                value={formData.genre}
                onChange={(event) =>
                  handleInputChange('genre', event.target.value)
                }
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Select>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div className="mb-2 ml-2 block ">
                <Label htmlFor="birthDate" value="Birth Date" />
              </div>
              <TextInput
                style={{ marginLeft: '0.5rem', width: '200px' }}
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(event) =>
                  handleInputChange('birthDate', event.target.value)
                }
                required
              />
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

export default PutClients;
