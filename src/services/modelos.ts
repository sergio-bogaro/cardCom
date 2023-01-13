import axios from 'axios';

interface registerModelProps {
  id: string;
  cliente_id: string;
}

const baseURL = 'https://api-capp.worktabsystems.com.br/api';
const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessTokenCAP') : null;

const transactionClient = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'Content-type': 'application/json',
    Authorization: 'Bearer ' + accessToken,
    Accept: 'application/json'
  }
});

export const searchModels = (filter: string) => {
  return transactionClient.get('/v1/modelo/search?' + filter);
};

export const infoModels = (id: string) => {
  return transactionClient.get('/v1/modelo/info/' + id);
};

export const registerModel = (data: registerModelProps) => {
  return transactionClient.post('/v1/modelo/save', data);
};

export const deleteMdel = () => {
  return transactionClient.delete('v1/cliente/delete');
};
