import axios from "axios";

let url = "http://localhost:8080/api";

const Http = axios.create({
  baseURL: url
});

export default Http;