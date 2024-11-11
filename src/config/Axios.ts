import axios from "axios";


const api = axios.create({
  baseURL: "https://backend.pppix.app.br/api",
  headers: {
    'accept': 'application/json'
  }
});


export default api;
