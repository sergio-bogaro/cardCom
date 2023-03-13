import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Checkbox } from '@ui/CheckBox';
import { Input } from '@ui/Input';

import { UserContext } from '../../contexts/auth';

import type { NextPage } from 'next';
const Login: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { setUserData, transactionClient } = useContext(UserContext);

  const login = (data: any) => {
    return transactionClient.post('/login', data);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (data) => {
      login(data)
        .then((response: any) => {
          const userData = JSON.stringify(response.data.usuario);
          localStorage.setItem('userDataCAP', userData);
          localStorage.setItem('accessTokenCAP', response.data.token);
          setUserData(response.data.usuario);
          router.push('/home');
        })
        .catch((error: any) => setErrorMessage(error.response.data.mensagem));
    }
  });

  return (
    <div>
      <main className="flex h-screen justify-center bg-slate-900">
        <div className="m-auto flex w-128 flex-col rounded-xl bg-slate-800 p-8">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3  text-slate-200">
            <Input name="email" label="Email" value={formik.values.email} onChange={formik.handleChange} type="email" required />

            <Input
              name="password"
              label="Senha"
              value={formik.values.password}
              onChange={formik.handleChange}
              type={'password'}
              required
            />

            <div className="flex items-center justify-between">
              <Checkbox label="Lembrar-me" />
              <Link className="text-blue-500" href="/login/esqueci-minha-senha">
                Esqueceu sua Senha ?
              </Link>
            </div>
            <div className="ml-auto">
              <ButtonOrLink intent={'secondary'} type="submit">
                Entrar
              </ButtonOrLink>
            </div>
          </form>
          <p className="flex h-10 items-center text-red-600">{errorMessage}</p>
        </div>
      </main>
    </div>
  );
};

export default Login;
