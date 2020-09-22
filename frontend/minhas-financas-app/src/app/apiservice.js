import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://dvsilva-minhas-financas-api.herokuapp.com",
});

class ApiService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  get(url) {
    const requestURL = `${this.apiUrl}${url}`;
    return httpClient.get(requestURL);
  }

  post(url, objeto) {
    const requestURL = `${this.apiUrl}${url}`;
    return httpClient.post(requestURL, objeto);
  }

  put(url, objeto) {
    const requestURL = `${this.apiUrl}${url}`;
    return httpClient.put(requestURL, objeto);
  }

  delete(url) {
    const requestURL = `${this.apiUrl}${url}`;
    return httpClient.delete(requestURL);
  }
}

export default ApiService;
