import { useEffect, useState } from 'react';
import { Label, Modal, TextInput, Select } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { putUsuario } from '../../../redux/actions';
import './PutUser.css';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function PutUser({ open, onClose, id }) {
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
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role,
          dni: selectedUser.dni,
          contactName: selectedUser.contactName,
          contactEmail: selectedUser.contactEmail,
          contactPhone: selectedUser.contactPhone,
          contactDni: selectedUser.contactDni,
          phoneYAPE: selectedUser.phoneYAPE,
          phonePLIN: selectedUser.phonePLIN,
          bankAccount1: selectedUser.bankAccount1,
          bankAccount2: selectedUser.bankAccount2,
          interbancario1: selectedUser.interbancario1,
          interbancario2: selectedUser.interbancario2,
          address: selectedUser.address,
          urbanization: selectedUser.urbanization,
          district: selectedUser.district,
          province: selectedUser.province,
          department: selectedUser.department,
          salesCommissionPercentage: selectedUser.salesCommissionPercentage,
          paymentCommissionPercentage: selectedUser.paymentCommissionPercentage,
          firstPrize: selectedUser.firstPrize,
          SecondPrize: selectedUser.SecondPrize,
          ThirdPrize: selectedUser.ThirdPrize,
        });
      }
    }
  }, [open, id, usuarios.data]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'User',
    dni: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactDni: '',
    phoneYAPE: '',
    phonePLIN: '',
    bankAccount1: '',
    bankAccount2: '',
    interbancario1: '',
    interbancario2: '',
    address: '',
    urbanization: '',
    district: '',
    province: '',
    department: '',
    salesCommissionPercentage: '',
    paymentCommissionPercentage: '',
    firstPrize: '',
    SecondPrize: '',
    ThirdPrize: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async () => {
    // console.log('Formulario enviado:', formData);
    await dispatch(putUsuario(id, formData)).then(() => {
      navigate(`/usuarios`);
    });
    onClose();
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          margin:'1rem',
        }}
      >
        <div style={{ maxHeight: '80vh' }}>
          <Modal
            show={open}
            isopen={open.toString()}
            size="md"
            onClose={onClose}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div
                className="space-y-6 mx-auto text-center h-full align-middle"
                // style={{ width: '20rem' }}
              >
                <h3 className="text-xl font-medium text-gray-900 dark:text-white sticky">
                  Editar usuario
                </h3>

                <div
                  style={{
                    maxHeight: 'calc(100vh - 200px)',
                    overflowY: 'auto',
                    backgroundColor: 'lightgray',
                  }}
                >
                  {/*... Aquí estarían todos tus inputs...*/}

                  <div className="shadow-lg p-4 rounded-xl m-4 bg-gray-200">
                    <h2 className="text-green-950 font-semibold">
                      Datos del titular
                    </h2>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div className="items-start">
                        <Label htmlFor="name" value="Name" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="name"
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
                      <div>
                        <Label htmlFor="dni" value="DNI" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="dni"
                        value={formData.dni}
                        onChange={(event) =>
                          handleInputChange('dni', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="email" value="Email" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="email"
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
                      <div className="mb-2 block">
                        <Label htmlFor="role" value="Role" />
                      </div>
                      <Select
                        style={{
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="role"
                        value={formData.role}
                        onChange={(event) =>
                          handleInputChange('role', event.target.value)
                        }
                      >
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                      </Select>
                    </div>
                  </div>

                  <div className="shadow-lg p-4 rounded-xl m-4 bg-gray-200">
                    <h2 className="text-green-950 font-semibold">
                      Datos administrativos
                    </h2>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div className="block">
                        <Label htmlFor="phonePLIN" value="Phone PLIN" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="phonePLIN"
                        value={formData.phonePLIN}
                        onChange={(event) =>
                          handleInputChange('phonePLIN', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="phoneYAPE" value="Phone YAPE" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="phoneYAPE"
                        value={formData.phoneYAPE}
                        onChange={(event) =>
                          handleInputChange('phoneYAPE', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="bankAccount1" value="Bank account 1" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="bankAccount1"
                        value={formData.bankAccount1}
                        onChange={(event) =>
                          handleInputChange('bankAccount1', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="bankAccount2" value="Bank account 2" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="bankAccount2"
                        value={formData.bankAccount2}
                        onChange={(event) =>
                          handleInputChange('bankAccount2', event.target.value)
                        }
                        required
                      />
                    </div>
                    {/* //////////////////// */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div className="block">
                        <Label htmlFor="interbancario1" value="Interbancario 1" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="interbancario1"
                        value={formData.interbancario1}
                        onChange={(event) =>
                          handleInputChange('interbancario1', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="interbancario2" value="Interbancario 2" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="interbancario2"
                        value={formData.interbancario2}
                        onChange={(event) =>
                          handleInputChange('interbancario2', event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="shadow-lg p-4 rounded-xl m-4 bg-gray-200">
                    <h2 className="text-green-950 font-semibold">
                      Datos del contacto
                    </h2>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div className="block">
                        <Label htmlFor="contactName" value="Contact Name" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="contactName"
                        value={formData.contactName}
                        onChange={(event) =>
                          handleInputChange('contactName', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="contactEmail" value="Contact Email" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="contactEmail"
                        value={formData.contactEmail}
                        onChange={(event) =>
                          handleInputChange('contactEmail', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="contactPhone" value="Contact Phone" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(event) =>
                          handleInputChange('contactPhone', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="contactDni" value="Contact DNI" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="contactDni"
                        value={formData.contactDni}
                        onChange={(event) =>
                          handleInputChange('contactDni', event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="shadow-lg p-4 rounded-xl m-4 bg-gray-200">
                    <h2 className="text-green-950 font-semibold">Dirección</h2>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div className="block">
                        <Label htmlFor="address" value="Address" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="address"
                        value={formData.address}
                        onChange={(event) =>
                          handleInputChange('address', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="urbanization" value="Urbanization" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="urbanization"
                        value={formData.urbanization}
                        onChange={(event) =>
                          handleInputChange('urbanization', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="district" value="district" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="district"
                        value={formData.district}
                        onChange={(event) =>
                          handleInputChange('district', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="province" value="province" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="province"
                        value={formData.province}
                        onChange={(event) =>
                          handleInputChange('province', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="department" value="department" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="department"
                        value={formData.department}
                        onChange={(event) =>
                          handleInputChange('department', event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="shadow-lg p-4 rounded-xl m-4 bg-gray-200">
                    <h2 className="text-green-950 font-semibold">
                      Porcentajes de las comisiones
                    </h2>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div className="block">
                        <Label
                          htmlFor="salesCommissionPercentage"
                          value="salesCommissionPercentage"
                        />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="salesCommissionPercentage"
                        value={formData.salesCommissionPercentage}
                        onChange={(event) =>
                          handleInputChange(
                            'salesCommissionPercentage',
                            event.target.value
                          )
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
                      <div className="block">
                        <Label
                          htmlFor="paymentCommissionPercentage"
                          value="paymentCommissionPercentage"
                        />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="paymentCommissionPercentage"
                        value={formData.paymentCommissionPercentage}
                        onChange={(event) =>
                          handleInputChange(
                            'paymentCommissionPercentage',
                            event.target.value
                          )
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="shadow-lg p-4 rounded-xl m-4 bg-gray-200">
                    <h2 className="text-green-950 font-semibold">Premios</h2>

                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      <div className="block">
                        <Label htmlFor="firstPrize" value="firstPrize" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="firstPrize"
                        value={formData.firstPrize}
                        onChange={(event) =>
                          handleInputChange('firstPrize', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="SecondPrize" value="SecondPrize" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="SecondPrize"
                        value={formData.SecondPrize}
                        onChange={(event) =>
                          handleInputChange('SecondPrize', event.target.value)
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
                      <div className="block">
                        <Label htmlFor="ThirdPrize" value="ThirdPrize" />
                      </div>
                      <TextInput
                        style={{
                          paddingLeft: '0.5rem',
                          marginLeft: '0.5rem',
                          width: '200px',
                          height: '40px',
                          borderRadius: '10px',
                        }}
                        id="ThirdPrize"
                        value={formData.ThirdPrize}
                        onChange={(event) =>
                          handleInputChange('ThirdPrize', event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <br />
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
                    <br />
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default PutUser;
