import axios from "axios"

const REPAIR_BASE_URL = "http://localhost:8080/repair"

const instance = axios.create({
  baseURL: "http://localhost:8080/repair"
})

instance.interceptors.request.use(
  (config) => {
    // Retrieve JWT token from local storage or wherever it's stored
    const jwtToken = localStorage.getItem('AUTH_KEY');

    // If JWT token exists, include it in the Authorization header
    if (jwtToken) {
      config.headers['Authorization'] = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
});

export const getRepairsAPI = async () => {
    return axios.get(`${REPAIR_BASE_URL}/getrepairs`)
      .then(response => {
        return response.data; 
      })
      .catch(error => {
        console.error("Error fetching repairs:", error);
      });
  };

export const getRepairByIdAPI = async (id) => {
  return axios.post(`${REPAIR_BASE_URL}/getrepairbyid`, {
    RepairID: id
  })
  .then(response => {
    return response.data; 
  })
  .catch(error => {
    console.error("Error fetching repairs:", error);
  });
}

export const getEmployeeRepairsAPI = async () => {
  return instance.post(`/getrepairbyemployee`)
  .then(response => {
    return response.data; 
  })
  .catch(error => {
    console.error("Error fetching repairs:", error);
  });
}

export const updateRepairStatus = async (id, updatedStatus) => {
  return axios.post(`http://localhost:8888/repair/updaterepairstatus`, {
    RepairID: id,
    Status: updatedStatus
  })
  .then(response => {
    return response.data; 
  })
  .catch(error => {
    console.error("Error fetching repairs:", error);
  });
}

export const updateRepairStatusSimple = async (id, status) => {
  return axios.post(`${REPAIR_BASE_URL}/updaterepairstatus`, {
    RepairID: id,
    Status: status
  })
  .then(response => {
    return response.data; 
  })
  .catch(error => {
    console.error("Error fetching repairs:", error);
  });
}

export const updateRepairEmployee = async (id) => {
  return instance.post(`http://localhost:8888/repair/updaterepairemployee`, {
    RepairID: id,
  })
  .then(response => {
    return response.data; 
  })
  .catch(error => {
    console.error("Error fetching repairs:", error);
  });
}

export const updateRepairPart = async (id, part) => {
  return instance.post(`http://localhost:8888/repair/updaterepairpart`, {
    RepairID: id,
    RepairPart: part,
  })
  .then(response => {
    return response.data; 
  })
  .catch(error => {
    console.error("Error fetching repairs:", error);
  });
}

