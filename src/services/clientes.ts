import axios from 'axios';

interface registerClientProps {
  nome: string;
  cnpj: string;
  razao_social: string;
}
const baseURL = 'https://api-capp.worktabsystems.com.br/api';
const acessToken = typeof window !== 'undefined' ? localStorage.getItem('accessTokenCAP') : '';
const transactionClient = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'Content-type': 'application/json',
    Authorization: 'Bearer ' + acessToken,
    Accept: 'application/json'
  }
});

export const searchClient = (filter: string, page: string) => {
  const searchProps = `search=${filter}&page=${page}`;
  return transactionClient.get('/v1/cliente/search?' + searchProps);
};

export const clientInfo = () => {
  return transactionClient.get('/v1/cliente/info/12');
};

export const registerClient = (data: any) => {
  return transactionClient.post('v1/cliente/save', data);
};

export const registerFilial = (data: registerClientProps) => {
  return transactionClient.post('v1/cliente/save-filial', data);
};

export const registerUser = (data: registerClientProps) => {
  return transactionClient.post('v1/cliente/save-user', data);
};

export const deleteClient = () => {
  return transactionClient.delete('v1/cliente/delete');
};

export const deleteFilial = () => {
  return transactionClient.delete('v1/cliente/delete-filial');
};

export const deleteUser = () => {
  return transactionClient.delete('v1/cliente/delete-user');
};
