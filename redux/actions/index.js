import axios from "axios";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const POST_TICKET = "POST_TICKET";
export const POST_CLIENTE = "POST_CLIENTE";
export const POST_USER = "POST_USER";
export const GET_CLIENTES = "GET_CLIENTES";
export const GET_TICKETS = "GET_TICKETS";
export const GET_CASH = "GET_CASH";
export const POST_CASH = "POST_CASH";
export const POST_NUMBER = "POST_NUMBER";
export const GET_CASH_ADMIN = "GET_CASH_ADMIN";
export const POST_CASH_ADMIN = "POST_CASH_ADMIN";

export const POST_REGISTRO_USUARIO = "POST_REGISTRO_USUARIO";
export const GET_ALL_USUARIOS = "GET_ALL_USUARIOS";
export const PUT_USUARIO = "PUT_USUARIO";
export const PATCH_USER_ENABLE = "PATCH_USER_ENABLE";
export const PUT_CLIENTE = "PUT_CLIENTE";
export const PUT_PAYMENT_OK = "PUT_PAYMENT_OK";
export const GET_CLIENTE_POR_ID = "GET_CLIENTE_POR_ID";
export const CLEAR_CLIENT_DETAIL = "CLEAR_CLIENT_DETAIL";
export const SELF_EXTRACTION = "SELF_EXTRACTION";
export const SELF_DEPOSIT = "SELF_DEPOSIT";
export const PAYMENT_DASHBOARD_SUCCESS = "PAYMENT_DASHBOARD_SUCCESS";
export const GET_TICKET_DATE = "GET_TICKET_DATE";
export const PATCH_TICKET_GNC = "PATCH_TICKET_GNC";
export const GET_TICKET_GNC = "GET_TICKET_GNC";



//const app = "https://erick-guerrero-back-production.up.railway.app";

const app = "https://back-production-3b46.up.railway.app"

//const app = "http://localhost:3001";


// const token = localStorage.getItem('token');

axios.defaults.baseURL = app;

// Interceptor para agregar el token en el encabezado de las solicitudes
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Obtén el token de tu almacenamiento (puedes ajustarlo según tu implementación)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Agrega el token en el encabezado
    }
    const userId = localStorage.getItem("userid"); // Obtén el usuario de tu almacenamiento (puedes ajustarlo según tu implementación)
    const email = localStorage.getItem("email"); // Obtén el usuario de tu almacenamiento (puedes ajustarlo según tu implementación)
    const name = localStorage.getItem("name"); // Obtén el usuario de tu almacenamiento (puedes ajustarlo según tu implementación)
    if (email) {
      config.headers["Email"] = email; // Agrega el usuario en el encabezado o cuerpo de la solicitud
    }
    if (name) {
      config.headers["Name"] = name; // Agrega el usuario en el encabezado o cuerpo de la solicitud
    }
    if (userId) {
      config.headers["userid"] = userId; // Agrega el usuario en el encabezado o cuerpo de la solicitud
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }

);

export const postTicket = (values) => {
  return async function () {
    try {
      console.log(values);
      await axios.post(`${app}/ticket`, values);
      return { type: POST_TICKET, payload: { ...values } };
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCliente = (values) => {
  return async function () {
    try {
      console.log(values);
      await axios.post(`${app}/client`, values);
      return { type: POST_CLIENTE, payload: { ...values } };
    } catch (error) {
      console.log(error);
    }
  };
};

export const addNumber = (values) => {
  return async function () {
    try {
      console.log(values);
      await axios.post(`${app}/number`, values);
      return { type: POST_NUMBER, payload: { ...values } };
    } catch (error) {
      console.log(error);
    }
  };
};

export const postUser = (values) => {
  return async function () {
    try {
      console.log(values);
      await axios.post(`${app}/user`, values);
      return { type: POST_USER, payload: { ...values } };
    } catch (error) {
      console.log(error);
    }
  };
};

export const getClientes = () => {
  return async function (dispatch) {
    const clientes = await axios.get(`${app}/client`);
    return dispatch({ type: GET_CLIENTES, payload: clientes.data });
  };
};

export const getCash = () => {
  return async function (dispatch) {
    const clientes = await axios.get(`${app}/cash`);
    return dispatch({ type: GET_CASH, payload: clientes.data });
  };
};

export const postCash = (value) => {
  return async function (dispatch) {
    const clientes = await axios.post(`${app}/postCash`,value);
    return dispatch({ type:  POST_CASH, payload: clientes.data });
  };
};

export const postCashAdmin = (value) => {
  return async function (dispatch) {
    const data = await axios.post(`${app}/postCashAdmin`,value);
    return dispatch({ type:  POST_CASH_ADMIN, payload: data.data });
  };
};

export const getAllUsuarios = () => {
  return async function (dispatch) {
    const usuarios = await axios.get(`${app}/user`);
    return dispatch({ type: GET_ALL_USUARIOS, payload: usuarios.data });
  };
};

export const getTickets = (date,selectHr,selectLottery) => {
  return async (dispatch) => {
    try {
      const url = `${app}/allTicket`

      const requestBody = {
        selectHr,
        selectLottery,
        date,
      };
      const response = await axios.post(url,requestBody);
      const data = response.data;
      dispatch({ type: GET_TICKETS, payload: data });
      console.log("Data retrieved:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};

export const getTicketDate = (value) => {
  return async function (dispatch) {
    const data = await axios.post(`${app}/getTicketDate`, value);
    return dispatch({ type: GET_TICKET_DATE, payload: data.data });
  };
};

export const putUsuario = (id, data) => {
  return async function () {
    try {
      await axios.put(`${app}/user/${id}`, data);
      return { type: PUT_USUARIO };
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUsuario = (id) => {
  return async function () {
    try {
      await axios.delete(`${app}/user/${id}`);
      return console.log(`Usuario ${id} borrado con éxito`) ;
    } catch (error) {
      console.log(error);
    }
  };
};

export const patchUserEnable = (id, data) => {
  return async function () {
    try {
      await axios.patch(`${app}/user/${id}`, data);
      return { type: PATCH_USER_ENABLE };
    } catch (error) {
      console.log(error);
    }
  };
};

export const putClient = (id, formData) => {
  return async function () {
    try {
      await axios.put(`${app}/client/${id}`, formData);
      return { type: PUT_CLIENTE };
    } catch (error) {
      console.log(error);
    }
  };
};

export const putPaymentOk = (id, formData) => {
  return async function () {
    try {
      await axios.put(`${app}/paymentOk`, formData);
      return { type: PUT_PAYMENT_OK };
    } catch (error) {
      console.log(error);
    }
  };
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(`${app}/login`, {
      email,
      password,
    });
    // console.log(data.data.id);
    localStorage.setItem("userid", data.data.id);
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("name", data.data.name);
    localStorage.setItem("email", data.data.email);
    // localStorage.setItem("imgUrl", data.imgUrl);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getClientId = (id) => {
  return async function (dispatch) {
    try {
      const cliente = await axios.get(`${app}/client/${id}`);
      return dispatch({ type: GET_CLIENTE_POR_ID, payload: cliente.data }); 
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
    }
  };
};

export const clearClientDetail = () => {
  return { type: 'CLEAR_CLIENT_DETAIL' };
};

export const getCashAdmin = () => {
  return async function (dispatch) {
    const clientes = await axios.get(`${app}/cashadmin`);
    return dispatch({ type: GET_CASH_ADMIN, payload: clientes.data });
  };
};




export const selfExtraction = (data) => {
  return async function () {
    try {
      const userId = localStorage.getItem("userid"); // Obtener el userId desde el almacenamiento local
      await axios.post(`${app}/extraction`, data, {
        headers: {
          userid: userId,
        },
      } );
      return { type: SELF_EXTRACTION };
    } catch (error) {
      console.log(error);
    }
  };
};

export const selfDeposit = (data) => {
  return async function () {
    try {
      const userId = localStorage.getItem("userid"); // Obtener el userId desde el almacenamiento local
      await axios.post(`${app}/deposit`, data, {
        headers: {
          userid: userId,
        },
      } );
      return { type: SELF_DEPOSIT};
    } catch (error) {
      console.log(error);
    }
  };
};



// actions.js
// actions.js


export const paymentDashboard = (data) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${app}/paymentdashboard`, data, {
        headers: {
          id: data.userId // Asegúrate de enviar el userId en los encabezados
        }
      });
      dispatch({ type: PAYMENT_DASHBOARD_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error en paymentDashboard:', error);
    }
  };
};



export const ticketAdmin = (ticketId) => {
  return async () => {
    try {
      const userId = localStorage.getItem("userid");
      const response = await axios.patch(`${app}/ticketAdmin/${ticketId}`, null, {
        headers: {
          userid: userId,
        },
      });

      if (response.status === 200) {
        console.log("Estado del ticket cambiado a Pendiente");
      } else {
        console.error("Hubo un error al cambiar el estado del ticket");
      }
    } catch (error) {
      console.error("Error al cambiar el estado del ticket:", error);
    }
  };
};


export const patchTicketGNC = () => {
  return async function () {
    try {
      await axios.patch(`${app}/gnc`);
      return { type: PATCH_TICKET_GNC };
    } catch (error) {
      console.log(error);
    }
  };
};

export const getTicketGNC = () => {
  return async function (dispatch) {
    const ticketsGNC = await axios.get(`${app}/gncview`);
    return dispatch({ type: GET_TICKET_GNC, payload: ticketsGNC.data });
  };
};

