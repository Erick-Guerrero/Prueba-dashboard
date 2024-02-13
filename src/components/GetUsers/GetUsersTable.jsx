import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsuarios } from '../../../redux/actions';
import edit from '../../assets/edit.png';
import borrar from '../../assets/borrar.png';
import PutUser from '../PutUser/PutUser';
import PatchUserEnable from '../PatchUserEnable/PatchUserEnable';
import DeleteUser from '../DeleteUser/DeleteUser';
import style from './GetUsersTable.module.css';

export default function UsersTable() {
  const dispatch = useDispatch();
  const usuarios = useSelector((state) => state.usuarios);
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDialogEnable, setShowDialogEnable] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  
  const handleNameChange = (e) => {
    setSelectedUserName(e.target.value);
  };

  const handleNameClear = () => {
    setSelectedUserName('');
  };

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const handleEmailClear = () => {
    setSelectedEmail('');
  };

  const handleEditClick = (id) => {
    setSelectedUserId(id);
    setShowDialog(true);
  };

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    setShowDeleteDialog(true);
  };

  const handleDisable = (id) => {
    setSelectedUserId(id);
    setShowDialogEnable(true);
  };

  useEffect(() => {
    dispatch(getAllUsuarios());
  }, [dispatch, showDialog, showDeleteDialog, showDialogEnable]);
  
  const filteredUsers = usuarios.data?.filter((usuario) => {
    return (
      usuario.id !== 1 &&
      usuario?.name.toLowerCase().includes(selectedUserName.toLowerCase()) &&
      usuario?.email.toLowerCase().includes(selectedEmail.toLowerCase())
      );
  });
      console.log(filteredUsers);

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

      {showDeleteDialog && (
        <DeleteUser
          open={showDeleteDialog}
          id={selectedUserId}
          userId={selectedUserId}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}

      {showDialogEnable && (
        <PatchUserEnable
          open={showDialogEnable}
          id={selectedUserId}
          userId={selectedUserId}
          onClose={() => setShowDialogEnable(false)}
        />
      )}

      <main className={style.selectContainer}>
      <br />

      <div className="titleContainer">
        <h1>LISTADO DE USUARIOS</h1>
      </div>
<br />
      <div className="style.selectContainer">
        {/* <label className="filtroClientes" htmlFor="name-input">
          Filtrar por cliente
        </label> */}
        <div style={{marginBottom:"10px"}}>
          <input
            id="name-input"
            type="text"
            value={selectedUserName}
            onChange={handleNameChange}
            className="letrasSelect"
            placeholder="Filtrar por cliente"
          />
          {selectedUserName && (
            <button
              onClick={handleNameClear}
              className="absolute right-2 text-xl font-thin top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
            >
              x
            </button>
          )}
        </div>

        {/* <label className="filtroClientes" htmlFor="email-input">
          Filtrar por email
        </label> */}
        <div className="relative inline-block">
          <input
            id="phone-input"
            type="text"
            value={selectedEmail}
            onChange={handleEmailChange}
            className="letrasSelect"
            placeholder="Filtrar por email"
          />
          {selectedEmail && (
            <button
              onClick={handleEmailClear}
              className="absolute right-2 text-xl font-thin top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
            >
              x
            </button>
          )}
        </div>
      </div>

      <div className={style.contenedorTable}>
        <table 
        className={style.contentTable + style.tablaClientes}
        >
          <thead>
            <tr className='border'>
              <th className='border'>Nº</th>
              <th >Nombre</th>
              <th >DNI</th>
              <th >Email</th>
              <th >Rol</th>
              <th className='border-l'>Tel. PLIN</th>
              <th >Tel. YAPE</th>
              <th >Cta. Bancaria 1</th>
              <th >Cta. Bancaria 2</th>
              <th >Interbancario 1</th>
              <th >Interbancario 2</th>
              <th className='border-l'>Contacto Nombre</th>
              <th >Contacto email </th>
              <th >Contacto tel.</th>
              <th >Contacto DNI</th>
              <th className='border-l'>Dirección</th>
              <th >Departmento</th>
              <th >Distrito</th>
              <th >Provincia</th>
              <th >Urbanización</th>
              <th className='border-l' style={{fontSize:'0.5rem'}}>% Comisión Venta</th>
              <th  style={{fontSize:'0.5rem'}}>% Comisión Pago</th>
              <th  style={{fontSize:'0.5rem'}}>1er Premio</th>
              <th  style={{fontSize:'0.5rem'}}>2do Premio</th>
              <th  style={{fontSize:'0.5rem'}}>3er Premio</th>
              <th className='border'>Editar</th>
              <th className='border'>Borrar</th>
              <th className='border'>Activo</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((c, index) => (
                <tr key={c.id} className={index % 2 === 0 ? 'active-row' : ''}>
                  <td className='border  border-neutral-400'>{c.id}</td>
                  <td className='border-l'>{c.name}</td>
                  <td className='border-l'>{c.dni}</td>
                  <td className='border-l'>{c.email}</td>
                  <td className='border-l'>{c.role}</td>
                  <td className='border border-l-neutral-400'>{c.phonePLIN}</td>
                  <td className='border-l'>{c.phoneYAPE}</td>
                  <td className='border-l'>{c.bankAccount1}</td>
                  <td className='border-l'>{c.bankAccount2}</td>
                  <td className='border-l'>{c.interbancario1}</td>
                  <td className='border-l'>{c.interbancario2}</td>
                  <td className='border border-l-neutral-400'>{c.contactName}</td>
                  <td className='border-l'>{c.contactEmail}</td>
                  <td className='border-l'>{c.contactPhone}</td>
                  <td className='border-l'>{c.contactDni}</td>
                  <td className='border border-l-neutral-400'>{c.address}</td>
                  <td className='border-l'>{c.department}</td>
                  <td className='border-l'>{c.district}</td>
                  <td className='border-l'>{c.province}</td>
                  <td className='border-l'>{c.urbanization}</td>
                  <td className='border  border-l-neutral-400'>{c.salesCommissionPercentage} %</td>
                  <td className='border-l'>{c.paymentCommissionPercentage} %</td>
                  <td className='border-l'>{c.firstPrize}</td>
                  <td className='border-l'>{c.SecondPrize}</td>
                  <td className='border-l'>{c.ThirdPrize}</td>

                  <td className='border-l  border-l-neutral-400 icono' >
                    <button onClick={() => handleEditClick(c.id)}>
                      <img
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                        }}
                        src={edit}
                        alt="Edit"
                      />
                    </button>
                  </td>

                  <td className='border-l icono' >
                    <button onClick={() => handleDeleteClick(c.id)}>
                      <img
                        style={{
                          width: '20px',
                          height: '20px',
                          cursor: 'pointer',
                        }}
                        src={borrar}
                        alt="Borrar"
                      />
                    </button>
                  </td>

                  <td className='border  border-r-neutral-400 icono' >
                    {c.name !== 'Erick Guerrero' && (
                      <button
                        className="border-black rounded-md"
                        onClick={() => handleDisable(c.id)}
                      >
                        {c.enable ? (
                          <span className="text-white font-semibold bg-green-600 px-2 border-2 border-black rounded-md">
                            Si
                          </span>
                        ) : (
                          <span className="text-white font-semibold bg-red-600 px-2 border-2 border-black rounded-md">
                            No
                          </span>
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  No hay resultados que coincidan con el filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </main>
    </>
  );
}
