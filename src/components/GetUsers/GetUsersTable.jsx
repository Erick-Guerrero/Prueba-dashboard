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
            <tr>
              <th>Nº</th>
              <th>Nombre</th>
              <th>DNI</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Tel. PLIN</th>
              <th>Tel. YAPE</th>
              <th>Contacto Nombre</th>
              <th>Contacto email </th>
              <th>Contacto tel.</th>
              <th>Contacto DNI</th>
              <th>Cta. Bancaria 1</th>
              <th>Cta. Bancaria 2</th>
              <th>Dirección</th>
              <th>Departmento</th>
              <th>Distrito</th>
              <th>Provincia</th>
              <th>Urbanización</th>
              <th style={{fontSize:'0.5rem'}}>% Comisión Venta</th>
              <th style={{fontSize:'0.5rem'}}>% Comisión Pago</th>
              <th style={{fontSize:'0.5rem'}}>1er Premio</th>
              <th style={{fontSize:'0.5rem'}}>2do Premio</th>
              <th style={{fontSize:'0.5rem'}}>3er Premio</th>
              <th>Editar</th>
              <th>Borrar</th>
              <th>Activo</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers.map((c, index) => (
                <tr key={c.id} className={index % 2 === 0 ? 'active-row' : ''}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.dni}</td>
                  <td>{c.email}</td>
                  <td>{c.role}</td>
                  <td>{c.phonePLIN}</td>
                  <td>{c.phoneYAPE}</td>
                  <td>{c.contactName}</td>
                  <td>{c.contactEmail}</td>
                  <td>{c.contactPhone}</td>
                  <td>{c.contactDni}</td>
                  <td>{c.bankAccount1}</td>
                  <td>{c.bankAccount2}</td>
                  <td>{c.address}</td>
                  <td>{c.department}</td>
                  <td>{c.district}</td>
                  <td>{c.province}</td>
                  <td>{c.urbanization}</td>
                  <td>{c.salesCommissionPercentage} %</td>
                  <td>{c.paymentCommissionPercentage} %</td>
                  <td>{c.firstPrize}</td>
                  <td>{c.SecondPrize}</td>
                  <td>{c.ThirdPrize}</td>

                  <td className="icono">
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

                  <td className="icono">
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

                  <td className="icono">
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
