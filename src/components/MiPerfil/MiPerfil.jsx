// import NavBar from '../NavBar/NavBar';
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import Navbar from '../Navbar/Navbar.jsx';
// import {  TextField, Card, CardMedia, Typography, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material/';
import { useDispatch } from 'react-redux';
import { getAllUsuarios, putUsuario, login } from '../../../redux/actions';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const MiPerfil = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const usuarios = useSelector((state) => state.usuarios);
  const [open, setOpen] = useState(false);
  
  const [passwords, setPasswords] = useState({
    oldPass: '',
    newPass: '',
    newPassAgain: '',
    password: '',
  });
  const [pass, setPass] = useState({
    password: '',
  });
  useEffect(() => {
    dispatch(getAllUsuarios());
  }, [dispatch]);

  const token = localStorage.getItem('token');

  const ses = JSON.parse(Buffer.from(token.split('.')[1], 'BASE64').toString());
  // const usuario = usuarios.filter((e) => e.email === ses.email);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
    console.log(name, value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleCloseSession = (e) => {
    e.preventDefault
    swal({
      title: `${name.split(" ")[0]} ¿Está seguro que quiere cerrar sesión?`,
      icon: "warning",
      buttons: true,
    })

      .then((logout) => {
        if (logout) {
          localStorage.clear()
          swal(`La sesion de ${name} fue cerrada con éxito`, {
            icon: "success",
            timer: 1000,
            showButton: false
          }).then(
            () => { (navigate(`/`)) }
          )
        }
      });
  }

  const handleActualizar = () => {
    // localStorage.clear()
    dispatch(login(ses.email, passwords.oldPass))
      .then(() => {
        // const token = localStorage.getItem('token');
        setPass({ password: passwords.newPass });
      })
      .then(() => dispatch(putUsuario(ses.id, pass)))
      .then(() => {
        swal({
          title: `Su contraseña fue actualizada con éxito.`,
          text: `Ingrese a su cuenta nuevamente`,
          icon: 'success',
          // timer: 1000,
          showbutton: false,
        }).then(() => {
          navigate(`/`);
        });
        // console.log(pass.password);
        setOpen(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    if (passwords.newPass) {
      setPass({ password: passwords.newPass });
    }
  }, [passwords.newPass]);

  const handleClose = () => {
    setPasswords({
      oldPass: '',
      newPass: '',
      newPassAgain: '',
    });
    setOpen(false);
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center my-40">
        <h2>Mi perfil</h2>
       

        <div>
          <h3>{ses.name}</h3>
        </div>
        
        <div>
          <h3>Email: {ses.email}</h3>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 m-2 w-48"
            onClick={handleClickOpen}
          >
            Cambiar contraseña
          </button>
        </div>
        <div>
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 m-2 w-48"
            onClick={handleCloseSession}
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-slate-300">
          <div className="flex flex-col modal-container max-w-md m-4 bg-slate-300">
            <h2>Cambie su contraseña</h2>
            <input
              name="oldPass"
              type="password"
              placeholder="contraseña acutal"
              label="contraseña acutal"
              onChange={handleChange}
              value={passwords.oldPass}
            />

            <input
              name="newPass"
              type="password"
              placeholder="nueva contraseña"
              label="nueva contraseña"
              onChange={handleChange}
              value={passwords.newPass}
            />

            <input
              name="newPassAgain"
              type="password"
              placeholder="nueva contraseña"
              label="nueva contraseña"
              onChange={handleChange}
              value={passwords.newPassAgain}
            />

            <div className="flex flex-row">
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 m-2"
                onClick={handleClose}
              >
                Cerrar
              </button>
              
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 m-2"
                disabled={
                  !passwords.oldPass ||
                  !passwords.newPass ||
                  !passwords.newPassAgain ||
                  // Si la contraseña del token es igual a la ingresada
                  // Si la contraseña nueva1 es diferente a la contraseña nueva2
                  passwords.newPass !== passwords.newPassAgain
                }
                onClick={handleActualizar}
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MiPerfil;
