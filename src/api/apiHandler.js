import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

const apiHandler = {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/users/me")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  checkIfOneItem() {
    return service
      .get("/api/users/me/oneItem")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getTypes() {
    return service
      .get("/api/types")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getColors() {
    return service
      .get("/api/colors")
      .then((res) => res.data)
      .catch(errorHandler);
  },


  getItems() {
    return service
      .get("/api/users/me/items")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getMeteo() {
    return service
      .get("/api/meteo")
      .then((res) => res.data)
      .catch(errorHandler);
  },


  postItem(item) {
    return service
      .post("/api/items", item)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  postBatchItems(batch) {
    return service
      .post("/api/items/batchInsert", batch)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOutfit() {
    return service
      .get("/api/outfits/generate")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  getOutfitsHistory() {
    return service
      .get("/api/users/me/outfits")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  postOutfit(outfit) {
    return service
      .post("/api/outfits/", outfit)
      .then((res) => res.data)
      .catch(errorHandler);
  },



  // getItems() {
  //   return service
  //     .get("/api/items")
  //     .then((res) => res.data)
  //     .catch(errorHandler);
  // },
};

export default apiHandler;
