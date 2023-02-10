import { useContext, useEffect, useState } from 'react';

import { ButtonOrLink } from '@ui/ButtonOrLink';
import { Input } from '@ui/Input';

import { UserContext } from '../../contexts/auth';

import type { NextPage } from 'next';
const Conta: NextPage = () => {
  const user = useContext(UserContext);

  const onSubmit = (data: any) => console.log(data);

  return (
    <div>
      <p className="text-xl">Usuário: {user.nome}</p>
      <span>Instruções</span>
      <ul className="ml-4">
        <li>• Digite sua nova senha e clique em salvar;</li>
        <li>• Caso não deseje alterar a senha, clique somente em salvar</li>
      </ul>

      <form className="flex w-1/2 flex-col gap-2 text-slate-200">
        <Input label="Senha" />

        <Input label="Confirme a Senha" />

        <ButtonOrLink fullWidth intent="secondary">
          Salvar
        </ButtonOrLink>
      </form>
    </div>
  );
};

export default Conta;
