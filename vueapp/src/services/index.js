import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-type": "application/json"
  }
});

class DataService {
  //Login
  login(data) {
    return axios.post("/login", data);
  }
  
  //User administration 
  getAllUsers() {
    return axios.get("/users");
  }
  createUser(data) {
    return axios.post("/users", data);
  }
  updateUser(id, data) {
    return axios.put(`/users/${id}`, data);
  }


  //Application administration
  getApplications() {
    return axios.get(`/items/applications`);
  }
  getApproved() {
    return axios.get(`/items/approved`);
  }
  getRejected() {
    return axios.get(`/items/rejected`);
  }
  approve(id) {
    return axios.put(`/items/${id}/approve`);
  }
  reject(id) {
    return axios.put(`/items/${id}/reject`);
  }

  //Events administration
  getAllEvents() {
    return axios.get("/events");
  }
  createEvent(data) {
    return axios.post("/events", data);
  }
  updateEvent(id, data) {
    return axios.put(`/events/${id}`, data);
  }

  //apply
  createItem(formData) {
    console.log(formData);
    return axios({
      method: "post",
      url: "items",
      data: formData,
      headers: {
         "Content-Type": "multipart/form-data"
      },
   });
  }

  findItemByEvent(id) {
    return axios.get(`/items?eventId=${id}`);
  }


  
  getAllItems() {
    return axios.get("/items");
  }
  getItem(id) {
    return axios.get(`/items/${id}`);
  }
 
}

export default new DataService();
