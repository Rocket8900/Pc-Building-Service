import axios from "axios"

const REPAIR_BASE_URL = "http://localhost:8000/repair"

const instance = axios.create({
  baseURL: "http://localhost:8000/repair"
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

export const updateRepairCompletion = async (id, updatedStatus, customermail) => {
  return axios.post(`http://localhost:8000/repair/updaterepaircompletion`, {
    RepairID: id,
    Status: updatedStatus,
    CustomerEmail: customermail
  })
  .then(response => {
    return response.data; 
  })
  .catch(error => {
    console.error("Error fetching repairs:", error);
  });
}

// export const updateRepairStatusSimple = async (id, status) => {
//   return axios.post(`${REPAIR_BASE_URL}/updaterepairstatussimple`, {
//     RepairID: id,
//     Status: status
//   })
//   .then(response => {
//     return response.data; 
//   })
//   .catch(error => {
//     console.error("Error fetching repairs:", error);
//   });
// }

export const updateRepairEmployee = async (id, Customermail) => {
  return instance.post(`http://localhost:8000/repair/updaterepairemployee`, {
    RepairID: id,
    CustomerEmail: Customermail,
  })
  .then(response => {
    return response.data; 
  })
  .catch(error => {
    console.error("Error fetching repairs:", error);
  });
}

export const updateRepairPart = async (id, part, customermail) => {
  return instance.post(`http://localhost:8000/repair/updaterepairpart`, {
    RepairID: id,
    RepairPart: part,
    CustomerEmail: customermail,
  })
  .then(response => {
    return response.data; 
  })
  .catch(error => {
    console.error("Error fetching repairs:", error);
  });
}

