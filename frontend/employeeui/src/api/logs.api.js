import axios from "axios"

const LOGS_BASE_URL = "http://localhost:3900"

export const getLogsAPI = async () => {
    return axios.post(`${LOGS_BASE_URL}/api/data?apikey=reader`, {
        "log_type": "Activity_Logs"
    })
    .then(response => {
      return response.data; 
    })
    .catch(error => {
      console.error("Error fetching repairs:", error);
    });
  }