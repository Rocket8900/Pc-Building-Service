import axios from 'axios';

const GOOGLEENDPOINT = "http://localhost:5001"


export const googleAuthAPI = (tokenResponse)=> axios.post(`http://localhost:8000/get_jwt`, {tokenResponse}).then(res=>res?.data);
