import {
  POST_REGISTRO_USUARIO,
  USER_LOGIN_SUCCESS,
  GET_CLIENTES,
  GET_ALL_USUARIOS,
  GET_TICKETS,
  GET_CASH,
  POST_CASH,
  GET_CLIENTE_POR_ID,
  CLEAR_CLIENT_DETAIL,
  GET_CASH_ADMIN,
  GET_TICKET_DATE,
  GET_TICKET_GNC,
  POST_CASH_ADMIN,
} from "../actions/index.js";

const initialState = {
  usuarios: [],
  clientes: [],
  tickets: [],
  cash: [],
  cashAdmin: [],
  postCashAdmin: [],
  filterCash: [],
  ClientDetail: null,
  filterTicket: [],
  ticketGNC: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return { ...state, userInfo: action.payload };

    case POST_REGISTRO_USUARIO:
      return {
        ...state,
        registroUsuario: action.payload,
      };

    case GET_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
      };

    case GET_TICKET_GNC:
      return {
        ...state,
        ticketGNC: action.payload,
      };

    case GET_ALL_USUARIOS:
      return {
        ...state,
        usuarios: action.payload,
      };

    case GET_TICKETS:
      return {
        ...state,
        tickets: action.payload,
      };

    case GET_CASH:
      return {
        ...state,
        cash: action.payload,
      };

    case GET_CASH_ADMIN:
      return {
        ...state,
        cashAdmin: action.payload,
      };

    case POST_CASH:
      return {
        ...state,
        filterCash: action.payload,
      };

    case POST_CASH_ADMIN:
      return {
        ...state,
        postCashAdmin: action.payload,
      };

    case GET_CLIENTE_POR_ID:
      return {
        ...state,
        ClientDetail: action.payload,
      };

    case CLEAR_CLIENT_DETAIL:
      return {
        ...state,
        ClientDetail: null,
      };

    case GET_TICKET_DATE:
      return {
        ...state,
        filterTicket: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
