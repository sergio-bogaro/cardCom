import axios from 'axios';

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

export const searchProducts = (filter: string) => {
  return transactionClient.get('/v1/produto/search?');
};

export const infoProducts = (prductID: string) => {
  return transactionClient.get('/v1/produto/info');
};

export const registerProducts = (prductData: any) => {
  return transactionClient.post('/v1/produto/save', prductData);
};

export const deleteProducts = (prductID: string) => {
  return transactionClient.delete('/v1/produto/delete/' + prductID);
};
