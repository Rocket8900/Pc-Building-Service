import axios from "axios"

const ORDER_BASE_URL = "http://localhost:5009"


export const getOrderByIdAPI = async (id) => {
    return axios.post(`${ORDER_BASE_URL}/retrieve-order-detail`, {
        orderID: "2"
    })
    .then(response => {
      return response.data; 
    })
    .catch(error => {
      console.error("Error fetching repairs:", error);
    });
  }

  export const getOrdersAPI = async () => {
    return axios.get(`${ORDER_BASE_URL}/order`)
    .then(response => {
      return response.data; 
    })
    .catch(error => {
      console.error("Error fetching repairs:", error);
    });
  }