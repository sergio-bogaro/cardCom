import axios from 'axios';

interface saveUserProps {
  name: string;
  email: string;
  password: string;
  level_id: string;
  setor_id: string;
}

interface saveAdressProps {
  name: string;
  street1: string;
  street2: string;
  city: string;
  postal_code: string;
}

const baseURL = 'https://api-capp.worktabsystems.com.br/api';
const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessTokenCAP') : null;

const User = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'Content-type': 'application/json',
    Authorization: 'Bearer ' + accessToken,
    Accept: 'application/json'
  }
});

export const searchUsers = (filter: string, page: string) => {
  const searchProps = `search=${filter}&page=${page}`;
  return User.get('/v1/user/search?' + searchProps);
};

export const infoUser = () => {
  return User.get('/v1/user/my-info');
};

export const savaUser = (data: saveUserProps) => {
  return User.post('v1/user/save', data);
};

export const savaAdress = (data: saveAdressProps) => {
  return User.post('v1/user/save-adress', data);
};

export const deleteUser = () => {
  return User.delete('v1/user/delete/');
};
