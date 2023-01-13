import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { UserContext } from '../../contexts/auth';

const Conta: NextPage = () => {
  const user = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="bg-slate-800 h-screen p-3 flex gap-5">
      <SideBar />

      <div className="flex flex-col text-gray-300 w-full">
        <Header title="Minha Conta" />

        <p className="text-xl">Usuário: {user.nome}</p>
        <span>Instruções</span>
        <ul className="ml-4">
          <li>• Digite sua nova senha e clique em salvar;</li>
          <li>• Caso não deseje alterar a senha, clique somente em salvar</li>
        </ul>

        <form onSubmit={handleSubmit(onSubmit)} className="text-slate-200 flex flex-col gap-2 w-1/2">
          <p className="text-slate-200 mt-12">Senha</p>
          <input {...register('password')} className="bg-gray-600 outline-none h-8 p-2 rounded-lg mb-4" />

          <p className="text-slate-200">Confirme a Senha</p>
          <input {...register('confirmPassword')} className="bg-gray-600 outline-none h-8 p-2 rounded-lg mb-4" />

          <Button buttonType="submit">Salvar</Button>
        </form>
      </div>
    </div>
  );
};

export default Conta;
