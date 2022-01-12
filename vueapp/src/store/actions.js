import Axios from "axios";
// import config from '../../config';

const axios = Axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json"
  }
});

export default {
  login({ commit }, { email, password} ) {
    console.log(axios);
    const promise = axios.post('login', { email, password });

    promise
      .then((response) => {
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        sessionStorage.setItem('token', JSON.stringify(response.data.accessToken));
      })
      .catch(error => commit('error', error));

    return promise;
  },

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    location.reload();
  },
}
