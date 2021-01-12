import axios from "axios";

export const PRUEBA_API = "PRUEBA_API";
export const ADD_TOOL = "ADD_TOOL";
export const ADD_CLIENT = "ADD_CLIENT";
export const CARGA_DB = "CARGA_DB";
export const ALL_CLIENT = "ALL_CLIENT";
export const GET_TOOL = "GET_TOOL";
export const GET_ALL_TOOLS = "GET_ALL_TOOLS";
export const INSERT_CATEGORY = "INSERT_CATEGORY";
export const LOGIN = "LOGIN";
export const LOGIN_TRUE = "LOGIN_TRUE";
export const LOGIN_COOKIE = "LOGIN_COOKIE";
export const USER_LOGOUT = "USER_LOGOUT";
export const INSERT_TOOLS = "INSERT_TOOLS";
export const GET_ALL_CATEGORY = "GET_ALL_CATEGORY";
export const INSERT_CLIENT = "INSERT_CLIENT";
export const UPDATE_TOOLS = "UPDATE_TOOLS";
export const UPDATE_CLIENT = "UPDATE_CLIENT";
export const DELETE_CLIENT = "DELETE_CLIENT";
export const TOOLS_DELETE = "TOOLS_DELETE";
export const ORDER = "ORDER";
export const ALL_ORDER = "ALL_ORDER";
export const CLIENT_ORDER = "CLIENT_ORDER";
export const TOOLS_ORDER = "TOOLS_ORDER";
export const UPDATE_STOCK = "UPDATE_STOCK";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const DELETE_ORDER = "UPDATE_ORDER";

// export function infoMovie (apiKey, ciudad ) {
//     return function(dispatch) {
//       return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}`)
//         .then(result => result.data)
//         .then(data => {
//           dispatch({
//             type: PRUEBA_API,
//             payload: data
//           })
//           console.log("El Actions ",data)
//         })
//     };
//   }

export function cargardb() {
  return function (dispatch) {
    return axios
      .post(`http://localhost:3005/registerhd`, { withCredentials: true })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: "CARGA_DB",
          payload: data,
        });
        console.log("la carga DB ", data);
      });
  };
}

export function getClient() {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3005/clients`, { withCredentials: true })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: "ALL_CLIENT",
          payload: data,
        });
        //console.log("Estos son todos los clientes", data)
      });
  };
}

export function getAllTools() {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3005/tools`, { withCredentials: true })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: "GET_ALL_TOOLS",
          payload: data,
        });
        // console.log("Todas las tools", data)
      });
  };
}

export function getAllCategory() {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3005/category`, { withCredentials: true })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: "GET_ALL_CATEGORY",
          payload: data,
        });
        //console.log("Todas las CATEGORY", data)
      });
  };
}

export function getTool() {
  return function (dispatch) {
    return axios
      .get(`http://localhost:3005/tools/:id`, { withCredentials: true })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: "GET_TOOL",
          payload: data,
        });
        console.log("La tool es", data);
      });
  };
}

export function insertCategory(category) {
  console.log("EL insert llega ", category);
  return function (dispatch) {
    return axios
      .post(`http://localhost:3005/tools/insertCategory`, category, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: INSERT_CATEGORY,
          payload: data,
        });
        console.log("El insert category devuelve ", data);
      });
  };
}

export function login(login) {
  console.log("Los datos del login", login);
  return function (dispatch) {
    return axios
      .post(`http://localhost:3005/login`, login, { withCredentials: true })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: LOGIN,
          payload: data,
        });
        //console.log("Login devuelve", data)
      });
  };
}

export function logintrue() {
  return function (dispatch) {
    dispatch({
      type: LOGIN_TRUE,
    });
  };
}

export function loginUserCookie() {
  return function (dispatch) {
    return axios
      .get("http://localhost:3005/login", { withCredentials: true })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: LOGIN_COOKIE,
          payload: data,
        });
      });
  };
}

export function userLogout() {
  axios.get("http://localhost:3005/logout", { withCredentials: true });
  return {
    type: USER_LOGOUT,
  };
}

export function insertTools(tools) {
  console.log("EL insertTOOLS llega", tools);
  return function (dispatch) {
    return axios
      .post(`http://localhost:3005/tools/insertTools`, tools, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: INSERT_TOOLS,
          payload: data,
        });
        console.log("El insert TOOLS devuelve ", data);
      });
  };
}

export function insertClient(client) {
  console.log("El insertClient llega", client);

  return function (dispatch) {
    return axios
      .post(`http://localhost:3005/clients/addClient`, client, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: INSERT_CLIENT,
          payload: data,
        });
        console.log("El insertClient devuelve", data);
      });
  };
}
export function updateTools(tool) {
  //console.log("El UPDATE_TOOLS llega", date)
  return function (dispatch) {
    return axios
      .put(`http://localhost:3005/tools/update/${tool.id}`, tool, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: UPDATE_TOOLS,
          payload: data,
        });
        //console.log("El UPDATE_TOOLS", data)
      });
  };
}

export function updateClient(client) {
  console.log("El updateClient llega", client);
  return function (dispatch) {
    return axios
      .put(`http://localhost:3005/clients/updateClient/${client.id}`, client, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: UPDATE_CLIENT,
          payload: data,
        });
        console.log("El updateClient devuelve", data);
      });
  };
}

export function deleteClient(id) {
  console.log("El deleteClient ID llega", id);
  return function (dispatch) {
    return axios
      .delete(`http://localhost:3005/clients/delete/${id}`, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: DELETE_CLIENT,
          payload: data,
        });
        console.log("El deleteClient devuelve", data);
      });
  };
}

export function deleteTools(id) {
  console.log("el id en actions ", id);
  return function (dispatch) {
    return axios
      .delete(`http://localhost:3005/tools/delete/${id}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: TOOLS_DELETE,
          payload: data,
        });
      });
  };
}

export function order(order) {
  console.log("Order tiene ", order);
  return function (dispatch) {
    return axios
      .post(`http://localhost:3005/orders`, order, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: ORDER,
          payload: data,
        });
        console.log("order devuelve..", data);
      });
  };
}

export function allOrder() {
  console.log("Order ALL_ORDER ", order);
  return function (dispatch) {
    return axios
      .get(`http://localhost:3005/orders`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: ALL_ORDER,
          payload: data,
        });
        console.log("order ALL_ORDER..", data);
      });
  };
}
export function clientOrder(clientIdOrder) {
  console.log("llega clientIdOrder ", clientIdOrder);
  return function (dispatch) {
    return axios
      .get(`http://localhost:3005/orders/${clientIdOrder}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: CLIENT_ORDER,
          payload: data,
        });
        console.log("Me devuelve clientIdOrder..", data);
      });
  };
}

export function toolsOrder(toolsOrder) {
  console.log("llega toolsOrder ", toolsOrder);
  return function (dispatch) {
    return axios
      .get(`http://localhost:3005/orders/tool/${toolsOrder}`, {
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        dispatch({
          type: TOOLS_ORDER,
          payload: data,
        });
        console.log("Me devuelve toolsOrder..", data);
      });
  };
}

export function updateStock(cantidad, id) {
  console.log("El UPDATE_TOOLS llegaaaa actions 326", cantidad, id);
  let stock = { stock: cantidad };
  return function (dispatch) {
    return axios
      .put(`http://localhost:3005/tools/update/${id}`, stock, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: UPDATE_STOCK,
          payload: data,
        });
        //console.log("El UPDATE_TOOLS", data)
      });
  };
}

export function updateOrder(body) {
  return function (dispatch) {
    return axios
      .put(`http://localhost:3005/orders/update/`, body, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: UPDATE_ORDER,
        });
      });
  };
}

export function deleteOrder(id) {
  return function (dispatch) {
    return axios
      .delete(`http://localhost:3005/orders/delete/${id}`, {
        withCredentials: true,
      })
      .then((result) => result.data)
      .then((data) => {
        dispatch({
          type: DELETE_ORDER,
        });
      });
  };
}
