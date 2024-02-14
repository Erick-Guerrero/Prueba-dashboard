import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllUsuarios, postUser } from '../../../redux/actions';
import swal from 'sweetalert';
import Navbar from '../Navbar/Navbar.jsx';
import style from './Form.module.css';

function UserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuarios = useSelector((state) => state.usuarios);
  const [duplicatedEmail, setDuplicatedEmail] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: 'ejemplo@gmail.com',
    role: 'User',
    password: '',
    dni: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    businessName:'',
    ownerPhone:'',
    contactDni: '',
    phoneYAPE: '',
    phonePLIN: '',
    bankAccount1: '',
    bankAccount2: '',
    interbancario1:'',
    interbancario2:'',
    address: '',
    urbanization: '',
    district: '',
    province: '',
    department: '',
    salesCommissionPercentage: 8,
    paymentCommissionPercentage: 4,
    firstPrize: 30,
    SecondPrize: 20,
    ThirdPrize: 10,
  });

  const u = usuarios.data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Usar el estado actualizado
    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Verificar duplicados con el estado actualizado
    const isDuplicated = u.some((user) => user.email === updatedFormData.email);
    setDuplicatedEmail(isDuplicated);

    // Validar si están completos los campos
    const isValid =
      updatedFormData.name !== '' &&
      updatedFormData.email !== '' &&
      updatedFormData.role !== '' &&
      updatedFormData.password !== '' &&
      !isDuplicated;

    setIsValid(isValid);
  };

  useEffect(() => {
    dispatch(getAllUsuarios());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(postUser(formData));

      const { name } = formData;
      if (!response.error) {
        swal(`El cliente ${name} fue creado con éxito`, {
          icon: 'success',
          showButton: false,
        }).then(() => {
          navigate(`/home`);
        });
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error);

      if (error.response) {
        // Si la respuesta del servidor tiene un status diferente a 2xx
        swal(
          'Error',
          'No se pudo crear el cliente. Estado del servidor: ' +
            error.response.status,
          'error'
        );
      } else if (error.request) {
        // Si la solicitud fue realizada pero no se recibió respuesta del servidor
        swal('Error', 'No se recibió respuesta del servidor', 'error');
      } else {
        // Otros tipos de errores
        swal('Error', 'Ocurrió un error inesperado', 'error');
      }
    }
  };

  return (
    <>
      <Navbar />
      <br></br>
      <div className={style.mainContainerForm}>
        <form onSubmit={handleSubmit}>
          <div className={style.formGrid}>
            <div className="shadow-lg p-4 rounded-xl">
              <h2 className="text-green-950 font-semibold">
                Datos personales del titular
              </h2>



              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="name">
                  Nombre/Apellido
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>


              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="phone">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={style.letras}
                />
                {duplicatedEmail && (
                  <p className="text-red-600 text-center">
                    Email ya registrado
                  </p>
                )}
              </div>

              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="name">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="ownerPhone"
                  name="ownerPhone"
                  value={formData.ownerPhone}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>

              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="name">
                  Documento de Identidad
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>

              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="name">
                  Nombre del local
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>

              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
            </div>

            <div className="shadow-lg p-4 rounded-xl">
              <h2 className="text-green-950 font-semibold">
                Datos personales del contacto
              </h2>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="name">
                Nombre/Apellido
                </label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="name">
                  Email
                </label>
                <input
                  type="text"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="name">
                  Teléfono
                </label>
                <input
                  type="text"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="name">
                  Documento de Identidad
                </label>
                <input
                  type="text"
                  id="contactDni"
                  name="contactDni"
                  value={formData.contactDni}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
            </div>

            <div className="shadow-lg p-4 rounded-xl">
            <h2 className='text-green-950 font-semibold'>Datos administrativos</h2>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="phoneYAPE">
                  Telefono YAPE
                </label>
                <input
                  type="phone"
                  id="phoneYAPE"
                  name="phoneYAPE"
                  value={formData.phoneYAPE}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="phonePLIN">
                  Telefono PLIN
                </label>
                <input
                  type="phone"
                  id="phonePLIN"
                  name="phonePLIN"
                  value={formData.phonePLIN}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="bankAccount1">
                  Cuenta Bancaria 1
                </label>
                <input
                  type="text"
                  id="bankAccount1"
                  name="bankAccount1"
                  value={formData.bankAccount1}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="bankAccount2">
                  Cuenta Bancaria 2
                </label>
                <input
                  type="text"
                  id="bankAccount2"
                  name="bankAccount2"
                  value={formData.bankAccount2}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="interbancario1">
                  Interbancario 1
                </label>
                <input
                  type="text"
                  id="interbancario1"
                  name="interbancario1"
                  value={formData.interbancario1}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="interbancario2">
                  Interbancario 2
                </label>
                <input
                  type="text"
                  id="interbancario2"
                  name="interbancario2"
                  value={formData.interbancario2}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
            </div>

            <div className="shadow-lg p-4 rounded-xl">
            <h2 className='text-green-950 font-semibold'>Dirección</h2>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="address">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="urbanization">
                  Urbanización
                </label>
                <input
                  type="text"
                  id="urbanization"
                  name="urbanization"
                  value={formData.urbanization}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="district">
                  Distrito
                </label>
                <input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>

              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="province">
                  Provincia
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>

              <div className={style.contenedorInput}>
                <label className={style.titleInfo} htmlFor="department">
                  Departamento
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
            </div>

            <div className="shadow-lg p-4 rounded-xl">
            <h2 className='text-green-950 font-semibold'>Porcentajes de las comisiones</h2>
              <div className={style.customInput}>
                <label
                  className={style.titleInfo}
                  htmlFor="salesCommissionPercentage"
                >
                  Comisiones Ventas %
                </label>
                <input
                  type="number"
                  id="salesCommissionPercentage"
                  name="salesCommissionPercentage"
                  value={formData.salesCommissionPercentage}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>

              <div className={style.customInput}>
                <label
                  className={style.titleInfo}
                  htmlFor="paymentCommissionPercentage"
                >
                  Comisiones Pagos %
                </label>
                <input
                  type="number"
                  id="paymentCommissionPercentage"
                  name="paymentCommissionPercentage"
                  value={formData.paymentCommissionPercentage}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
            </div>

            <div className="shadow-lg p-4 rounded-xl">
            <h2 className='text-green-950 font-semibold'>Premios</h2>
              <div className={style.customInput}>
                <label className={style.titleInfo} htmlFor="firstPrize">
                  1er Premio
                </label>
                <input
                  type="number"
                  id="firstPrize"
                  name="firstPrize"
                  value={formData.firstPrize}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>

              <div className={style.customInput}>
                <label className={style.titleInfo} htmlFor="SecondPrize">
                  2do Premio
                </label>
                <input
                  type="number"
                  id="SecondPrize"
                  name="SecondPrize"
                  value={formData.SecondPrize}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>

              <div className={style.customInput}>
                <label className={style.titleInfo} htmlFor="ThirdPrize">
                  3er Premio
                </label>
                <input
                  type="number"
                  id="ThirdPrize"
                  name="ThirdPrize"
                  value={formData.ThirdPrize}
                  onChange={handleChange}
                  className={style.letras}
                />
              </div>
            </div>
          </div>
          {/*        
          <div className={style.contenedorInput}>
            <label className={style.titleInfo} htmlFor="role">
              Rol
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={style.letras}
            />
          </div> */}

          <div
            className={`${
              duplicatedEmail || !isValid ? 'btFormDis' : 'btForm'
            } ${style.customButton}`}
          >
            <button
              className={style.btForm}
              type="submit"
              disabled={duplicatedEmail || !isValid}
            >
              Crear usuario
            </button>
          </div>
        </form>
      </div>
      <br></br>
    </>
  );
}

export default UserForm;
