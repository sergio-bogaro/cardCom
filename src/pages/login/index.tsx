import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { login } from '../../services/auth';

import Button from '../../components/Button';
import { MouseEvent, useState } from 'react';

const Login: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const onSubmit = (data: any) =>
    login(data)
      .then((response) => {
        const userData = JSON.stringify(response.data.usuario);
        localStorage.setItem('userDataCAP', userData);
        localStorage.setItem('accessTokenCAP', response.data.token);
        router.push('/home');
      })
      .catch((error) => setErrorMessage(error.response.data.mensagem));

  return (
    <div>
      <main className="bg-slate-900 h-screen flex justify-center">
        <div className="m-auto flex-col w-128 bg-slate-800 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="px-8 text-slate-200">
            <p className="text-slate-200 mt-12">Email</p>
            <input {...register('email')} className="bg-gray-600 outline-none w-full h-8 p-2 rounded-lg mt-2 mb-4" />

            <div className="flex justify-between">
              <span className="text-slate-200">Senha</span>
              <a className="text-blue-500" href="">
                Esqueceu sua Senha ?
              </a>
            </div>
            <input {...register('password')} type="password" className="bg-gray-600 outline-none w-full h-8 p-2 rounded-lg mt-2 mb-4" />

            <div className="flex justify-between items-center mt-6">
              <div>
                <input id="checkBox" type="checkbox" className="border-slate-800" />
                <label htmlFor="checkBox" className="ml-2">
                  Lembrar-me
                </label>
              </div>

              <Button buttonStyle={'default'} buttonType={'submit'}>
                Entrar
              </Button>
            </div>
          </form>

          <div className="p-8 flex items-center">
            <p className="text-red-600 h-10 flex items-center">{errorMessage}</p>
            <img className="w-28 ml-auto" src="https://www.resecurity.com.br/site/assets/img/let-s-encrypt-logo-b.png" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
