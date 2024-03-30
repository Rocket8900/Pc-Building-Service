import axios from 'axios';

export const googleAuthAPI = (tokenResponse)=> axios.post(`http://localhost:8000/get_jwt`, {tokenResponse}).then(res=>res?.data);
