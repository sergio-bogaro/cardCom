import axios from 'axios';

interface loginProps {
  email: string;
  password: string;
}

interface registerProps {
  email: string;
  password: string;
  name: string;
}

const baseURL = 'https://api-capp.worktabsystems.com.br/api';

const transactionClient = axios.create({
  baseURL: baseURL,
  // timeout: 5000,
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest',
    // 'Content-type': 'application/json',
    Accept: 'application/json'
  }
});

export const login = (data: loginProps) => {
  return transactionClient.post('/login', data);
};

export const register = (data: registerProps) => {
  return transactionClient.post('/register', data);
};
